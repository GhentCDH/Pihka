// @ts-check
const clone = (value) => JSON.parse(JSON.stringify(value));
import { applyTableConfig } from "./table-config.js";
import { guardedDefinition } from "./component-host.js";
/** Presentation facade overlays fresh JSON without changing the engine schema. */
export function createPresentationStore(engine, schema, config, registry) {
    const meta = clone(schema);
    applyTableConfig(meta, config, registry);
    const columnsFor = (table, columns) =>
        columns.map((c) => ({
            ...c,
            ...meta.tables[table]?.columns.find((x) => x.name === c.name),
        }));
    const fks = (values) =>
        values &&
        Object.fromEntries(
            Object.entries(values).map(([k, v]) => [
                k,
                { ...v, referencedTableHidden: !!meta.tables[v.referencedTable]?.hidden },
            ]),
        );
    const decorate = (table, result) => ({
        ...result,
        columns: columnsFor(table, result.columns || []),
        fkResolved: fks(result.fkResolved),
    });
    const facade = {
        databaseUrl: engine.databaseUrl,
        capabilities: engine.capabilities,
        getSchema: (table) => (table ? meta.tables[table] : meta),
        getFtsInfo: (table) => engine.getFtsInfo(table),
        queryTable: async (table, ...args) =>
            decorate(table, await engine.queryTable(table, ...args)),
        queryRow: async (table, ...args) => decorate(table, await engine.queryRow(table, ...args)),
        queryRelated: async (...args) =>
            (await engine.queryRelated(...args))
                .filter((r) => !meta.tables[r.table]?.hidden)
                .map((r) => ({ ...decorate(r.table, r), label: meta.tables[r.table]?.label })),
        resolveForeignKeys: async (...args) => fks(await engine.resolveForeignKeys(...args)),
        async getFilterMeta(table) {
            const result = clone(await engine.getFilterMeta(table));
            for (const prefix of ["range", "multi", "m2m"]) {
                result[`${prefix}Columns`] = columnsFor(
                    table,
                    result[`${prefix}Columns`] || [],
                ).filter((c) => !c.hidden && !c.linkTo);
                for (const [key, value] of Object.entries(result[`${prefix}Meta`] || {}))
                    value.label =
                        meta.tables[table]?.columns.find((c) => c.name === key)?.label ||
                        meta.tables[value.referencedTable]?.label ||
                        value.referencedTable ||
                        key;
            }
            const enabled = registry
                .list("facet")
                .map(guardedDefinition)
                .filter((d) => d.supplemental && (!d.availableFor || d.availableFor(result)));
            for (const def of enabled) {
                let replaced = [];
                try {
                    if (typeof def.replacesRanges === "function")
                        replaced = def.replacesRanges(result);
                } catch (error) {
                    console.warn(`[pihka] facet ${def.id} range replacement failed`, error);
                }
                if (!Array.isArray(replaced)) replaced = [];
                result.rangeColumns = result.rangeColumns.filter((c) => !replaced.includes(c.name));
            }
            return result;
        },
        async getFacetMeta(table, facets, filters) {
            const normalized = facets
                .filter((f) => ["range", "dropdown", "checkbox", "values"].includes(f.type))
                .filter((f) => !meta.tables[table]?.columns.find((c) => c.name === f.field)?.hidden)
                .map((f) => ({ ...f, type: f.type === "range" ? "range" : "values" }));
            const result = await engine.getFacetMeta(table, normalized, filters);
            return Object.fromEntries(
                Object.entries(result).map(([key, value]) => [
                    key,
                    {
                        ...value,
                        type: facets.find((f) => f.field === key)?.type || value.type,
                        label:
                            facets.find((f) => f.field === key)?.label ||
                            meta.tables[table]?.columns.find((c) => c.name === key)?.label,
                    },
                ]),
            );
        },
    };
    return { store: facade, schema: meta };
}
