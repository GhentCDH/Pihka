import { test, expect } from "@playwright/test";
import { DatabaseSync } from "node:sqlite";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

let directory, bytes;
test.beforeAll(() => {
    directory = mkdtempSync(join(tmpdir(), "pihka-contract-"));
    const path = join(directory, "fixture.db");
    const db = new DatabaseSync(path);
    db.exec("CREATE TABLE docs(id INTEGER PRIMARY KEY, title TEXT, body TEXT); INSERT INTO docs VALUES(1, 'Lighthouse blue', 'secretword'), (2, 'Other title', 'unlisted');");
    db.close();
    bytes = readFileSync(path);
});
test.afterAll(() => rmSync(directory, { recursive: true, force: true }));
test.beforeEach(async ({ page }) => {
    await page.route("**/contract.db", route => route.fulfill({ body: bytes }));
    await page.route("**/contract.html", route => route.fulfill({ contentType: "text/html", body: `<script type="importmap">{"imports":{"@sqlite.org/sqlite-wasm":"/core/vendor/@sqlite.org/sqlite-wasm/dist/index.mjs"}}</script>` }));
    await page.goto("/contract.html");
});

test("download exec: portable rows, binds, callbacks and early termination", async ({ page }) => {
    const result = await page.evaluate(async () => {
        const { DataSource } = await import("/core/engine/datasource.js");
        const ds = new DataSource("/contract.db");
        await ds.ready;
        try {
            const object = await ds.exec("SELECT title FROM docs WHERE id = ?", { bind: [1] });
            const array = await ds.exec("SELECT title FROM docs WHERE id = $id", { bind: { $id: 2 }, rowMode: "array" });
            const delivered = [], arities = [];
            const stopped = await ds.exec("SELECT id FROM docs ORDER BY id; SELECT 3 AS id", { callback(...args) {
                delivered.push(args[0]);
                arities.push(args.length);
                return false;
            } });
            // A second step would evaluate overflowing abs(), so this proves
            // the downloader stops SQLite execution, not just row delivery.
            const early = await ds.exec("SELECT 1 AS n UNION ALL SELECT abs(-9223372036854775808)", { rowMode: "array", callback: () => false });
            let invalid = false, thrown = false;
            try { await ds.exec("SELECT 1", { rowMode: "stmt" }); } catch (e) { invalid = /rowMode/.test(e.message); }
            try { await ds.exec("SELECT 1", { callback: () => { throw new Error("callback failure"); } }); } catch (e) { thrown = /callback failure/.test(e.message); }
            const after = await ds.exec("SELECT 2 AS n", { callback: () => 0 });
            return { object, array, stopped, delivered, arities, early, invalid, thrown, after };
        } finally { await ds.close(); }
    });
    expect(result).toEqual({ object: [{ title: "Lighthouse blue" }], array: [["Other title"]], stopped: [{ id: 1 }], delivered: [{ id: 1 }], arities: [1], early: [[1]], invalid: true, thrown: true, after: [{ n: 2 }] });
});

for (const detail of ["none", "column", "full"]) {
    for (const readOnly of [false, true]) {
        test(`published FTS detail=${detail}, readOnly=${readOnly}`, async ({ page }) => {
            const result = await page.evaluate(async ({ detail, readOnly }) => {
                const { DataSource } = await import("/core/engine/datasource.js");
                const { fts5Plugin } = await import("/core/engine/enrichment/fts5.js");
                const { DataStore } = await import("/core/engine/data-store.js");
                const ds = new DataSource("/contract.db");
                await ds.ready;
                const warnings = [], warn = console.warn;
                console.warn = (...args) => warnings.push(args.join(" "));
                try {
                    await ds.exec(`CREATE VIRTUAL TABLE docs_fts USING fts5(title, content='docs', content_rowid='id', tokenize='trigram', detail=${detail}); INSERT INTO docs_fts(docs_fts) VALUES('rebuild')`);
                    const meta = await ds.metadata();
                    const source = { capabilities: { readOnly }, exec: (sql, options) => {
                        if (readOnly && !/^SELECT/.test(sql)) throw new Error("unexpected write");
                        return ds.exec(sql, options);
                    } };
                    await fts5Plugin(source, meta, {});
                    const store = new DataStore(ds, meta);
                    const info = store.getFtsInfo("docs");
                    const matches = info ? (await store.queryTable("docs", { search: '"Lighthouse blue"' })).totalRows : null;
                    return { info, matches, warnings };
                } finally { console.warn = warn; await ds.close(); }
            }, { detail, readOnly });
            if (detail !== "full") expect(result.warnings.join(" ")).toContain(`unsupported detail=${detail}`);
            if (readOnly && detail !== "full") expect(result.info).toBeNull();
            else {
                expect(result.info.table).toBe(detail === "full" ? "docs_fts" : "docs_fts_1");
                expect(result.matches).toBe(1);
            }
        });
    }
}

