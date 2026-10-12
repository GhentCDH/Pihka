# Vendoring and scripts

Goal: Reproducible, staged vendoring and simpler reliable maintenance scripts on refactor.

Done means: explicit manifests and verified locks reproduce existing versions; offline checks, failure tests, both browser transports, Chrome MCP, lint and types pass; documentation matches.

Stop and ask: unresolved user-only decisions, unexplained failures, destructive unrelated changes or external publication. No dependency upgrades, large asset downloads or published database regeneration.

- [x] Implement explicit manifests, owner locks, scoped CLI and staged installation.
- [x] Verify upstream bytes/current versions, checked patches, licenses and import maps.
- [x] Test reproduce/update/check and failure preservation with local fixtures.
- [x] Simplify sample generation, atomic downloads and PMTiles arguments; test temporary outputs.
- [x] Consolidate test-server range handling.
- [x] Run Node and full browser suites, lint and typecheck.
- [x] Repeat Chrome MCP checks for download/HTTP VFS and plugins.
- [x] Update docs and inspect final diff for unintended upgrades/data changes.

## Blocked on user
None.

## Unconfirmed
Annotated-text 1.0.10 declares MIT in its tagged source but ships no upstream copyright/license notice. The available provenance and explicit limitation are recorded in its THIRD-PARTY-NOTICES.md; no attribution was invented.

## Log
- Prior architecture work retained; scripts and vendor implementation delegated independently.

- Actual locked vendoring succeeded for all six owners; upstream bytes match existing runtime versions. Only PMTiles trailing newlines changed in retained JS; unused exports removed, package provenance and missing SQLite proxy/Preact license added.
- Independent review verified failure restoration and found unrelated map-lock coupling; fixed with a scoped-operation regression test.
- Shared Node helpers preserve destinations on download/generation failures. Actual source sample built in a temporary directory (1010 authors, 1743 works, 4363 junctions, 51 texts, 3 pages, 17 annotations); published sample unchanged.
- Final checks: 125 Playwright scenarios passed (34.9s); 18 engine/architecture tests and 17 script tests passed; offline vendor check, lint, typecheck and diff check passed. Initial sandbox Chromium launch was blocked; the authorized unsandboxed run passed.
- Chrome MCP follow-up verified search, IIIF, both map plugins, marker popup and annotations in both modes, with whole-file 200 versus actual Range/206 and no console errors. Evidence: tests/chrome-results.md.
- No dependency versions upgraded, no large assets downloaded, package-lock.json and committed databases unchanged.
