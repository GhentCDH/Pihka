// @ts-check
export function register(api) {
    // Full-text search. The FTS5 MATCH is composed inside DataStore#queryTable
    // (it needs the enrichment JOIN, ranking, and the literal-quoting retry),
    // so this type only claims the URL param: "q" is search state, not a
    // filter encoding, and survives filter re-encoding.
    api.registerFilterCodec("search", {
        reservedParams: ["q"],
        preservesParams: true,
    });

    // Numeric range filter: {col}_min / {col}_max params on numeric columns.
    api.registerFilterCodec("range", {
        decode(params, { filterMeta }) {
            const rangeNames = new Set(filterMeta.rangeColumns.map((c) => c.name));
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
    });

    // Categoric multi-select filter: {col}=v1,v2,... on FK columns and
    // configured dropdown/checkbox facet fields.
    api.registerFilterCodec("multi", {
        decode(params, { filterMeta, facets }) {
            const multiNames = new Set(filterMeta.multiColumns.map((c) => c.name));
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
                const values = value.split(",").map((v) => {
                    const n = Number(v);
                    return Number.isFinite(n) ? n : v;
                });
                filters[key] = { type: "multi", selected: values };
            }
            return filters;
        },
        encode(key, filter) {
            if (filter.selected.length === 0) return null;
            return { [key]: Array.from(filter.selected).join(",") };
        },
    });

    // Many-to-many filter through a junction table: {farFkCol}=v1,v2,... on
    // relations detected by DataStore#getFilterMeta (see m2mMeta there). The
    // filter descriptor carries the junction/column names; decode only ever
    // copies them from the trusted metadata, so URL params cannot inject
    // identifiers into the SQL.
    api.registerFilterCodec("m2m", {
        decode(params, { filterMeta }) {
            const m2mMeta = filterMeta?.m2mMeta;
            if (!m2mMeta) return null;
            const filters = {};
            for (const [key, value] of Object.entries(params)) {
                if (!m2mMeta[key] || !value) continue;
                const values = value.split(",").map((v) => {
                    const n = Number(v);
                    return Number.isFinite(n) ? n : v;
                });
                filters[key] = { ...m2mMeta[key].filter, selected: values };
            }
            return filters;
        },
        encode(key, filter) {
            if (filter.selected.length === 0) return null;
            return { [key]: Array.from(filter.selected).join(",") };
        },
    });
}