for (const readOnly of [false, true]) {
    test(`published FTS excluded column, readOnly=${readOnly}`, async ({ page }) => {
        const result = await page.evaluate(async readOnly => {
            const { DataSource } = await import("/core/engine/datasource.js");
            const { fts5Plugin } = await import("/core/engine/enrichment/fts5.js");
            const { DataStore } = await import("/core/engine/data-store.js");
            const ds = new DataSource("/contract.db");
            await ds.ready;
            try {
                await ds.exec("CREATE VIRTUAL TABLE docs_fts USING fts5(title, body, content='docs', content_rowid='id'); INSERT INTO docs_fts(docs_fts) VALUES('rebuild'); CREATE TABLE DOCS_FTS_1_CONFIG(value TEXT); INSERT INTO DOCS_FTS_1_CONFIG VALUES('preserved')");
                const before = await ds.exec("SELECT name, sql FROM sqlite_schema ORDER BY name");
                const meta = await ds.metadata();
                meta.tables.docs.columns.find(c => c.name === "body").noFts = true;
                await fts5Plugin({ capabilities: { readOnly }, exec: (sql, options) => {
                    if (readOnly && !/^SELECT/.test(sql)) throw new Error("unexpected write");
                    return ds.exec(sql, options);
                } }, meta, {});
                const store = new DataStore(ds, meta);
                const info = store.getFtsInfo("docs");
                const after = await ds.exec("SELECT name, sql FROM sqlite_schema ORDER BY name");
                return { info, preserved: before.every(row => after.some(r => r.name === row.name && r.sql === row.sql)),
                    published: await ds.exec("SELECT rowid FROM docs_fts WHERE docs_fts MATCH 'secretword'"),
                    excluded: info ? (await store.queryTable("docs", { search: "secretword" })).totalRows : null,
                    included: info ? (await store.queryTable("docs", { search: "Lighthouse" })).totalRows : null };
            } finally { await ds.close(); }
        }, readOnly);
        expect(result.preserved).toBe(true);
        expect(result.published).toEqual([{ rowid: 1 }]);
        if (readOnly) expect(result.info).toBeNull();
        else {
            expect(result.info.table).toBe("docs_fts_2");
            expect(result.info.columns).toEqual(["title"]);
            expect(result.excluded).toBe(0);
            expect(result.included).toBe(1);
        }
    });
}

test("metadata caches share concurrent work and retry failures", async ({ page }) => {
    const result = await page.evaluate(async () => {
        const { DataStore } = await import("/core/engine/data-store.js");
        const meta = { tables: {
            docs: { type: "table", columns: [{ name: "year", type: "INTEGER" }, { name: "author_id", references: { table: "authors", column: "id" } }] },
            authors: { type: "table", columns: [{ name: "id", primaryKey: true }, { name: "name", type: "TEXT" }] },
        } };
        const calls = { range: 0, fk: 0 };
        const fail = { range: true, fk: true };
        const store = new DataStore({ async exec(sql, { callback }) {
            const kind = sql.includes("MIN(") ? "range" : "fk";
            calls[kind]++;
            await new Promise(resolve => globalThis.setTimeout(resolve, 10));
            if (fail[kind]) throw new Error("temporary failure");
            callback(kind === "range" ? { lo: 1900, hi: 2000 } : { value: 1, display: "Author" });
        } }, meta);
        const rangeFailed = await Promise.allSettled([store.getFilterMeta("docs"), store.getFilterMeta("docs")]);
        const fkFailed = await Promise.allSettled([store.resolveForeignKeys("docs"), store.resolveForeignKeys("docs")]);
        const failedCalls = { ...calls };
        fail.range = fail.fk = false;
        const [a, b, filters] = await Promise.all([store.resolveForeignKeys("docs"), store.resolveForeignKeys("docs"), store.getFilterMeta("docs"), store.getFilterMeta("docs")]);
        await store.getFilterMeta("docs");
        await store.resolveForeignKeys("docs");
        return { statuses: [...rangeFailed, ...fkFailed].map(r => r.status), failedCalls, calls, shared: a === b, filters };
    });
    expect(result.statuses).toEqual(Array(4).fill("rejected"));
    expect(result.failedCalls).toEqual({ range: 1, fk: 1 });
    expect(result.calls).toEqual({ range: 2, fk: 2 });
    expect(result.shared).toBe(true);
    expect(result.filters.rangeMeta.year).toEqual({ min: 1900, max: 2000 });
    expect(result.filters.multiMeta.author_id.options).toEqual([{ value: 1, display: "Author" }]);
});

