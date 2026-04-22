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
    pages/            # JSON page definitions (title + HTML content)
  core/               # Framework code (not user-modified)
    js/
      components/     # Preact components using h() hyperscript (no JSX)
      utilities/      # Shared utilities (e.g. pages.js for loading page JSON)
    stylesheets/      # PicoCSS base framework
    assets/stylesheets/base.css  # Custom CSS variables and overrides
    vendor/           # Vendored npm packages (downloaded by vendorize-deps.js)
      importmap.json  # Generated import map for vendored packages
```

### How SQLite works in the browser

The app fetches a `.sqlite` file over HTTP, then deserializes it into an in-memory SQLite instance using `sqlite3_deserialize` from `@sqlite.org/sqlite-wasm`. Queries run entirely in the browser via WebAssembly. No server-side SQL.

### Dependencies

Runtime dependencies (`preact`, `@sqlite.org/sqlite-wasm`) are vendored into `pihka/core/vendor/` rather than loaded from a CDN, ensuring long-term offline/archival availability. The import map in `index.html` resolves bare specifiers (e.g. `"preact"`) to these local paths.

To update vendored deps: edit `package.json` dependencies, then run `npm run vendorize`. This regenerates `pihka/core/vendor/` and outputs an updated import map snippet.

**Never add additional dependencies**. The whole point of this software is to keep running and introducting additional dependencies is not acceptable. Javascript, SQLite and plain SQL should be used at to interact with the database. preact to build a reactive UI. No dependencies on build tools.

### Components and pages

- Preact components use `h()` hyperscript directly — no JSX, no transpilation needed.
- Pages are defined as JSON files in `pihka/app/pages/<slug>.json` with `title` and either `content` (HTML string) or `contentLines` (array joined with `\n`). Load them via `loadPage(slug)` from `core/js/utilities/pages.js`.

### Scripts

Node.js utility scripts in `scripts/` run outside the browser context and use `node:fs`, `node:path` etc. They target `pihka/app/database/` and `pihka/app/assets/` as output directories.


