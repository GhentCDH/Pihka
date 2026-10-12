# Dependency updates

Goal: Update browser dependencies using the new explicit vendoring workflow and verify the app on both actual SQLite transports.

Done means: current stable releases reviewed; supported updates installed through vendorize --update; locks/notices/docs match; offline verification, Node suites, browser suites and Chrome smoke checks pass.

Constraints: Preserve existing refactor work and published databases on refactor. No new core runtime dependency or build step. sql.js intent clarified separately because existing code uses official SQLite WASM and Node SQLite.

Stop and ask: unresolved user-only scope decisions or incompatible upgrades requiring a product decision. Resolve routine integration changes directly.

- [x] Inspect stable releases, current pins and compatibility changes.
- [x] Account for sql.js versus official SQLite WASM ownership.
- [x] Update manifests, vendored assets, package lock and provenance through new scripts.
- [x] Resolve integration regressions and verify locked reproduction/offline checks.
- [x] Run Node suites, lint/typecheck, both transport browser suites and Chrome plugin checks.
- [x] Record exact versions and final findings.

## Blocked on user
None. User confirmed updating existing SQLite WASM, without adding sql.js.

## Log
- Previous work preserved. Existing scripts have no sql.js import; browser download and HTTP VFS use separately vendored @sqlite.org/sqlite-wasm.

- Registry inspection found annotated-text 1.1.1, Preact 11.0.1, MapLibre 6.14.0, PMTiles 4.5.0, TIFY 0.36.2 and SQLite 3.53.4-build2. fflate 0.8.3 and sqlite-wasm-http 1.2.0 already current. HTTP adapter depends on lru-cache 7; retain its compatible major.

- New scripts installed all updates and reproduced all six locked owners successfully. npm install synchronized core dependencies and removed stale mapping dependencies from the npm lock (mapping stays extension-vendored).
- First full browser run: 124 passed, 3 failed. Two new map worker checks use inappropriate page-level network observation; one real regression starts opfs-wl worker on isolated hosts. Investigating/fixing before acceptance.
- Upstream vendored SQLite/annotation files contain whitespace; retain verified bytes and run diff whitespace checks on authored files only.

- Fixed real SQLite 3.53 isolated-host regression with documented sqlite3ApiConfig.disable.vfs settings; focused test passes. Removed obsolete OPFS query flag.
- Map worker test now handles its version query string and verifies real worker transfer/lifecycle plus PMTiles 206. MapLibre6 marker role change corrected with explicit button semantics and Enter/Space activation. Both focused map tests pass.
- Added two passing annotation click/back/remount tests. New release includes genuine LICENCE, resolving previous provenance gap.

- Final full suite: 129 passed in 31.1s; 18 engine/architecture + 17 script tests pass. Offline locks/importmaps verified for 6 owners; lint, cached TypeScript and authored diff checks pass. Vendor upstream whitespace intentionally retained.
- Chrome fresh contexts verified search, annotation remounts, local IIIF, MapLibre 6.14 ESM/worker loading, mouse/keyboard popups and no console errors in both modes. See tests/chrome-results.md and tests/dependency-update-results.md.
- No published database or basemap assets changed. All authorized updates complete; sql.js is intentionally absent per user clarification.
