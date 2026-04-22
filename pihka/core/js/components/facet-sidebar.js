import { h } from "preact";
import { useState } from "preact/hooks";
import RangeSelector from "./range-selector.js";

/**
 * Sidebar with faceted search filters.
 * Novel Echoes style: "Filters" header, dropdown selects with counts, range sliders.
 *
 * Props:
 *   facetMeta      - { [field]: { type, label, options?, min?, max? } } from store.getFacetMeta()
 *   autoFilterMeta - { rangeMeta, multiMeta, rangeColumns, multiColumns } from store.getFilterMeta()
 *   filters        - current filter state from URL
 *   totalRows      - total matching rows
 *   perspectiveName - display name for the result count
 *   onRangeChange  - (colName, bound, value) => void
 *   onMultiChange  - (colName, newSelected) => void
 *   onClearAll     - () => void
 */
export default function FacetSidebar({
    facetMeta, autoFilterMeta, filters,
    totalRows, perspectiveName,
    onRangeChange, onMultiChange, onClearAll,
}) {
    const hasActiveFilters = Object.keys(filters).length > 0;

    // Use configured facetMeta if available, otherwise fall back to auto-generated
    const hasFacetMeta = facetMeta && Object.keys(facetMeta).length > 0;

    return h("aside", { class: "facet-sidebar" },
        h("div", { class: "facet-sidebar-header" },
            h("strong", null, "Filters"),
            hasActiveFilters && h("button", {
                class: "outline",
                style: "padding:.2em .6em;font-size:.75em;margin-left:auto",
                onClick: onClearAll,
            }, "Clear all"),
        ),
        h("p", { style: "font-size:.8em;color:var(--text-muted);margin:.25rem 0 .75rem" },
            `${totalRows} ${perspectiveName || "results"}`,
        ),

        hasFacetMeta
            ? renderConfiguredFacets(facetMeta, filters, onRangeChange, onMultiChange)
            : renderAutoFacets(autoFilterMeta, filters, onRangeChange, onMultiChange),
    );
}

function renderConfiguredFacets(facetMeta, filters, onRangeChange, onMultiChange) {
    return Object.entries(facetMeta).map(([field, meta]) => {
        if (meta.type === "range") {
            const current = filters[field];
            return h(RangeSelector, {
                key: field,
                label: labelText(meta.label, field),
                min: meta.min,
                max: meta.max,
                currentMin: current?.min ?? null,
                currentMax: current?.max ?? null,
                step: 1,
                onChangeMin: (v) => onRangeChange(field, "min", v),
                onChangeMax: (v) => onRangeChange(field, "max", v),
            });
        }

        if (meta.type === "dropdown" || meta.type === "checkbox") {
            return h(DropdownFacet, {
                key: field,
                field,
                label: labelText(meta.label, field),
                options: meta.options || [],
                selected: filters[field]?.selected ?? new Set(),
                onChange: (sel) => onMultiChange(field, sel),
            });
        }

        return null;
    });
}

function renderAutoFacets(autoFilterMeta, filters, onRangeChange, onMultiChange) {
    if (!autoFilterMeta) return null;
    const { rangeMeta, multiMeta, rangeColumns, multiColumns } = autoFilterMeta;

    return [
        ...multiColumns.map(col =>
            h(DropdownFacet, {
                key: col.name,
                field: col.name,
                label: multiMeta[col.name].label,
                options: (multiMeta[col.name].options || []).map(o => ({ ...o, count: null })),
                selected: filters[col.name]?.selected ?? new Set(),
                onChange: (sel) => onMultiChange(col.name, sel),
            }),
        ),
        ...rangeColumns.map(col =>
            h(RangeSelector, {
                key: col.name,
                label: col.name,
                min: rangeMeta[col.name].min,
                max: rangeMeta[col.name].max,
                currentMin: filters[col.name]?.min ?? null,
                currentMax: filters[col.name]?.max ?? null,
                step: col.type === "REAL" ? 0.01 : 1,
                onChangeMin: (v) => onRangeChange(col.name, "min", v),
                onChangeMax: (v) => onRangeChange(col.name, "max", v),
            }),
        ),
    ];
}

/**
 * A searchable dropdown facet with optional counts.
 * Novel Echoes / Cinema Belgica style.
 */
function DropdownFacet({ field, label, options, selected, onChange }) {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const filtered = search
        ? options.filter(o => o.display.toLowerCase().includes(search.toLowerCase()))
        : options;

    const selectedValues = selected;
    const hasSelection = selectedValues.size > 0;

    const handleSelect = (value) => {
        const next = new Set(selectedValues);
        if (next.has(value)) {
            next.delete(value);
        } else {
            next.add(value);
        }
        onChange(next);
    };

    const handleClear = (e) => {
        e.stopPropagation();
        onChange(new Set());
    };

    // Build display text for selected items
    const selectedDisplay = hasSelection
        ? options.filter(o => selectedValues.has(o.value)).map(o => o.display).join(", ")
        : "";

    return h("div", { class: "facet-dropdown" },
        h("label", { style: "font-size:.8em;font-weight:600;display:block;margin-bottom:.25rem" }, label),
        h("div", { class: "facet-dropdown-trigger", onClick: () => setOpen(!open) },
            h("span", { class: hasSelection ? "" : "facet-placeholder" },
                hasSelection ? selectedDisplay : `Select ${label.toLowerCase()}`,
            ),
            hasSelection && h("span", {
                class: "facet-clear",
                onClick: handleClear,
                title: "Clear filter",
            }, "\u00D7"),
            h("span", { class: "facet-chevron" }, open ? "\u25B2" : "\u25BC"),
        ),
        open && h("div", { class: "facet-dropdown-panel" },
            options.length > 6 && h("input", {
                type: "text",
                placeholder: "Search\u2026",
                value: search,
                onInput: (e) => setSearch(e.target.value),
                class: "facet-search",
            }),
            h("div", { class: "facet-options" },
                filtered.length === 0
                    ? h("div", { style: "padding:.5rem;color:var(--text-muted);font-size:.8em" }, "No matches")
                    : filtered.map(opt =>
                        h("label", {
                            key: opt.value,
                            class: `facet-option ${selectedValues.has(opt.value) ? "facet-option-selected" : ""}`,
                        },
                            h("input", {
                                type: "checkbox",
                                checked: selectedValues.has(opt.value),
                                onChange: () => handleSelect(opt.value),
                            }),
                            h("span", { class: "facet-option-label" }, opt.display),
                            opt.count != null && h("span", { class: "facet-option-count" }, opt.count),
                        ),
                    ),
            ),
        ),
    );
}

function labelText(label, fallback) {
    if (!label) return fallback;
    if (typeof label === "string") return label;
    return label.en || Object.values(label)[0] || fallback;
}
