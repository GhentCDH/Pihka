# Browser dependency update — 2026-10-12

Updated on `refactor` using `npm run vendorize -- --update`, followed by ordinary
locked reproduction with `npm run vendorize`. Core npm installation was synced
with `npm install --ignore-scripts --no-audit --no-fund`; mapping packages and
their transitive dependencies no longer belong in the npm development lock.

| Dependency | Previous vendored version | Installed version | Owner |
| --- | --- | --- | --- |
| @ghentcdh/annotated-text | 1.0.10 | 1.1.1 | text-annotations |
| Preact | 10.29.1 | 11.0.1 | core |
| MapLibre GL JS | 5.24.0 | 6.14.0 | both map extensions |
| PMTiles | 4.4.1 | 4.5.0 | both map extensions |
| TIFY | 0.35.0 | 0.36.2 | iiif-viewer |
| @sqlite.org/sqlite-wasm | 3.51.2-build9 / 3.51.2-build4 | 3.53.4-build2 | core / http-vfs |
| fflate | 0.8.3 | 0.8.3 | both map extensions |
| sqlite-wasm-http | 1.2.0 | 1.2.0 | http-vfs |
| lru-cache | 7.18.3 | 7.18.3 | http-vfs |

Stable release selection was checked against the npm registry's `latest` tags.
`fflate` and `sqlite-wasm-http` were already current. `lru-cache` 11.5.3 exists,
but the adapter declares `^7.18.2` and imports its default constructor; retain
7.18.3, the latest compatible version. Upgrading that transitive dependency across
four major versions is a separate adapter migration.

The user confirmed that “sql.js” meant the existing SQLite WASM dependency.
There is no `sql.js` package or undeclared import. Both browser WASM distributions
are explicitly manifested, locked, hashed and vendored; publishing scripts use
Node's built-in SQLite. No published database was regenerated.

## Integration changes

- Preact 11 uses new `.mjs` filenames; the core manifest generates both import maps.
- MapLibre 6 uses a native ES module and local module worker. Both extensions load
  one shared runtime lazily while keeping their own complete vendor copies.
  Clickable markers explicitly retain button semantics and Enter/Space activation.
- Annotated-text 1.1.1 includes `LICENCE`; its genuine MIT notice replaces the old
  provenance-only notice. Annotation and TIFY APIs remain compatible.
- SQLite's new OPFS variants require explicit initialization controls for the
  HTTP-only worker; isolated-host coverage protects this behavior.

Primary migration references: [Preact 11](https://preactjs.com/guide/v11/upgrade-guide/),
[MapLibre 6](https://github.com/maplibre/maplibre-gl-js/blob/v6.0.0/docs/guides/v5-to-v6-migration-guide.md),
[SQLite 3.53.4](https://sqlite.org/releaselog/3_53_4.html),
[annotated-text package](https://unpkg.com/@ghentcdh/annotated-text@1.1.1/package.json),
[TIFY release](https://github.com/tify-iiif-viewer/tify/releases/tag/v0.36.0).

## Verification

Final verification: **129 browser tests passed (31.1s), 18 engine/architecture
tests and 17 script tests passed**. Lint, TypeScript and offline verification of
all six vendor owners passed. Authored-file diff checks passed; upstream vendor
whitespace is preserved to retain verified hashes. Tests cover both actual
download/deserialization and HTTP range-backed SQLite, including FTS, SQL views,
filters, relationships, exports and lifecycle failures. Dependency-specific
checks exercise local map workers, shared runtime, popup/remount behavior and
annotation click navigation/remounts. Chrome evidence is recorded separately in
[chrome-results.md](chrome-results.md).
