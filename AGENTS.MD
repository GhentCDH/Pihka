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


