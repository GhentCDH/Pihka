import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, readdir, rm, mkdir } from "node:fs/promises";
import { writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createServer } from "node:http";
import { setTimeout } from "node:timers";
import { DatabaseSync } from "node:sqlite";
import { atomicOutput, atomicWrite, downloadFile } from "../../scripts/lib/atomic-files.js";
import { createSampleDatabase } from "../../scripts/create-sample-db.js";
import { prepareSampleDatabase } from "../../scripts/prepare-sample-db.js";
import { downloadWorldPmtiles, parseOptions } from "../../scripts/download-world-pmtiles.js";

async function fixture(t) {
    const root = await mkdtemp(join(tmpdir(), "pihka scripts "));
    t.after(() => rm(root, { recursive: true, force: true }));
    return root;
}

test("atomic output preserves destination and cleans partial files on producer failure", async (t) => {
    const root = await fixture(t);
    const destination = join(root, "result");
    await atomicWrite(destination, "original");
    await assert.rejects(
        atomicOutput(destination, async (temporary) => {
            await writeFile(temporary, "partial");
            throw new Error("interrupted");
        }),
        /interrupted/,
    );
    assert.equal(await readFile(destination, "utf8"), "original");
    assert.deepEqual(await readdir(root), ["result"]);
});

test("download streams real HTTP and discards truncated or rejected responses", async (t) => {
    const root = await fixture(t);
    const server = createServer((req, res) => {
        if (req.url === "/missing") {
            res.writeHead(404);
            res.end();
            return;
        }
        res.writeHead(200, { "content-length": 8 });
        res.write("data");
        if (req.url === "/broken") setTimeout(() => res.destroy(), 10);
        else res.end("base");
    });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    t.after(
        () =>
            new Promise((resolve) => {
                server.closeAllConnections();
                server.close(resolve);
            }),
    );
    const url = `http://127.0.0.1:${server.address().port}`;
    const destination = join(root, "database");
    const progress = [];
    await downloadFile(url, destination, {
        onProgress: (bytes, total) => progress.push([bytes, total]),
    });
    assert.equal(await readFile(destination, "utf8"), "database");
    assert.deepEqual(progress.at(-1), [8, 8]);
    await assert.rejects(downloadFile(`${url}/broken`, destination));
    await assert.rejects(downloadFile(`${url}/missing`, destination), /404/);
    assert.equal(await readFile(destination, "utf8"), "database");
    assert.deepEqual(await readdir(root), ["database"]);
});

test("sample generation prepares FTS, views, rows and annotations before installation; failures preserve original", async (t) => {
    const root = await fixture(t);
    const dataDir = join(root, "input");
    await mkdir(join(dataDir, "full_text"), { recursive: true });
    const inputs = {
        authors: [
            {
                id: 1,
                name: "Arthur Doyle",
                birth_year: 1859,
                birthplace: "Edinburgh",
                latitude: 55,
                longitude: -3,
            },
        ],
        categories: [{ id: 1, name: "Novel" }],
        works: [
            {
                id: 89,
                title: "Sherlock Holmes",
                author_id: 1,
                year: 1892,
                description: "Detective",
                category_id: 1,
            },
        ],
    };
    for (const [name, rows] of Object.entries(inputs))
        await writeFile(join(dataDir, `${name}.json`), JSON.stringify(rows));
    await writeFile(
        join(dataDir, "full_text", "holmes.json"),
        JSON.stringify({
            work_id: 89,
            text: "To Sherlock Holmes she is always Irene Adler in London.",
        }),
    );
    const outputPath = join(root, "sample.db");
    const config = {
        perspectives: [{ id: "titles", table: "titles", query: "SELECT title FROM works" }],
    };
    const summary = await createSampleDatabase({ dataDir, coversDir: root, outputPath, config });
    assert.equal(summary.annotations, 3);
    assert.equal(summary.workCategories, 1);
    const db = new DatabaseSync(outputPath);
    assert.equal(db.prepare("SELECT title FROM titles").get().title, "Sherlock Holmes");
    assert.equal(db.prepare("SELECT count(*) AS n FROM works_categories").get().n, 1);
    const ftsName = db
        .prepare(
            "SELECT name FROM sqlite_master WHERE sql LIKE '%USING fts5%' AND name LIKE '%works%'",
        )
        .get().name;
    assert.equal(
        db
            .prepare(`SELECT count(*) AS n FROM "${ftsName}" WHERE "${ftsName}" MATCH 'Sherlock'`)
            .get().n,
        1,
    );
    db.close();
    const original = await readFile(outputPath);
    await assert.rejects(
        createSampleDatabase({
            dataDir,
            outputPath,
            config: {
                perspectives: [{ table: "broken", query: "SELECT * FROM absent" }],
            },
        }),
    );
    assert.deepEqual(await readFile(outputPath), original);
    assert.equal(
        (await readdir(root)).some((name) => name.startsWith(".pihka-")),
        false,
    );
    await assert.rejects(
        prepareSampleDatabase(outputPath, {
            perspectives: [
                { table: "rolled_back", query: "SELECT * FROM works" },
                { table: "broken", query: "SELECT !" },
            ],
        }),
    );
    const reopened = new DatabaseSync(outputPath);
    assert.equal(
        reopened.prepare("SELECT count(*) AS n FROM sqlite_master WHERE name='rolled_back'").get()
            .n,
        0,
    );
    assert.equal(reopened.prepare("SELECT count(*) AS n FROM works").get().n, 1);
    reopened.close();
});

