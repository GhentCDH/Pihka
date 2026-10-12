import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile, readdir, rm } from "node:fs/promises";
import { renameSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { URL } from "node:url";
import { runVendorize } from "../../scripts/vendorize-deps.js";

const core = "pihka/core";
const extension = "pihka/extensions/example";
const manifest = (pkg, imports) => ({ [pkg]: { version: "^1.0.0", files: ["index.js", "LICENSE"], ...(imports ? { imports } : {}) } });

async function fixture(t) {
    const root = await mkdtemp(join(tmpdir(), "pihka-vendor-unit-"));
    t.after(() => rm(root, { recursive: true, force: true }));
    const put = async (path, value) => {
        await mkdir(dirname(join(root, path)), { recursive: true });
        await writeFile(join(root, path), typeof value === "string" ? value : JSON.stringify(value));
    };
    await put("package.json", { type: "module" });
    await put("pihka/index.html", '<html><script type="importmap">{"imports":{}}</script></html>');
    await put(`${core}/deps.json`, manifest("core-dep", { "core-dep": "index.js" }));
    await put(`${extension}/deps.json`, manifest("extra"));
    const requests = [];
    let version = "1.0.1";
    let corrupt = false;
    const fetchImpl = async url => {
        requests.push(String(url));
        const path = decodeURIComponent(new URL(url).pathname);
        if (path.endsWith("/package.json")) return new globalThis.Response(JSON.stringify({ version }));
        if (path.endsWith("/LICENSE")) return new globalThis.Response("MIT fixture license");
        if (path.endsWith("/index.js")) return new globalThis.Response(corrupt ? "corrupted upstream" : "export const answer = 42;\n");
        throw new Error(`Unexpected fixture request: ${url}`);
    };
    const run = (args = [], options = {}) => runVendorize({ root, args, fetchImpl, log() {}, ...options });
    return { root, put, requests, run, setVersion: value => { version = value; }, corrupt: () => { corrupt = true; } };
}

async function snapshot(root) {
    const result = {};
    for (const entry of await readdir(root, { withFileTypes: true })) {
        const path = join(root, entry.name);
        result[entry.name] = entry.isDirectory() ? await snapshot(path) : await readFile(path, "utf8");
    }
    return result;
}

test("updates resolve versions; ordinary runs reproduce locks without resolving ranges", async t => {
    const f = await fixture(t);
    await f.run(["--update"]);
    const initial = await snapshot(f.root);
    f.setVersion("1.9.0");
    f.requests.length = 0;
    await f.run();
    assert.deepEqual(await snapshot(f.root), initial);
    assert.ok(f.requests.length > 0);
    assert.ok(f.requests.every(url => url.includes("@1.0.1/")));
    await f.run(["--update"]);
    const lock = JSON.parse(await readFile(join(f.root, core, "deps.lock.json"), "utf8"));
    assert.equal(lock.packages["core-dep"].version, "1.9.0");
});

test("offline check validates installed bytes and manifests without networking", async t => {
    const f = await fixture(t);
    await f.run(["--update"]);
    const before = await snapshot(f.root);
    const noNetwork = { fetchImpl() { throw new Error("offline check used network"); } };
    await f.run(["--check"], noNetwork);
    assert.deepEqual(await snapshot(f.root), before);
    await f.put(`${extension}/vendor/extra/index.js`, "tampered");
    await assert.rejects(f.run(["--check"], noNetwork));
    await f.run();
    await f.put(`${extension}/deps.json`, manifest("changed"));
    await assert.rejects(f.run(["--check"], noNetwork));
});

test("upstream hash mismatch preserves all owners and locks", async t => {
    const f = await fixture(t);
    await f.run(["--update"]);
    const before = await snapshot(f.root);
    f.corrupt();
    await assert.rejects(f.run());
    assert.deepEqual(await snapshot(f.root), before);
});

test("partial download failure preserves every previously installed owner", async t => {
    const f = await fixture(t);
    await f.run(["--update"]);
    const before = await snapshot(f.root);
    await assert.rejects(f.run(["--update"], { fetchImpl: async url => {
        if (String(url).includes("extra@")) throw new Error("connection interrupted");
        if (String(url).endsWith("package.json")) return new globalThis.Response('{"version":"1.1.0"}');
        return new globalThis.Response("new core bytes");
    } }));
    assert.deepEqual(await snapshot(f.root), before);
});

test("selected extension changes no other owner or HTML import map", async t => {
    const f = await fixture(t);
    await f.run(["--update"]);
    const before = await snapshot(f.root);
    f.setVersion("1.9.0");
    await f.run(["--extension=example", "--update"]);
    const after = await snapshot(f.root);
    assert.deepEqual(after.pihka.core, before.pihka.core);
    assert.equal(after.pihka["index.html"], before.pihka["index.html"]);
    assert.notEqual(after.pihka.extensions.example["deps.lock.json"], before.pihka.extensions.example["deps.lock.json"]);
});

test("extensions-only does not read or rewrite core declarations", async t => {
    const f = await fixture(t);
    await f.run(["--update"]);
    await f.put(`${core}/deps.json`, "invalid JSON in unselected core");
    const before = await snapshot(join(f.root, core));
    f.requests.length = 0;
    await f.run(["--extensions-only"]);
    assert.deepEqual(await snapshot(join(f.root, core)), before);
    assert.ok(f.requests.every(url => !url.includes("core-dep")));
});

test("unrelated scoped operations ignore malformed map locks", async t => {
    const f = await fixture(t);
    for (const name of ["point_map", "geo-filter"]) {
        await f.put(`pihka/extensions/${name}/deps.json`, manifest("maplibre-gl"));
        await f.put(`pihka/extensions/${name}/deps.lock.json`, "{ malformed lock");
    }
    const mapsBefore = await Promise.all(["point_map", "geo-filter"].map(name => snapshot(join(f.root, "pihka/extensions", name))));
    await f.run(["--extension=example", "--update"]);
    await f.run(["--extension=example"]);
    await f.run(["--extension=example", "--check"], { fetchImpl() { throw new Error("offline check used network"); } });
    const mapsAfter = await Promise.all(["point_map", "geo-filter"].map(name => snapshot(join(f.root, "pihka/extensions", name))));
    assert.deepEqual(mapsAfter, mapsBefore);
    assert.ok(f.requests.every(url => !url.includes("maplibre-gl")));
});

test("invalid options and missing locks fail before network or output changes", async t => {
    const f = await fixture(t);
    const before = await snapshot(f.root);
    for (const args of [["--unknown"], ["--extension="], ["--extension=missing"], ["--update", "--check"], []]) {
        await assert.rejects(f.run(args));
        assert.deepEqual(await snapshot(f.root), before);
    }
    assert.equal(f.requests.length, 0);
});

test("generated and inline import maps agree and use page-relative paths", async t => {
    const f = await fixture(t);
    await f.run(["--update"]);
    const generated = JSON.parse(await readFile(join(f.root, core, "vendor/importmap.json"), "utf8"));
    const html = await readFile(join(f.root, "pihka/index.html"), "utf8");
    const inline = JSON.parse(html.match(/<script type="importmap">([\s\S]*?)<\/script>/)[1]);
    assert.deepEqual(inline, generated);
    assert.equal(generated.imports["core-dep"].replace(/^\.\//, ""), "core/vendor/core-dep/index.js");
    assert.equal(await readFile(join(f.root, "pihka", generated.imports["core-dep"]), "utf8"), "export const answer = 42;\n");
    await f.put("pihka/index.html", html.replace("./core/vendor/core-dep/index.js", "./wrong.js"));
    await assert.rejects(f.run(["--check"]));
});

test("installation failure rolls back already replaced owners", async t => {
    const f = await fixture(t);
    await f.run(["--update"]);
    const before = await snapshot(f.root);
    f.setVersion("1.9.0");
    let failed = false;
    await assert.rejects(f.run(["--update"], { renameImpl: (from, to) => {
        if (!failed && to === join(f.root, extension, "vendor")) {
            failed = true;
            throw new Error("simulated install failure");
        }
        return renameSync(from, to);
    } }));
    assert.equal(failed, true);
    assert.deepEqual(await snapshot(f.root), before);
});

test("checked patches are reproducible and an unmatched patch preserves existing output", async t => {
    const f = await fixture(t);
    await f.put(`${extension}/vendor-patches.json`, { "extra/index.js": [["answer = 42", "answer = 43"]] });
    await f.run(["--update"]);
    assert.equal(await readFile(join(f.root, extension, "vendor/extra/index.js"), "utf8"), "export const answer = 43;\n");
    await f.run();
    await f.put(`${extension}/vendor-patches.json`, { "extra/index.js": [["missing upstream code", "replacement"]] });
    const before = await snapshot(f.root);
    await assert.rejects(f.run(["--update"]));
    assert.deepEqual(await snapshot(f.root), before);
});

test("shared map globals cannot be installed with different resolved versions", async t => {
    const f = await fixture(t);
    for (const name of ["point_map", "geo-filter"]) {
        await f.put(`pihka/extensions/${name}/deps.json`, manifest("maplibre-gl"));
    }
    await f.run(["--update"]);
    const before = await snapshot(f.root);
    f.setVersion("2.0.0");
    await assert.rejects(f.run(["--extension=point_map", "--update"]));
    assert.deepEqual(await snapshot(f.root), before);
});
