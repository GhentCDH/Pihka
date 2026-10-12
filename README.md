# ⛁ Pihka - Sustainable Data Publishing

A sustainable data publishing platform for digital humanities research or other data. A proof-of-concept prototype.

## What it does

Pihka lets you publish SQLite databases as interactive, searchable websites. Drop in a `.sqlite` or '.db' file and get:

- **Faceted search** auto-generated from your database schema
- **Detail views** for individual records
- **Zero backend** — runs entirely in the browser, no server components which need active maintenance
- **Relationship views** — shows names or labels for linked columns.
- **Full text search** - To search accross columns. By default, a database is enriched with a trigram full text search index: queries match anywhere in the text, autocomplete-style. A search box in the header searches across all indexed tables at once, with results grouped per table. Set `"enrichment": {"fts": "unicode61"}` in `app/config.json` for whole-word matching with the richer FTS5 query syntax (`pre*`, `NEAR`, `column:word`), or `"fts": false` to skip indexing. For small datasets creating such index goes instantly; trigram indexes are somewhat larger and slower to build on big databases.
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
indexes and its author-overview view. Core still defaults to downloading when
`datasource` is omitted. After editing demo rows, run `npm run prepare-sample-db`
(Node.js 22.13 or newer) to refresh the published indexes without regenerating rows.
The sample database generator also runs this preparation step.

The development server supplies weak ETags, so the demo explicitly uses
`immutable: true`: keep the database unchanged throughout a browsing session and
reload after preparation. For deployment, publish a new versioned database URL
for each revision, or use a host with strong ETags and remove that option.

## Using your own data

1. Place your `.sqlite` file in `app/database`
2. Edit `app/config.json` to point to it
3. Customize facets and views as needed

### Optional HTTP Range Access

The default datasource downloads the SQLite file and queries it in memory.
For larger, immutable published databases, the optional
[HTTP VFS datasource](pihka/extensions/http-vfs/README.md) reads pages through
HTTP range requests instead. It vendors its own dependencies, needs no build
step, and requires a range-capable host. Search indexes and perspective views
must already exist in the published database; this source is strictly read-only.

# credits

https://picocss.com/docs


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
