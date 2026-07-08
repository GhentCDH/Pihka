// Side effect: registers the builtin filter types (search/range/multi) so
// the data engine carries its filters wherever it is used.
import "./builtin-filters.js";
import { buildWhereClause } from "./filter-sql.js";
import { listFilterTypes } from "./filter-registry.js";

function quote(s) {
    return `"${s.replace(/"/g, '""')}"`;
}

// FTS5 parses the MATCH argument as a query expression whose barewords can't
// contain punctuation ('.', '-', '(' …). Quoting each whitespace-separated
// term turns the input into literal phrase queries (implicitly AND-ed)
// instead of a syntax error.
function literalizeFtsQuery(search) {
    return search.trim().split(/\s+/)
        .map(t => `"${t.replace(/"/g, '""')}"`)
        .join(" ");
}

function classifyColumns(columns) {
    const rangeColumns = [];
    const multiColumns = [];

    for (const col of columns) {
        // linkTo columns are identifiers (views have no PK metadata).
        if (col.primaryKey || col.hidden || col.linkTo) continue;
        if (col.references) {
            multiColumns.push(col);
        } else if (col.type === "INTEGER" || col.type === "REAL" || col.displayType === "number") {
            // displayType covers view columns whose SQLite type is empty
            // (aggregates like COUNT) but are configured as numbers.
            rangeColumns.push(col);
        }
    }

    return { rangeColumns, multiColumns };
}

/**
 * DataStore wraps a DataSource and its metadata to provide
 * a pure-JSON query interface. No SQL leaks beyond this class.
 */
export class DataStore {
    #ds;
    #meta;
    // The database is immutable after enrichment, so per-table lookups
    // (FK display maps, range bounds, FK options) are computed once.
    #fkResolvedCache = new Map();
    #rangeBoundsCache = new Map();
    #fkOptionsCache = new Map();
    #m2mCache = new Map();

    constructor(ds, meta, databaseUrl = null) {
        this.#ds = ds;
        this.#meta = meta;
        /**
         * URL the SQLite file was fetched from, for direct-download links
         * (the data layer owns knowledge of where data comes from).
         * @type {string|null}
         */
        this.databaseUrl = databaseUrl;
    }

    /**
     * Returns the column schema for a table.
     * @returns {{ columns: Array }} | null
     */
    getSchema(table) {
        const tableMeta = this.#meta.tables[table];
        if (!tableMeta) return null;
        return { columns: tableMeta.columns };
    }

    /**
     * Returns filter metadata (range bounds + FK options + many-to-many
     * relations) for a table. After the base classification, every
     * registered filter type's `filterMeta` hook runs and may extend or
     * reshape the result — e.g. the geo-filter extension replaces the
     * lat/lon range facets with a `geoMeta` entry carrying the data extent.
     * @returns {{ rangeMeta: Object, multiMeta: Object, m2mMeta: Object,
     *   rangeColumns: Array, multiColumns: Array, m2mColumns: Array }}
     */
    getFilterMeta(table) {
        const tableMeta = this.#meta.tables[table];
        if (!tableMeta) {
            return { rangeMeta: {}, multiMeta: {}, m2mMeta: {}, rangeColumns: [], multiColumns: [], m2mColumns: [] };
        }

        const { rangeColumns, multiColumns } = classifyColumns(tableMeta.columns);

        const rangeMeta = {};
        for (const col of rangeColumns) {
            rangeMeta[col.name] = this.#loadRangeBounds(table, col.name);
        }

        const multiMeta = {};
        for (const col of multiColumns) {
            multiMeta[col.name] = {
                options: this.#loadFkOptions(col.references.table, col.references.column),
                label: this.#meta.tables[col.references.table]?.label ?? col.references.table,
            };
        }

        // Many-to-many facets: one dropdown per detected junction relation,
        // keyed by the junction's far-side FK column name (e.g. works gets
        // "category_id" through works_categories). The `filter` descriptor
        // carries everything the "m2m" filter type's buildSql needs; the UI
        // passes it through opaquely.
        const m2mColumns = [];
        const m2mMeta = {};
        const realNames = new Set(tableMeta.columns.map(c => c.name));
        const rangeNames = new Set(rangeColumns.map(c => c.name));
        for (const rel of this.#m2mRelations(table)) {
            const key = rel.farColumn;
            const rangeStem = key.match(/^(.+)_(min|max)$/)?.[1];
            if (realNames.has(key) || m2mMeta[key] || (rangeStem && rangeNames.has(rangeStem))) {
                console.warn(`[pihka] m2m facet for "${table}" via "${rel.junction}" skipped: key "${key}" collides with an existing column or facet`);
                continue;
            }
            const label = this.#meta.tables[rel.farTable]?.label ?? rel.farTable;
            m2mColumns.push({ name: key, label });
            m2mMeta[key] = {
                options: this.#loadFkOptions(rel.farTable, rel.farRefColumn),
                label,
                filter: {
                    type: "m2m",
                    table,
                    refColumn: rel.refColumn,
                    junction: rel.junction,
                    viaColumn: rel.viaColumn,
                    targetColumn: rel.farColumn,
                },
            };
        }

        const meta = { rangeMeta, multiMeta, m2mMeta, rangeColumns, multiColumns, m2mColumns };

        const loadRangeBounds = (colName) => this.#loadRangeBounds(table, colName);
        for (const def of listFilterTypes()) {
            def.filterMeta?.({ table, columns: tableMeta.columns, meta, loadRangeBounds });
        }

        return meta;
    }

