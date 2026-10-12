import { test, expect } from "@playwright/test";
import { startBrowserTestServer } from "../scripts/test-browser-server.js";

let server;
test.beforeAll(async () => { server = await startBrowserTestServer(); });
test.afterAll(async () => { await server.close(); });

test("download and real HTTP VFS return equivalent query, relation and export values", async ({ page }) => {
    const results = [];
    for (const mode of ["download", "http-vfs"]) {
        await page.goto(`${server.origin}/${mode}/headless.html`);
        results.push(await page.evaluate(async mode => {
            const { openDataset } = await import("./core/engine/index.js");
            const plugins = mode === "http-vfs" ? [await import("./extensions/http-vfs/http-vfs-component.js")] : [];
            plugins.push(await import("./extensions/geo-filter/geo-filter-engine.js"));
            const session = await openDataset({ databaseUrl: new globalThis.URL("./app/database/fixture.db", window.location.href).href, config: { datasource: { type: mode }, enrichment: { fts: "unicode61" } }, plugins });
            try {
                const store = session.store;
                const sorted = { sort: { column: "id", direction: "ASC" } };
                const filters = { author_id: { type: "multi", selected: [1] }, year: { type: "range", min: 1920, max: 1930 } };
                const filterMeta = await store.getFilterMeta("works");
                const m2m = { category_id: { ...filterMeta.m2mMeta.category_id.filter, selected: [2] } };
                const all = await store.queryTable("works", { ...sorted, pageSize: null });
                const filtered = await store.queryTable("works", { ...sorted, filters });
                const roundtripped = await store.queryTable("works", { ...sorted, filters: JSON.parse(JSON.stringify(filters)) });
                const junction = await store.queryTable("works", { ...sorted, filters: JSON.parse(JSON.stringify(m2m)) });
                const pageTwo = await store.queryTable("works", { ...sorted, page: 1, pageSize: 2 });
                const search = await store.queryTable("works", { ...sorted, search: "Lighthouse" });
                const view = await store.queryTable("published_view", sorted);
                const bounded = await store.queryTable("authors", { ...sorted, filters: { _viewport: { type: "bounds", latCol: "lat", lonCol: "lon", minLat: 51, maxLat: 52, minLon: -1, maxLon: 1 } } });
                const author = await store.queryRow("authors", 1);
                const related = await store.queryRelated("authors", author.row);
                const counts = await store.queryFacetCounts("works", "author_id");
                // Raw JSON export is the same all-rows contract used by the export view.
                const exported = JSON.stringify(all.rows);
                const clean = r => ({ rows: r.rows, totalRows: r.totalRows, page: r.page, totalPages: r.totalPages, fkResolved: r.fkResolved });
                return { all: clean(all), filtered: clean(filtered), roundtripped: clean(roundtripped), junction: clean(junction), pageTwo: clean(pageTwo), search: clean(search), view: clean(view), bounded: clean(bounded), author, related, counts, exported };
            } finally { await session.close(); }
        }, mode));
    }
    expect(results[1]).toEqual(results[0]);
    expect(results[0].all.totalRows).toBe(35);
    expect(results[0].filtered).toEqual(results[0].roundtripped);
    expect(results[0].filtered.totalRows).toBe(13);
    expect(results[0].junction.rows.map(r => r.title)).toEqual(["Ulysses"]);
    expect(results[0].pageTwo.rows.map(r => r.id)).toEqual([3, 4]);
    expect(results[0].search.rows.map(r => r.title)).toEqual(["To the Lighthouse"]);
    expect(results[0].bounded.rows.map(r => r.name)).toEqual(["Virginia Woolf"]);
    expect(results[0].view.totalRows).toBe(35);
    expect(JSON.parse(results[0].exported)).toHaveLength(35);
});
