import { test, expect } from "@playwright/test";
import { createServer } from "node:http";
import { DatabaseSync } from "node:sqlite";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

let server, origin, directory, bytes;
const requests = [];
const fixtures = new Map();

test.beforeAll(async () => {
    directory = mkdtempSync(join(tmpdir(), "pihka-http-vfs-"));
    const path = join(directory, "fixture.db");
    const db = new DatabaseSync(path);
    db.exec(`
        PRAGMA page_size=4096;
        CREATE TABLE authors(id INTEGER PRIMARY KEY, name TEXT, lat REAL, lon REAL);
        INSERT INTO authors VALUES(1, 'Virginia Woolf', 51.5, -0.1), (2, 'James Joyce', 53.3, -6.2);
        CREATE TABLE works(id INTEGER PRIMARY KEY, search_key INTEGER UNIQUE, title TEXT, year INTEGER, author_id INTEGER REFERENCES authors(id));
        INSERT INTO works VALUES(1, 101, 'Mrs Dalloway', 1925, 1), (2, 102, 'To the Lighthouse', 1927, 1), (3, 103, 'Ulysses', 1922, 2);
        CREATE TABLE tags(id INTEGER PRIMARY KEY, name TEXT);
        INSERT INTO tags VALUES(1, 'Novel'), (2, 'Modernism');
        CREATE TABLE works_tags(work_id INTEGER REFERENCES works(id), tag_id INTEGER REFERENCES tags(id), PRIMARY KEY(work_id, tag_id));
        INSERT INTO works_tags VALUES(1, 1), (2, 1), (3, 2);
        CREATE VIEW published_view AS SELECT id, title FROM works;
        CREATE VIRTUAL TABLE works_search USING fts5(title, content='works', content_rowid='search_key', tokenize='unicode61');
        INSERT INTO works_search(works_search) VALUES('rebuild');
        CREATE TABLE notes(id INTEGER PRIMARY KEY, body TEXT);
        INSERT INTO notes VALUES(1, 'Lighthouse annotations');
        CREATE VIRTUAL TABLE notes_search USING fts5(body, content='notes', content_rowid='id', tokenize='trigram');
        INSERT INTO notes_search(notes_search) VALUES('rebuild');
        CREATE TABLE padding(id INTEGER PRIMARY KEY, data BLOB);
        INSERT INTO padding VALUES(1, zeroblob(4194304));
    `);
    db.close();
    bytes = readFileSync(path);
    fixtures.set("/fixture.db", bytes);
    for (const pageSize of [512, 1024, 4096, 65536]) {
        const fixturePath = join(directory, `${pageSize}.db`);
        const fixture = new DatabaseSync(fixturePath);
        fixture.exec(`PRAGMA page_size=${pageSize}; VACUUM;`);
        if (pageSize !== 512) fixture.exec(`
            CREATE TABLE probe(id INTEGER PRIMARY KEY, payload BLOB);
            WITH RECURSIVE n(x) AS (VALUES(1) UNION ALL SELECT x+1 FROM n WHERE x<80)
            INSERT INTO probe SELECT x, zeroblob(${pageSize / 2}) FROM n;
        `);
        fixture.close();
        fixtures.set(`/pages-${pageSize}.db`, readFileSync(fixturePath));
    }
    server = createServer((req, res) => {
        const bytes = fixtures.get(req.url.split("?")[0]) || fixtures.get("/fixture.db");
        const mode = req.url.split("?")[1] || "ok";
        const entry = { method: req.method, range: req.headers.range, ifMatch: req.headers["if-match"], mode, bytes: 0 };
        requests.push(entry);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Range, If-Match");
        res.setHeader("Access-Control-Allow-Methods", "HEAD, GET, OPTIONS");
        if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }
        res.setHeader("Access-Control-Expose-Headers", "Content-Length, Content-Range, Accept-Ranges, ETag, Content-Encoding, Last-Modified");
        res.setHeader("Accept-Ranges", "bytes");
        res.setHeader("ETag", mode === "changed" && req.method === "GET" ? '"v2"' : '"v1"');
        if (mode === "no-etag" || (mode === "lost-etag" && req.method === "GET")) res.removeHeader("ETag");
        if (mode === "weak") res.setHeader("ETag", 'W/"v1"');
        if (mode === "invalid-etag") res.setHeader("ETag", "v1");
        if (mode === "precondition" && req.headers["if-match"]) { res.writeHead(412); res.end(); return; }
        if (req.method === "HEAD") {
            res.statusCode = mode === "missing" ? 404 : 200;
            res.setHeader("Content-Length", bytes.length);
            res.end();
            return;
        }
        const match = /^bytes=(\d+)-(\d+)$/.exec(req.headers.range || "");
        if (!match || mode === "ignored") {
            entry.bytes = bytes.length;
            res.end(bytes);
            return;
        }
        const start = Number(match[1]), end = Math.min(Number(match[2]), bytes.length - 1);
        if (mode === "later-error" && start > 4096) {
            res.statusCode = 503;
            res.end("unavailable");
            return;
        }
        res.statusCode = mode === "416" ? 416 : 206;
        res.setHeader("Content-Range", `bytes ${mode === "wrong" ? start + 1 : start}-${end}/${bytes.length}`);
        let body = bytes.subarray(start, end + 1);
        if (mode === "short") body = body.subarray(0, body.length - 1);
        entry.bytes = body.length;
        res.end(body);
    });
    await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
    origin = `http://127.0.0.1:${server.address().port}`;
});