    /**
     * Returns FTS metadata for a table if the enrichment pipeline built an
     * index for it, otherwise null. Used by the UI to decide whether the
     * search input should be enabled.
     */
    getFtsInfo(table) {
        return this.#meta.tables[table]?.fts || null;
    }

    /**
     * Query a table with filters, sorting, pagination, and optional FTS.
     * All parameters and return values are plain JSON.
     *
     * @param {string} table
     * @param {Object} [options]
     * @param {Object} [options.filters] - { key: { type: "<registered filter type>", ... } }
     * @param {{ column: string, direction: string }|null} [options.sort]
     * @param {number} [options.page]
     * @param {number|null} [options.pageSize] - null disables pagination (all rows)
     * @param {string} [options.search] - FTS5 MATCH expression; ignored when no FTS index exists
     * @returns {{ columns: Array, rows: Array, totalRows: number, page: number, totalPages: number, fkResolved?: Object, searchError?: string }}
     */
    queryTable(table, { filters = {}, sort = null, page = 0, pageSize = 25, search = "" } = {}) {
        const tableMeta = this.#meta.tables[table];
        if (!tableMeta) return { columns: [], rows: [], totalRows: 0, page: 0, totalPages: 1 };

        const { columns } = tableMeta;
        const { whereClause: filterWhere, bindParams: filterBinds } = buildWhereClause(filters);

        // Compose the FTS JOIN + predicate when a non-empty search is set on
        // a table that actually has an FTS index. Anything else: no join.
        // Trigram tokens need >= 3 characters — shorter queries would match
        // nothing mid-typing, so treat them as "no search yet".
        const searchActive = search && tableMeta.fts
            && !(tableMeta.fts.mode === "trigram" && search.trim().length < 3);
        const ftsInfo = searchActive ? tableMeta.fts : null;
        const joinClause = ftsInfo
            ? `JOIN ${quote(ftsInfo.table)} ON ${quote(table)}.rowid = ${quote(ftsInfo.table)}.rowid`
            : "";
        const ftsPredicate = ftsInfo ? `${quote(ftsInfo.table)} MATCH ?` : "";

        // Merge filter WHERE + FTS predicate.
        const allConditions = [];
        if (filterWhere) allConditions.push(filterWhere.replace(/^WHERE /, ""));
        if (ftsPredicate) allConditions.push(ftsPredicate);
        const whereClause = allConditions.length
            ? "WHERE " + allConditions.join(" AND ")
            : "";

        // ORDER BY: explicit user sort wins; otherwise rank by FTS score when
        // searching, otherwise no order.
        let orderClause = "";
        if (sort && sort.column) {
            orderClause = `ORDER BY ${quote(sort.column)} ${sort.direction === "DESC" ? "DESC" : "ASC"}`;
        } else if (ftsInfo) {
            orderClause = `ORDER BY ${quote(ftsInfo.table)}.rank`;
        }

        const run = (matchTerm) => {
            // Bind order matches placeholder order: filters first, then FTS.
            const whereBinds = [...filterBinds, ...(ftsInfo ? [matchTerm] : [])];
            const countResult = [];
            this.#ds.exec(
                `SELECT COUNT(*) as n FROM ${quote(table)} ${joinClause} ${whereClause}`,
                { bind: whereBinds, rowMode: "object", callback: r => countResult.push(r) },
            );
            const totalRows = countResult[0]?.n ?? 0;
            const paginated = pageSize != null;
            const totalPages = paginated ? Math.max(1, Math.ceil(totalRows / pageSize)) : 1;
            if (!paginated) page = 0;

            const limitClause = paginated ? "LIMIT ? OFFSET ?" : "";
            const limitBinds = paginated ? [pageSize, page * pageSize] : [];
            const sql = `SELECT ${quote(table)}.* FROM ${quote(table)} ${joinClause} ${whereClause} ${orderClause} ${limitClause}`;
            const rows = [];
            this.#ds.exec(sql, {
                bind: [...whereBinds, ...limitBinds],
                rowMode: "object",
                callback: r => rows.push(r),
            });

            const fkResolved = this.resolveForeignKeys(table);
            return { columns, rows, totalRows, page, totalPages, fkResolved };
        };

        // FTS5 throws on MATCH expressions its query grammar can't parse —
        // including everyday punctuation ("2014.", "U.S.", unclosed quotes).
        // Retry those as literal quoted terms so punctuation just works,
        // while syntactically valid queries keep the full FTS5 syntax.
        try {
            return run(search);
        } catch (err) {
            if (!ftsInfo) throw err;
            try {
                return run(literalizeFtsQuery(search));
            } catch {
                return {
                    columns, rows: [], totalRows: 0, page: 0, totalPages: 1,
                    fkResolved: this.resolveForeignKeys(table),
                    searchError: "Invalid search query",
                };
            }
        }
    }

    /**
     * Look up a single row by primary key.
     *
     * @param {string} table
     * @param {*} id - Primary key value
     * @returns {{ columns: Array, row: Object|null, fkResolved?: Object }}
     */
    queryRow(table, id) {
        const tableMeta = this.#meta.tables[table];
        if (!tableMeta) return { columns: [], row: null };

        const { columns } = tableMeta;
        const pkCol = columns.find(c => c.primaryKey);
        if (!pkCol) return { columns, row: null };

        const rows = [];
        this.#ds.exec(
            `SELECT * FROM ${quote(table)} WHERE ${quote(pkCol.name)} = ? LIMIT 1`,
            { bind: [id], rowMode: "object", callback: r => rows.push(r) },
        );

        const fkResolved = this.resolveForeignKeys(table);
        return { columns, row: rows[0] ?? null, fkResolved };
    }

    /**
     * Discover relations pointing at a given row (reverse foreign keys):
     * for a category row, the works in that category, etc. One entry per
     * referencing column; empty relations are omitted. Rows themselves are
     * fetched page by page via queryTable() with a multi filter on the
     * relation column.
     *
     * @param {string} table - the detail row's table
     * @param {Object} row - the detail row (values are read for the
     *   referenced columns, which are usually but not necessarily the PK)
     * @returns {Array<{ table: string, column: string, value: *, totalRows: number }>}
     */
    queryRelated(table, row) {
        if (!row) return [];

        const relations = [];
        for (const [childName, childMeta] of Object.entries(this.#meta.tables)) {
            if (childMeta.type !== "table" || childMeta.hidden) continue;
            for (const col of childMeta.columns) {
                if (col.references?.table !== table) continue;
                const value = row[col.references.column];
                if (value == null) continue;

                const countResult = [];
                this.#ds.exec(
                    `SELECT COUNT(*) as n FROM ${quote(childName)} WHERE ${quote(col.name)} = ?`,
                    { bind: [value], rowMode: "object", callback: r => countResult.push(r) },
                );
                const totalRows = countResult[0]?.n ?? 0;
                if (totalRows === 0) continue;

                relations.push({
                    table: childName,
                    label: childMeta.label ?? null,
                    column: col.name,
                    value,
                    totalRows,
                });
            }
        }
        return relations;
    }

    /**
     * Count rows per distinct value of a column, respecting filters.
     * When excludeSelf is true, the filter for facetColumn itself is excluded
     * (standard faceted search behavior: counts reflect what you'd get if
     * you toggled that value, not what's already filtered).
     *
     * @param {string} table
     * @param {string} facetColumn
     * @param {Object} [options]
     * @param {Object} [options.filters] - current filter state
     * @param {boolean} [options.excludeSelf=true]
     * @returns {Array<{ value: *, count: number }>}
     */
    queryFacetCounts(table, facetColumn, { filters = {}, excludeSelf = true } = {}) {
        const { whereClause, bindParams } = buildWhereClause(filters, {
            exclude: excludeSelf ? facetColumn : null,
        });

        const sql = `SELECT ${quote(facetColumn)} as value, COUNT(*) as count FROM ${quote(table)} ${whereClause} GROUP BY ${quote(facetColumn)} ORDER BY count DESC`;
        const rows = [];
        this.#ds.exec(sql, { bind: bindParams, rowMode: "object", callback: r => rows.push(r) });
        return rows;
    }

    /**
     * Get enriched facet metadata for a list of facet configs, including
     * counted options for dropdown/checkbox facets.
     *
     * @param {string} table
     * @param {Array} facetConfigs - from perspective.facets
     * @param {Object} currentFilters - current filter state
     * @returns {Object} - { [field]: { type, label, options?, min?, max? } }
     */
    getFacetMeta(table, facetConfigs, currentFilters = {}) {
        const result = {};

        for (const facet of facetConfigs) {
            const field = facet.field;

            if (facet.type === "range") {
                const bounds = this.#loadRangeBounds(table, field);
                result[field] = { type: "range", label: facet.label, ...bounds };
            } else if (facet.type === "dropdown" || facet.type === "checkbox") {
                const counts = this.queryFacetCounts(table, field, {
                    filters: currentFilters,
                    excludeSelf: true,
                });

                // For FK columns, resolve display names
                const tableMeta = this.#meta.tables[table];
                const col = tableMeta?.columns.find(c => c.name === field);
                let options;

                if (col?.references) {
                    const fkOptions = this.#loadFkOptions(col.references.table, col.references.column);
                    const fkMap = new Map(fkOptions.map(o => [o.value, o.display]));
                    options = counts.map(r => ({
                        value: r.value,
                        display: fkMap.get(r.value) ?? String(r.value),
                        count: r.count,
                    }));
                } else {
                    options = counts.map(r => ({
                        value: r.value,
                        display: String(r.value ?? ""),
                        count: r.count,
                    }));
                }

                result[field] = { type: facet.type, label: facet.label, options };
            }
        }

        return result;
    }

    /**
     * Resolve FK columns to display name lookup maps.
     * Returns { colName: { fkValue: displayName, ... }, ... } for each FK column.
     * Uses typical display columns: name, title, label, or first TEXT column.
     *
     * @param {string} table
     * @returns {Object} - { [colName]: { [id]: displayName } }
     */
    resolveForeignKeys(table) {
        if (this.#fkResolvedCache.has(table)) return this.#fkResolvedCache.get(table);

        const tableMeta = this.#meta.tables[table];
        if (!tableMeta) return {};

        const resolved = {};
        for (const col of tableMeta.columns) {
            if (!col.references) continue;
            const options = this.#loadFkOptions(col.references.table, col.references.column);
            const map = {};
            for (const opt of options) {
                map[opt.value] = opt.display;
            }
            resolved[col.name] = {
                displayMap: map,
                referencedTable: col.references.table,
                // Hidden tables still resolve display names, but the UI
                // shouldn't link into them.
                referencedTableHidden: this.#meta.tables[col.references.table]?.hidden === true,
            };
        }
        this.#fkResolvedCache.set(table, resolved);
        return resolved;
    }

    // --- Private helpers ---

    /**
     * Many-to-many relations reaching `table` through junction tables.
     *
     * A junction is detected purely from schema structure: a real table
     * whose columns are exactly two FK columns to two *different* tables,
     * plus at most one non-FK column which must be the PK. Both the
     * `id INTEGER PRIMARY KEY + two FKs` and the composite-PK
     * `PRIMARY KEY (a_id, b_id)` idioms qualify; junction tables carrying
     * extra property columns do not. `hidden` config is deliberately not
     * consulted — hiding a junction table removes its homepage card and
     * related sections, but keeps the m2m facet (same rule as hidden
     * lookup tables still resolving FK display names).
     *
     * @returns {Array<{ junction: string, viaColumn: string, refColumn: string,
     *   farTable: string, farColumn: string, farRefColumn: string }>}
     */
    #m2mRelations(table) {
        if (this.#m2mCache.has(table)) return this.#m2mCache.get(table);

        // PRAGMA foreign_key_list reports `to` as null for "REFERENCES t"
        // without a column name; that means the referenced table's PK.
        const resolveRefColumn = (ref) => {
            if (ref.column != null) return ref.column;
            return this.#meta.tables[ref.table]?.columns.find(c => c.primaryKey)?.name ?? null;
        };

        const relations = [];
        for (const [name, meta] of Object.entries(this.#meta.tables)) {
            if (meta.type !== "table") continue;
            const fks = meta.columns.filter(c => c.references);
            const rest = meta.columns.filter(c => !c.references);
            if (fks.length !== 2) continue;
            if (rest.length > 1 || (rest.length === 1 && !rest[0].primaryKey)) continue;
            if (fks[0].references.table === fks[1].references.table) continue;
            if (!fks.every(c => this.#meta.tables[c.references.table])) continue;

            const near = fks.find(c => c.references.table === table);
            if (!near) continue;
            const far = fks.find(c => c !== near);
            const refColumn = resolveRefColumn(near.references);
            const farRefColumn = resolveRefColumn(far.references);
            if (!refColumn || !farRefColumn) continue;

            relations.push({
                junction: name,
                viaColumn: near.name,
                refColumn,
                farTable: far.references.table,
                farColumn: far.name,
                farRefColumn,
            });
        }
        this.#m2mCache.set(table, relations);
        return relations;
    }

    #loadRangeBounds(table, colName) {
        const cacheKey = `${table} ${colName}`;
        if (this.#rangeBoundsCache.has(cacheKey)) return this.#rangeBoundsCache.get(cacheKey);

        const rows = [];
        this.#ds.exec(
            `SELECT MIN(${quote(colName)}) as lo, MAX(${quote(colName)}) as hi FROM ${quote(table)}`,
            { rowMode: "object", callback: r => rows.push(r) },
        );
        const bounds = { min: rows[0]?.lo ?? 0, max: rows[0]?.hi ?? 0 };
        this.#rangeBoundsCache.set(cacheKey, bounds);
        return bounds;
    }

    #loadFkOptions(referencedTable, referencedColumn) {
        const cacheKey = `${referencedTable} ${referencedColumn}`;
        if (this.#fkOptionsCache.has(cacheKey)) return this.#fkOptionsCache.get(cacheKey);

        const refMeta = this.#meta.tables[referencedTable];
        if (!refMeta) return [];

        // Prefer typical display columns by name, then first TEXT column, then PK
        const DISPLAY_NAMES = ["title", "name", "label", "display_name", "description"];
        const displayCol =
            refMeta.columns.find(c => DISPLAY_NAMES.includes(c.name.toLowerCase()) && !c.primaryKey)
            || refMeta.columns.find(c => !c.primaryKey && c.type === "TEXT")
            || refMeta.columns.find(c => c.primaryKey);
        if (!displayCol) return [];

        const options = [];
        this.#ds.exec(
            `SELECT ${quote(referencedColumn)} as value, ${quote(displayCol.name)} as display FROM ${quote(referencedTable)} ORDER BY ${quote(displayCol.name)}`,
            { rowMode: "object", callback: r => options.push(r) },
        );
        this.#fkOptionsCache.set(cacheKey, options);
        return options;
    }
}
