# Testing Pihka

Pihka has two real datasource implementations. Always verify both; a read-only
mock of the downloader does not exercise HTTP ranges or the HTTP VFS worker.
Tests create temporary SQLite fixtures and never modify published databases.

## Commands

```bash
npm run test:engine                # Node contracts, registries, dependency boundaries
npm run test:scripts               # Vendoring, atomic downloads, sample publishing, PMTiles
npm run vendorize:check            # Installed vendor hashes and import maps; offline
npm test                          # All Playwright scenarios; starts the static app server
npm run test:ui                    # Interactive Playwright runner
npm run lint
npm run typecheck

# Focused browser suites
npx playwright test tests/engine-headless.spec.js tests/datasource-parity.spec.js tests/browser-functionality.spec.js
npx playwright test tests/datasource-contract.spec.js tests/http-vfs.spec.js tests/published-data.spec.js
npx playwright test tests/ui-registry.spec.js
```

Run commands from the repository root. Use Node 22.13 or newer for `node:sqlite` in the
fixture server and its tests. Browser tests require the Playwright Chromium
installation. Run focused tests during changes, then the full suite once the
implementation is stable. Do not rewrite fixtures or snapshots to hide failures.

## Coverage by datasource

| Verification | Download | HTTP VFS |
|---|---|---|
| Engine initialization with UI/Preact requests blocked | Required | Required |
| Structural schema, FK names, relationships, m2m | Required | Required |
| Range/multi/bounds filtering and JSON roundtrips | Required | Required |
| Sorting, paging, counts, detail and facet queries | Required | Required |
| Published FTS and perspective views | Required | Required |
| List/detail/search/export and asynchronous results | Required | Required |
| Session cleanup and failures | Required | Required |
| Interactive Chrome MCP functional scenarios | Required | Required |

- `engine-headless.spec.js` opens the actual engines without UI imports.
- `datasource-parity.spec.js` compares shared fixture results across modes.
- `datasource-contract.spec.js` covers datasource lifecycle and download contracts.
- `http-vfs.spec.js` exercises the real worker, range responses, validators,
  protocol failures and read-only behavior; it checks that failures do not invoke
  a download fallback.
- `published-data.spec.js` verifies published FTS/views and runtime preparation
  distinctions. Download can create transient indexes/views; HTTP VFS uses
  published structures.
- `browser-functionality.spec.js` exercises both modes through the app.
- `map-dependencies.spec.js` and `annotation-dependencies.spec.js` verify local
  map workers/runtime sharing and plugin activation/cleanup after dependency updates.
- `ui-registry.spec.js` checks registered renderers in page and embedded contexts.
- `app.spec.js`, `mobile-layout.spec.js`, and fault scenarios retain the existing
  user-facing behavior checks. `vendorize.spec.js` checks dependency vendoring.
- `tests/architecture/` checks import boundaries/cycles, registry isolation,
  atomic installers and sealing. `tests/engine/` checks engine session contracts.
- `tests/scripts/` checks locked reproduction, explicit updates, scoped vendoring,
  patch/hash failures and installation rollback, interrupted transfers, sample
  FTS/view publication, and PMTiles argument handling in temporary directories.

Tests must distinguish default download selection from explicit download, verify
whole-file deserialization without HTTP VFS assets, and verify actual HTTP
`Range` requests with `206` responses for HTTP VFS. Parity comparisons use ordered
rows and raw exported values, not transport-specific network counts.

## Local functional-test launcher

```bash
npm run test:browser
```

The development-only server prints these default URLs:

- Download: <http://127.0.0.1:3100/download/>
- HTTP VFS: <http://127.0.0.1:3100/http-vfs/>

Set `PORT` to select another port. The launcher serves the same app under two
subdirectories with separate configuration and a temporary published SQLite
fixture. It includes pagination data, FK/m2m relationships, text annotations,
coordinates, published search/view structures, and a deterministic local IIIF
manifest/image. HTTP VFS uses real byte ranges. No shipped configuration or
database is edited. Stop with Ctrl-C to remove the temporary fixture.

## Chrome DevTools MCP capability

Chrome DevTools MCP is an available interactive browser-testing capability. Its
connection was verified with `list_pages` during this refactor. Connection alone
is not evidence that application scenarios passed; record actual outcomes in
`TASKS.md` with the test date, mode, URL, and relevant artifacts.

Use page listing/creation/navigation to select a dedicated test page. Use
accessibility snapshots to identify controls, then MCP click, fill, and key tools
for user interactions. Screenshots verify layout; console and network tools
reveal runtime and transport failures. Script evaluation is useful for assertions
and diagnostics, but should not replace the user interactions being tested.

Repeat this checklist at **each** launcher URL:

1. Open the home page and Works list; verify the datasource loaded successfully.
2. Search, combine numeric and categorical/m2m filters, clear filters, sort and
   paginate. Check result values/counts and hash-URL updates.
3. Switch table/cards/export views, open a detail and FK link, and inspect related
   rows. Check back/forward and reload preserve shareable state.
4. Trigger an export and verify its browser interaction. Automated tests inspect
   exported file contents.
5. Switch language/theme and inspect menu pages/footer.
6. Open author maps and a popup, exercise location bounds, open annotated text,
   and load the local IIIF manifest.
7. Check desktop and mobile layouts; capture representative snapshots/screenshots.
8. Inspect console errors and failed network requests. Download must fetch the
   database as a whole file; HTTP VFS must show range requests and `206` responses.
9. Record expected versus observed outcomes separately for each mode. Turn any
   reproducible new regression into an automated test.

Preserve browser evidence in a temporary/output artifact directory rather than
committing browser profiles or generated database files. Report blocked,
unexecuted, and failed scenarios explicitly; do not infer one mode passed from
the other mode's result.

## Recorded refactor check

The actual two-mode Chrome DevTools MCP results, network headers, screenshots observed inline, and connector limitations are recorded in [chrome-results.md](chrome-results.md).

Current dependency-update results and version decisions: [dependency-update-results.md](dependency-update-results.md).

Visual refinement and responsive regression evidence: [design-results.md](design-results.md).