test.afterAll(async () => {
    await new Promise(resolve => server.close(resolve));
    rmSync(directory, { recursive: true, force: true });
});

async function configure(page, { mode = "ok", type = "http-vfs", extra = {} } = {}) {
    await page.route("**/app/config.json", route => route.fulfill({ json: {
        database: `${origin}/fixture.db?${mode}`,
        enginePlugins: ["extensions/http-vfs/http-vfs-component.js"], uiPlugins: [],
        datasource: { type },
        tables: { padding: { hidden: true }, works_tags: { hidden: true } },
        ...extra,
    } }));
}

test("HTTP VFS: real cross-origin ranges, prebuilt FTS modes/mapping, filters, detail and export", async ({ page }) => {
    requests.length = 0;
    await configure(page);
    await page.goto("/#/en/works/table");
    await expect(page.locator("section tbody tr")).toHaveCount(3);
    await expect(page.locator("section tbody")).toContainText("Virginia Woolf");
    expect(requests.some(r => r.method === "HEAD")).toBeTruthy();
    expect(requests.filter(r => r.method === "GET").every(r => r.range)).toBeTruthy();
    expect(requests.filter(r => r.method === "GET").every(r => r.ifMatch === '"v1"')).toBeTruthy();
    expect(requests.reduce((n, r) => n + r.bytes, 0)).toBeLessThan(bytes.length / 4);
    expect(await page.evaluate(() => globalThis.crossOriginIsolated)).toBe(false);

    await page.goto("/#/en/works/table?q=Lighthouse");
    await expect(page.locator("section tbody tr")).toHaveCount(1);
    await expect(page.locator("section tbody")).toContainText("To the Lighthouse");
    await page.goto("/#/en/notes/table?q=house");
    await expect(page.locator("section tbody")).toContainText("Lighthouse annotations");
    await page.goto("/#/en/works/table?tag_id=2&year_min=1920");
    await expect(page.locator("section tbody tr")).toHaveCount(1);
    await expect(page.locator("section tbody")).toContainText("Ulysses");
    await page.goto("/#/en/authors/1/table");
    await expect(page.locator(".detail-related")).toContainText("Mrs Dalloway");
    await page.goto("/#/en/works/export?q=Lighthouse");
    const download = page.waitForEvent("download");
    await page.getByRole("button", { name: "works-selection.csv", exact: false }).click();
    expect((await download).suggestedFilename()).toBe("works-selection.csv");
});

for (const mode of ["missing", "ignored", "wrong", "short", "changed", "416", "later-error", "no-etag", "weak", "invalid-etag", "lost-etag", "precondition"]) {
    test(`HTTP VFS: rejects ${mode} responses without a downloader fallback`, async ({ page }) => {
        requests.length = 0;
        await configure(page, { mode });
        await page.goto("/#/en/works/table?q=Lighthouse");
        await expect(page.getByRole("heading", { name: "Failed to load" })).toBeVisible();
        await expect(page.locator("main")).toContainText("HTTP VFS:");
        await expect(page.locator("main")).not.toContainText("Invalid search query");
        expect(requests.filter(r => r.method === "GET").every(r => r.range)).toBeTruthy();
    });
}

for (const mode of ["no-etag", "weak"]) {
    test(`HTTP VFS: immutable override permits ${mode}`, async ({ page }) => {
        await configure(page, { mode, extra: { datasource: { type: "http-vfs", options: { immutable: true } } } });
        await page.goto("/#/en/works/table");
        await expect(page.locator("section tbody tr")).toHaveCount(3);
    });
}

