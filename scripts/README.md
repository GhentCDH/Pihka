# Maintenance scripts

These are development and publishing tools, not browser dependencies or a build
step. Use Node 22.13 or newer. Existing npm commands work from the repository root;
the underlying scripts resolve their inputs relative to their own locations.

## Reproducible vendoring

```sh
npm run vendorize                         # reproduce all locked files
npm run vendorize:check                   # verify installed files offline
npm run vendorize -- --extension=http-vfs  # reproduce only one owner
npm run vendorize -- --extensions-only    # leave core and index.html untouched
npm run vendorize -- --update             # explicitly resolve newer versions
```

Core and each extension own a `deps.json` and `deps.lock.json`. The manifest
declares version ranges and exact files; core also declares browser import names:

```json
{
  "preact": {
    "version": "^11.0.1",
    "files": ["dist/preact.mjs", "hooks/dist/hooks.mjs", "LICENSE"],
    "imports": {
      "preact": "dist/preact.mjs",
      "preact/hooks": "hooks/dist/hooks.mjs"
    }
  }
}
```

The lock records exact versions, source and installed SHA-256 hashes, and hashes
of the manifest and patch definitions. Ordinary vendoring never resolves ranges.
Missing or stale locks require a reviewed `--update`; whitespace changes in a
manifest also invalidate its hash. Review the resulting versions and files before
committing an update. `package-lock.json` controls npm development installation;
the owner locks control browser files. Keep core dependency names/ranges aligned
with `package.json`; Preact and SQLite remain its only runtime dependencies.

`vendor-patches.json` contains explicit, uniquely matching text replacements,
including imports between a single extension's vendored packages. There is no
entry-point guessing, bundling, implicit transitive dependency installation, or
automatic export crawling. Adding a package means declaring its required browser
files and any import rewrites, then testing it in the browser.

The CLI delegates declaration/lock validation to `vendor/manifest.js`, checked
patches to `vendor/transforms.js`, and replacement/rollback to `vendor/install.js`.
Every selected owner is downloaded and verified in a staging directory before
installation. Failed downloads or patches preserve all installed outputs. An
installation error rolls back replacements; if rollback itself fails, the error
reports the retained recovery directory. Avoid concurrent vendoring runs.

Core's generated `vendor/importmap.json` and the inline import map in
`pihka/index.html` come from the same declaration. Both maps contain URLs relative
to the served page, not the JSON file. Extensions continue using relative imports
and retain their own vendor directories. The two map extensions must lock the
same MapLibre and PMTiles versions because their runtime loaders share globals;
update both together with `--extensions-only --update` or a full update.

License files distributed in packages are included explicitly; owner notices
record licenses omitted from upstream npm distributions. Keep these notices under
review when updating versions. `--check` verifies hashes, missing/extra files,
declaration drift, import-map agreement and shared map versions without networking.

## Data and assets

| Command | Output and behavior |
| --- | --- |
| `npm run create-sample-db` | Builds from `scripts/data`, covers and text; prepares FTS/views in a temporary database, then replaces the sample. |
| `npm run prepare-sample-db` | Refreshes published FTS/views transactionally without regenerating rows. |
| `npm run download-dbs` | Streams external databases into temporary files; skips completed destinations. |
| `npm run download-covers` | Downloads the bounded demo cover selection; preserves matching and throttling rules. |
| `npm run download-full-text` | Downloads selected texts into source JSON for sample generation. |
| `npm run download-world-pmtiles -- --extension=geo-filter --maxzoom=4` | Extracts a basemap for the selected map extension; default owner is `point_map`, default zoom is 4. Requires the external `pmtiles` CLI. |

`lib/atomic-files.js` shares only atomic output/write and streamed downloading.
Domain-specific matching, limits and SQL stay in their scripts. Failed generation
or transfer never installs partial output. An existing database left incomplete
by an older script must be removed or repaired explicitly; existence alone cannot
prove that legacy files are complete. PMTiles `--dry-run` creates no directories
or files, but still queries build metadata and invokes the CLI's dry-run mode.

`test-browser-server.js` is an isolated development fixture server for download
and HTTP VFS. It is not deployed with the site. See [testing](../tests/tests.md).

## Verification

`npm run test:scripts` uses temporary directories, local HTTP or injected network
responses to verify locks, updates, offline checks, transformations, rollback,
downloads, sample publication and PMTiles arguments. It downloads no large assets
and does not modify the published sample. Run both browser datasource suites after
vendoring; matching hashes alone does not establish browser compatibility.

The browser uses `@sqlite.org/sqlite-wasm` (JavaScript glue, WebAssembly and its
helper file), locked separately for core and HTTP VFS. `sql.js` is not a dependency:
sample generation and publishing use Node's built-in SQLite. Keep both vendored
WASM copies covered by the same reproduction and transport tests.
