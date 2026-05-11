import { h } from "preact";
import { useMemo } from "preact/hooks";
import FacetSidebar from "./facet-sidebar.js";
import DataViewListTable from "./data-views/data-view-list-table.js";
import DataViewListCards from "./data-views/data-view-list-cards.js";
import DataViewListMap from "./data-views/data-view-list-map.js";
import { useUrlState } from "../utilities/use-url-state.js";
import { navigate } from "../utilities/router.js";

/**
 * Top-level faceted view layout: sidebar on the left, content on the right.
 *
 * Props:
 *   perspective - Perspective config object
 *   store       - DataStore instance
 *   view        - Active view type from URL
 *   lang        - Current language code
 */
export default function FacetedView({ perspective: p, store, view, lang }) {
    const activeView = view || p.default_view || "table";
    const defaultPageSize = p.page_size ?? 25;
    const defaultSort = p.default_sort ?? null;

    const {
        columns, rows, totalRows, page, totalPages, pageSize,
        sort, filterMeta, filters, fkResolved,
        onSort, onRangeChange, onMultiChange, onPageChange, onPageSizeChange,
    } = useUrlState(store, p.table, { defaultPageSize, defaultSort });

    const facetMeta = useMemo(() => {
        if (!p.facets) return null;
        return store.getFacetMeta(p.table, p.facets, filters);
    }, [store, p.table, p.facets, filters]);

    const onClearAll = () => {
        navigate(`/${lang || "en"}/${p.id}/${activeView}`);
    };

    const onViewChange = (newView) => {
        const params = new URLSearchParams(window.location.search);
        const qs = params.toString();
        navigate(`/${lang || "en"}/${p.id}/${newView}${qs ? "?" + qs : ""}`);
    };

    const firstRow = totalRows > 0 ? page * pageSize + 1 : 0;
    const lastRow = Math.min((page + 1) * pageSize, totalRows);
    const paginatedView = activeView === "table" || activeView === "cards";
    const showPagination = paginatedView && totalPages > 1;

    return h("div", { class: "faceted-view" },
        h(FacetSidebar, {
            facetMeta,
            autoFilterMeta: filterMeta,
            filters,
            totalRows,
            perspectiveName: p.name,
            onRangeChange,
            onMultiChange,
            onClearAll,
        }),

        h("div", { class: "faceted-content" },
            // Top bar: view toggles | pagination | result count | page size
            h("div", { class: "faceted-toolbar" },
                // View toggles
                p.allowed_views && p.allowed_views.length > 1 && h("div", { class: "view-toggles" },
                    p.allowed_views.map(v =>
                        h("button", {
                            key: v,
                            class: v === activeView ? "" : "outline",
                            style: "padding:.3em .7em;font-size:.8em",
                            onClick: () => onViewChange(v),
                        }, viewIcon(v), " ", v),
                    ),
                ),

                // Pagination (inline, compact)
                showPagination && h("nav", {
                    "aria-label": "Pagination",
                    class: "faceted-pagination",
                },
                    h("button", { disabled: page === 0, onClick: () => onPageChange(0) }, "\u00AB"),
                    h("button", { disabled: page === 0, onClick: () => onPageChange(page - 1) }, "\u2039"),
                    ...pageButtons(page, totalPages).map(p =>
                        p === "..."
                            ? h("span", { key: `e-${Math.random()}`, class: "pagination-ellipsis" }, "\u2026")
                            : h("button", {
                                key: p,
                                onClick: () => onPageChange(p),
                                class: p === page ? "pagination-active" : "",
                            }, String(p + 1)),
                    ),
                    h("button", { disabled: page >= totalPages - 1, onClick: () => onPageChange(page + 1) }, "\u203A"),
                    h("button", { disabled: page >= totalPages - 1, onClick: () => onPageChange(totalPages - 1) }, "\u00BB"),
                ),

                // Result count + page size selector
                h("div", { class: "faceted-info" },
                    h("span", { class: "faceted-count" },
                        totalRows > 0
                            ? `Showing ${firstRow} to ${lastRow} of ${totalRows}`
                            : "No results",
                    ),
                    paginatedView && h("select", {
                        value: pageSize,
                        onChange: (e) => onPageSizeChange(parseInt(e.target.value, 10)),
                        class: "faceted-pagesize",
                    },
                        [3, 10, 25, 50, 100, 1000].map(n =>
                            h("option", { key: n, value: n }, n),
                        ),
                    ),
                ),
            ),

            // Active view
            h("section", { id: p.table },
                renderView(activeView, { p, columns, rows, sort, onSort, totalRows, fkResolved, lang }),
            ),
        ),
    );
}

function renderView(activeView, { p, columns, rows, sort, onSort, totalRows, fkResolved, lang }) {
    if (totalRows === 0) return h("p", null, "No results match your filters.");

    if (activeView === "table") {
        return h(DataViewListTable, { name: p.table, columns, rows, sort, onSort, fkResolved, lang, perspectiveId: p.id });
    }
    if (activeView === "cards") {
        return h(DataViewListCards, { id: p.id, name: p.table, columns, rows, fkResolved, lang });
    }
    if (activeView === "map") {
        return h(DataViewListMap, {
            id: p.id, name: p.table, columns, rows, fkResolved, lang, perspectiveId: p.id,
        });
    }
    return h("p", null, `Unknown view: ${activeView}`);
}

function viewIcon(view) {
    const icons = { table: "\u2630", cards: "\u2B1A", map: "\uD83C\uDF0D" };
    return icons[view] || "";
}

function pageButtons(current, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i);
    const pages = new Set([0, 1, total - 2, total - 1, current - 1, current, current + 1]);
    const sorted = [...pages].filter(p => p >= 0 && p < total).sort((a, b) => a - b);
    const result = [];
    for (let i = 0; i < sorted.length; i++) {
        if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("...");
        result.push(sorted[i]);
    }
    return result;
}
