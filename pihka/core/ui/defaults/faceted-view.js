// @ts-check
import { registeredComponent, useRegistry } from "../runtime/component-host.js";
import { h } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { useQuery, QueryStatus } from "../runtime/use-query.js";
import { normalizeFacets } from "../runtime/facets.js";
import { FacetBlock } from "./facet-sidebar.js";
const FacetSidebar = registeredComponent("control", "facets");
const Pagination = registeredComponent("control", "pagination");
import { getView } from "../runtime/view-registry.js";
import { localize } from "../runtime/table-config.js";
import { useUrlState } from "../runtime/use-url-state.js";
import { navigate, useRouter } from "../runtime/router.js";
import { setPref } from "../runtime/prefs.js";
import { t, rangeLabel } from "../runtime/strings.js";

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
        search, searchError, actions, loading, error,
    } = useUrlState(store, p.table, {
        defaultPageSize, defaultSort, facets: p.facets, perspectiveId: p.id,
    });

    const ftsInfo = store.getFtsInfo(p.table);
    const searchAvailable = !!ftsInfo;

    const facetQuery = useQuery(() => {
        if (!p.facets) return null;
        return store.getFacetMeta(p.table, p.facets, filters);
    }, [store, p.table, p.facets, filtersKey]);

    // Non-paginated views (e.g. the map) show every row matching the
    // current filters, not just the current page, so they need their own
    // unpaginated query. Unordered views (e.g. the map) skip the sort: an
    // index-ordered scan over a large table turns into random page reads,
    // which are slow through HTTP range requests.
    const needsAllRows = !!viewDef && !viewDef.paginated;
    const allSort = viewDef?.ordered === false ? null : sort;
    const allQuery = useQuery(async () => {
        if (!needsAllRows) return null;
        return (await store.queryTable(p.table, { filters, sort: allSort, search, pageSize: null })).rows;
    }, [needsAllRows, store, p.table, filtersKey, allSort?.column, allSort?.direction, search], !loading && !error);

    // Page changes from the keyboard or the bottom pager land at the top of
    // the results. Only scrolls when the heading has scrolled out of view.
    const headingRef = useRef(null);
    const goToPage = (n) => {
        actions.onPageChange(n);
        const el = headingRef.current;
        if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: "start" });
    };

    // ← / → page through the main list. Arrow keys are not character keys,
    // so no off switch is needed (WCAG 2.1.4); modified arrows (browser
    // back/forward, text selection) and controls that use arrows themselves
    // are left alone.
    const keyPaging = !!viewDef?.paginated && totalPages > 1;
    useEffect(() => {
        if (!keyPaging) return;
        const onKeyDown = (e) => {
            if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
            if (e.defaultPrevented || e.isComposing || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
            const target = /** @type {HTMLElement} */ (e.target);
            if (typeof target?.closest === "function" && target.closest("input, select, textarea, [contenteditable]:not([contenteditable=false]), [role=slider], [role=listbox], [role=combobox], [role=menu], [role=tablist], canvas")) return;
            const next = e.key === "ArrowLeft" ? page - 1 : page + 1;
            if (next < 0 || next > totalPages - 1) return;
            e.preventDefault();
            goToPage(next);
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    });

    const { params } = useRouter();
    const registry = useRegistry();
    if (error || facetQuery.error || allQuery.error) return h(QueryStatus, { error: error || facetQuery.error || allQuery.error });
    const pending = loading || facetQuery.loading || allQuery.loading;
    const facetMeta = facetQuery.data ?? facetQuery.previousData;
    const allRows = allQuery.data ?? allQuery.previousData;

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
    // Supplemental facets placed "top" render in a row above the results;
    // the sidebar renders the rest.
    const topFacets = normalizeFacets(
        { facetMeta, autoFilterMeta: filterMeta, filters, actions: viewActions, lang },
        registry,
    ).filter(d => d.placement === "top");

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
            loading: pending,
            perspectiveName: localize(p.label, lang, p.name),
            lang,
            search,
            searchError,
            searchAvailable,
            searchMode: ftsInfo?.mode,
            actions: viewActions,
        }),

        h("div", { class: "faceted-content", "aria-busy": pending },
            pending && h(QueryStatus, {}),
            h("div", { class: "faceted-toolbar", style: pending ? "visibility:hidden" : "" },
                // Page title and result count
                h("div", { class: "faceted-heading", ref: headingRef },
                    h("h1", null, localize(p.label, lang, p.name)),
                    h("span", { class: "faceted-count" },
                        totalRows === 0
                            ? t("results.none", lang)
                            : paginatedView
                                ? rangeLabel(firstRow, lastRow, totalRows, lang)
                                : t("results.count", lang, { n: new Intl.NumberFormat(lang || undefined).format(totalRows) }),
                    ),
                ),

                // View switcher (text tabs) + export
                p.allowed_views && p.allowed_views.length > 1 && h("div", { class: "view-toggles" },
                    p.allowed_views.map(v =>
                        h("button", {
                            key: v,
                            class: v === activeView ? "" : "outline",
                            "aria-pressed": v === activeView ? "true" : "false",
                            onClick: () => onViewChange(v),
                        }, getView("list", v)?.icon ?? "", " ", v),
                    ),
                ),
            ),

            // Top-placed facets stay visible while results load.
            topFacets.length > 0 && h("div", { class: "faceted-top-facets" },
                topFacets.map(d => h(FacetBlock, { key: d.id, descriptor: d, filters, actions: viewActions, lang })),
            ),

            // Active view
            h("section", { id: p.table, style: pending ? "visibility:hidden" : "", "aria-hidden": pending ? "true" : null },
                renderView(viewDef, activeView, {
                    id: p.id,
                    name: p.table,
                    perspectiveId: p.id,
                    columns,
                    rows: paginatedView ? rows : (allRows ?? rows),
                    sort, onSort: actions.onSort, fkResolved, lang, store,
                    options: p.options,
                }, totalRows),
            ),

            // Pagination + page size live below the results
            paginatedView && totalRows > Math.min(25, pageSize) && h("div", { class: "faceted-footer", style: pending ? "visibility:hidden" : "" },
                showPagination ? h(Pagination, { page, totalPages, onPageChange: goToPage, lang, keyboard: true }) : h("span", null),
                h("select", {
                    value: pageSize,
                    "aria-label": "Rows per page",
                    onChange: (e) => actions.onPageSizeChange(parseInt(/** @type {HTMLSelectElement} */ (e.target).value, 10)),
                    class: "faceted-pagesize",
                },
                    // Keep the current size selectable when it came from the URL,
                    // a stored pref or the perspective's page_size config.
                    [...new Set([25, 50, 100, 1000, pageSize])].sort((a, b) => a - b).map(n =>
                        h("option", { key: n, value: n }, n),
                    ),
                ),
            ),
        ),
    );
}

function renderView(viewDef, activeView, viewProps, totalRows) {
    if (totalRows === 0) return h("p", null, "No results match your filters.");
    if (!viewDef) return h("p", null, `Unknown view: ${activeView}`);
    return h(viewDef.component, viewProps);
}
