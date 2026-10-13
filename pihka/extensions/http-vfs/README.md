# HTTP Range Datasource

Optional, read-only SQLite access using HTTP byte ranges instead of downloading
the entire database before opening it. The normal downloading datasource remains
the default. This extension loads its own vendored SQLite WASM, HTTP VFS, and LRU
cache; it adds no runtime dependencies to core and requires no build step or CDN.

## Configuration

Add the module to your existing `enginePlugins` array and select the datasource:

```json
{
    "database": "app/database/catalog-v1.sqlite",
    "enginePlugins": ["extensions/http-vfs/http-vfs-component.js"],
    "datasource": {
        "type": "http-vfs",
        "options": {
            "cacheSize": 8192,
            "maxReadBytes": 1048576,
            "timeoutMs": 60000
        }
    }
}
```

Database paths are app-root-relative, root-absolute, or full HTTP(S) URLs.
`cacheSize` is the VFS cache budget in KiB. `maxReadBytes` bounds each requested
range, must be a power of two of at least 65536, and defaults to 1 MiB.
`timeoutMs` limits each active worker operation, not time waiting in its queue.
An operation timeout terminates the connection; reload to open a fresh session.
An explicitly selected provider never silently falls back to downloading.

The default mode requires an exposed strong ETag and sends `If-Match` with range
requests. If your host cannot provide one, set `"immutable": true` in `options`
**only when the URL identifies a permanently immutable database**. This is a
publisher guarantee, not a consistency check. Never replace that URL's contents;
publish a new versioned URL and update configuration instead. Even with an ETag,
versioned URLs avoid disrupting sessions with cached pages.

## Hosting

- Serve HEAD with status 200 and the database's exact `Content-Length`.
- Serve range GETs with status 206, exact `Content-Range`, and the requested bytes.
- Serve database range responses without HTTP compression (`Content-Encoding: identity`
  or no encoding). If a host compresses HEAD (as GitHub Pages does), the adapter
  probes bytes 0–99 to discover the uncompressed size and validators. Compressed
  range responses remain unsupported. Compressing JS/WASM is fine.
- Provide a strong `ETag` consistently on HEAD and GET, unless using the explicit
  immutable-URL option. Honor conditional requests and do not transform bytes.
- For cross-origin databases, allow the app origin, HEAD/GET and preflight OPTIONS;
  allow `Range`, `If-Match`, and any configured custom headers. Expose
  `Content-Length, Content-Range, Accept-Ranges, ETag, Last-Modified, Content-Encoding`.
- Optional `options.headers` supplies custom request headers. Range, conditional,
  and encoding headers are reserved. Anything in app configuration is public;
  do not publish secret credentials there.

No `SharedArrayBuffer`, COOP, or COEP headers are required. SQLite and synchronous
XHR run in a module worker, not on the UI thread. Browser support requires module
workers and WebAssembly. CSP must permit the local worker/WASM and database origin.
Hosts may still set isolation headers; the HTTP worker explicitly disables
SQLite's unrelated persistence VFSes through `sqlite3ApiConfig.disable.vfs`
before initialization, including the newer OPFS Web Locks variant.

Malformed responses, changed validators, and transport failures are rejected.
However, synchronous XHR buffers a response before it can be validated. A server
ignoring Range can send the **entire file** before rejection: `maxReadBytes` is
not a hard received-byte or memory limit. Verify your host's range behavior.

## Preparing a Database

Publish a self-contained snapshot, with writes stopped and any WAL checkpointed:

```sql
PRAGMA wal_checkpoint(TRUNCATE);
PRAGMA journal_mode = DELETE;
VACUUM;
```

Do this in the publishing pipeline, not against an actively written database.
WAL-format databases are rejected. Supported SQLite page sizes are 512 through
65536 bytes. Add indexes for filters, ordering, and foreign keys before publishing.

This datasource never creates FTS indexes or runtime perspective views. Publish
configured perspective tables/views in the database beforehand. Query-defined
perspectives without a published backing relation are warned about and skipped.
For large joined perspectives, set `"materialize": true`: `prepareSampleDatabase`
then publishes the query as a table with indexes on its facet fields and default
sort, so filters and counts use indexes instead of scanning the joined tables.

