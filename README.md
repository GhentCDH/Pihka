# ⛁ Pihka - Sustainable Data Publishing

A sustainable data publishing platform for digital humanities research or other data. A proof-of-concept prototype.

## What it does

Pihka lets you publish SQLite databases as interactive, searchable websites. Drop in a `.sqlite` or '.db' file and get:

- **Faceted search** auto-generated from your database schema
- **Detail views** for individual records
- **Zero backend** — runs entirely in the browser, no server components which need active maintenance
- **Relationship views** — shows names or labels for linked columns.
- **Full text search** - To search accross columns. By default, a database is enriched with a trigram full text search index: queries match anywhere in the text, autocomplete-style. Tables with an integer primary key are indexed. A perspective view with an integer `id` column is indexed when the perspective sets `"fts": true`. A search box (large on the home page, in the header elsewhere) searches across all indexed tables at once, with results grouped per table; every list also has its own search in the filter sidebar. Set `"enrichment": {"fts": "unicode61"}` in `app/config.json` for whole-word matching with the richer FTS5 query syntax (`pre*`, `NEAR`, `column:word`), or `"fts": false` to skip indexing. For small datasets creating such index goes instantly; trigram indexes are somewhat larger and slower to build on big databases.
- **Typeable filters and paging** — range filters take typed minimum/maximum values as well as sliders, and the page number in the pagination control can be typed to jump.
- **Modern mapping solutions** — Optional MapLibre and PMTiles views use locally hosted basemaps without external services.

## Why

Digital humanities projects need data publishing solutions that:
- Work on any static hosting (GitHub Pages, S3, university servers)
- Remain accessible for **decades** without maintenance
- Use archival-friendly formats (SQLite is Library of Congress recommended)

## Deployment

Simply configure your app and copy the `pihka` folder contents to your http server.


## Quick start development

```bash
npm install
npm run dev
open http://localhost:3000
```

Open http://localhost:3000 and browse the included demo database.

The demo selects the optional HTTP VFS datasource and ships with prebuilt search
indexes and its author-bibliography view. Core still defaults to downloading when
`datasource` is omitted. After editing demo rows, run `npm run prepare-sample-db`
(Node.js 22.13 or newer) to refresh the published indexes without regenerating rows.
The sample database generator also runs this preparation step.

The development server supplies weak ETags, so the demo explicitly uses
`immutable: true`: keep the database unchanged throughout a browsing session and
reload after preparation. For deployment, publish a new versioned database URL
for each revision, or use a host with strong ETags and remove that option.

### Database version

Set `"databaseVersion": "2026.10.14"` in `app/config.json` to request the
database as `sample.db?v=2026.10.14`. Serve the file with a long cache lifetime
(the included `Caddyfile` does). After you update the database, change the
version string: browsers keep the cached copy until the version changes.

## Using your own data

1. Place your `.sqlite` file in `app/database`
2. Edit `app/config.json` to point to it
3. Customize facets and views as needed
4. Describe the dataset (see below)

### Describing your dataset

The home page opens with a title, a short description and the search box. Set them in `app/config.json`
(strings, or `{ "en": …, "nl": … }` maps; the description is trusted HTML, so it can contain links):

```json
"site": {
  "title": { "en": "Explore literary authors and their works" },
  "description": { "en": "<p>What this dataset contains and where it comes from.</p>" }
}
```

Without `site` the home page shows a generic title. Perspectives and tables can carry an optional
`description`, shown on their tile. Curated perspectives appear first, as *Views*; the remaining
tables sit in a *Tables* section that starts open (set `"tablesCollapsed": true` in `site` to
collapse it; hide helper tables with `"hidden": true`).

The footer carries the dataset information. Override `app/footer.json` (core ships a placeholder template) with
a `dataset` list, conventionally the preferred citation, the licence and a contact:

```json
{
  "dataset": [
    { "label": { "en": "Cite as" }, "value": { "en": "Author (2026). Title (version 1.0). Publisher. https://doi.org/…" } },
    { "label": { "en": "Licence" }, "value": "CC BY 4.0", "href": "https://creativecommons.org/licenses/by/4.0/" },
    { "label": { "en": "Contact" }, "value": "data@example.org", "href": "mailto:data@example.org" }
  ],
  "logos": [{ "src": "app/assets/logo/partner.svg", "alt": "Partner", "href": "https://example.org" }]
}
```

Menu pages (`app/menu.json`) remain available for longer texts such as instructions.

### Search in a perspective view

A SQL-view perspective is searchable from its own filter sidebar when it sets `"fts": true` and has an
integer `id` column. On the read-only HTTP VFS source the index must already be published: run
`npm run prepare-sample-db` after changing the config (and change `databaseVersion`). Indexed views are
left out of the global search so their records are not listed twice.

### Optional HTTP Range Access

The default datasource downloads the SQLite file and queries it in memory.
For larger, immutable published databases, the optional
[HTTP VFS datasource](pihka/extensions/http-vfs/README.md) reads pages through
HTTP range requests instead. It vendors its own dependencies, needs no build
step, and requires a range-capable host. Search indexes and perspective views
must already exist in the published database; this source is strictly read-only.

# credits

Styling: [Pico CSS](https://picocss.com/docs) via [Blades CSS' maintained Pico fork](https://blades.dev/css/pico/) (Pico itself is archived).

Typefaces: Inter Tight and Instrument Sans (SIL Open Font License), self-hosted; see `pihka/core/THIRD-PARTY-NOTICES.md`.


## License

MIT

## Architecture and testing

The framework-independent query engine lives in `core/engine`; the UI registry, Preact runtime, and registered defaults live in `core/ui`. Configure engine modules with `enginePlugins` and presentation modules with `uiPlugins`. See [architecture and migration](ARCHITECTURE.md).

Run `npm run test:engine` for contract/dependency checks and `npm test` for browser integration. `npm run test:browser` starts two deterministic local sites for interactive testing: plain download and real HTTP VFS. [Testing documentation](tests/tests.md) includes the Chrome DevTools MCP functional workflow and evidence checklist.

## Vendoring and maintenance

Use Node 22.13 or newer. `npm run vendorize` reproduces committed dependency locks;
`npm run vendorize:check` verifies them offline. Dependency upgrades are explicit:
`npm run vendorize -- --update`. Each extension remains self-contained.
See [script architecture and commands](scripts/README.md) for manifests, safe
downloads, sample generation and basemap selection. `npm run test:scripts` runs
the maintenance-tool regression tests without changing published data.

### Long text in tables and cards

Set a word limit per column in `app/config.json`, for example:

```json
"tables": {
  "works": {
    "columns": {
      "full_text": { "type": "text", "maxWords": 30, "fts": false }
    }
  }
}
```

`maxWords` accepts a positive integer. Lists show whole words followed by an
ellipsis and a localized link to the full record; detail views show the complete
text. Rows without a single primary key use inline expansion instead. Without a
valid `maxWords`, text columns retain their 300-character expand/collapse preview.
Queries, search and exports always use the original values.

Cell renderer plugins receive `context` (`list` or `detail`) and `detailHref`
(a record link or `null`) alongside their existing props. This is presentation
metadata only; the database engine remains independent of the UI.

Desktop table browsing uses the screen below the header, with sticky column
headings and scrolling rows. The footer is reachable below this workspace.
Small screens and short windows retain normal page flow; wide tables can scroll
horizontally when wrapping alone cannot fit their columns.
