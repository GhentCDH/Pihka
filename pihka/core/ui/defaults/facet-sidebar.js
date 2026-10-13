// @ts-check
import { registeredComponent, ComponentHost, useRegistry } from "../runtime/component-host.js";
import { h, Fragment } from "preact";
import { useState } from "preact/hooks";

const FtsSearchInput = registeredComponent("control", "search");
import { normalizeFacets } from "../runtime/facets.js";


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
    totalRows, perspectiveName, lang, loading = false,
    search, searchError, searchAvailable, searchMode, actions,
}) {
    const hasActiveFilters = Object.keys(filters).length > 0 || (search && search.length > 0);

    const descriptors = normalizeFacets({facetMeta,autoFilterMeta,filters,actions,lang},useRegistry())
        .filter(d => d.placement !== "top");

    return h("aside", { class: "facet-sidebar" },
        h("div", { class: "facet-header facet-sidebar-header" },
            h("strong", null, "Filters"),
            hasActiveFilters && h("button", {
                class: "outline",
                onClick: actions.onClearAll,
            }, "Clear all"),
        ),
        h("p", { class: "text-meta", style: "margin:.2rem 0 .5rem" },
            loading ? "Loading results..." : `${totalRows} ${perspectiveName || "results"}`,
        ),

        h(FtsSearchInput, {
            value: search || "",
            onSubmit: actions.onSearchChange,
            error: searchError,
            available: !!searchAvailable,
            mode: searchMode,
        }),

        ...descriptors.map(d => h(Fragment, {key:d.id},
            h("hr", {class:"facet-divider"}),
            h(ComponentHost, {...d.props, kind:"facet",id:d.renderer}),
        )),
    );
}

// Long option lists render as an autocomplete: only this many options go
// into the panel DOM; the search box narrows the list. Selected options are
// always shown so they can be unticked without retyping the search.
const MAX_VISIBLE_OPTIONS = 100;

/**
 * A searchable dropdown facet with optional counts.
 * Novel Echoes / Cinema Belgica style.
 */
export function DropdownFacet({ label, options, selected, onChange }) {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const filtered = search
        ? options.filter(o => o.display.toLowerCase().includes(search.toLowerCase()))
        : options;

    const selectedValues = new Set(selected);
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
                    ? h("div", { class: "text-meta", style: "padding:.5rem" }, "No matches")
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