Search discovers compatible external-content FTS5 tables from the schema; no
specific index name is required. Use `detail=full` (the default), a `trigram` or
`unicode61` tokenizer, and a valid integer rowid mapping to the source table.
The source can also be a view, such as a perspective view. A view has no
implicit rowid, so `content_rowid` must name an INTEGER column (normally `id`).
`npm run prepare-sample-db` (`prepareSampleDatabase`) builds these indexes for
tables and perspective views alike. For example:

```sql
CREATE VIRTUAL TABLE works_fts USING fts5(
    title, description,
    content='works', content_rowid='id',
    tokenize='trigram remove_diacritics 1'
);
INSERT INTO works_fts(works_fts) VALUES('rebuild');
INSERT INTO works_fts(works_fts) VALUES('optimize');
```

Keep indexes consistent with their content before publication. Discovery does not
verify index freshness. Reduced-detail or otherwise incompatible indexes are not
advertised for search. Columns marked `fts: false` cannot be included in a reused
index; publish a compatible index excluding them. `enrichment.fts: false` disables
search. On the normal writable downloading source, missing/incompatible indexes
can still be built in memory, without overwriting published objects.

## API and Performance

Both sources expose `ready`, lifecycle events, awaitable `exec(sql, options)`,
`metadata()`, and `close()`. The portable exec options are `bind`,
`rowMode: "object" | "array"`, and synchronous `callback(row)`. The returned
array contains delivered rows. Returning `false` from a callback stops delivery
after that row; HTTP execution has already collected the results in its worker,
so this does not cancel the scan or transfer. Statement handles and other OO1
options are not part of the portable interface. Use SQL LIMIT to bound results.
For SQL batches, only the first result-bearing statement supplies rows. Stopping
a callback does not prevent later statements in the batch from executing.
`close()` is terminal for both sources; closing during opening rejects `ready`.

Database-I/O methods on DataStore are awaitable; `getSchema()` and `getFtsInfo()`
remain synchronous. Custom views using DataStore must await queries and protect
against outdated responses when props change. Core's `useQuery` hook does this
for bundled views. Discarding obsolete UI results does not interrupt an active
SQLite operation or remove all obsolete work from the queue.

Ranges do not guarantee small transfers. Exact counts, automatic numeric facet
bounds, full FK label lists, unindexed sorting, maps, aggregate views, and exports
can scan large portions of a database. Facet initialization currently precedes
the first list result. Tables larger than the cache may be read repeatedly.
Benchmark representative queries and bytes transferred on your actual dataset;
the extension is not a replacement for publishing appropriate indexes.

## Dependencies and Maintenance

`deps.json` pins the official SQLite WASM distribution at `3.53.4-build2`, the ISC-licensed
`sqlite-wasm-http` 1.2.0 VFS, and the ISC-licensed `lru-cache` 7.18.3 browser module.
Only the needed VFS modules are imported, not the upstream worker pool or bundler
entry. The separate worker uses the current official SQLite API.
It disables the unused browser-persistence VFSes through SQLite's documented
[`sqlite3ApiConfig.disable.vfs`](https://sqlite.org/wasm/doc/trunk/cookbook.md)
configuration, including both OPFS proxy workers on isolated hosts.

Core's download source and this extension vendor SQLite WASM independently using
the same manifest and lock workflow. The application does not use `sql.js`;
maintenance scripts use Node's built-in `node:sqlite`. `lru-cache` stays on the
latest 7.x release required by `sqlite-wasm-http` (`^7.18.2`); a newer major would
require an upstream dependency/API migration.

Regenerate only this extension with:

```bash
npm run vendorize -- --extension=http-vfs
```

`vendor-patches.json` applies checked, uniquely matching replacements: current
SQLite callback naming, read-only initialization/truncation, 65536-byte page
headers, bounded read-ahead, EOF cache accounting, and short-read/error reporting.
Bare dependency imports use the same checked patches to produce relative URLs. Transport validation is
authored separately in `validated-http.js`; it is installed only inside this
extension's worker. Review patches and rerun tests whenever upgrading dependencies.

```bash
npm test -- tests/http-vfs.spec.js tests/datasource-contract.spec.js
```

Module installation is explicit: the entrypoint exports `register(api)`. See [architecture and plugin migration](../../../ARCHITECTURE.md).

Vendoring reproduces `deps.lock.json` by default; add `--update` only for an
intentional upgrade. Verify locally with `npm run vendorize:check`. See
[maintenance tooling](../../../scripts/README.md) for locks and rollback.
