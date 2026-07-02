import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import RangeSelector from "./range-selector.js";
import FtsSearchInput from "./fts-search-input.js";
import MapBoundsFilter from "./map/map-bounds-filter.js";
import { localize } from "../utilities-data/table-config.js";

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
 *   actions        - bundled mutation callbacks from useUrlState plus
 *                    onClearAll/onViewChange (single prop, no drilling)
 */
export default function FacetSidebar({
    facetMeta, autoFilterMeta, filters,
    totalRows, perspectiveName, lang,
    search, searchError, searchAvailable, searchMode, actions,
}) {
    const hasActiveFilters = Object.keys(filters).length > 0 || (search && search.length > 0);

    // Use configured facetMeta if available, otherwise fall back to auto-generated
    const hasFacetMeta = facetMeta && Object.keys(facetMeta).length > 0;

    return h("aside", { class: "facet-sidebar" },
        h("div", { class: "facet-sidebar-header" },
            h("strong", null, "Filters"),
            hasActiveFilters && h("button", {
                class: "outline",
                style: "padding:.2em .6em;font-size:.75em;margin-left:auto",
                onClick: actions.onClearAll,
            }, "Clear all"),
        ),
        h("p", { style: "font-size:.8em;color:var(--text-muted);margin:.2rem 0 .5rem" },
            `${totalRows} ${perspectiveName || "results"}`,
        ),

        h(FtsSearchInput, {
            value: search || "",
            onSubmit: actions.onSearchChange,
            error: searchError,
            available: !!searchAvailable,
            mode: searchMode,
        }),

        hasFacetMeta
            ? renderConfiguredFacets(facetMeta, filters, actions, lang)
            : renderAutoFacets(autoFilterMeta, filters, actions, lang),

        // Location facet: rendered for any table with geo columns, on both
        // the configured and auto paths.
        autoFilterMeta?.geoMeta && h(Fragment, { key: "_viewport" },
            divider("_viewport"),
            h(MapBoundsFilter, {
                geoMeta: autoFilterMeta.geoMeta,
                activeBounds: filters._viewport ?? null,
                onBoundsChange: actions.onBoundsChange,
            }),
        ),
    );
}

function divider(key) {
    return h("hr", { key: `${key}-divider`, class: "facet-divider" });
}

// Each filter is preceded by a divider; the keyed Fragment keeps the pair
// stable across re-renders.
function facetBlock(key, facet) {
    return h(Fragment, { key }, divider(key), facet);
}

function renderConfiguredFacets(facetMeta, filters, actions, lang) {
    return Object.entries(facetMeta).map(([field, meta]) => {
        if (meta.type === "range") {
            const current = filters[field];
            return facetBlock(field, h(RangeSelector, {
                label: localize(meta.label, lang, field),
                min: meta.min,
                max: meta.max,
                currentMin: current?.min ?? null,
                currentMax: current?.max ?? null,
                step: 1,
                onChangeMin: (v) => actions.onRangeChange(field, "min", v),
                onChangeMax: (v) => actions.onRangeChange(field, "max", v),
            }));
        }

        if (meta.type === "dropdown" || meta.type === "checkbox") {
            return facetBlock(field, h(DropdownFacet, {
                label: localize(meta.label, lang, field),
                options: meta.options || [],
                selected: filters[field]?.selected ?? new Set(),
                onChange: (sel) => actions.onMultiChange(field, sel),
            }));
        }

        return null;
    });
}

function renderAutoFacets(autoFilterMeta, filters, actions, lang) {
    if (!autoFilterMeta) return null;
    const { rangeMeta, multiMeta, rangeColumns, multiColumns } = autoFilterMeta;

    return [
        ...multiColumns.map(col =>
            facetBlock(col.name, h(DropdownFacet, {
                label: localize(multiMeta[col.name].label, lang, col.name),
                options: (multiMeta[col.name].options || []).map(o => ({ ...o, count: null })),
                selected: filters[col.name]?.selected ?? new Set(),
                onChange: (sel) => actions.onMultiChange(col.name, sel),
            })),
        ),
        ...rangeColumns.map(col =>
            facetBlock(col.name, h(RangeSelector, {
                label: localize(col.label, lang, col.name),
                min: rangeMeta[col.name].min,
                max: rangeMeta[col.name].max,
                currentMin: filters[col.name]?.min ?? null,
                currentMax: filters[col.name]?.max ?? null,
                step: col.type === "REAL" ? 0.01 : 1,
                onChangeMin: (v) => actions.onRangeChange(col.name, "min", v),
                onChangeMax: (v) => actions.onRangeChange(col.name, "max", v),
            })),
        ),
    ];
}

/**
 * A searchable dropdown facet with optional counts.
 * Novel Echoes / Cinema Belgica style.
 */
function DropdownFacet({ label, options, selected, onChange }) {
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
                onInput: (e) => setSearch(/** @type {HTMLInputElement} */ (e.target).value),
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

