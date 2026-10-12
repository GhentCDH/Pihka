/** Development-only dual-datasource server. No published files are modified. */
import { createServer } from "node:http";
import { DatabaseSync } from "node:sqlite";
import { mkdtempSync, readFileSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, extname, join, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const project = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = join(project, "pihka");
const mime = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".json": "application/json", ".css": "text/css", ".wasm": "application/wasm", ".svg": "image/svg+xml", ".png": "image/png" };

function createFixture(path) {
    const db = new DatabaseSync(path);
    db.exec(`
        PRAGMA page_size=4096;
        CREATE TABLE authors(id INTEGER PRIMARY KEY, name TEXT, lat REAL, lon REAL);
        INSERT INTO authors VALUES(1, 'Virginia Woolf', 51.5, -0.1), (2, 'James Joyce', 53.3, -6.2);
        CREATE TABLE works(id INTEGER PRIMARY KEY, title TEXT, year INTEGER, author_id INTEGER REFERENCES authors(id), manifest TEXT);
        INSERT INTO works VALUES(1, 'Mrs Dalloway', 1925, 1, '/fixture/manifest.json'), (2, 'To the Lighthouse', 1927, 1, NULL), (3, 'Ulysses', 1922, 2, NULL);
        WITH RECURSIVE n(x) AS (VALUES(4) UNION ALL SELECT x+1 FROM n WHERE x<35)
        INSERT INTO works SELECT x, 'Archive volume ' || x, 1900+x, 1, NULL FROM n;
        CREATE TABLE categories(id INTEGER PRIMARY KEY, name TEXT);
        INSERT INTO categories VALUES(1, 'Novel'), (2, 'Modernism');
        CREATE TABLE works_categories(work_id INTEGER REFERENCES works(id), category_id INTEGER REFERENCES categories(id), PRIMARY KEY(work_id, category_id));
        INSERT INTO works_categories VALUES(1, 1), (2, 1), (3, 2);
        CREATE TABLE text_pages(id INTEGER PRIMARY KEY, title TEXT, body TEXT);
        INSERT INTO text_pages VALUES(1, 'A local annotated text', 'Virginia Woolf wrote Mrs Dalloway.');
        CREATE TABLE annotations(id INTEGER PRIMARY KEY, page_id INTEGER REFERENCES text_pages(id), start INTEGER, end INTEGER, type TEXT, label TEXT);
        INSERT INTO annotations VALUES(1, 1, 0, 14, 'person', 'Virginia Woolf');
        CREATE VIEW published_view AS SELECT id, title, year FROM works;
        CREATE VIRTUAL TABLE works_search USING fts5(title, content='works', content_rowid='id', tokenize='unicode61');
        INSERT INTO works_search(works_search) VALUES('rebuild');
        CREATE TABLE padding(id INTEGER PRIMARY KEY, data BLOB);
        INSERT INTO padding VALUES(1, zeroblob(4194304));
    `);
    db.close();
}

function config(mode) {
    return {
        name: `Pihka ${mode} test`, database: "app/database/fixture.db", datasource: { type: mode },
        languages: ["en", "nl"], defaultLanguage: "en", enrichment: { fts: "unicode61" },
        enginePlugins: [
            ...(mode === "http-vfs" ? ["extensions/http-vfs/http-vfs-component.js"] : []),
            "extensions/geo-filter/geo-filter-engine.js",
        ],
        uiPlugins: [
            "extensions/iiif-viewer/iiif-viewer-component.js", "extensions/point_map/point-map-component.js",
            "extensions/geo-filter/geo-filter-component.js", "extensions/text-annotations/text-annotations-component.js",
        ],
        perspectives: [{ id: "published", table: "published_view", query: "SELECT id, title, year FROM works", label: "Published works" }],
        tables: {
            works: { columns: { manifest: { type: "iiif" } } },
            text_pages: { columns: { body: { type: "annotated-text" } } },
            padding: { hidden: true }, works_categories: { hidden: true },
        },
    };
}

