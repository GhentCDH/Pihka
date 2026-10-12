import { test, expect } from "@playwright/test";
import { startBrowserTestServer } from "../scripts/test-browser-server.js";

let server;
test.beforeAll(async () => { server = await startBrowserTestServer(); });
test.afterAll(async () => { await server.close(); });

for (const mode of ["download", "http-vfs"]) {
    test(`${mode}: complete engine lifecycle without UI or Preact`, async ({ page }) => {
        const forbidden = [];
        const modules = [];
        page.on("request", request => modules.push(request.url()));
        await page.route(/\/(?:ui|utilities-ui|components|preact)\//, route => {
            forbidden.push(route.request().url());
            return route.abort();
        });
        await page.goto(`${server.origin}/${mode}/headless.html`);
        const result = await page.evaluate(async mode => {
            const { openDataset } = await import("./core/engine/index.js");
            const plugins = mode === "http-vfs" ? [await import("./extensions/http-vfs/http-vfs-component.js")] : [];
            const session = await openDataset({ databaseUrl: new globalThis.URL("./app/database/fixture.db", window.location.href).href, config: { datasource: { type: mode }, enrichment: { fts: "unicode61" } }, plugins });
            const rows = await session.store.queryTable("works", { sort: { column: "id", direction: "ASC" }, pageSize: 2 });
            const found = await session.store.queryTable("works", { search: "Lighthouse" });
            const author = await session.store.queryRow("authors", 1);
            const related = await session.store.queryRelated("authors", author.row);
            await session.close();
            await session.close();
            let rejectsAfterClose = false;
            try { await session.store.queryTable("works"); } catch { rejectsAfterClose = true; }
            return { titles: rows.rows.map(r => r.title), total: rows.totalRows, found: found.rows.map(r => r.title), related, schema: !!session.schema.tables.works, rejectsAfterClose };
        }, mode);
        expect(result.titles).toEqual(["Mrs Dalloway", "To the Lighthouse"]);
        expect(result.total).toBe(35);
        expect(result.found).toEqual(["To the Lighthouse"]);
        expect(result.related).toEqual(expect.arrayContaining([expect.objectContaining({ table: "works", totalRows: 34 })]));
        expect(result.schema).toBe(true);
        expect(result.rejectsAfterClose).toBe(true);
        expect(forbidden).toEqual([]);
        if (mode === "http-vfs") expect(modules.some(url => url.endsWith("/core/engine/datasource.js"))).toBe(false);
        else expect(modules.some(url => url.includes("/extensions/http-vfs/"))).toBe(false);
        const requests = server.requests.filter(r => r.path === `/${mode}/app/database/fixture.db` && r.method === "GET");
        expect(requests.length).toBeGreaterThan(0);
        if (mode === "http-vfs") {
            expect(requests.every(r => r.range && r.status === 206)).toBe(true);
        } else {
            expect(requests.every(r => !r.range && r.status === 200)).toBe(true);
        }
    });
}

test("omitted datasource downloads, creates transient views/FTS and isolates sessions", async ({ page }) => {
    await page.goto(`${server.origin}/download/headless.html`);
    const result = await page.evaluate(async () => {
        const { openDataset } = await import("./core/engine/index.js");
        const databaseUrl = new globalThis.URL("./app/database/fixture.db", window.location.href).href;
        const first = await openDataset({ databaseUrl, config: {
            enrichment: { fts: "unicode61" },
            perspectives: [{ id: "runtime", table: "runtime_view", query: "SELECT id, name FROM authors" }],
        } });
        const second = await openDataset({ databaseUrl, config: { enrichment: { fts: false } } });
        try {
            const runtime = await first.store.queryTable("runtime_view");
            const enriched = await first.store.queryTable("authors", { search: "Virginia" });
            const untouched = !second.schema.tables.runtime_view && !second.store.getFtsInfo("authors");
            const frozen = Object.isFrozen(first.schema) && Object.isFrozen(first.schema.tables.authors.columns[0]);
            await first.close();
            const surviving = await second.store.queryTable("works");
            return { runtime: runtime.totalRows, enriched: enriched.rows.map(r => r.name), untouched, frozen, surviving: surviving.totalRows };
        } finally { await first.close(); await second.close(); }
    });
    expect(result).toEqual({ runtime: 2, enriched: ["Virginia Woolf"], untouched: true, frozen: true, surviving: 35 });
});
