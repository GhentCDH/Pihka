# Pihka


A sustainable data publishing platform for digital humanities research. A proof-of-concept prototype.

## What it does

Pihka lets you publish SQLite databases as interactive, searchable websites. Drop in a `.sqlite` or '.db' file and get:

- **Faceted search** auto-generated from your database schema
- **Detail views** for individual records
- **Zero backend** — runs entirely in the browser, no server components which need active maintenance
- **Relationship views** — shows names or labels for linked columns.
- **Full text search** - To search accross columns. By default, a database is enriched with a full text search index. For small datasets creating such index goes instantly.
- **Modern mapping solutions** - To show interactive, flexible maps without relying on external services. Technically a solution with protomaps and maplibre-gl is envisioned.

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

## Using your own data

1. Place your `.sqlite` file in `app/database`
2. Edit `app/config.json` to point to it
3. Customize facets and views as needed

# credits

https://picocss.com/docs


## License

MIT

