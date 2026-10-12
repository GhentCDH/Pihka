// @ts-check
import { localize } from "./table-config.js";
import { guardedDefinition } from "./component-host.js";
/** One sequence for configured, inferred and plugin facet controls. */
export function normalizeFacets({ facetMeta, autoFilterMeta, filters, actions, lang }, registry) {
    const result = [];
    const range = (field, meta, col = {}) =>
        result.push({
            id: field,
            renderer: "range",
            props: {
                label: localize(meta.label || col.label, lang, field),
                min: meta.min,
                max: meta.max,
                currentMin: filters[field]?.min ?? null,
                currentMax: filters[field]?.max ?? null,
                step: col.type === "REAL" ? 0.01 : 1,
                onChangeMin: (value) => actions.onRangeChange(field, "min", value),
                onChangeMax: (value) => actions.onRangeChange(field, "max", value),
            },
        });
    const values = (field, meta, relation = false) =>
        result.push({
            id: field,
            renderer: "values",
            props: {
                label: localize(meta.label, lang, field),
                options: meta.options || [],
                selected: filters[field]?.selected || [],
                onChange: (selected) =>
                    relation
                        ? actions.onFilterChange(
                              field,
                              selected.size ? { ...meta.filter, selected: [...selected] } : null,
                          )
                        : actions.onMultiChange(field, selected),
            },
        });
    if (facetMeta != null) {
        for (const [field, meta] of Object.entries(facetMeta)) {
            if (meta.type === "range") range(field, meta);
            else if (["dropdown", "checkbox", "values"].includes(meta.type)) values(field, meta);
        }
    } else if (autoFilterMeta) {
        for (const col of autoFilterMeta.multiColumns || [])
            values(col.name, autoFilterMeta.multiMeta[col.name]);
        for (const col of autoFilterMeta.rangeColumns || [])
            range(col.name, autoFilterMeta.rangeMeta[col.name], col);
        for (const col of autoFilterMeta.m2mColumns || [])
            values(col.name, autoFilterMeta.m2mMeta[col.name], true);
    }
    for (const def of registry.list("facet").map(guardedDefinition)) {
        if (def.supplemental && (!def.availableFor || def.availableFor(autoFilterMeta)))
            result.push({
                id: def.id,
                renderer: def.id,
                props: { autoFilterMeta, filters, actions, lang },
            });
    }
    return result;
}
