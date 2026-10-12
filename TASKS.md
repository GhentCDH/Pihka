# Tasks: Independent engine and registered UI

**Goal:** Separate database loading/querying from a replaceable, registered UI. All work is on `refactor`, based on `feature/http-vfs-datasource`.

**Done means:** Headless engine and registered UI work; download and real HTTP VFS pass contracts, parity, browser tests and Chrome MCP checks; dependency boundaries are enforced; documentation matches; tests/lint/typecheck/diff checks pass.

**Stop and ask only when:** A necessary decision needs user input, a failure remains unexplained after investigation, or destructive/unrelated/external changes are required.

**Constraints:** Plain JavaScript, no build step or new runtime dependencies, no redesign, no database or vendor changes. Download remains default. Preserve URLs and visible behavior. Migrate bundled plugin APIs without compatibility shims.

## Plan

- [x] Create `refactor` and this checklist — verified active branch.
- [x] Record baseline tests for both datasource implementations, lint and typecheck.
- [x] Extract engine startup/lifecycle, instance registries and immutable semantic schema — headless tests.
- [x] Separate presentation policy and URL codecs from query semantics — contract/visibility tests.
- [x] Add pure component registry and guarded Preact runtime — registration/failure tests.
- [x] Register default shell/pages/controls/views/cells/facets and remove embedded bypasses — override tests.
- [x] Migrate extensions, separate engine/UI plugin lists and composition — extension smoke tests.
- [x] Add dependency and JSON contract regression checks — automated checks.
- [x] Add test-only two-mode browser launcher with temporary fixtures — explicit download/HTTP URLs.
- [x] Run shared automated integration/parity suite using both real implementations.
- [x] Run Chrome DevTools MCP functionality checks for both modes; capture screenshots, console and network evidence.
- [x] Update architecture/API/paper/extension/testing documentation including Chrome MCP capability.
- [x] Obtain independent subagent reviews of engine, UI and test coverage; resolve blockers.
- [x] Run full tests, lint, typecheck and diff check; record evidence and final review.

## Contracts

`openDataset({ databaseUrl, config, plugins, onProgress })` returns `{ store, schema, close }`. Engine owns SQL, transport, relationships, search and semantic filters; no UI, routes, labels or widgets. UI overlays presentation without changing schema. Arrays cross the filter boundary. Engine and UI registries are instance-scoped.

UI registry stores `{ kind, id, context?, component, availableFor?, paginated? }`; kinds shell/page/control/view/cell/facet. Runtime dispatch owns Preact boundaries. Defaults and configured plugins install with synchronous `register(api)`, staged atomic registration, closed scopes and sealed registries. Engine SQL plugins and UI URL codecs are separate. Config uses `enginePlugins` and `uiPlugins`.

Preserve hidden FK labels, hidden junction m2m facets, hidden annotation behavior, aggregate numeric facets, internal FTS relation exclusion, static subdirectory URLs, and geo range controls when geo UI is absent. Embedded tables dispatch registered list/detail table with page/embedded presentation.

## Test matrix

Both actual sources: headless opening/query/close; schema/FK/related/m2m; range/multi/bounds/JSON roundtrip; sort/page/count/detail; published FTS/perspectives; list/detail/search/export; stale results/cleanup. Compare deterministic results on shared fixtures.

Download: omitted and explicit selection, whole-file deserialization, runtime FTS/views, no HTTP VFS assets, close during opening.

HTTP VFS: real ranges and worker, response/ETag validation, published features, read-only enforcement, timeouts/failures, no download fallback.

Chrome MCP: both modes, real clicks/fills for search/filter/sort/page/views/detail/related/back/reload/export/language/theme/pages/maps/annotations/IIIF; desktop/mobile snapshots; console and network inspection. Completed functionality checks and network verification are recorded in tests/chrome-results.md; the reusable capability is documented in tests/tests.md.

## Discovered

- Existing Set-valued filters lose filtering after JSON serialization.
- Search/related/map popup tables bypass registry.
- FTS internal markers and geo facet replacement require separate engine/UI policy.

## Blocked on user

None.

## Unconfirmed

None. Final automated verification passed; Chrome evidence is in tests/chrome-results.md.

## Log

- Implementation started on `refactor`; no preexisting worktree changes.

Update checkboxes immediately after verification, attach evidence, and reread this file after resuming. Final report: Blocked on me / Changed / Found, with separate datasource and Chrome outcomes.

- Baseline: untouched HEAD in /tmp/pihka-baseline: 112/113 passed; hardcoded port adjusted for isolated-hosting test, then 1/1 passed. Baseline lint/typecheck passed.
- Engine/headless parity: both real adapters pass initial 3 Playwright checks. Node engine/registry/import graph suite: 12/12 passed.
- First integrated full suite: 116 passed, one old side-effect fault-injection test failed; migrated injection to explicit installers.

- Integrated full Playwright suite: 125/125 passed (29.0s). Engine/registry/boundary Node tests 12/12; lint/typecheck pass.
- Chrome MCP completed both modes: full-file HTTP 200 versus real Range/206 verified; search/filter/cards/export/local IIIF/maps/annotations/mobile checked. See tests/chrome-results.md. Screenshots inspected inline; connector denied file saving.
- Independent reviews fixed config normalization robustness, BFCache cleanup listener, unknown cell fallback, cards duplicate section IDs, progress listener order and test-server PMTiles ranges. No unresolved blockers.
- Final verification: 125/125 Playwright tests; 18/18 engine, registry, presentation and dependency-boundary tests; lint, TypeScript and diff checks pass. Both actual download and HTTP VFS implementations exercised. Published databases, vendored dependencies and package-lock.json unchanged. All changes remain on refactor.