/** Start on an ephemeral port in tests; CLI defaults to 3100. */
export async function startBrowserTestServer({ port = 0 } = {}) {
    const directory = mkdtempSync(join(tmpdir(), "pihka-browser-"));
    const fixturePath = join(directory, "fixture.db");
    createFixture(fixturePath);
    const bytes = readFileSync(fixturePath);
    const requests = [];
    let origin;
    const server = createServer((req, res) => {
        const pathname = new URL(req.url, "http://localhost").pathname;
        const entry = { path: pathname, method: req.method, range: req.headers.range, status: 200, bytes: 0 };
        requests.push(entry);
        function send(body, type = "application/json") {
            const buffer = Buffer.isBuffer(body) ? body : Buffer.from(body);
            entry.bytes = req.method === "HEAD" ? 0 : buffer.length;
            res.setHeader("Content-Type", type);
            res.setHeader("Content-Length", buffer.length);
            res.end(req.method === "HEAD" ? undefined : buffer);
        }
        function sendRanged(content, type) {
            res.setHeader("Accept-Ranges", "bytes");
            const range = /^bytes=(\d+)-(\d*)$/.exec(req.headers.range || "");
            if (!range) return send(content, type);
            const start = Number(range[1]);
            const end = Math.min(Number(range[2] || content.length - 1), content.length - 1);
            if (start >= content.length || end < start) {
                res.statusCode = entry.status = 416;
                res.setHeader("Content-Range", `bytes */${content.length}`);
                return send("Invalid range", "text/plain");
            }
            res.statusCode = entry.status = 206;
            res.setHeader("Content-Range", `bytes ${start}-${end}/${content.length}`);
            return send(content.subarray(start, end + 1), type);
        }
        if (pathname === "/") return send('<a href="/download/">Download</a> <a href="/http-vfs/">HTTP VFS</a>', "text/html");
        if (pathname === "/fixture/page.png") return send(Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jC1sAAAAASUVORK5CYII=", "base64"), "image/png");
        if (pathname === "/fixture/manifest.json") return send(JSON.stringify({
            "@context": "http://iiif.io/api/presentation/3/context.json", id: `${origin}/fixture/manifest.json`, type: "Manifest",
            label: { en: ["Local test manuscript"] }, items: [{ id: `${origin}/fixture/canvas`, type: "Canvas", width: 1, height: 1,
                items: [{ id: `${origin}/fixture/annotations`, type: "AnnotationPage", items: [{ id: `${origin}/fixture/painting`, type: "Annotation", motivation: "painting", target: `${origin}/fixture/canvas`, body: { id: `${origin}/fixture/page.png`, type: "Image", format: "image/png", width: 1, height: 1 } }] }] }],
        }));
        const route = /^\/(download|http-vfs)\/(.*)$/.exec(pathname);
        if (!route) { res.statusCode = entry.status = 404; return send("Not found", "text/plain"); }
        const [, mode, relative] = route;
        if (relative === "app/config.json") return send(JSON.stringify(config(mode)));
        if (relative === "headless.html") return send(`<!doctype html><title>Engine test</title><script type="importmap">{"imports":{"@sqlite.org/sqlite-wasm":"./core/vendor/@sqlite.org/sqlite-wasm/dist/index.mjs"}}</script>`, "text/html");
        if (relative === "app/database/fixture.db") {
            const etag = '"pihka-test-fixture-v1"';
            res.setHeader("Accept-Ranges", "bytes"); res.setHeader("ETag", etag);
            if (req.headers["if-match"] && req.headers["if-match"] !== etag) { res.statusCode = entry.status = 412; return send("Changed", "text/plain"); }
            return sendRanged(bytes, "application/octet-stream");
        }
        // Resolve beneath the public directory, including for encoded traversal attempts.
        const file = resolve(publicRoot, decodeURIComponent(relative || "index.html"));
        if (!file.startsWith(publicRoot + sep)) { res.statusCode = entry.status = 403; return send("Forbidden", "text/plain"); }
        try {
            if (!statSync(file).isFile()) throw new Error("Not a file");
            const content = readFileSync(file);
            sendRanged(content, mime[extname(file)] || "application/octet-stream");
        } catch {
            res.statusCode = entry.status = 404; send("Not found", "text/plain");
        }
    });
    await new Promise((resolve, reject) => { server.once("error", reject); server.listen(port, "127.0.0.1", resolve); });
    origin = `http://127.0.0.1:${server.address().port}`;
    return { origin, requests, fixtureBytes: bytes.length, async close() {
        await new Promise(resolve => { server.close(resolve); server.closeAllConnections(); });
        rmSync(directory, { recursive: true, force: true });
    } };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
    const instance = await startBrowserTestServer({ port: Number(process.env.PORT || 3100) });
    console.log(`Download: ${instance.origin}/download/\nHTTP VFS: ${instance.origin}/http-vfs/`);
    const shutdown = async () => { await instance.close(); process.exit(0); };
    process.once("SIGINT", shutdown); process.once("SIGTERM", shutdown);
}
