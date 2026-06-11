# AGENTS.md

This file provides guidance to AI Agents when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server at http://localhost:3000 (browser-sync)
npm test             # Run Playwright tests
npm run test:ui      # Run Playwright tests with interactive UI

npm run vendorize                # Re-download vendored dependencies to pihka/core/vendor/
npm run create-sample-db         # Recreate pihka/app/database/sample.sqlite
npm run download-zenodo-dbs      # Download real-world Zenodo databases to pihka/app/database/
npm run download-world-pmtiles   # Download world PMTiles to pihka/app/assets/
```

`just start` is an alias for `npm run dev`.

## Architecture

Pihka is a **zero-backend, static-hosting web app** that serves SQLite databases as interactive browser websites. There is no build step — browser-sync serves `pihka/` directly.

The UI should use only preact and Javascript. There is a clear separation in interaction with the database and the UI components which only react to formatted JSON and respond to new data from the data layer.

### Two-layer layout

The application specific assets, data, css, configuration ends up in the app directory. The core contains all reusable components.

```
pihka/
  index.html          # Entry point; inline <script type="module">
  app/                # User-customizable content
    config.json       # App config (database path, name)
    database/         # SQLite .db/.sqlite files served as static assets
  core/               # Framework code (not user-modified)
    js/
      components/     # Preact components using h() hyperscript (no JSX)
      utilities/      # Shared utilities (router, data layer, config)
    stylesheets/      # PicoCSS base framework
    assets/stylesheets/base.css  # Custom CSS variables and overrides
    vendor/           # Vendored npm packages (downloaded by vendorize-deps.js)
      importmap.json  # Generated import map for vendored packages
```

### Routing

Routing is hash-based: routes live in the URL fragment (`/#/:lang/:perspective/:view`, detail `/#/:lang/:perspective/:id/:view`, query params inside the fragment, e.g. `/#/en/works/table?bbox=...`). The server only ever sees a request for index.html, so deep links work on any static host (GitHub Pages, S3) without rewrite rules. `core/js/utilities/router.js` owns all URL parsing/navigation; `redirectLegacyPathUrl()` migrates old path-style URLs to hash routes on hosts that still serve them. In-app links are plain `#/...` anchors built with `buildPath()` — the browser handles clicks natively.

### How SQLite works in the browser

The app fetches a `.sqlite` file over HTTP, then deserializes it into an in-memory SQLite instance using `sqlite3_deserialize` from `@sqlite.org/sqlite-wasm`. Queries run entirely in the browser via WebAssembly. No server-side SQL.

### Dependencies

Runtime dependencies (`preact`, `@sqlite.org/sqlite-wasm`) are vendored into `pihka/core/vendor/` rather than loaded from a CDN, ensuring long-term offline/archival availability. The import map in `index.html` resolves bare specifiers (e.g. `"preact"`) to these local paths.

To update vendored deps: edit `package.json` dependencies, then run `npm run vendorize`. This regenerates `pihka/core/vendor/` and outputs an updated import map snippet.

**Never add additional dependencies**. The whole point of this software is to keep running and introducting additional dependencies is not acceptable. Javascript, SQLite and plain SQL should be used at to interact with the database. preact to build a reactive UI. No dependencies on build tools.

### Components

- Preact components use `h()` hyperscript directly — no JSX, no transpilation needed.

### Table display configuration

The `tables` section of `app/config.json` configures how tables and columns display, keyed by table name. All keys are optional (opt-out model: everything shows by default, in schema order):

```json
"tables": {
    "works": {
        "label": { "en": "Works", "nl": "Werken" },
        "columns": {
            "title":    { "label": { "en": "Title", "nl": "Titel" } },
            "cover":    { "type": "asset", "label": "Cover" },
            "homepage": { "type": "url" },
            "year":     { "type": "number", "format": { "useGrouping": false } },
            "created":  { "type": "date", "format": { "dateStyle": "medium" } },
            "internal_notes": { "hidden": true }
        }
    },
    "audit_log": { "hidden": true }
}
```

- Labels are strings or `{lang: string}` objects, resolved against the current URL language (then `en`, then the first language, then the raw name) by `localize()` in `core/js/utilities/table-config.js`.
- A top-level `"languages": ["en", "nl"]` config key enables the header language switcher; it rewrites the URL's lang segment and persists the choice in localStorage for routes without one.
- Column `type` overrides rendering: `url` → external link, `asset` → image from `app/assets/`, `number`/`date` → `Intl` formatting with the column's `format` options, `text` → plain. Without a type, image-looking paths still render as images (heuristic).
- `hidden` on a column removes it from all views and filters; `hidden` on a table removes it from the home grid and from related-object sections. Hidden lookup tables still resolve FK display names and facets — hiding is a display concern, **not access control**: the data remains in the published `.sqlite` file.
- `applyTableConfig()` annotates the schema metadata once at startup (`core/js/main.js`); components only ever see the annotated plain-JSON columns.

### State management

Two kinds of state, two mechanisms:

- **Shareable state lives in the URL** — filters, sort, page, search, the active view. The URL is the message bus: mutations go through `navigate()`/`updateParams()` (`core/js/utilities/router.js`), the router re-parses, and views re-derive everything from the route. Never duplicate this state elsewhere; that is what keeps every screen bookmarkable. `useUrlState` bundles all mutations into a single `actions` object that is passed down as one prop.
- **Device-local preferences live in `core/js/utilities/prefs.js`** — one localStorage JSON object (`pihka-prefs`) exposed as signals (`getPref`/`setPref`/`usePref`). Keys: `theme`, `lang`, `view:<perspectiveId>`, `pageSize:<perspectiveId>`. Resolution is always **URL > stored pref > config default**, and prefs are conveniences only: without localStorage the site works identically (session-only memory).
- `core/js/utilities/signal.js` is the deliberately tiny in-house signal primitive backing prefs (a value + subscribers + a `useSignalValue` hook). It is kept in-repo instead of vendoring `@preact/signals`, per the no-additional-dependencies rule.

### Perspectives (multi-table views)

The `perspectives` section of `app/config.json` defines curated entry points backed by **plain SQL** — joins, aggregates, and the GROUP BY stay readable in the config, no DSL:

```json
"perspectives": [{
    "id": "author-overview",
    "label": { "en": "Author overview" },
    "table": "author_overview",
    "query": "SELECT a.id, a.name, COUNT(w.id) AS work_count, GROUP_CONCAT(w.title, '|' ORDER BY w.year) AS works FROM authors a JOIN works w ON w.author_id = a.id GROUP BY a.id",
    "default_sort": "name"
}]
```

At startup each query becomes `CREATE VIEW "<table>" AS <query>` on the in-memory database (transient, recreated per session). The view then behaves like any table: faceted, sorted, paginated, and configurable via `tables.<view-name>` (labels, types). A failing query is warned about and the perspective skipped — the rest of the site keeps working.

- **Multi-value columns**: aggregate with `GROUP_CONCAT(x, '|' ORDER BY y)` (`ORDER BY` inside aggregates needs SQLite ≥ 3.44 — the vendored wasm is 3.51; older local CLIs can't replay such queries) and configure the column as `{ "type": "list", "separator": "|", "limit": 3 }` — values render as chips collapsed to `limit` with a "+N more" toggle. List columns are not sortable.
- **Row links**: views have no PK/FK metadata, so configure `{ "linkTo": "authors" }` on the id column to link rows into the underlying table's detail pages. Detail routes *on* a view itself show "Row not found" by design.
- **Facets**: numeric passthrough columns get range facets automatically; typeless aggregate columns (COUNT, MIN…) get them when configured `"type": "number"`. Dropdown facets come from the perspective's `facets` config. No FK dropdowns and no full-text search on views.
- **Homepage**: configured perspectives appear under "Perspectives", remaining (unclaimed, non-hidden) tables under "Tables"; with no `perspectives` config the homepage shows tables only, as before.
- **Naming**: perspective `id` must not collide with table names, view ids (`table`, `cards`, `map`), or language codes. The `table` name is claimed — no auto card is generated for it.
- **Performance**: the view's GROUP BY re-runs on every query — fine in-memory at tens of thousands of rows; for large datasets precompute a real table in your publishing pipeline instead.
- Avoid passing lat/lon columns through a view unless you accept that map popups' detail links lead to "Row not found".

### Views and the view registry

All view types (list: `table`, `cards`, `map`; detail: `table`, `card`, `map`) are defined in one place: `core/js/utilities/view-registry.js`. The router, perspective normalization, and the view-toggle UIs all consult it — adding a view means one `registerView()` call, nothing else. Builtin views are registered by `core/js/components/data-views/builtin-views.js` (imported by `index.html`).

Apps can register custom views (the platform's extension point for research-specific renderers — text annotations, IIIF, custom maps):

1. Create e.g. `app/views.js`:
   ```js
   import { h } from "preact";
   import { registerView } from "../core/js/utilities/view-registry.js";

   registerView({
       id: "timeline",
       context: "list",            // or "detail"
       icon: "▤",
       paginated: false,           // non-paginated views receive ALL filtered rows
       availableFor: (columns) => columns.some(c => c.name === "year"),
       component: ({ columns, rows, fkResolved, lang, perspectiveId }) =>
           h("div", null, /* ... */),
   });
   ```
2. Point config at it: `"views": "app/views.js"` in `app/config.json`. A failing module logs a warning and the site boots with builtin views only.

List components receive `{ id, name, perspectiveId, columns, rows, sort, onSort, fkResolved, lang }`; detail components receive `{ tableName, columns, row, fkResolved, lang, perspectiveId }` (see typedefs in `view-registry.js`). Re-registering an existing `context`+`id` overrides the builtin renderer. Caveat: view ids share the URL segment namespace with row ids — registering a new view id changes how legacy `/{perspective}/{id}` URLs with that exact id are parsed.

### Scripts

Node.js utility scripts in `scripts/` run outside the browser context and use `node:fs`, `node:path` etc. They target `pihka/app/database/` and `pihka/app/assets/` as output directories.


