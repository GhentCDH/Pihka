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
 * Run with: node scripts/vendorize-deps.js
 */

import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const VENDOR_DIR = join(ROOT, "pihka/core/vendor");
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

async function vendorPackage(name, range) {
  // 1. Resolve version via unpkg package.json redirect
  console.log(`  Resolving ${name}@${range} ...`);
  const pkgJson = await fetchJson(`${UNPKG}/${name}@${range}/package.json`);
  const version = pkgJson.version;
  console.log(`  Resolved to ${name}@${version}`);

  // 2. Determine browser entry point: exports["."].browser → .import → module → main
  let entryPath;
  if (pkgJson.exports?.["."]?.browser) {
    entryPath = pkgJson.exports["."].browser;
  } else if (pkgJson.exports?.["."]?.import) {
    entryPath = pkgJson.exports["."].import;
  } else if (pkgJson.module) {
    entryPath = pkgJson.module;
  } else if (pkgJson.main) {
    entryPath = pkgJson.main;
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

  console.log(`  Downloading ${filesToDownload.length} file${filesToDownload.length > 1 ? "s" : ""} ...`);

  // 4. Download each file
  const pkgDir = join(VENDOR_DIR, name);
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
      vendorCssPath = `./pihka/core/vendor/${name}${cssPath}`;
    }
  }

  // 6. Download sub-exports (e.g. "preact/hooks" from exports["./hooks"])
  const subExports = {};
  if (pkgJson.exports) {
    for (const [key, value] of Object.entries(pkgJson.exports)) {
      if (key === "." || !key.startsWith("./")) continue;
      // Resolve browser entry for this sub-export
      let subPath;
      if (value?.browser) subPath = value.browser;
      else if (value?.import) subPath = value.import;
      else if (typeof value === "string") subPath = value;
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
      subExports[specifier] = `./pihka/core/vendor/${name}${subPath}`;
    }
  }

  return { name, version, importPath: `./pihka/core/vendor/${name}${entryPath}`, cssPath: vendorCssPath, subExports };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const pkgPath = join(ROOT, "package.json");
  const pkg = JSON.parse(
    (await import("node:fs")).readFileSync(pkgPath, "utf-8")
  );

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
}

main().catch((err) => {
  console.error("\nError:", err.message);
  process.exit(1);
});
