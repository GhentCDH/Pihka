/** Explicit, locked browser dependencies; no build step or package discovery. */
import {
    existsSync,
    mkdirSync,
    mkdtempSync,
    readFileSync,
    readdirSync,
    rmSync,
    writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { importMap, readOwner, replaceImportMap, selectOwners, sha256 } from "./vendor/manifest.js";
import { transformFile } from "./vendor/transforms.js";
import { installOutputs } from "./vendor/install.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const json = (value) => JSON.stringify(value, null, 4) + "\n";

function filesUnder(directory, prefix = "") {
    if (!existsSync(directory)) return [];
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const path = prefix + entry.name;
        if (entry.isSymbolicLink()) throw new Error(`Unexpected vendor symlink: ${path}`);
        return entry.isDirectory() ? filesUnder(join(directory, entry.name), path + "/") : [path];
    });
}

function checkOwner(owner) {
    const vendor = join(owner.directory, "vendor");
    const expected = [];
    for (const [name, pkg] of Object.entries(owner.lock.packages)) {
        for (const [file, hashes] of Object.entries(pkg.files)) {
            const path = `${name}/${file}`;
            expected.push(path);
            if (
                !existsSync(join(vendor, path)) ||
                sha256(readFileSync(join(vendor, path))) !== hashes.sha256
            )
                throw new Error(`${owner.id}: missing file or hash mismatch: ${path}`);
        }
    }
    if (owner.id === "core") expected.push("importmap.json");
    const actual = filesUnder(vendor).sort();
    if (JSON.stringify(actual) !== JSON.stringify(expected.sort()))
        throw new Error(`${owner.id}: unexpected vendor files; reproduce the locked manifest`);
}

function checkSharedVersions(root, owners) {
    if (!owners.some((owner) => owner.id === "point_map" || owner.id === "geo-filter")) return;
    const locks = new Map(owners.map((owner) => [owner.id, owner.lock]));
    for (const id of ["point_map", "geo-filter"]) {
        const path = join(root, "pihka/extensions", id, "deps.lock.json");
        if (!locks.has(id) && existsSync(path)) locks.set(id, JSON.parse(readFileSync(path)));
    }
    for (const name of ["maplibre-gl", "pmtiles"]) {
        const a = locks.get("point_map")?.packages?.[name]?.version;
        const b = locks.get("geo-filter")?.packages?.[name]?.version;
        if (a && b && a !== b)
            throw new Error(
                `Shared ${name} versions differ (${a}, ${b}); update both map extensions together`,
            );
    }
}

async function response(fetchImpl, url) {
    const result = await fetchImpl(url, { redirect: "follow" });
    if (!result.ok) throw new Error(`GET ${url} → ${result.status}`);
    return result;
}

async function stageOwner(owner, stage, fetchImpl, update) {
    const vendor = join(stage, owner.id, "vendor");
    mkdirSync(vendor, { recursive: true });
    const lock = {
        version: 1,
        manifestHash: owner.manifestHash,
        patchesHash: owner.patchesHash,
        packages: {},
    };
    for (const [name, definition] of Object.entries(owner.manifest)) {
        const version = update
            ? (
                  await (
                      await response(
                          fetchImpl,
                          `https://unpkg.com/${name}@${definition.version}/package.json`,
                      )
                  ).json()
              ).version
            : owner.lock.packages[name].version;
        if (typeof version !== "string" || !/^\d+\.\d+\.\d+(?:[-+][a-z0-9.-]+)?$/i.test(version))
            throw new Error(`Invalid resolved version for ${name}: ${version}`);
        const files = {};
        for (const file of definition.files) {
            const source = Buffer.from(
                await (
                    await response(fetchImpl, `https://unpkg.com/${name}@${version}/${file}`)
                ).arrayBuffer(),
            );
            const output = transformFile(
                source,
                owner.patches[`${name}/${file}`],
                `${name}/${file}`,
            );
            const hashes = { sourceSha256: sha256(source), sha256: sha256(output) };
            if (!update) {
                const expected = owner.lock.packages[name].files[file];
                if (
                    hashes.sourceSha256 !== expected.sourceSha256 ||
                    hashes.sha256 !== expected.sha256
                )
                    throw new Error(`${owner.id}: hash mismatch for ${name}/${file}`);
            }
            const target = join(vendor, name, file);
            mkdirSync(dirname(target), { recursive: true });
            writeFileSync(target, output);
            files[file] = hashes;
        }
        lock.packages[name] = { version, files };
    }
    owner.lock = lock;
    const lockFile = join(stage, owner.id, "deps.lock.json");
    writeFileSync(lockFile, json(lock));
    return [
        { source: vendor, target: join(owner.directory, "vendor") },
        { source: lockFile, target: join(owner.directory, "deps.lock.json") },
    ];
}

export async function runVendorize({
    root = ROOT,
    args = [],
    fetchImpl = globalThis.fetch,
    log = console.log,
    renameImpl,
} = {}) {
    const selection = selectOwners(root, args);
    const owners = selection.owners.map((owner) => readOwner(owner, selection));
    const core = owners.find((owner) => owner.id === "core");
    const map = core ? importMap(core.manifest) : null;
    const htmlPath = join(root, "pihka/index.html");
    const html = core ? readFileSync(htmlPath, "utf8") : null;
    // Validate the page before making any network request or preparing outputs.
    const updatedHtml = core ? replaceImportMap(html, map) : null;
    if (selection.check) {
        for (const owner of owners) checkOwner(owner);
        if (core) {
            const generated = JSON.parse(
                readFileSync(join(core.directory, "vendor/importmap.json")),
            );
            const inline = JSON.parse(
                html.match(/<script\s+type=["']importmap["']\s*>([\s\S]*?)<\/script>/)[1],
            );
            const equal = (a, b) =>
                JSON.stringify(Object.entries(a.imports || {}).sort()) ===
                JSON.stringify(Object.entries(b.imports || {}).sort());
            if (!equal(generated, map) || !equal(inline, map))
                throw new Error("Core import map differs from declared imports");
        }
        checkSharedVersions(root, owners);
        log(`Verified ${owners.length} dependency owners (offline).`);
        return;
    }
    const stage = mkdtempSync(join(root, ".vendor-stage-"));
    let preserveStage = false;
    try {
        const outputs = [];
        for (const owner of owners)
            outputs.push(...(await stageOwner(owner, stage, fetchImpl, selection.update)));
        checkSharedVersions(root, owners);
        if (core) {
            writeFileSync(join(stage, "core/vendor/importmap.json"), json(map));
            const page = join(stage, "index.html");
            writeFileSync(page, updatedHtml);
            outputs.push({ source: page, target: htmlPath });
        }
        installOutputs(outputs, { renameImpl });
        log(
            `Installed ${owners.length} dependency owners${selection.update ? " with updated locks" : " from locks"}.`,
        );
    } catch (error) {
        preserveStage = error instanceof AggregateError;
        if (preserveStage) log(`Recovery files retained at ${stage}`);
        throw error;
    } finally {
        if (!preserveStage) rmSync(stage, { recursive: true, force: true });
    }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    runVendorize({ args: process.argv.slice(2) }).catch((error) => {
        console.error(`Error: ${error.message}`);
        process.exitCode = 1;
    });
}
