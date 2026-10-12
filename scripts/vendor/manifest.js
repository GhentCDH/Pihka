import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const object = (value) => value && typeof value === "object" && !Array.isArray(value);
const safePath = (path) =>
    typeof path === "string" &&
    path.length &&
    !path.includes("\\") &&
    path.split("/").every((part) => part && part !== "." && part !== "..");

export function selectOwners(root, args) {
    let selected;
    let extensionsOnly = false;
    let update = false;
    let check = false;
    const seen = new Set();
    for (const arg of args) {
        const key = arg.split("=")[0];
        if (seen.has(key)) throw new Error(`Duplicate option: ${key}`);
        seen.add(key);
        if (arg === "--extensions-only") extensionsOnly = true;
        else if (arg === "--update") update = true;
        else if (arg === "--check") check = true;
        else if (arg.startsWith("--extension=")) selected = arg.slice(12);
        else throw new Error(`Unknown option: ${arg}`);
    }
    if (update && check) throw new Error("--update and --check cannot be combined");
    const base = join(root, "pihka/extensions");
    const extensions = existsSync(base)
        ? readdirSync(base, { withFileTypes: true })
              .filter(
                  (entry) => entry.isDirectory() && existsSync(join(base, entry.name, "deps.json")),
              )
              .map((entry) => entry.name)
              .sort()
        : [];
    if (selected !== undefined && !extensions.includes(selected))
        throw new Error(`Unknown extension: ${selected || "(empty name)"}`);
    const owners = [];
    if (!extensionsOnly && selected === undefined)
        owners.push({ id: "core", directory: join(root, "pihka/core") });
    for (const name of extensions)
        if (selected === undefined || name === selected)
            owners.push({ id: name, directory: join(base, name) });
    return { owners, update, check };
}

export function readOwner(owner, { update = false } = {}) {
    const manifestBytes = readFileSync(join(owner.directory, "deps.json"));
    const manifest = JSON.parse(manifestBytes);
    if (!object(manifest)) throw new Error(`${owner.id}: invalid dependency manifest`);
    const paths = new Set();
    for (const [name, definition] of Object.entries(manifest)) {
        if (
            !/^(@[a-z0-9._-]+\/)?[a-z0-9._-]+$/i.test(name) ||
            !object(definition) ||
            typeof definition.version !== "string" ||
            !definition.version ||
            !Array.isArray(definition.files) ||
            !definition.files.length
        )
            throw new Error(`${owner.id}: invalid dependency ${name}`);
        for (const file of definition.files) {
            if (!safePath(file) || paths.has(`${name}/${file}`))
                throw new Error(`${owner.id}: invalid or duplicate file ${name}/${file}`);
            paths.add(`${name}/${file}`);
        }
        if (definition.imports !== undefined && !object(definition.imports))
            throw new Error(`${owner.id}: invalid imports for ${name}`);
        for (const [specifier, file] of Object.entries(definition.imports || {})) {
            if (!specifier || !definition.files.includes(file))
                throw new Error(`${owner.id}: import ${specifier} must target a declared file`);
        }
    }
    const patchPath = join(owner.directory, "vendor-patches.json");
    const patchBytes = existsSync(patchPath) ? readFileSync(patchPath) : Buffer.from("{}");
    const patches = JSON.parse(patchBytes);
    if (!object(patches)) throw new Error(`${owner.id}: invalid patches`);
    for (const [file, replacements] of Object.entries(patches)) {
        if (
            !paths.has(file) ||
            !Array.isArray(replacements) ||
            replacements.some(
                (pair) =>
                    !Array.isArray(pair) ||
                    pair.length !== 2 ||
                    typeof pair[0] !== "string" ||
                    !pair[0] ||
                    typeof pair[1] !== "string",
            )
        )
            throw new Error(`${owner.id}: invalid patch for ${file}`);
    }
    const manifestHash = sha256(manifestBytes);
    const patchesHash = sha256(patchBytes);
    let lock;
    if (!update) {
        const lockPath = join(owner.directory, "deps.lock.json");
        const stale = () =>
            new Error(
                `${owner.id}: missing or stale deps.lock.json; review the manifest and run vendorize --update`,
            );
        if (!existsSync(lockPath)) throw stale();
        lock = JSON.parse(readFileSync(lockPath));
        if (
            lock.version !== 1 ||
            lock.manifestHash !== manifestHash ||
            lock.patchesHash !== patchesHash ||
            !object(lock.packages) ||
            Object.keys(lock.packages).length !== Object.keys(manifest).length
        )
            throw stale();
        for (const [name, definition] of Object.entries(manifest)) {
            const pkg = lock.packages[name];
            if (
                !pkg ||
                typeof pkg.version !== "string" ||
                !/^\d+\.\d+\.\d+(?:[-+][a-z0-9.-]+)?$/i.test(pkg.version) ||
                !object(pkg.files) ||
                Object.keys(pkg.files).length !== definition.files.length
            )
                throw stale();
            for (const file of definition.files)
                if (
                    !/^[a-f0-9]{64}$/.test(pkg.files[file]?.sourceSha256) ||
                    !/^[a-f0-9]{64}$/.test(pkg.files[file]?.sha256)
                )
                    throw stale();
        }
    }
    return { ...owner, manifest, manifestHash, patchesHash, patches, lock };
}

export function importMap(manifest) {
    const imports = {};
    for (const [name, definition] of Object.entries(manifest)) {
        for (const [specifier, file] of Object.entries(definition.imports || {})) {
            if (Object.hasOwn(imports, specifier))
                throw new Error(`Duplicate import-map specifier: ${specifier}`);
            imports[specifier] = `./core/vendor/${name}/${file}`;
        }
    }
    return { imports };
}

export function replaceImportMap(html, map) {
    const pattern = /(<script\s+type=["']importmap["']\s*>)[\s\S]*?(<\/script>)/g;
    if ([...html.matchAll(pattern)].length !== 1)
        throw new Error("index.html must contain exactly one import map");
    return html.replace(
        pattern,
        (_match, start, end) =>
            `${start}\n${JSON.stringify(map, null, 4)
                .split("\n")
                .map((line) => `            ${line}`)
                .join("\n")}\n        ${end}`,
    );
}
