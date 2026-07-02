import { h } from "preact";
import { useMemo } from "preact/hooks";
import DataViewListTable from "./data-views/data-view-list-table.js";
import { buildPath } from "../utilities-ui/router.js";
import { localize } from "../utilities-data/table-config.js";

const GROUP_LIMIT = 5;

/**
 * Global search results: one section per searchable entity, each a small
 * rank-ordered table of the top matches with a link to the fully filtered
 * per-table list view. Searchable = perspectives whose backing table has
 * an FTS index (SQL-view perspectives and hidden tables drop out).
 */
export default function SearchView({ perspectives, store, lang, query }) {
    const q = (query || "").trim();

    const searchable = perspectives.filter(p => store.getFtsInfo(p.table));

    // Trigram tokens need >= 3 characters; without this gate every group
    // would fall back to its unfiltered row set (data-store's guard).
    const tooShort = q.length > 0 && q.length < 3
        && searchable.some(p => store.getFtsInfo(p.table).mode === "trigram");

    const groups = useMemo(() => {
        if (!q || tooShort) return [];
        return searchable
            .map(p => ({ p, result: store.queryTable(p.table, { search: q, pageSize: GROUP_LIMIT }) }))
            .filter(g => g.result.totalRows > 0 || g.result.searchError);
    }, [store, q, tooShort]);

    if (searchable.length === 0) return h("p", null, "Search is not enabled for this site.");
    if (!q) return h("p", null, "Type a search above to look across all tables.");
    if (tooShort) return h("p", null, "Type at least 3 characters to search.");

    const searchError = groups.find(g => g.result.searchError)?.result.searchError;
    if (searchError) return h("p", { class: "fts-error" }, searchError);

    if (groups.length === 0) {
        return h("p", null, `No results for “${q}”.`);
    }

    const totalMatches = groups.reduce((n, g) => n + g.result.totalRows, 0);

    return h("div", { class: "search-results" },
        h("p", { class: "search-results-summary" },
            `${totalMatches} ${totalMatches === 1 ? "match" : "matches"} for “${q}” `
            + `in ${groups.length} of ${searchable.length} searchable tables`,
        ),
        groups.map(({ p, result }) => {
            const name = localize(p.label, lang, p.name);
            const listUrl = buildPath(`/${lang}/${p.id}/table`)
                + "?" + new URLSearchParams({ q });
            return h("section", { key: p.id, class: "search-results-group" },
                h("h3", null,
                    h("a", { href: listUrl }, name),
                    h("small", null, ` — ${result.totalRows} ${result.totalRows === 1 ? "match" : "matches"}`),
                ),
                h(DataViewListTable, {
                    columns: result.columns,
                    rows: result.rows,
                    fkResolved: result.fkResolved,
                    lang,
                    perspectiveId: p.id,
                }),
                result.totalRows > GROUP_LIMIT && h("a", { class: "search-results-more", href: listUrl },
                    `View all ${result.totalRows} matches`,
                ),
            );
        }),
    );
}
