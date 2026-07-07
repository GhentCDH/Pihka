# AGENTS.md

This file provides guidance to AI Agents when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server at http://localhost:3000 (browser-sync)
npm test             # Run Playwright tests
npm run test:ui      # Run Playwright tests with interactive UI

npm run vendorize                # Re-download vendored dependencies (core + per-extension vendor/ dirs)
npm run create-sample-db         # Recreate pihka/app/database/sample.db
npm run download-zenodo-dbs      # Download real-world Zenodo databases to pihka/app/database/
npm run download-world-pmtiles   # Download world PMTiles basemap to pihka/extensions/point_map/assets/
```

`just start` is an alias for `npm run dev`.

## Architecture

Pihka is a **zero-backend, static-hosting web app** that serves SQLite databases as interactive browser websites. There is no build step — browser-sync serves `pihka/` directly.

The UI should use only preact and Javascript. There is a clear separation in interaction with the database and the UI components which only react to formatted JSON and respond to new data from the data layer.

### Three-layer layout

The application specific assets, data, css, configuration ends up in the app directory. The core contains all reusable components. Extensions are optional reusable components that live in their own directory and vendor their own JS dependencies (see "Extensions" below).

The reusable code is split along the data/UI seam so the data engine can be lifted out and driven by a different UI: `core/js/utilities-data/` is everything needed to open a SQLite database and query it as JSON — SQLite access, SQL generation, schema annotation, config loading, asset-path resolution — and contains **no preact import**. `core/js/utilities-ui/` holds the Preact-dependent reactive plumbing (router, signals, prefs, the view registry, perspective normalization). Keep this boundary: never add a preact import under `utilities-data/`.

```
pihka/
  index.html          # Entry point; inline <script type="module">
  app/                # User-customizable content
    config.json       # App config (database path, name)
    database/         # SQLite .db/.sqlite files served as static assets
  core/               # Framework code (not user-modified)
    js/
      components/     # Preact components using h() hyperscript (no JSX)
      utilities-data/ # Reusable data layer — SQLite access, SQL, schema, config, asset paths (no preact)
      utilities-ui/   # Preact-dependent plumbing (router, signal, prefs, view-registry, cell-renderers, perspectives)
    stylesheets/      # PicoCSS base framework
    assets/stylesheets/base.css  # Custom CSS variables and overrides
    vendor/           # Vendored npm packages (downloaded by vendorize-deps.js)
      importmap.json  # Generated import map for vendored packages
  extensions/         # Optional reusable components, each with its own vendored deps
    iiif-viewer/      # IIIF manifest viewer based on TIFY (see its README.md)
      iiif-viewer-component.js  # Entry module: registers views/cell renderers
      js/  css/       # Extension code and styles
      deps.json       # The extension's npm deps, consumed by vendorize
      vendor/         # The extension's vendored deps (imported by relative path)
    point_map/        # MapLibre+PMTiles map views + location facet (see its README.md)
      point-map-component.js    # Entry module: registers map views + facet renderer
      js/  css/       # Map components (map-view, popup, bounds filter, shims)
      assets/         # world.pmtiles basemap, served statically
      deps.json  vendor/
```

### Routing

Routing is hash-based: routes live in the URL fragment (`/#/:lang/:perspective/:view`, detail `/#/:lang/:perspective/:id/:view`, global search `/#/:lang/search?q=...`, query params inside the fragment, e.g. `/#/en/works/table?bbox=...`). The server only ever sees a request for index.html, so deep links work on any static host (GitHub Pages, S3) without rewrite rules. `core/js/utilities-ui/router.js` owns all URL parsing/navigation; `redirectLegacyPathUrl()` migrates old path-style URLs to hash routes on hosts that still serve them. In-app links are plain `#/...` anchors built with `buildPath()` — the browser handles clicks natively.

### How SQLite works in the browser

The app fetches a `.sqlite` file over HTTP, then deserializes it into an in-memory SQLite instance using `sqlite3_deserialize` from `@sqlite.org/sqlite-wasm`. Queries run entirely in the browser via WebAssembly. No server-side SQL.

### Dependencies

Core's only runtime dependencies are **`preact` and `@sqlite.org/sqlite-wasm`**, vendored into `pihka/core/vendor/` rather than loaded from a CDN, ensuring long-term offline/archival availability. The import map in `index.html` resolves bare specifiers (e.g. `"preact"`) to these local paths. Everything else (maplibre-gl, pmtiles, tify, ...) belongs to extensions.