for (const readOnly of [false, true]) {
    test(`FTS skips implicit rowid on WITHOUT ROWID, readOnly=${readOnly}`, async ({ page }) => {
        const result = await page.evaluate(async readOnly => {
            const { DataSource } = await import("/core/engine/datasource.js");
            const { fts5Plugin } = await import("/core/engine/enrichment/fts5.js");
            const { DataStore } = await import("/core/engine/data-store.js");
            const ds = new DataSource("/contract.db");
            await ds.ready;
            const warnings = [], warn = console.warn;
            console.warn = (...args) => warnings.push(args.join(" "));
            try {
                await ds.exec(`
                    CREATE TABLE broken(id INTEGER PRIMARY KEY, title TEXT) WITHOUT ROWID;
                    INSERT INTO broken VALUES(1, 'Lighthouse');
                    CREATE VIRTUAL TABLE broken_fts USING fts5(title, content='broken');
                    CREATE TABLE valid(id INTEGER PRIMARY KEY, title TEXT) WITHOUT ROWID;
                    INSERT INTO valid VALUES(1, 'Lighthouse');
                    CREATE VIRTUAL TABLE valid_fts USING fts5(title, content='valid', content_rowid='id');
                    INSERT INTO valid_fts(valid_fts) VALUES('rebuild');
                    CREATE VIRTUAL TABLE docs_fts USING fts5(title, content='docs');
                    INSERT INTO docs_fts(docs_fts) VALUES('rebuild');
                `);
                const meta = await ds.metadata();
                await fts5Plugin({ capabilities: { readOnly }, exec: (sql, options) => ds.exec(sql, options) }, meta, {});
                const store = new DataStore(ds, meta);
                // Schema/transport errors must still reject enrichment, not
                // be mistaken for an incompatible published index.
                const failure = new Error("transport unavailable");
                let propagated = false;
                try {
                    await fts5Plugin({ exec: (sql, options) => {
                        if (sql.includes("pragma_table_list")) throw failure;
                        return ds.exec(sql, options);
                    } }, await ds.metadata(), {});
                } catch (error) { propagated = error === failure; }
                return { warnings, propagated, broken: store.getFtsInfo("broken"), valid: store.getFtsInfo("valid"),
                    matches: (await store.queryTable("valid", { search: "Lighthouse" })).totalRows,
                    docs: (await store.queryTable("docs", { search: "Lighthouse" })).totalRows };
            } finally { console.warn = warn; await ds.close(); }
        }, readOnly);
        expect(result.warnings.join(" ")).toContain('cannot reuse "broken_fts": content rowid "rowid"');
        expect(result.propagated).toBe(true);
        expect(result.valid.table).toBe("valid_fts");
        expect(result.matches).toBe(1);
        expect(result.docs).toBe(1);
        if (readOnly) expect(result.broken).toBeNull();
        else expect(result.broken.table).toBe("broken_fts_1");
    });
}

