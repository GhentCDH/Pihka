import { h } from "preact";
import { useMemo } from "preact/hooks";
import FacetSidebar from "./facet-sidebar.js";
import Pagination from "./pagination.js";
import { getView } from "../utilities-ui/view-registry.js";
import { localize } from "../utilities-data/table-config.js";
import { useUrlState } from "../utilities-ui/use-url-state.js";
import { navigate, useRouter } from "../utilities-ui/router.js";
import { setPref } from "../utilities-ui/prefs.js";

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
    const viewDef = getView("list", activeView);
    const defaultPageSize = p.page_size ?? 25;
    const defaultSort = p.default_sort ?? null;

    const {
        columns, rows, totalRows, page, totalPages, pageSize,
        sort, filterMeta, filters, filtersKey, fkResolved,
        search, searchError, actions,
    } = useUrlState(store, p.table, {
        defaultPageSize, defaultSort, facets: p.facets, perspectiveId: p.id,
    });

    const ftsInfo = store.getFtsInfo(p.table);
    const searchAvailable = !!ftsInfo;

    const facetMeta = useMemo(() => {
        if (!p.facets) return null;
        return store.getFacetMeta(p.table, p.facets, filters);
    }, [store, p.table, p.facets, filtersKey]);

    // Non-paginated views (e.g. the map) show every row matching the
    // current filters, not just the current page, so they need their own
    // unpaginated query.
    const needsAllRows = !!viewDef && !viewDef.paginated;
    const allRows = useMemo(() => {
        if (!needsAllRows) return null;
        return store.queryTable(p.table, { filters, sort, search, pageSize: null }).rows;
    }, [needsAllRows, store, p.table, filtersKey, sort?.column, sort?.direction, search]);

    const { params } = useRouter();

    const onClearAll = () => {
        navigate(`/${lang || "en"}/${p.id}/${activeView}`);
    };

    const onViewChange = (newView) => {
        // Remember the choice for future visits to this perspective.
        setPref(`view:${p.id}`, newView);
        navigate(`/${lang || "en"}/${p.id}/${newView}`, params);
    };

    // One object for everything views/sidebar can do — no per-callback
    // prop drilling.
    const viewActions = { ...actions, onClearAll, onViewChange };

    const firstRow = totalRows > 0 ? page * pageSize + 1 : 0;
    const lastRow = Math.min((page + 1) * pageSize, totalRows);
    const paginatedView = viewDef?.paginated ?? false;
    const showPagination = paginatedView && totalPages > 1;

    return h("div", { class: "faceted-view" },
        h(FacetSidebar, {
            facetMeta,
            autoFilterMeta: filterMeta,
            filters,
            totalRows,
            perspectiveName: localize(p.label, lang, p.name),
            lang,
            search,
            searchError,
            searchAvailable,
            searchMode: ftsInfo?.mode,
            actions: viewActions,
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
                            onClick: () => onViewChange(v),
                        }, getView("list", v)?.icon ?? "", " ", v),
                    ),
                ),

                // Pagination (inline, compact)
                showPagination && h(Pagination, { page, totalPages, onPageChange: actions.onPageChange }),

                // Result count + page size selector
                h("div", { class: "faceted-info" },
                    h("span", { class: "faceted-count" },
                        totalRows === 0
                            ? "No results"
                            : paginatedView
                                ? `Showing ${firstRow} to ${lastRow} of ${totalRows}`
                                : `${totalRows} results`,
                    ),
                    paginatedView && h("select", {
                        value: pageSize,
                        onChange: (e) => actions.onPageSizeChange(parseInt(/** @type {HTMLSelectElement} */ (e.target).value, 10)),
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
                renderView(viewDef, activeView, {
                    id: p.id,
                    name: p.table,
                    perspectiveId: p.id,
                    columns,
                    rows: paginatedView ? rows : (allRows ?? rows),
                    sort, onSort: actions.onSort, fkResolved, lang,
                }, totalRows),
            ),
        ),
    );
}

function renderView(viewDef, activeView, viewProps, totalRows) {
    if (totalRows === 0) return h("p", null, "No results match your filters.");
    if (!viewDef) return h("p", null, `Unknown view: ${activeView}`);
    return h(viewDef.component, viewProps);
}

