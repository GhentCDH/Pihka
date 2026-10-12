// @ts-check
import { registeredComponent } from "../runtime/component-host.js";
import { h } from "preact";
import { useState } from "preact/hooks";
import { useQuery, QueryStatus } from "../runtime/use-query.js";
import { getView, listViews } from "../runtime/view-registry.js";
import { navigate, buildPath } from "../runtime/router.js";
import { localize } from "../runtime/table-config.js";
const DataViewListTable = registeredComponent("view", "table", "list");
const Pagination = registeredComponent("control", "pagination");

const RELATED_PAGE_SIZE = 10;

/**
 * Detail view for a single row with view toggles (table, card, map, plus
 * any registered custom detail views). Below the active view, rows from
 * other tables referencing this one are listed per relation.
 *
 * Props:
 *   tableName     - localized display name of the table (headings)
 *   table         - real (SQL) table name, for store queries
 *   columns       - column schema array
 *   row           - row data object, or null
 *   fkResolved    - FK display name map
 *   related       - reverse-FK relations from store.queryRelated(), each
 *                   with a `perspectiveId` for the child table (or null)
 *   store         - DataStore (related sections page through it)
 *   view          - active view type from URL
 *   lang          - current language code
 *   perspectiveId - perspective id for URL building
 *   rowId         - row id for URL building
 */
export default function DetailView({ tableName, table, columns, row, fkResolved, related = [], store, view, lang, perspectiveId, rowId }) {
    const activeView = view || "table";
    const effectiveLang = lang || "en";

    const availableViews = listViews("detail")
        .filter(d => !d.availableFor || d.availableFor(columns));

    // Unknown detail views (e.g. a list-view id in a detail URL) fall back
    // to the table renderer, leaving the URL untouched.
    const viewDef = getView("detail", activeView) ?? getView("detail", "table");

    const onViewChange = (newView) => {
        navigate(`/${effectiveLang}/${perspectiveId}/${rowId}/${newView}`);
    };

    return h("div", { class: "detail-view" },
        // View toggles
        availableViews.length > 1 && h("div", { class: "view-toggles" },
            availableViews.map(d =>
                h("button", {
                    key: d.id,
                    class: d.id === activeView ? "" : "outline",
                    onClick: () => onViewChange(d.id),
                }, d.icon, " ", d.id),
            ),
        ),

        // Render active view
        !row
            ? h("p", null, "Row not found.")
            : h(viewDef.component, { tableName, table, columns, row, fkResolved, lang: effectiveLang, perspectiveId, store }),

        // Related objects: rows from other tables referencing this one.
        row && related.length > 0 && related.map(rel =>
            h(RelatedSection, { key: `${rel.table}.${rel.column}`, rel, store, lang: effectiveLang }),
        ),
    );
}

/**
 * One reverse-FK relation as a paginated table, fetched through the same
 * queryTable() path the list views use (a fixed multi filter on the
 * relation column), rendered with the same table and pagination components.
 */
function RelatedSection({ rel, store, lang }) {
    const [page, setPage] = useState(0);

    const query = useQuery(
        () => store.queryTable(rel.table, {
            filters: { [rel.column]: { type: "multi", selected: [rel.value] } },
            page,
            pageSize: RELATED_PAGE_SIZE,
        }),
        [store, rel.table, rel.column, rel.value, page],
    );
    if (query.loading || query.error) return h(QueryStatus, { error: query.error });
    const { columns, rows, totalRows, totalPages, fkResolved } = query.data;

    const firstRow = totalRows > 0 ? page * RELATED_PAGE_SIZE + 1 : 0;
    const lastRow = Math.min((page + 1) * RELATED_PAGE_SIZE, totalRows);
    const filterHref = rel.perspectiveId
        ? buildPath(`/${lang}/${rel.perspectiveId}/table?${rel.column}=${encodeURIComponent(rel.value)}`)
        : null;

    return h("section", { class: "detail-related", style: "margin-top:1.5rem" },
        h("h3", { style: "margin-bottom:.5rem" },
            localize(rel.label, lang, rel.table), " ",
            h("small", { style: "color:var(--text-muted);font-weight:normal" }, `(${totalRows})`),
        ),
        h(DataViewListTable, { presentation: "embedded",
            columns,
            rows,
            fkResolved,
            lang,
            perspectiveId: rel.perspectiveId,
        }),
        totalPages > 1 && h("div", { class: "faceted-toolbar", style: "margin-top:.5rem" },
            h(Pagination, { page, totalPages, onPageChange: setPage }),
            h("div", { class: "faceted-info" },
                h("span", { class: "faceted-count" }, `Showing ${firstRow} to ${lastRow} of ${totalRows}`),
                filterHref && h("a", { href: filterHref, class: "text-meta" }, "View all →"),
            ),
        ),
    );
}
