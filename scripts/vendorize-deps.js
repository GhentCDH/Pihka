/**
 * Vendorize browser dependencies from package.json via unpkg
 *
 * Downloads the minimum set of files needed for each package listed
 * under "dependencies" in package.json, structured for use from HTML
 * via an import map.
 *
 * How it works:
 *   1. Reads "dependencies" from package.json (devDependencies are ignored)
 *   2. Resolves each semver range to a concrete version via unpkg
 *   3. Reads the package's exports/module/main fields to find the browser entry point
 *   4. Downloads only the entry point + any companion assets (.wasm) from exports
 *   5. Writes vendor/importmap.json ready to paste into <script type="importmap">
 *
 * The vendor/ directory is wiped before each run so that removed or
 * updated dependencies don't leave stale files behind.
 *
 * Extensions vendor their own dependencies: each pihka/extensions/<name>/
 * may ship a deps.json mapping package name → semver range, or
 * → { "version": range, "include": ["extra/path", ...] } for files or
 * directories beyond the auto-detected entry point (e.g. translations).
 * Those are downloaded into pihka/extensions/<name>/vendor/<pkg>/ — the
 * extension imports them by relative path, so the page import map never
 * changes. Only that extension's vendor/ dir is wiped, never core's.
 *
 * Run with: node scripts/vendorize-deps.js
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const VENDOR_DIR = join(ROOT, "pihka/core/vendor");
const EXTENSIONS_DIR = join(ROOT, "pihka/extensions");
const UNPKG = "https://unpkg.com";

// ---------------------------------------------------------------------------
// Fetch helpers
// ---------------------------------------------------------------------------

async function fetchJson(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`GET ${url} → ${res.status}`);
  return res.json();
}

async function fetchBinary(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`GET ${url} → ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function fetchBinaryOptional(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GET ${url} → ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

// ---------------------------------------------------------------------------
// Per-package logic
// ---------------------------------------------------------------------------

/**
 * Resolve a conditional-exports value down to a single browser-friendly path string.
 * Modern packages often nest like:
 *   "import": { "types": "./x.d.ts", "default": "./x.js" }
 * or:
 *   { "browser": "./b.js", "import": "./i.js", "default": "./d.js" }
 * We walk the conditions in browser-preference order until we find a string path.
 */
function resolveExportEntry(value) {
  if (value == null) return null;
  if (typeof value === "string") return value;
  if (typeof value !== "object") return null;
  // Order matters: prefer browser → import → default → module → require.
  for (const key of ["browser", "import", "default", "module", "require"]) {
    if (key in value) {
      const resolved = resolveExportEntry(value[key]);
      if (resolved) return resolved;
    }
  }
  return null;
}

/**
 * Resolve an `include` path (file or directory) to concrete file paths.
 * unpkg's ?meta endpoint treats every path as a directory prefix and
 * answers { prefix, files: [{ path, ... }] } — empty for a file path,
 * which we then take as a literal file to download.
 */
async function resolveIncludePaths(name, version, includePath) {
  let normalized = includePath.startsWith("./") ? includePath.slice(1) : includePath;
  if (!normalized.startsWith("/")) normalized = "/" + normalized;
  const meta = await fetchJson(`${UNPKG}/${name}@${version}${normalized}?meta`);
  if (Array.isArray(meta.files) && meta.files.length > 0) {
    return meta.files.map((f) => f.path);
  }
  return [normalized];
}

