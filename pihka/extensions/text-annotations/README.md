# Text-annotations extension

Renders stand-off text annotations — spans addressed by character
start/end offsets (person names, place names, linguistic tags, …) — with
[@ghentcdh/annotated-text](https://github.com/GhentCDH/annotated-text).

## Usage

Enable the extension and mark the column holding the text in
`app/config.json`:

```json
{
    "components": ["extensions/text-annotations/text-annotations-component.js"],
    "tables": {
        "text_pages": {
            "columns": {
                "body": { "type": "annotated-text" }
            }
        }
    }
}
```

- In list and detail views, `annotated-text` columns render as an
  **Annotated 🖍** badge linking to the row's detail page in the
  `annotated-text` view, where the text renders with its annotations
  highlighted. Rows without a primary key (perspective views) fall back
  to a short plain excerpt.
- Detail pages of tables with an `annotated-text` column gain a 🖍 view
  toggle. Clicking a highlight navigates to that annotation's own detail
  page.

## Where the annotations come from

The annotations relation is **auto-detected from schema metadata** — no
config, following the same philosophy as the automatic m2m facets: the
first table with a foreign key to the text's table whose schema also has
non-PK integer `start` and `end` columns is treated as the annotations
table. Offsets are **relative to the first character of the text column**
(the library's `startOffset` adapter option exists for datasets that
store offsets into a larger work).

Optional columns polish the result:

- a `type` TEXT column color-codes annotations from a fixed palette and
  adds a legend (e.g. `person` / `place`);
- a `label` TEXT column captions each annotation.

Everything missing degrades softly: no matching table, an empty result,
or a missing `type`/`label` column simply render less — down to the plain
text with no highlights. Hiding the annotations table in config removes
it from `queryRelated` and therefore disables the highlights too (the
same rule that removes related sections).

If the extension is not enabled but a column is configured as
`"annotated-text"`, the config warns and the column renders as plain
text — nothing breaks.

Caveat: the view id `annotated-text` shares the URL segment namespace
with row ids, so a row whose id is literally `annotated-text` is
unreachable via legacy `/{perspective}/{id}` URLs.

## Dependencies

`@ghentcdh/annotated-text` is vendored under
`vendor/@ghentcdh/annotated-text/` (declared in `deps.json`, downloaded
by `npm run vendorize`). The published bundle is fully self-contained —
its own dependencies (d3, lodash-es, …) are pre-bundled — so the
extension imports a single file by relative path; the page import map is
not involved.

## License

`@ghentcdh/annotated-text` is **MIT**-licensed, built at the
[Ghent Centre for Digital Humanities](https://www.ghentcdh.ugent.be/)
(no LICENSE file ships in the npm package; see the
[upstream repository](https://github.com/GhentCDH/annotated-text)).
