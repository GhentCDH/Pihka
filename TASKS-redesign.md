# Pihka default look: typography, resin palette and browsing controls

Goal: a lighter, more readable default interface for any Pihka dataset. Large type
carries the page identity, resin is the single accent on warm paper, and the controls
that readers use most (search, filters, paging, theme, language) are quicker to reach.

Done means: reusable work lives in `core` and deployment content in `app`; engine,
extensions and bootstrap are unchanged; documentation matches; lint, typecheck,
engine/script/vendor checks and the full browser suite pass or fail only on the
recorded pre-existing items.

Constraints: plain JavaScript and Preact `h()`, no build step, no new JavaScript
dependencies. Core never names an extension or its cell types. The published
database changes only through `npm run prepare-sample-db`. Typefaces are
self-hosted static assets with their licences in `core/THIRD-PARTY-NOTICES.md`
(this supersedes the earlier "no new fonts" constraint in `TASKS-design.md`); the font
stack falls back to system fonts.

- [x] Design tokens: resin `#FFB700`, charcoal ink, warm paper, hairline rules; Inter Tight for titles, Instrument Sans for text; Pihka wordmark with a resin dot.
- [x] Header: logo, menu, search, and one registered `controls` slot (light/dark, fullscreen, segmented language switch). The theme follows the OS until the reader chooses.
- [x] Home page: title, description, search, *Views*, collapsible *Tables*; optional `site` configuration; footer with dataset information.
- [x] Browsing: typeable page number, typeable range values, filter state shown in the sidebar only, compact cards, labelled detail page.
- [x] Search: filter-sidebar search works on indexed perspective views (`fts: true`), which stay out of the global search.
- [x] Sample deployment: Author bibliography view indexed, About page replaced by the home description, `databaseVersion` bumped.
- [x] Tests updated and extended; documentation (README, AGENTS.MD, ARCHITECTURE.md, notices) updated.

## Findings

- Card summaries hard-coded two extension cell-type names; replaced by a whitelist of core display types so extension-registered types are excluded without being named.
- `base.css` accumulated overrides across iterations; duplicate rules were merged cascade-exactly and dead selectors and variables removed. A before/after screenshot set (9 pages, light and dark, 1440 and 390 px; 36 images) is pixel-identical.
- `npm run typecheck` reports two errors in `extensions/point_map/js/categories.js`, a file this work does not touch.
- `npm run test:scripts` and `npm run vendorize:check` fail in a Windows checkout with `core.autocrlf=true` because manifests and vendored files are hashed byte-for-byte. On a clean LF checkout of the base commit both pass (19/19 and "Verified 6 dependency owners").

## Log

- Baseline and final screenshots (9 pages, light and dark, 1440 and 390 px) are pixel-identical after the clean-up; a capture of unchanged code is also identical to itself, so the comparison is reliable.
- Browser suite, two full runs with `--workers=2`: 144 and 145 passed. The only failures are pre-existing: `app.spec.js` full-text preview and export download link (both runs) and the map-marker test, which also fails intermittently on the base commit (first run only).
- `npm run test:engine`: 20/20. `npm run lint`: clean. `npm run typecheck`: clean apart from the two `point_map` errors noted above. `git diff --check`: clean.
- `npm run test:scripts` 18/19 and `vendorize:check` fail only on the CRLF checkout (see Findings); both pass on a clean LF checkout of the base commit.
- Manual smoke: no horizontal overflow at 390 px on eight pages, Dutch home page, theme persists after reload, fullscreen button present, header search absent on the home page.
