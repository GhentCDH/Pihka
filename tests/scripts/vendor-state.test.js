import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";
import { runVendorize } from "../../scripts/vendorize-deps.js";

test("committed browser dependencies match owner locks and core dependency policy", async () => {
    const root = fileURLToPath(new URL("../../", import.meta.url));
    const read = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
    const manifest = read("../../pihka/core/deps.json");
    const { dependencies } = read("../../package.json");
    assert.deepEqual(Object.keys(manifest).sort(), ["@sqlite.org/sqlite-wasm", "preact"]);
    assert.deepEqual(
        Object.fromEntries(Object.entries(manifest).map(([name, definition]) => [name, definition.version])),
        dependencies,
    );
    await runVendorize({ root, args: ["--check"], log() {}, fetchImpl() {
        throw new Error("Committed-state verification must stay offline");
    } });
});
