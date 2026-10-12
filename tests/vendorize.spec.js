import { test as base, expect } from "@playwright/test";
import { spawnSync } from "node:child_process";
import { copyFileSync, cpSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import process from "node:process";
import { URL } from "node:url";

const test = base.extend({
    directory: async ({}, use) => { // eslint-disable-line no-empty-pattern -- Playwright requires destructured fixture dependencies.
        const directory = mkdtempSync(join(tmpdir(), "pihka-vendorize-"));
        try {
            mkdirSync(join(directory, "scripts"));
            copyFileSync(new URL("../scripts/vendorize-deps.js", import.meta.url), join(directory, "scripts/vendorize-deps.js"));
            cpSync(new URL("../scripts/vendor", import.meta.url), join(directory, "scripts/vendor"), { recursive: true });
            const emptyHash = createHash("sha256").update("{}").digest("hex");
            const files = {
                "package.json": JSON.stringify({ type: "module", dependencies: { "core-sentinel": "1.0.0" } }),
                "no-network.mjs": 'globalThis.fetch = () => { throw new Error("Unexpected network request"); };',
                "pihka/core/vendor/importmap.json": '{"imports":{"sentinel":"unchanged"}}',
                "pihka/core/vendor/sentinel": "core stays untouched",
                "pihka/extensions/http-vfs/deps.json": "{}",
                "pihka/extensions/http-vfs/deps.lock.json": JSON.stringify({ version: 1, manifestHash: emptyHash, patchesHash: emptyHash, packages: {} }),
                "pihka/extensions/http-vfs/vendor/stale": "selected vendor is cleaned",
                "pihka/extensions/other/deps.json": "{}",
                "pihka/extensions/other/vendor/sentinel": "other extension stays untouched",
            };
            for (const [path, content] of Object.entries(files)) {
                mkdirSync(dirname(join(directory, path)), { recursive: true });
                writeFileSync(join(directory, path), content);
            }
            await use(directory);
        } finally {
            rmSync(directory, { recursive: true, force: true });
        }
    },
});

function snapshot(directory) {
    return readdirSync(directory, { recursive: true }).sort().map(path => {
        const fullPath = join(directory, path);
        const stat = statSync(fullPath);
        return [path, stat.ino, stat.mtimeMs, stat.mode, stat.isDirectory() ? null : readFileSync(fullPath, "utf8")];
    });
}

function run(directory, ...args) {
    const result = spawnSync(process.execPath, ["--import", "./no-network.mjs", "scripts/vendorize-deps.js", ...args], {
        cwd: directory, encoding: "utf8", timeout: 5000,
    });
    expect(result.error).toBeUndefined();
    return result;
}

for (const missingDirectory of [false, true]) {
    for (const selector of ["unknown", ""]) {
        test(`vendorize rejects ${selector || "empty"} selector with extensions directory ${missingDirectory ? "absent" : "present"}`, async ({ directory }) => {
            if (missingDirectory) rmSync(join(directory, "pihka/extensions"), { recursive: true });
            const before = snapshot(directory);
            for (const flags of [[], ["--extensions-only"]]) {
                const result = run(directory, ...flags, `--extension=${selector}`);
                expect(result.status, result.stderr).toBe(1);
                expect(result.stderr).toMatch(/extension/i);
                expect(result.stdout).not.toMatch(/Resolving|Cleaned/);
                expect(snapshot(directory)).toEqual(before);
            }
        });
    }
}

test("vendorize selection reproduces only the selected extension lock", async ({ directory }) => {
    const core = join(directory, "pihka/core");
    const other = join(directory, "pihka/extensions/other");
    const coreBefore = snapshot(core);
    const otherBefore = snapshot(other);
    const result = run(directory, "--extension=http-vfs");
    expect(result.status, result.stderr).toBe(0);
    expect(readdirSync(join(directory, "pihka/extensions/http-vfs/vendor"))).toEqual([]);
    expect(snapshot(core)).toEqual(coreBefore);
    expect(snapshot(other)).toEqual(otherBefore);
    expect(readFileSync(join(directory, "pihka/extensions/http-vfs/deps.json"), "utf8")).toBe("{}");
});
