import { h } from "preact";
import { useQuery, QueryStatus } from "../utilities-ui/use-query.js";
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

    // Omit short trigram searches, which would return unfiltered rows,
    // without suppressing whole-word searches on other tables.
    const eligible = searchable.filter(p => q.length >= 3
        || store.getFtsInfo(p.table).mode !== "trigram");
    const tooShort = q.length > 0 && eligible.length === 0;

    const groupQuery = useQuery(async () => {
        if (!q || tooShort) return [];
        return (await Promise.all(eligible
            .map(async p => ({ p, result: await store.queryTable(p.table, { search: q, pageSize: GROUP_LIMIT }) }))))
            .filter(g => g.result.totalRows > 0 || g.result.searchError);
    }, [store, q, tooShort, perspectives]);

    if (searchable.length === 0) return h("p", null, "Search is not enabled for this site.");
    if (!q) return h("p", null, "Type a search above to look across all tables.");
    if (tooShort) return h("p", null, "Type at least 3 characters to search.");
    if (groupQuery.loading || groupQuery.error) return h(QueryStatus, { error: groupQuery.error });
    const groups = groupQuery.data;

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
