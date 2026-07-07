# IIIF viewer extension

Renders IIIF Presentation API v2/v3 manifests with [TIFY](https://tify.rocks).

## Usage

Enable the extension and mark the column holding manifest URLs in
`app/config.json`:

```json
{
    "components": ["extensions/iiif-viewer/iiif-viewer-component.js"],
    "tables": {
        "works": {
            "columns": {
                "manifest": { "type": "iiif" }
            }
        }
    }
}
```

- In list and detail views, `iiif` columns render as an **IIIF 📖** badge
  linking to the row's detail page in the `iiif` view.
- Detail pages of tables with an `iiif` column gain a 📖 view toggle that
  renders the manifest full-size in TIFY.
- Rows without a primary key (perspective views) fall back to an external
  link to the manifest JSON.

If the extension is not enabled but a column is configured as `"iiif"`,
the config warns and the column renders as plain text — nothing breaks.

Caveat: the view id `iiif` shares the URL segment namespace with row ids,
so a row whose id is literally `iiif` is unreachable via legacy
`/{perspective}/{id}` URLs.

## Dependencies

TIFY is vendored under `vendor/tify/` (declared in `deps.json`, downloaded
by `npm run vendorize`), including its runtime-fetched UI translations.
The extension imports it by relative path — the page import map is not
involved.

## License

TIFY is licensed under **AGPL-3.0** (see `vendor/tify/LICENSE`). Pihka core
is MIT; this extension is optional, and deployments that include it
distribute TIFY under the AGPL's terms.
