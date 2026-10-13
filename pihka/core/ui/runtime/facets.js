// @ts-check
import { localize } from "./table-config.js";
import { guardedDefinition } from "./component-host.js";
/**
 * One sequence for configured, inferred and plugin facet controls.
 * Supplemental facets may hide controls through `replacesFacets(facetMeta)`
 * and then take the position of the first control they replace.
 */
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
    const supplemental = registry
        .list("facet")
        .map(guardedDefinition)
        .filter((def) => def.supplemental && (!def.availableFor || def.availableFor(autoFilterMeta, facetMeta)));
    const owners = new Map(
        supplemental.flatMap((def) => replacedFacets(def, facetMeta).map((field) => [field, def])),
    );
    const placed = new Set();
    const place = (def) => {
        if (placed.has(def)) return;
        placed.add(def);
        result.push({
            id: def.id,
            renderer: def.id,
            props: { autoFilterMeta, facetMeta, filters, actions, lang },
        });
    };
    // A replacing facet takes the position of the first control it replaces.
    const replaced = (field) => {
        const owner = owners.get(field);
        if (owner) place(owner);
        return !!owner;
    };
    if (facetMeta != null) {
        for (const [field, meta] of Object.entries(facetMeta)) {
            if (replaced(field)) continue;
            if (meta.type === "range") range(field, meta);
            else if (["dropdown", "checkbox", "values"].includes(meta.type)) values(field, meta);
        }
    } else if (autoFilterMeta) {
        for (const col of autoFilterMeta.multiColumns || [])
            if (!replaced(col.name)) values(col.name, autoFilterMeta.multiMeta[col.name]);
        for (const col of autoFilterMeta.rangeColumns || [])
            if (!replaced(col.name)) range(col.name, autoFilterMeta.rangeMeta[col.name], col);
        for (const col of autoFilterMeta.m2mColumns || [])
            if (!replaced(col.name)) values(col.name, autoFilterMeta.m2mMeta[col.name], true);
    }
    supplemental.forEach(place);
    return result;
}

function replacedFacets(def, facetMeta) {
    if (typeof def.replacesFacets !== "function") return [];
    try {
        const fields = def.replacesFacets(facetMeta);
        return Array.isArray(fields) ? fields.filter((f) => typeof f === "string") : [];
    } catch (error) {
        console.warn(`[pihka] facet ${def.id} facet replacement failed`, error);
        return [];
    }
}