for (const type of ["http-vfs", "download"]) {
    test(`${type}: discovers existing FTS instead of rebuilding it`, async ({ page }) => {
        await configure(page, { type });
        await page.goto("/#/en/works/table?q=Lighthouse");
        await expect(page.locator("section tbody tr")).toHaveCount(1);
        await expect(page.locator("section tbody")).toContainText("To the Lighthouse");
        await page.goto("/#/");
        await expect(page.locator("main")).not.toContainText("works_search");
    });
}

test("HTTP VFS: reuses published perspectives and skips unpublished query views", async ({ page }) => {
    await configure(page, { extra: { perspectives: [
        { id: "published", table: "published_view", query: "SELECT 1" },
        { id: "unpublished", table: "missing_view", query: "SELECT 1" },
    ] } });
    await page.goto("/#/en/published/table");
    await expect(page.locator("section tbody tr")).toHaveCount(3);
    await page.goto("/#/en/unpublished/table");
    await expect(page.locator("main")).toContainText("Perspective not found");
});

test("HTTP VFS: datasource exec, metadata, read-only and close contract", async ({ page }) => {
    await page.goto("/");
    const result = await page.evaluate(async url => {
        const { HttpDataSource } = await import("/extensions/http-vfs/http-vfs-component.js");
        const ds = new HttpDataSource(url);
        await ds.ready;
        const rows = await ds.exec("SELECT title FROM works WHERE id = ?", { bind: [1] });
        const delivered = [];
        const arrays = await ds.exec("SELECT id FROM works ORDER BY id", { rowMode: "array", callback: (...args) => { delivered.push(args); return false; } });
        const invalid = [];
        for (const options of [{ rowMode: "stmt" }, { rowMode: 0 }, { returnValue: "resultRows" }, { sql: "SELECT 2" }, { callback: true }]) {
            try { await ds.exec("SELECT 1", options); } catch (error) { invalid.push(error.message); }
        }
        const meta = await ds.metadata();
        let readOnly = false, closed = false;
        try { await ds.exec("DELETE FROM works"); } catch { readOnly = true; }
        await ds.close();
        try { await ds.exec("SELECT 1"); } catch { closed = true; }
        return { rows, arrays, delivered, invalid: invalid.length, hasWorks: !!meta.tables.works, readOnly, closed };
    }, `${origin}/fixture.db`);
    expect(result).toEqual({ rows: [{ title: "Mrs Dalloway" }], arrays: [[1]], delivered: [[[1]]], invalid: 5, hasWorks: true, readOnly: true, closed: true });
});