test("FTS identifiers use ASCII-insensitive canonical schema names and exclusions", async ({ page }) => {
    const result = await page.evaluate(async () => {
        const { DataSource } = await import("/core/engine/datasource.js");
        const { fts5Plugin } = await import("/core/engine/enrichment/fts5.js");
        const { DataStore } = await import("/core/engine/data-store.js");
        const ds = new DataSource("/contract.db");
        await ds.ready;
        try {
            await ds.exec(`
                CREATE TABLE MixedDocs(SearchKey INTEGER PRIMARY KEY, Title TEXT, Body TEXT);
                INSERT INTO MixedDocs VALUES(1, 'Lighthouse', 'secretword');
                CREATE VIRTUAL TABLE PublishedSearch USING fts5(TITLE, body, content='mIXEDdOCS', content_rowid='sEARCHkEY');
                INSERT INTO PublishedSearch(PublishedSearch) VALUES('rebuild');
                CREATE TABLE "ÄDocs"(id INTEGER PRIMARY KEY, title TEXT);
                CREATE VIRTUAL TABLE unicode_search USING fts5(title, content='äDocs');
            `);
            const source = { capabilities: { readOnly: true }, exec: (sql, options) => ds.exec(sql, options) };
            const meta = await ds.metadata();
            await fts5Plugin(source, meta, {});
            const store = new DataStore(ds, meta);
            const info = store.getFtsInfo("MixedDocs");
            const matches = (await store.queryTable("MixedDocs", { search: "Lighthouse" })).totalRows;
            const excludedMeta = await ds.metadata();
            excludedMeta.tables.MixedDocs.columns.find(c => c.name === "Body").noFts = true;
            await fts5Plugin(source, excludedMeta, {});
            const readOnlyExcluded = new DataStore(ds, excludedMeta).getFtsInfo("MixedDocs");
            await fts5Plugin(ds, excludedMeta, {});
            const rebuiltStore = new DataStore(ds, excludedMeta);
            return { info, matches, unicode: store.getFtsInfo("ÄDocs"), readOnlyExcluded,
                rebuilt: rebuiltStore.getFtsInfo("MixedDocs"),
                excluded: (await rebuiltStore.queryTable("MixedDocs", { search: "secretword" })).totalRows };
        } finally { await ds.close(); }
    });
    expect(result.info).toEqual({ table: "PublishedSearch", columns: ["Title", "Body"], rowid: "SearchKey", mode: "unicode61" });
    expect(result.matches).toBe(1);
    expect(result.unicode).toBeNull();
    expect(result.readOnlyExcluded).toBeNull();
    expect(result.rebuilt.columns).toEqual(["Title"]);
    expect(result.excluded).toBe(0);
});

for (const phase of ["immediate", "fetch", "body", "loading", "sqlite"]) {
    test(`download close is terminal during ${phase}`, async ({ page }) => {
        if (phase === "sqlite") {
            await page.route("**/sqlite3.wasm", async route => {
                await page.evaluate(() => globalThis.closeDuringInit());
                await route.continue();
            });
        }
        const result = await page.evaluate(async phase => {
            const { DataSource } = await import("/core/engine/datasource.js");
            const fetch = globalThis.fetch;
            const bytes = await (await fetch("/contract.db")).arrayBuffer();
            let ds, signal, fetches = 0, readyEvents = 0;
            globalThis.closeDuringInit = () => ds.close();
            // Even a fetch/body implementation that completes after abort
            // must not let the source reopen at the following await boundary.
            globalThis.fetch = async (url, options) => {
                if (url !== "/contract.db") return fetch(url, options);
                fetches++;
                signal = options.signal;
                if (phase === "fetch") await ds.close();
                return { ok: true, arrayBuffer: async () => {
                    if (phase === "body") await ds.close();
                    return bytes;
                } };
            };
            try {
                ds = new DataSource("/contract.db");
                ds.addEventListener("ready", () => readyEvents++);
                if (phase === "loading") ds.addEventListener("loading", () => ds.close());
                const settled = ds.ready.then(() => "resolved", error => error.name);
                if (phase === "immediate") await ds.close();
                const status = await settled;
                await ds.close();
                let closed = false;
                try { await ds.exec("SELECT 1"); } catch (error) { closed = /closed/.test(error.message); }
                return { status, readyEvents, closed, fetches, aborted: signal?.aborted ?? null };
            } finally {
                globalThis.fetch = fetch;
                delete globalThis.closeDuringInit;
                await ds?.close();
            }
        }, phase);
        expect(result).toEqual({ status: "AbortError", readyEvents: 0, closed: true, fetches: phase === "immediate" ? 0 : 1, aborted: phase === "immediate" ? null : true });
    });
}
