import { test, expect } from "@playwright/test";
import { DatabaseSync } from "node:sqlite";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

let directory, bytes;
test.beforeAll(() => {
    directory = mkdtempSync(join(tmpdir(), "pihka-published-"));
    const path = join(directory, "fixture.db");
    const db = new DatabaseSync(path);
    db.exec(`
        CREATE TABLE words(id INTEGER PRIMARY KEY, title TEXT);
        INSERT INTO words VALUES(1, 'A to Lighthouse'), (2, 'Other words');
        CREATE VIRTUAL TABLE words_search USING fts5(title, content='words', content_rowid='id', tokenize='unicode61');
        INSERT INTO words_search(words_search) VALUES('rebuild');
        CREATE TABLE fragments(id INTEGER PRIMARY KEY, title TEXT);
        INSERT INTO fragments VALUES(1, 'Lighthouse fragment'), (2, 'Unrelated fragment');
        CREATE VIRTUAL TABLE fragments_search USING fts5(title, content='fragments', content_rowid='id', tokenize='trigram');
        INSERT INTO fragments_search(fragments_search) VALUES('rebuild');
        CREATE VIEW published_view AS SELECT id, title FROM words;
    `);
    db.close();
    bytes = readFileSync(path);
});
test.afterAll(() => rmSync(directory, { recursive: true, force: true }));
test.beforeEach(async ({ page }) => {
    await page.route("**/published.db", route => route.fulfill({ body: bytes }));
    await page.route("**/app/config.json", route => route.fulfill({ json: {
        database: "published.db",
        enginePlugins: [], uiPlugins: [],
        perspectives: [{ id: "published", table: "PUBLISHED_VIEW", query: "SELECT 'replacement' AS title" }],
    } }));
});

for (const readOnly of [false, true]) {
    test(`published relations are reused and only new failed views are dropped, readOnly=${readOnly}`, async ({ page }) => {
        await page.route("**/published.html", route => route.fulfill({ contentType: "text/html", body: `<script type="importmap">{"imports":{"@sqlite.org/sqlite-wasm":"/core/vendor/@sqlite.org/sqlite-wasm/dist/index.mjs"}}</script>` }));
        await page.goto("/published.html");
        const result = await page.evaluate(async readOnly => {
            const { DataSource } = await import("/core/engine/datasource.js");
            const { createPerspectiveViews } = await import("/core/engine/perspective-views.js");
            const ds = new DataSource("/published.db");
            await ds.ready;
            try {
                await ds.exec("CREATE VIEW published_broken AS SELECT * FROM missing_table");
                const before = await ds.exec("SELECT name, sql FROM sqlite_schema ORDER BY name");
                const writes = [];
                const source = { capabilities: { readOnly }, exec(sql, options) {
                    if (!/^SELECT/.test(sql)) {
                        writes.push(sql);
                        if (readOnly) throw new Error("unexpected write");
                    }
                    return ds.exec(sql, options);
                } };
                await createPerspectiveViews(source, { perspectives: [
                    { id: "view", table: "PUBLISHED_VIEW", query: "SELECT 'replacement' AS title" },
                    { id: "table", table: "words", query: "SELECT 'replacement' AS title" },
                    { id: "broken", table: "published_broken", query: "SELECT 1" },
                    { id: "new-broken", table: "new_broken", query: "SELECT * FROM missing_table" },
                    { id: "syntax", table: "syntax_error", query: "not valid SQL" },
                    { id: "new", table: "new_view", query: "SELECT title FROM words" },
                ] });
                const after = await ds.exec("SELECT name, sql FROM sqlite_schema ORDER BY name");
                return {
                    preserved: before.every(row => after.some(r => r.name === row.name && r.sql === row.sql)),
                    rows: await ds.exec("SELECT title FROM published_view ORDER BY id"),
                    added: after.filter(row => !before.some(r => r.name === row.name)).map(r => r.name),
                    writes,
                };
            } finally { await ds.close(); }
        }, readOnly);
        expect(result.preserved).toBe(true);
        expect(result.rows).toEqual([{ title: "A to Lighthouse" }, { title: "Other words" }]);
        expect(result.added).toEqual(readOnly ? [] : ["new_view"]);
        expect(result.writes.filter(sql => sql.startsWith("DROP"))).toEqual(readOnly ? [] : ['DROP VIEW IF EXISTS "new_broken"']);
        if (readOnly) expect(result.writes).toEqual([]);
    });
}

test("download UI reuses a published perspective instead of replacing or dropping it", async ({ page }) => {
    await page.goto("/#/en/published/table");
    await expect(page.locator("section tbody tr")).toHaveCount(2);
    await expect(page.locator("section tbody")).toContainText("A to Lighthouse");
    await expect(page.locator("section tbody")).not.toContainText("replacement");
});

test("mixed published tokenizers search short words without unfiltered trigram groups", async ({ page }) => {
    for (const q of ["a", "to"]) {
        await page.goto(`/#/en/search?q=${q}`);
        await expect(page.locator(".search-results-group")).toHaveCount(1);
        await expect(page.locator(".search-results-group")).toContainText("A to Lighthouse");
        await expect(page.locator(".search-results-summary")).toContainText("1 match");
        await expect(page.locator("main")).not.toContainText("Type at least 3 characters");
        await expect(page.locator(".search-results")).not.toContainText("fragment");
    }
    await page.goto("/#/en/search?q=zz");
    await expect(page.locator("main")).toContainText('No results for “zz”.');
    await page.goto("/#/en/search?q=Lighthouse");
    await expect(page.locator(".search-results-group")).toHaveCount(2);
    await expect(page.locator(".search-results-summary")).toContainText("2 matches");
});

test("short search hint appears when only trigram perspectives are searchable", async ({ page }) => {
    await page.route("**/app/config.json", route => route.fulfill({ json: {
        database: "published.db", enginePlugins: [], uiPlugins: [], tables: { words: { hidden: true } },
    } }));
    await page.goto("/#/en/search?q=to");
    await expect(page.locator("main")).toContainText("Type at least 3 characters to search.");
    await expect(page.locator(".search-results-group")).toHaveCount(0);
});