test("HTTP VFS: active-only deadlines, clone failures, worker failures and close", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("a.perspective-card").first()).toBeVisible();
    const result = await page.evaluate(async () => {
        const { HttpDataSource } = await import("/extensions/http-vfs/http-vfs-component.js");
        const NativeWorker = globalThis.Worker;
        let worker;
        globalThis.Worker = class {
            messages = [];
            terminate() { this.terminated = true; }
            constructor() { worker = this; }
            postMessage(message) {
                if (message.sql === "post-error") throw new globalThis.DOMException("Cannot clone", "DataCloneError");
                this.messages.push(message);
                if (message.method === "open") globalThis.setTimeout(() => this.reply(null), 0);
            }
            reply(result = []) { this.onmessage({ data: { id: this.messages.at(-1).id, result } }); }
        };
        const sleep = ms => new Promise(resolve => globalThis.setTimeout(resolve, ms));
        const outcome = promise => promise.then(() => "ok", error => error.message);
        try {
            const ds = new HttpDataSource("http://example.test/db", { timeoutMs: 300 });
            await ds.ready;
            const first = outcome(ds.exec("first")), second = outcome(ds.exec("second"));
            await sleep(190);
            const serialized = worker.messages.map(m => m.method === "open" ? "open" : m.sql);
            worker.reply();
            await sleep(190);
            worker.reply();
            const queue = await Promise.all([first, second]);
            const clone = await outcome(ds.exec("SELECT ?", { bind: [() => {}] }));
            const post = await outcome(ds.exec("post-error"));
            await sleep(350);
            const survived = !worker.terminated;
            const active = outcome(ds.exec("active")), queued = outcome(ds.exec("queued"));
            await sleep(0);
            await ds.close();
            const closed = await Promise.all([active, queued]);
            const failures = [];
            for (const mode of ["error", "messageerror", "timeout"]) {
                const source = new HttpDataSource("http://example.test/db", { timeoutMs: 40 });
                await source.ready;
                const a = outcome(source.exec("active")), b = outcome(source.exec("queued"));
                await sleep(0);
                if (mode === "error") worker.onerror({ message: "worker crashed" });
                if (mode === "messageerror") worker.onmessageerror();
                const results = await Promise.all([a, b]);
                results.push(await outcome(source.exec("after failure")));
                failures.push({ mode, results, terminated: worker.terminated });
            }
            const opening = new HttpDataSource("http://example.test/db");
            const openingReady = outcome(opening.ready);
            await opening.close();
            const closedOpening = await openingReady;
            const badOpen = new HttpDataSource("http://example.test/db", { bad: () => {} });
            const openClone = await outcome(badOpen.ready);
            const openTerminated = worker.terminated;
            return { serialized, queue, clone, post, survived, closed, failures, closedOpening, openClone, openTerminated };
        } finally { globalThis.Worker = NativeWorker; }
    });
    expect(result.serialized).toEqual(["open", "first"]);
    expect(result.queue).toEqual(["ok", "ok"]);
    expect(result.clone).toMatch(/clone/i);
    expect(result.post).toMatch(/clone/i);
    expect(result.survived).toBe(true);
    expect(result.closed).toEqual(["HTTP datasource closed", "HTTP datasource closed"]);
    expect(result.closedOpening).toMatch(/closed/);
    expect(result.openClone).toMatch(/clone/i);
    expect(result.openTerminated).toBe(true);
    for (const failure of result.failures) {
        expect(failure.terminated).toBe(true);
        expect(failure.results[0]).toBe(failure.results[1]);
        expect(failure.results[0]).toBe(failure.results[2]);
        expect(failure.results[0]).toMatch(/crashed|Invalid HTTP database worker message|timed out/);
    }
});

for (const pageSize of [512, 1024, 4096, 65536]) {
    test(`HTTP VFS: ${pageSize}-byte pages, EOF and repeated cached scans`, async ({ page }) => {
        requests.length = 0;
        await page.goto("/");
        const result = await page.evaluate(async ({ url, pageSize }) => {
            const { HttpDataSource } = await import("/extensions/http-vfs/http-vfs-component.js");
            const ds = new HttpDataSource(url, { cacheSize: 128, maxReadBytes: 65536 });
            try {
                await ds.ready;
                const size = await ds.exec("PRAGMA page_size", { rowMode: "array" });
                const sql = pageSize === 512 ? "SELECT count(*) AS count FROM sqlite_schema"
                    : "SELECT count(*) AS count, sum(length(payload)) AS bytes, sum(id) AS ids FROM probe";
                const scans = [];
                for (let i = 0; i < 3; i++) scans.push(await ds.exec(sql));
                return { size, scans };
            } finally { await ds.close(); }
        }, { url: `${origin}/pages-${pageSize}.db`, pageSize });
        expect(result.size).toEqual([[pageSize]]);
        expect(result.scans).toEqual(Array(3).fill(pageSize === 512 ? [{ count: 0 }]
            : [{ count: 80, bytes: 80 * pageSize / 2, ids: 3240 }]));
        const gets = requests.filter(r => r.method === "GET");
        expect(gets.length).toBeGreaterThan(0);
        expect(gets.every(r => r.range && r.bytes <= 65536 && r.ifMatch === '"v1"')).toBe(true);
        if (pageSize === 512) {
            expect(fixtures.get("/pages-512.db").length).toBe(512);
            expect(gets.every(r => r.range === "bytes=0-511" && r.bytes === 512)).toBe(true);
        }
    });
}

test("downloader configuration loads no HTTP VFS assets", async ({ page, context }) => {
    await page.route("**/app/config.json", async route => {
        const response = await route.fetch();
        const config = await response.json();
        delete config.datasource;
        config.enginePlugins = config.enginePlugins.filter(path => !path.includes("/http-vfs/"));
        await route.fulfill({ json: config });
    });
    const assets = [];
    context.on("request", request => {
        if (request.url().includes("/extensions/http-vfs/")) assets.push(request.url());
    });
    await page.goto("/#/en/works/table");
    await expect(page.locator("section tbody tr").first()).toBeVisible();
    await page.goto("/#/en/works/1/table");
    await expect(page.locator(".detail-related").first()).toBeVisible();
    expect(assets).toEqual([]);
});