test("perspective views get an FTS index only with fts: true", async (t) => {
    const root = await fixture(t);
    const path = join(root, "views.db");
    const seed = new DatabaseSync(path);
    seed.exec(`
        CREATE TABLE words(id INTEGER PRIMARY KEY, term TEXT);
        INSERT INTO words VALUES (1, 'mbwa'), (2, 'ngombe');
    `);
    seed.close();
    const query = "SELECT id, term FROM words";
    await prepareSampleDatabase(path, {
        perspectives: [
            { id: "plain", table: "plain_words", query },
            { id: "searchable", table: "searchable_words", query, fts: true },
        ],
    });

    const db = new DatabaseSync(path);
    const fts = (name) => db.prepare("SELECT count(*) AS n FROM sqlite_schema WHERE name = ?").get(name).n;
    assert.equal(fts("words_fts"), 1);
    assert.equal(fts("plain_words_fts"), 0);
    assert.equal(fts("searchable_words_fts"), 1);
    assert.equal(
        db.prepare("SELECT count(*) AS n FROM searchable_words_fts WHERE searchable_words_fts MATCH 'ngombe'").get().n,
        1,
    );
    db.close();
});

test("materialized perspectives publish indexed tables, refresh on rerun and fail loudly", async (t) => {
    const root = await fixture(t);
    const path = join(root, "materialize.db");
    const seed = new DatabaseSync(path);
    seed.exec(`
        CREATE TABLE zones(id INTEGER PRIMARY KEY, code TEXT);
        CREATE TABLE words(id INTEGER PRIMARY KEY, term TEXT, zone_id INTEGER REFERENCES zones(id));
        INSERT INTO zones VALUES (1, 'A'), (2, 'B');
        INSERT INTO words VALUES (10, 'mbwa', 1), (11, 'ngombe', 2), (12, 'mti', 1);
    `);
    seed.close();
    const perspective = {
        id: "words",
        table: "word_search",
        materialize: true,
        query: "SELECT w.id, w.term, z.code AS zone FROM words w JOIN zones z ON z.id = w.zone_id",
        facets: [{ field: "zone", type: "dropdown" }],
        default_sort: "term",
    };
    await prepareSampleDatabase(path, { perspectives: [perspective] });

    const db = new DatabaseSync(path);
    assert.equal(db.prepare("SELECT type FROM sqlite_schema WHERE name = 'word_search'").get().type, "table");
    assert.equal(db.prepare("SELECT pk FROM pragma_table_info('word_search') WHERE name = 'id'").get().pk, 1);
    assert.deepEqual(
        db.prepare("SELECT name FROM pragma_index_list('word_search') ORDER BY name").all().map((r) => r.name),
        ["word_search_term_idx", "word_search_zone_idx"],
    );
    assert.equal(db.prepare("SELECT count(*) AS n FROM word_search WHERE zone = 'A'").get().n, 2);
    assert.equal(
        db.prepare("SELECT count(*) AS n FROM word_search_fts WHERE word_search_fts MATCH 'ngombe'").get().n,
        1,
    );
    db.prepare("INSERT INTO words VALUES (13, 'nyumba', 2)").run();
    db.close();

    await prepareSampleDatabase(path, { perspectives: [perspective] });
    const refreshed = new DatabaseSync(path);
    assert.equal(refreshed.prepare("SELECT count(*) AS n FROM word_search").get().n, 4);
    assert.equal(
        refreshed.prepare("SELECT count(*) AS n FROM word_search_fts WHERE word_search_fts MATCH 'nyumba'").get().n,
        1,
    );
    refreshed.close();

    await assert.rejects(
        prepareSampleDatabase(path, {
            perspectives: [{ ...perspective, query: "SELECT w.term FROM words w" }],
        }),
        /must return an "id" column/,
    );
    const kept = new DatabaseSync(path);
    assert.equal(kept.prepare("SELECT count(*) AS n FROM word_search").get().n, 4);
    kept.close();
});

test("PMTiles validates options, quotes by argument arrays, and dry runs write nothing", async (t) => {
    const root = join(await fixture(t), "extensions with spaces");
    assert.deepEqual(parseOptions([]), { dryRun: false, maxzoom: 4, extension: "point_map" });
    for (const arg of [
        "--maxzoom=-1",
        "--maxzoom=27",
        "--maxzoom=2.5",
        "--extension=../escape",
        "--unknown",
    ]) {
        assert.throws(() => parseOptions([arg]));
    }
    const calls = [];
    const run = (command, args) => {
        calls.push([command, args]);
        if (args[0] === "version") return "pmtiles test";
        if (!args.includes("--dry-run")) writeFileSync(args[2], "tiles");
        return "";
    };
    const fetchImpl = async () => ({
        ok: true,
        json: async () => [{ key: "20250101.pmtiles" }, { key: "20260101.pmtiles" }],
    });
    await downloadWorldPmtiles(["--dry-run", "--extension=geo-filter"], { root, run, fetchImpl });
    assert.equal(existsSync(root), false);
    assert.deepEqual(calls[1], [
        "pmtiles",
        [
            "extract",
            "https://build.protomaps.com/20260101.pmtiles",
            join(root, "geo-filter", "assets", "world.pmtiles"),
            "--maxzoom=4",
            "--dry-run",
        ],
    ]);
    await downloadWorldPmtiles([], { root, run, fetchImpl });
    assert.equal(
        await readFile(join(root, "point_map", "assets", "world.pmtiles"), "utf8"),
        "tiles",
    );
    await assert.rejects(
        downloadWorldPmtiles(["--extension=geo-filter"], {
            root,
            run,
            fetchImpl: async () => ({ ok: true, json: async () => [] }),
        }),
        /No valid PMTiles builds/,
    );
    assert.equal(existsSync(join(root, "geo-filter")), false);
});
