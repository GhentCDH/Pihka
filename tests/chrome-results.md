# Chrome DevTools MCP functional check — refactor

Executed on 2026-10-12 against `npm run test:browser`, using separate page
contexts at `http://localhost:3100/download/` and `/http-vfs/`. The launcher
served temporary deterministic data and local extension assets. Application
configuration and the published sample database were not modified for testing.

| Check | Download | HTTP VFS | Observed result |
|---|---|---|---|
| Initial list | Pass | Pass | 35 works, resolved author names |
| Full-text search | Pass | Pass | `Lighthouse` returns only To the Lighthouse |
| M2m plus range | Pass | Pass | Novel selection plus keyboard range adjustment persists `category_id=1&year_min=1905`; two matches |
| Cards and reload | Pass | Pass | Both selected works remain after switching/reloading |
| Sorting and pagination | Pass | Pass | Title ascending, page 2 has 10 rows; first is Archive volume 35 |
| Selection CSV interaction | Pass | Pass | Clicked download buttons; automated companion tests verify CSV contents |
| Language/theme/menu/footer | Pass | Pass | Theme changes, Dutch About page, preserved footer |
| Local IIIF | Pass | Pass | TIFY opens Local test manuscript using fixture manifest/image |
| Map popup | Pass | Pass | Marker opens registered detail table with Virginia Woolf and coordinates |
| Geographic filter | Pass | Pass | Location-map zoom updates `bbox`, narrows results to zero in selected empty region |
| Text annotations | Pass | Pass | Virginia Woolf highlighted, annotation relationship shown |
| Mobile viewport | Pass | Pass | 390px viewport, 390px document width; related table scrolls locally |

HTTP VFS also received an explicit FK-link/back-navigation check: the author
detail displayed 34 related works, then Back restored the sorted second page.
Both modes receive the same FK/detail/back checks in `browser-functionality.spec.js`.

## Transport evidence

- Download database request: HTTP **200**, `Content-Length: 4251648`, no `Range`
  request header. Chrome network request 72 in the download page session.
- HTTP VFS database request: HTTP **206**, `Range: bytes=0-1023`,
  `If-Match: "pihka-test-fixture-v1"`,
  `Content-Range: bytes 0-1023/4251648`, response length 1024. Chrome request 206
  in the HTTP page session. Further database requests also returned 206.
- Real worker loaded with `?opfs-disable`; automated headless tests additionally
  verify that HTTP mode never imports the download datasource.

## Console and visual evidence

No application render/query errors were observed in the completed flows.
Initial navigation requested an absent favicon (404). SQLite logged the expected
optional OPFS warning on hosting without isolation headers; the range adapter
also advised a smaller database page size for this 4096-byte fixture. Neither
warning prevented queries. Map checks had no console errors.

Chrome screenshots were captured and inspected inline for the local IIIF viewer
and 390px annotation layouts. The connector refused screenshot file destinations,
including the repository path, so no saved image files are claimed here. The
interaction outcomes and network headers above are the durable evidence; repeat
the documented workflow to regenerate screenshots.

One Chrome MCP owner performed the checks. A subagent's separate MCP server could
not attach because it contended for the same browser profile. Separate page
contexts isolate storage but do not resolve server-level profile contention.
Use one owner or separately configured browser profiles for parallel MCP work.

See [testing instructions](tests.md) for commands and the reusable MCP capability.


## Vendoring/scripts follow-up — 2026-10-12

After reproducing all six owners from verified locks, Chrome DevTools MCP checked
both local modes again (download at 390px, HTTP VFS at 1280px):

- Filled the full-text search with `Lighthouse`: both returned exactly one row,
  `To the Lighthouse`, with the query reflected in the URL.
- Opened the local IIIF detail view: TIFY rendered its canvas and loaded the local
  manuscript PNG with HTTP 200 in both modes.
- Opened authors/map: each mode rendered two canvases (view and location facet),
  two markers, and successful PMTiles 206 requests. Clicking a marker opened the
  Virginia Woolf detail popup.
- Opened annotated text: both rendered the person annotation and related row;
  document widths matched the 390px and 1280px viewports.
- Console inspection reported no errors in either page.
- Download request 315 returned HTTP 200 with Content-Length 4251648. HTTP VFS
  request 468 sent `Range: bytes=0-1023` and `If-Match`, receiving HTTP 206,
  Content-Length 1024 and `Content-Range: bytes 0-1023/4251648`.

Companion automated verification: 125 browser tests, 18 engine/architecture tests,
17 script tests, offline verification of six vendor owners, lint and typecheck.


## Dependency upgrades — 2026-10-12

Used fresh isolated Chrome contexts `pihka-updated-download` and
`pihka-updated-http` after vendoring. Also reloaded with cache bypass after
integration fixes.

- Both modes booted with 35 works; filling search with `Lighthouse` produced
  exactly one matching row and a shareable query URL.
- Annotated-text 1.1.1 rendered one highlight. Switching to the table and back
  restored exactly one highlight in both modes. Automated tests additionally
  clicked the actual highlight, followed its detail link and exercised back/remount.
- TIFY 0.36.2 rendered the local manuscript canvas and fetched the fixture PNG with HTTP 200.
- MapLibre reported version 6.14.0; each page loaded one shared ESM runtime,
  two canvases and two markers. Its local module worker loaded successfully with HTTP 200
  with the `?v=6.14.0` query; both basemaps used local range requests.
- Real mouse clicks and Enter activation opened the Virginia Woolf popup in each
  mode. Markers exposed button roles and tabindex 0 after the accessibility fix.
- Network inspection confirmed whole-file database HTTP 200 for download and actual
  database HTTP 206 ranges for HTTP VFS. Both consoles reported no errors.

Final companion automation: 129 browser tests passed, including isolated hosting
without OPFS workers and both map/annotation upgrade regressions; 35 Node tests,
checker/lint/types passed. Exact versions and sources are in
[dependency-update-results.md](dependency-update-results.md).