test("default demo reads its published database through ranges", async ({ page, context }) => {
    const requests = [];
    context.on("request", request => {
        if (new globalThis.URL(request.url()).pathname.endsWith("/app/database/sample.db")) requests.push(request);
    });
    await page.goto("/#/en/works/table?q=Lighthouse");
    await expect(page.locator("section tbody")).toContainText("To the Lighthouse");
    expect(requests.some(request => request.method() === "GET")).toBe(true);
    for (const request of requests.filter(request => request.method() === "GET")) {
        expect(await request.headerValue("range")).toMatch(/^bytes=/);
        expect((await request.response()).status()).toBe(206);
    }
    await page.goto("/#/en/author-overview/table");
    await expect(page.locator("section tbody tr").first()).toBeVisible();
});

test("HTTP VFS: isolated hosting does not initialize OPFS or OPFS Web Locks workers", async ({ page, context }) => {
    const opfsRequests = [];
    context.on("request", request => {
        if (request.url().includes("sqlite3-opfs-async-proxy")) opfsRequests.push(request.url());
    });
    await context.route("http://localhost:3000/**", async route => {
        const response = await route.fetch();
        await route.fulfill({ response, headers: {
            ...response.headers(),
            "Cross-Origin-Opener-Policy": "same-origin",
            "Cross-Origin-Embedder-Policy": "require-corp",
        } });
    });
    await page.goto("/#/en/works/table?q=Lighthouse");
    expect(await page.evaluate(() => globalThis.crossOriginIsolated)).toBe(true);
    await expect(page.locator("section tbody")).toContainText("To the Lighthouse");
    await page.goto("/#/en/author-overview/table");
    await expect(page.locator("section tbody tr").first()).toBeVisible();
    expect(opfsRequests).toEqual([]);
});

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    test(`HTTP VFS: ${viewport.width}px list and detail smoke`, async ({ page }) => {
        await page.setViewportSize(viewport);
        const errors = [];
        page.on("pageerror", error => errors.push(error.message));
        await configure(page);
        await page.goto("/#/en/works/table?q=Lighthouse");
        await expect(page.locator("section tbody tr")).toHaveCount(1);
        await expect(page.locator("section tbody")).toContainText("To the Lighthouse");
        await page.goto("/#/en/authors/1/table");
        await expect(page.locator(".detail-related")).toContainText("Mrs Dalloway");
        await expect(page.locator(".detail-related").first()).toBeVisible();
        expect(errors).toEqual([]);
    });
}

test("HTTP VFS: latest route wins over a delayed stale query", async ({ page }) => {
    await configure(page);
    await page.goto("/#/en/works/table");
    await expect(page.locator("section tbody tr")).toHaveCount(3);
    await page.evaluate(async () => {
        const { HttpDataSource } = await import("/extensions/http-vfs/http-vfs-component.js");
        const exec = HttpDataSource.prototype.exec;
        globalThis.staleReleases = [];
        HttpDataSource.prototype.exec = async function(sql, options) {
            const rows = await exec.call(this, sql, options);
            if ((JSON.stringify(options?.bind) || "").includes("Lighthouse")
                && rows.some(row => row.title === "To the Lighthouse")) {
                globalThis.staleHeld = true;
                await new Promise(resolve => { globalThis.staleReleases.push(resolve); });
                globalThis.staleReleased = true;
            }
            return rows;
        };
    });
    await page.goto("/#/en/works/table?q=Lighthouse");
    await page.waitForFunction(() => globalThis.staleHeld);
    await page.goto("/#/en/works/table?q=Ulysses");
    await expect(page.locator("section tbody tr")).toHaveCount(1);
    await expect(page.locator("section tbody")).toContainText("Ulysses");
    await page.evaluate(() => globalThis.staleReleases.forEach(resolve => resolve()));
    await page.waitForFunction(() => globalThis.staleReleased);
    // Allow Preact's effect/render scheduling to consume the old completion.
    await page.evaluate(() => new Promise(resolve => globalThis.setTimeout(resolve, 100)));
    await expect(page).toHaveURL(/q=Ulysses$/);
    await expect(page.locator("section tbody tr")).toHaveCount(1);
    await expect(page.locator("section tbody")).toContainText("Ulysses");
    await expect(page.locator("section tbody")).not.toContainText("Lighthouse");
});