async function vendorPackage(name, range, { vendorDir = VENDOR_DIR, mapPrefix = "./pihka/core/vendor", include = [] } = {}) {
  // 1. Resolve version via unpkg package.json redirect
  console.log(`  Resolving ${name}@${range} ...`);
  const pkgJson = await fetchJson(`${UNPKG}/${name}@${range}/package.json`);
  const version = pkgJson.version;
  console.log(`  Resolved to ${name}@${version}`);

  // 2. Determine browser entry point: exports["."] (nested-aware) → module → main
  let entryPath = resolveExportEntry(pkgJson.exports?.["."]);
  if (!entryPath) {
    if (pkgJson.module) entryPath = pkgJson.module;
    else if (pkgJson.main) entryPath = pkgJson.main;
  }

  if (!entryPath) {
    console.log(`  ⚠ No browser entry point found, skipping`);
    return { name, version, importPath: null };
  }

  // Normalise "./dist/foo.mjs" → "/dist/foo.mjs", "dist/foo.mjs" → "/dist/foo.mjs"
  if (entryPath.startsWith("./")) entryPath = entryPath.slice(1);
  else if (!entryPath.startsWith("/")) entryPath = "/" + entryPath;

  // 3. Collect files to download: entry point + companion assets (.wasm, .css)
  const filesToDownload = [entryPath];

  // Detect CSS path: prefer exports entries ending in .css, fall back to "style" field
  let cssPath = null;
  if (pkgJson.exports) {
    for (const [, value] of Object.entries(pkgJson.exports)) {
      const resolved = typeof value === "string" ? value : null;
      if (resolved?.endsWith(".wasm") || resolved?.endsWith(".css")) {
        let normalized = resolved.startsWith("./") ? resolved.slice(1) : resolved;
        if (!normalized.startsWith("/")) normalized = "/" + normalized;
        if (resolved.endsWith(".css")) cssPath = normalized;
        else filesToDownload.push(normalized);
      }
    }
  }
  if (!cssPath && pkgJson.style) {
    cssPath = pkgJson.style.startsWith("./") ? pkgJson.style.slice(1) : pkgJson.style;
    if (!cssPath.startsWith("/")) cssPath = "/" + cssPath;
  }

  // Extra files/directories requested by an extension's deps.json
  for (const includePath of include) {
    filesToDownload.push(...await resolveIncludePaths(name, version, includePath));
  }

  console.log(`  Downloading ${filesToDownload.length} file${filesToDownload.length > 1 ? "s" : ""} ...`);

  // 4. Download each file
  const pkgDir = join(vendorDir, name);
  for (const filePath of filesToDownload) {
    const fileUrl = `${UNPKG}/${name}@${version}${filePath}`;
    const dest = join(pkgDir, filePath);

    mkdirSync(dirname(dest), { recursive: true });
    const data = await fetchBinary(fileUrl);
    writeFileSync(dest, data);

    const kb = (data.length / 1024).toFixed(1);
    console.log(`    ${filePath}  (${kb} KB)`);
  }

  // 5. Download CSS if found (optional — skip if 404)
  let vendorCssPath = null;
  if (cssPath) {
    const cssUrl = `${UNPKG}/${name}@${version}${cssPath}`;
    const cssData = await fetchBinaryOptional(cssUrl);
    if (cssData) {
      const cssDest = join(pkgDir, cssPath);
      mkdirSync(dirname(cssDest), { recursive: true });
      writeFileSync(cssDest, cssData);
      const kb = (cssData.length / 1024).toFixed(1);
      console.log(`    ${cssPath}  (${kb} KB)`);
      vendorCssPath = `${mapPrefix}/${name}${cssPath}`;
    }
  }

  // 6. Download sub-exports (e.g. "preact/hooks" from exports["./hooks"])
  const subExports = {};
  if (pkgJson.exports) {
    for (const [key, value] of Object.entries(pkgJson.exports)) {
      if (key === "." || !key.startsWith("./")) continue;
      // Skip wildcard subpath exports like "./dist/*" — we can't enumerate them
      if (key.includes("*")) continue;
      // Resolve browser entry for this sub-export (nested-condition aware)
      let subPath = resolveExportEntry(value);
      if (subPath?.includes("*")) continue;
      if (!subPath || subPath.endsWith(".css") || subPath.endsWith(".wasm")) continue;
      if (subPath.startsWith("./")) subPath = subPath.slice(1);
      else if (!subPath.startsWith("/")) subPath = "/" + subPath;

      const subUrl = `${UNPKG}/${name}@${version}${subPath}`;
      const subDest = join(pkgDir, subPath);
      mkdirSync(dirname(subDest), { recursive: true });
      const subData = await fetchBinary(subUrl);
      writeFileSync(subDest, subData);
      const kb = (subData.length / 1024).toFixed(1);
      const specifier = `${name}${key.slice(1)}`; // "./hooks" → "preact/hooks"
      console.log(`    ${key}  →  ${subPath}  (${kb} KB)`);
      subExports[specifier] = `${mapPrefix}/${name}${subPath}`;
    }
  }

  return { name, version, entryPath, importPath: `${mapPrefix}/${name}${entryPath}`, cssPath: vendorCssPath, subExports };
}

// ---------------------------------------------------------------------------
// Extensions: pihka/extensions/<name>/deps.json → <name>/vendor/
// ---------------------------------------------------------------------------

/**
 * Normalise a deps.json entry — either "semver-range" or
 * { "version": "semver-range", "include": ["extra/path", ...] }.
 */
function parseDepEntry(entry) {
  if (typeof entry === "string") return { range: entry, include: [] };
  return { range: entry.version, include: entry.include ?? [] };
}

/**
 * Rewrite bare import specifiers inside an extension's vendored files to
 * relative paths. Extensions import their deps by relative path — the page
 * import map never sees them — so a vendored package importing a sibling
 * dependency by bare name (e.g. pmtiles importing "fflate") would fail to
 * resolve. Any bare specifier naming another dep in the same deps.json is
 * rewritten to the relative path of that dep's vendored entry point.
 */
