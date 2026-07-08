/**
 * Registers the builtin filter types. Imported once (for its side effects)
 * by data-store.js, so the data engine carries its filters wherever it is
 * used. Extensions register additional types the same way.
 */

import { registerFilterType } from "./filter-registry.js";

function quote(s) {
    return `"${s.replace(/"/g, '""')}"`;
}

// Full-text search. The FTS5 MATCH is composed inside DataStore#queryTable
// (it needs the enrichment JOIN, ranking, and the literal-quoting retry),
// so this type only claims the URL param: "q" is search state, not a
// filter encoding, and survives filter re-encoding.
registerFilterType("search", {
    reservedParams: ["q"],
    preservesParams: true,
});

// Numeric range filter: {col}_min / {col}_max params on numeric columns.
registerFilterType("range", {
    decode(params, { filterMeta }) {
        const rangeNames = new Set(filterMeta.rangeColumns.map(c => c.name));
        const filters = {};
        for (const [key, value] of Object.entries(params)) {
            const m = key.match(/^(.+)_(min|max)$/);
            if (!m || !rangeNames.has(m[1])) continue;
            const col = m[1];
            if (!filters[col]) filters[col] = { type: "range", min: null, max: null };
            filters[col][m[2]] = Number(value);
        }
        return filters;
    },
    encode(key, filter) {
        return {
            [`${key}_min`]: filter.min != null ? String(filter.min) : null,
            [`${key}_max`]: filter.max != null ? String(filter.max) : null,
        };
    },
    buildSql(key, filter) {
        const quoted = quote(key);
        const conditions = [];
        const params = [];
        if (filter.min != null) {
            conditions.push(`${quoted} >= ?`);
            params.push(filter.min);
        }
        if (filter.max != null) {
            conditions.push(`${quoted} <= ?`);
            params.push(filter.max);
        }
        return { conditions, params };
    },
});

// Categoric multi-select filter: {col}=v1,v2,... on FK columns and
// configured dropdown/checkbox facet fields.
registerFilterType("multi", {
    decode(params, { filterMeta, facets }) {
        const multiNames = new Set(filterMeta.multiColumns.map(c => c.name));
        // Configured dropdown/checkbox facets filter on plain (non-FK)
        // columns too — e.g. on perspective views, which have no FK
        // metadata at all.
        for (const facet of facets || []) {
            if (facet.type === "dropdown" || facet.type === "checkbox") {
                multiNames.add(facet.field);
            }
        }
        const filters = {};
        for (const [key, value] of Object.entries(params)) {
            if (!multiNames.has(key) || !value) continue;
            const values = value.split(",").map(v => {
                const n = Number(v);
                return Number.isFinite(n) ? n : v;
            });
            filters[key] = { type: "multi", selected: new Set(values) };
        }
        return filters;
    },
    encode(key, filter) {
        if (filter.selected.size === 0) return null;
        return { [key]: Array.from(filter.selected).join(",") };
    },
    buildSql(key, filter) {
        if (filter.selected.size === 0) return null;
        const placeholders = Array.from(filter.selected).map(() => "?").join(", ");
        return {
            conditions: [`${quote(key)} IN (${placeholders})`],
            params: [...filter.selected],
        };
    },
});

// Many-to-many filter through a junction table: {farFkCol}=v1,v2,... on
// relations detected by DataStore#getFilterMeta (see m2mMeta there). The
// filter descriptor carries the junction/column names; decode only ever
// copies them from the trusted metadata, so URL params cannot inject
// identifiers into the SQL.
registerFilterType("m2m", {
    decode(params, { filterMeta }) {
        const m2mMeta = filterMeta?.m2mMeta;
        if (!m2mMeta) return null;
        const filters = {};
        for (const [key, value] of Object.entries(params)) {
            if (!m2mMeta[key] || !value) continue;
            const values = value.split(",").map(v => {
                const n = Number(v);
                return Number.isFinite(n) ? n : v;
            });
            filters[key] = { ...m2mMeta[key].filter, selected: new Set(values) };
        }
        return filters;
    },
    encode(key, filter) {
        if (filter.selected.size === 0) return null;
        return { [key]: Array.from(filter.selected).join(",") };
    },
    buildSql(key, filter) {
        if (filter.selected.size === 0) return null;
        const placeholders = Array.from(filter.selected).map(() => "?").join(", ");
        return {
            // Qualified with the base table: queryTable joins the FTS table
            // during a search, which could make a bare column ambiguous.
            conditions: [
                `${quote(filter.table)}.${quote(filter.refColumn)} IN (SELECT ${quote(filter.viaColumn)} FROM ${quote(filter.junction)} WHERE ${quote(filter.targetColumn)} IN (${placeholders}))`,
            ],
            params: [...filter.selected],
        };
    },
});
