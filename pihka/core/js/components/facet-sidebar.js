import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import RangeSelector from "./range-selector.js";
import FtsSearchInput from "./fts-search-input.js";
import { listFacetRenderers } from "../utilities-ui/facet-renderers.js";
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
        h("div", { class: "facet-header facet-sidebar-header" },
            h("strong", null, "Filters"),
            hasActiveFilters && h("button", {
                class: "outline",
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

        // Registered facet renderers (extensions/app): rendered for any
        // table they declare themselves available for, on both the
        // configured and auto paths.
        ...listFacetRenderers()
            .filter(r => !r.availableFor || r.availableFor(autoFilterMeta))
            .map(r => h(Fragment, { key: r.id },
                divider(r.id),
                h(r.component, { autoFilterMeta, filters, actions, lang }),
            )),
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
    // Defaults guard against extension filterMeta hooks that reshape the
    // metadata — a missing entry must not take the whole sidebar down.
    const {
        rangeMeta, multiMeta, rangeColumns, multiColumns,
        m2mMeta = {}, m2mColumns = [],
    } = autoFilterMeta;

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
        // Many-to-many facets through detected junction tables. The meta's
        // `filter` descriptor is opaque to the UI — it is passed through to
        // the generic onFilterChange, like the geo-filter's bounds filter.
        ...m2mColumns.map(col =>
            facetBlock(col.name, h(DropdownFacet, {
                label: localize(m2mMeta[col.name].label, lang, col.name),
                options: (m2mMeta[col.name].options || []).map(o => ({ ...o, count: null })),
                selected: filters[col.name]?.selected ?? new Set(),
                onChange: (sel) => actions.onFilterChange(col.name,
                    sel.size ? { ...m2mMeta[col.name].filter, selected: sel } : null),
            })),
        ),
    ];
}

// Long option lists render as an autocomplete: only this many options go
// into the panel DOM; the search box narrows the list. Selected options are
// always shown so they can be unticked without retyping the search.
const MAX_VISIBLE_OPTIONS = 100;

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

    // Autocomplete cap: render at most MAX_VISIBLE_OPTIONS matches, with
    // selected options prepended when they fall outside the visible slice.
    const truncated = filtered.length > MAX_VISIBLE_OPTIONS;
    let visible = truncated ? filtered.slice(0, MAX_VISIBLE_OPTIONS) : filtered;
    if (truncated && hasSelection) {
        const shown = new Set(visible.map(o => o.value));
        const missingSelected = options.filter(o => selectedValues.has(o.value) && !shown.has(o.value));
        visible = [...missingSelected, ...visible];
    }

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
        h("label", { class: "facet-label" }, label),
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
                    : visible.map(opt =>
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
                truncated && h("div", { class: "facet-options-truncated" },
                    `Showing ${MAX_VISIBLE_OPTIONS} of ${filtered.length} — type to narrow`,
                ),
            ),
        ),
    );
}