function rewriteBareImports(vendorDir, entryFileByDep) {
  const files = [];
  (function walk(dir) {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.(js|mjs)$/.test(e.name)) files.push(p);
    }
  })(vendorDir);

  for (const file of files) {
    let src = readFileSync(file, "utf-8");
    let changed = false;
    for (const [dep, entryFile] of entryFileByDep) {
      if (file === entryFile) continue;
      const escaped = dep.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
      // Covers `from "dep"`, `import "dep"`, and dynamic `import("dep")`,
      // with either quote style and minified spacing.
      const pattern = new RegExp(`(\\bfrom\\s*|\\bimport\\s*\\(\\s*|\\bimport\\s+)(["'])${escaped}\\2`, "g");
      if (!pattern.test(src)) continue;
      let rel = relative(dirname(file), entryFile);
      if (!rel.startsWith(".")) rel = "./" + rel;
      src = src.replace(pattern, `$1$2${rel}$2`);
      changed = true;
      console.log(`    rewrote "${dep}" → "${rel}" in ${relative(vendorDir, file)}`);
    }
    if (changed) writeFileSync(file, src);
  }
}

async function vendorExtensions() {
  if (!existsSync(EXTENSIONS_DIR)) return;

  const extensions = readdirSync(EXTENSIONS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory() && existsSync(join(EXTENSIONS_DIR, e.name, "deps.json")))
    .map((e) => e.name);
  if (extensions.length === 0) return;

  for (const ext of extensions) {
    const deps = JSON.parse(readFileSync(join(EXTENSIONS_DIR, ext, "deps.json"), "utf-8"));
    const names = Object.keys(deps);
    console.log(`Extension ${ext}: ${names.length} dependenc${names.length === 1 ? "y" : "ies"} to vendorize\n`);

    // Scoped clean: only this extension's vendor dir.
    const vendorDir = join(EXTENSIONS_DIR, ext, "vendor");
    if (existsSync(vendorDir)) {
      rmSync(vendorDir, { recursive: true });
      console.log(`  Cleaned existing extensions/${ext}/vendor/ directory.\n`);
    }
    mkdirSync(vendorDir, { recursive: true });

    const entryFileByDep = new Map();
    for (const name of names) {
      const { range, include } = parseDepEntry(deps[name]);
      // No import map involvement: extensions import their vendored deps
      // by relative path (./vendor/<pkg>/...).
      const result = await vendorPackage(name, range, {
        vendorDir,
        mapPrefix: `./pihka/extensions/${ext}/vendor`,
        include,
      });
      if (result.entryPath) {
        entryFileByDep.set(name, join(vendorDir, name, result.entryPath));
      }
      console.log();
    }

    // Vendored packages may import each other by bare specifier — make
    // those imports resolvable without the page import map.
    rewriteBareImports(vendorDir, entryFileByDep);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  // --extensions-only: leave pihka/core/vendor untouched and vendor only
  // the extensions' deps.json dirs.
  if (process.argv.includes("--extensions-only")) {
    await vendorExtensions();
    return;
  }

  const pkgPath = join(ROOT, "package.json");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));

  const deps = pkg.dependencies || {};
  const names = Object.keys(deps);

  if (names.length === 0) {
    console.log("No dependencies in package.json — nothing to vendorize.");
    return;
  }

  console.log(`Found ${names.length} dependenc${names.length === 1 ? "y" : "ies"} to vendorize:\n`);
  for (const name of names) console.log(`  ${name} @ ${deps[name]}`);
  console.log();

  // Clean vendor/ for a fresh download
  if (existsSync(VENDOR_DIR)) {
    rmSync(VENDOR_DIR, { recursive: true });
    console.log("Cleaned existing core/vendor/ directory.\n");
  }
  mkdirSync(VENDOR_DIR, { recursive: true });

  // Process each dependency
  const imports = {};
  const cssPaths = [];

  for (const name of names) {
    const result = await vendorPackage(name, deps[name]);
    if (result.importPath) {
      imports[result.name] = result.importPath;
    }
    if (result.subExports) {
      Object.assign(imports, result.subExports);
    }
    if (result.cssPath) {
      cssPaths.push(result.cssPath);
    }
    console.log();
  }

  // Write importmap.json
  const importmap = { imports };
  const importmapPath = join(VENDOR_DIR, "importmap.json");
  writeFileSync(importmapPath, JSON.stringify(importmap, null, 2) + "\n");

  console.log(`Wrote ${importmapPath}\n`);
  console.log("Add this to your HTML:\n");
  console.log(`  <script type="importmap">`);
  console.log(`  ${JSON.stringify(importmap, null, 2)}`);
  console.log(`  </script>`);

  if (cssPaths.length > 0) {
    console.log("\nAlso link these CSS files:\n");
    for (const p of cssPaths) {
      console.log(`  <link rel="stylesheet" href="${p}">`);
    }
  }
  console.log();

  await vendorExtensions();
}

main().catch((err) => {
  console.error("\nError:", err.message);
  process.exit(1);
});
