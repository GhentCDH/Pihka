# Geo-filter extension

Geographic viewport filtering for any table or perspective with numeric
coordinate columns (`lat`/`latitude` + `lon`/`lng`/`longitude`).

## Usage

Enable the extension in `app/config.json`:

```json
{
    "components": ["extensions/geo-filter/geo-filter-component.js"]
}
```

Geo tables then get:

- a **location facet** in the filter sidebar — a mini map whose viewport
  filters the rows ("move the map to filter by location");
- the **`bounds` filter type** — persisted as `?bbox=w,s,e,n` in the URL,
  translated to SQL `BETWEEN` clauses (antimeridian-aware), registered in
  the core filter registry like the builtin search/range/multi types;
- lat/lon columns are removed from the automatic numeric range facets
  (the viewport filter replaces them).

Without the extension: no location facet, `bbox` URL params are inert,
and lat/lon columns fall back to plain numeric range facets.

Independent of the point_map extension — the map *views* and the viewport
*filter* are separate concerns; enable either or both.

## Own basemap

The mini map renders its own basemap from `assets/world.pmtiles`
(`js/basemap-style.js`). Swap that file — and the style, if the tile
schema differs — to give the filter a different basemap without affecting
any other extension. Refresh with `npm run download-world-pmtiles`
(targets point_map; copy the result here).

## Load-once guards

MapLibre and PMTiles are vendored under `vendor/` (see `deps.json`), but
several map extensions may be enabled at once: `js/maplibre-shim.js` and
`js/pmtiles-protocol.js` guard through globals so the maplibre UMD bundle
loads and the `pmtiles://` protocol registers only once per page,
whichever extension gets there first. The maplibre CSS is deduped via
`ensureStylesheet`'s `key` option.

## Licenses

`maplibre-gl` (BSD-3-Clause), `pmtiles` (BSD-3-Clause), `fflate` (MIT) —
license files vendored alongside.