To update vendored deps: edit `package.json` dependencies, then run `npm run vendorize`. This regenerates `pihka/core/vendor/` and outputs an updated import map snippet. Use `npm run vendorize -- --extensions-only` to re-vendor extensions without touching (and version-bumping) core's vendor dir.

Extensions vendor their own dependencies separately: each `pihka/extensions/<name>/deps.json` maps a package name to a semver range, or to `{ "version": range, "include": ["extra/file-or-dir", ...] }` for files beyond the auto-detected entry point (CSS, translations, licenses). `npm run vendorize` downloads those into `pihka/extensions/<name>/vendor/<pkg>/`, wiping only that extension's `vendor/` dir. Extension code imports its deps by **relative path** (`./vendor/tify/dist/tify.js`), so the page import map never changes; bare imports *between* an extension's own deps (e.g. pmtiles importing `"fflate"`) are rewritten to relative paths by vendorize. Vendored extension deps are committed, same as core's.

**Never add additional dependencies to core**. The whole point of this software is to keep running and introducting additional dependencies is not acceptable. Javascript, SQLite and plain SQL should be used at to interact with the database. preact to build a reactive UI. No dependencies on build tools. Extensions are the one sanctioned place for extra runtime deps — optional, self-contained, vendored.

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

- Labels are strings or `{lang: string}` objects, resolved against the current URL language (then `en`, then the first language, then the raw name) by `localize()` in `core/js/utilities-data/table-config.js`.
- A top-level `"languages": ["en", "nl"]` config key enables the header language switcher; it rewrites the URL's lang segment and persists the choice in localStorage for routes without one.
- Column `type` overrides rendering: `url` → external link, `asset` → image from `app/assets/`, `number`/`date` → `Intl` formatting with the column's `format` options, `text` → plain. Without a type, image-looking paths still render as images (heuristic).
- `hidden` on a column removes it from all views and filters; `hidden` on a table removes it from the home grid and from related-object sections. Hidden lookup tables still resolve FK display names and facets — hiding is a display concern, **not access control**: the data remains in the published `.sqlite` file.
- `applyTableConfig()` annotates the schema metadata once at startup (`core/js/main.js`); components only ever see the annotated plain-JSON columns.

### Enrichment (full-text search)

At startup `runEnrichment()` (`core/js/utilities-data/enrichment/`) builds an external-content FTS5 index per table with text columns and an INTEGER primary key. The `enrichment.fts` config key selects the tokenizer:

```json
"enrichment": { "fts": "trigram" }
```

- `"trigram"` (default, also when the key is absent) — substring/autocomplete-style matching, `tokenize='trigram remove_diacritics 1'`. Queries shorter than 3 characters can't produce trigrams; the data layer treats them as "no search yet" instead of returning zero rows. FTS5 boolean/phrase syntax still works, but `pre*`, `column:`, and `NEAR` are pointless.
- `"unicode61"` — whole-word matching with the full FTS5 query syntax, `tokenize='unicode61 remove_diacritics 2'`.
- `false` — no FTS index; the search input renders disabled.

The chosen mode is annotated as `meta.tables[name].fts.mode` so the UI (search tooltip) and data layer can adapt. Unknown values warn and fall back to trigram.

Search input is passed to `MATCH` as a raw FTS5 query first; if FTS5 rejects it (its query grammar disallows punctuation like `.` in barewords), `queryTable` retries once with each term double-quoted as a literal phrase — punctuation just works, valid advanced syntax keeps full power.

When any table has an FTS index, the header shows a global search box (`core/js/components/global-search-input.js`); Enter navigates to `/#/:lang/search?q=...`, where `SearchView` (`core/js/components/search-view.js`) queries every searchable perspective's table via `store.queryTable` and renders the top matches as one small table per entity with "view all" links into the filtered list view.

### State management

Two kinds of state, two mechanisms:

- **Shareable state lives in the URL** — filters, sort, page, search, the active view. The URL is the message bus: mutations go through `navigate()`/`updateParams()` (`core/js/utilities-ui/router.js`), the router re-parses, and views re-derive everything from the route. Never duplicate this state elsewhere; that is what keeps every screen bookmarkable. `useUrlState` bundles all mutations into a single `actions` object that is passed down as one prop.
- **Device-local preferences live in `core/js/utilities-ui/prefs.js`** — one localStorage JSON object (`pihka-prefs`) exposed as signals (`getPref`/`setPref`/`usePref`). Keys: `theme`, `lang`, `view:<perspectiveId>`, `pageSize:<perspectiveId>`. Resolution is always **URL > stored pref > config default**, and prefs are conveniences only: without localStorage the site works identically (session-only memory).
- `core/js/utilities-ui/signal.js` is the deliberately tiny in-house signal primitive backing prefs (a value + subscribers + a `useSignalValue` hook). It is kept in-repo instead of vendoring `@preact/signals`, per the no-additional-dependencies rule.

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
- **Naming**: perspective `id` must not collide with table names, view ids (`table`, `cards`, `map`), language codes, or the reserved `search` segment (a table or perspective named `search` is unreachable — that URL renders the global search page). The `table` name is claimed — no auto card is generated for it.
- **Performance**: the view's GROUP BY re-runs on every query — fine in-memory at tens of thousands of rows; for large datasets precompute a real table in your publishing pipeline instead.
- Avoid passing lat/lon columns through a view unless you accept that map popups' detail links lead to "Row not found".

### Views and the view registry

All view types are defined in one place: `core/js/utilities-ui/view-registry.js`. The router, perspective normalization, and the view-toggle UIs all consult it — adding a view means one `registerView()` call, nothing else. Builtin views (list: `table`, `cards`; detail: `table`, `card`) are registered by `core/js/components/data-views/builtin-views.js` (imported by `main.js`); the `map` list/detail views come from the `point_map` extension when enabled.

Component modules can register custom views (the platform's extension point for research-specific renderers — text annotations, IIIF, custom maps):

1. Create e.g. `app/views.js`:
   ```js
   import { h } from "preact";
   import { registerView } from "../core/js/utilities-ui/view-registry.js";

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
2. List it in config: `"components": ["app/views.js"]` in `app/config.json` (the legacy `"views": "app/views.js"` string still works). A failing module logs a warning and the site boots with builtin views only.

List components receive `{ id, name, perspectiveId, columns, rows, sort, onSort, fkResolved, lang }`; detail components receive `{ tableName, columns, row, fkResolved, lang, perspectiveId }` (see typedefs in `view-registry.js`). Re-registering an existing `context`+`id` overrides the builtin renderer. Caveat: view ids share the URL segment namespace with row ids — registering a new view id changes how legacy `/{perspective}/{id}` URLs with that exact id are parsed.

### Extensions and the component registries

Extensions are the third layer: optional reusable components under `pihka/extensions/<name>/`, enabled per app via the `components` config key. **The design makes no distinction between components registered from core, extensions, or app** — one loading mechanism (`main.js` imports every module listed in `components`, fail-soft, before the schema is annotated), the same registries, referenced by name in config.

A component module can register into four registries:

- **Views** — `registerView()` in `core/js/utilities-ui/view-registry.js` (above).
- **Cell renderers** — `registerCellRenderer(type, component)` in `core/js/utilities-ui/cell-renderers.js` registers a Preact component for a column `type` name, and registers the type with the config validator (`registerDisplayType()` in `utilities-data/table-config.js`) so `"type": "<name>"` in a column config is accepted. `CellValue` renders such columns through the registered component in every builtin view; FK/`linkTo` columns still win, and registering a builtin type name (`url`, `asset`, ...) overrides the builtin rendering. Renderers receive `{ col, value, row, columns, fkResolved, lang, perspectiveId, imageHeight }`.
- **Facet renderers** — `registerFacetRenderer(id, { component, availableFor })` in `core/js/utilities-ui/facet-renderers.js` adds a facet block to the filter sidebar for tables where `availableFor(autoFilterMeta)` passes. Components receive `{ autoFilterMeta, filters, actions, lang }` (e.g. geo-filter's location facet reads `autoFilterMeta.geoMeta`, `filters._viewport`, and mutates via `actions.onFilterChange`).
- **Filter types** — `registerFilterType(type, def)` in `core/js/utilities-data/filter-registry.js` (no preact — data layer). Every filter kind is registered: core registers `search` (claims the `q` param; the FTS5 MATCH lives in `DataStore#queryTable`), `range` (`{col}_min`/`{col}_max`), and `multi` (`{col}=v1,v2`) in `utilities-data/builtin-filters.js`; the geo-filter extension registers `bounds` (`bbox=w,s,e,n`). A definition provides any of: `reservedParams`/`preservesParams` (URL param ownership), `decode(params, {filterMeta, facets})` / `encode(key, filter)` (URL codec), `buildSql(key, filter)` (WHERE fragment), and a `filterMeta(ctx)` hook run by `DataStore#getFilterMeta` that may reshape the facet metadata (geo-filter uses it to swap lat/lon range facets for `geoMeta`). `use-url-state.js` and `filter-sql.js` dispatch entirely through this registry; extensions mutate filters via the generic `actions.onFilterChange(key, typedFilter|null)`. Filters of unregistered types are inert — a `bbox` param without geo-filter does nothing.

Extension CSS is self-wired: the entry module calls `ensureStylesheet(href)` (`core/js/utilities-ui/stylesheets.js`, idempotent) with URLs built from its own `import.meta.url` — enabling the module in config is all the wiring needed.

If a config uses a type whose extension is **not** loaded, `applyTableConfig` warns "unknown type" and the column renders as plain text — nothing breaks. A table with lat/lon columns but no point_map extension simply has no map views or location facet.

The bundled extensions (each with its own README.md):

- `extensions/iiif-viewer/` — IIIF manifests via TIFY (AGPL-3.0). Configure a column as `{ "type": "iiif" }`; cells render as a badge linking to the row's detail page in the registered `iiif` detail view.
- `extensions/point_map/` — MapLibre + PMTiles (BSD-3) 🌍 map views for any table with numeric `lat`/`latitude` + `lon`/`lng`/`longitude` columns. Serves its own basemap from `assets/world.pmtiles`.
- `extensions/geo-filter/` — the `bounds` filter type + the location (viewport) facet for geo tables, with its **own** basemap copy in `assets/world.pmtiles` (per-extension basemaps are swappable). Independent of point_map: without geo-filter, `bbox` params are inert and lat/lon columns fall back to plain numeric range facets.

```json
"components": [
    "extensions/iiif-viewer/iiif-viewer-component.js",
    "extensions/point_map/point-map-component.js",
    "extensions/geo-filter/geo-filter-component.js"
],
"tables": { "works": { "columns": { "manifest": { "type": "iiif" } } } }
```

Extensions that vendor the same heavyweight dependency load it once per page: the maplibre UMD shim and the pmtiles protocol registration are guarded through globals (`js/maplibre-shim.js`, `js/pmtiles-protocol.js` in both map extensions), and identical vendored CSS is deduped via `ensureStylesheet`'s `key` option.

**Fault tolerance — core does not trust extensions or app modules.** The guarantees, enforced at the registration choke points (keep them intact when adding registry dispatch sites):

- **Load failures**: a component module that 404s, throws while loading, or hangs (`componentLoadTimeoutMs` config key, default 10000 ms) is warned about and skipped; boot continues with builtins.
- **Runtime throws**: every registered `component` is wrapped in an error boundary at registration (`core/js/utilities-ui/error-boundary.js`) — a crashing view/facet renders an inline `⚠ ... failed to render` fallback (cell renderers fall back to the raw value) and retries on new props; every `availableFor` predicate is guarded (throw → not offered); every filter-type callback (`decode`/`encode`/`buildSql`/`filterMeta`) is guarded (throw → that filter is skipped/inert, warned once per call). `buildWhereClause` additionally shape-checks SQL fragments before splicing them in.
- The net effect: basic viewing, paging, full-text search, and builtin range/multi filtering keep working whatever an extension does. Regression-tested by the `fault:` Playwright tests (route-interception fault injection — no repo file is broken).

Layer boundaries (audited, keep them): `utilities-data/` never imports preact or UI; core never imports from or names `extensions/` (not even in comments); extensions import core but never `app/` specifics. Core carries no geo knowledge — geographic filtering lives entirely in `extensions/geo-filter/` via the filter-type and facet-renderer registries.

### Scripts

Node.js utility scripts in `scripts/` run outside the browser context and use `node:fs`, `node:path` etc. They target `pihka/app/database/` and `pihka/app/assets/` as output directories.


