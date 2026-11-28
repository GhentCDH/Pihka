# Point map extension

Renders rows with coordinate columns as markers on a [MapLibre GL](https://maplibre.org)
map with a self-hosted [PMTiles](https://protomaps.com) basemap. Viewport
*filtering* (the location facet + `bbox` URL param) is the separate
`geo-filter` extension — enable either or both.

## Usage

Enable the extension in `app/config.json`:

```json
{
    "uiPlugins": ["extensions/point_map/point-map-component.js"]
}
```

Any table or perspective whose schema has numeric latitude/longitude columns
(named `lat`/`latitude` and `lon`/`lng`/`longitude`) then gets:

- a 🌍 **map list view** — all filtered rows as markers, popups showing the
  row with a "View details" link;
- a 🌍 **map detail view** — the single row's location;
- optionally a ▦ **areas list view** (see [Area maps](#area-maps)).

Without the extension, geo tables simply have no map views.

## Colored markers

Set `colorBy` to a category column to give the map view's pins the color of
their row's category, with a legend:

```json
"options": {
    "point_map": {
        "colorBy": "lexical_type",
        "maxTypes": 10,
        "neutral": ["—"]
    }
}
```

The `maxTypes` most frequent categories get their own color, the rest share
a grey "other". `neutral` values are grey too and keep their own legend
entry. Rows with an empty category fall in "—". With clustering, each color
clusters on its own and its clusters take that color, so clusters of
different colors can overlap.

## Area maps

A table or perspective with a `colorBy` column can also get a ▦ **areas
list view**, in the style of a dialect atlas: every row is a dot in its
category's color, and the region around each location takes the color of
its nearest location's category. Switch it on with `areas`:

```json
"options": {
    "point_map": {
        "colorBy": "lexical_type",
        "maxTypes": 10,
        "neutral": ["no reconstruction"],
        "areas": { "maxDistanceKm": 150 }
    }
}
```

`"areas": true` uses the defaults. The view stays hidden without `areas` or
without a `colorBy` column. Colors, the "other" group and `neutral` work as
for colored markers (the same `categorize()` in `js/categories.js`), so the
map and areas views agree; `neutral` values are grey and draw no area. An
`areas` object can override `colorBy`, `maxTypes` and `neutral` for this view
only, and adds:

- `maxDistanceKm` (default 150) — how far an area reaches from a location;
- `maxSites` (default 5000) — above this many distinct locations only the
  dots are drawn, with a note in the legend.

A location with several rows takes its most frequent category. The regions
come from a lat/lon grid (at most 80,000 cells); the area layer is drawn
below the basemap water, so seas stay blue, and the view frames the central
90% of the locations so a few mistyped coordinates do not zoom it out. The
areas show where the data is, not real dialect borders. The calculation is
in `js/areas.js`.

## Basemap

The world basemap is served from `assets/world.pmtiles` — fully static, no
tile server. Refresh it with `npm run download-world-pmtiles` (requires the
`pmtiles` CLI). The map style in `js/map-layers.js` targets the Protomaps
schema layers.

## Structure

`js/map-layers.js` (style, per-color cluster sources and pins, without
Preact), `js/map-view.js` (shared Preact map), `js/map-popup.js`,
`js/maplibre-shim.js` (loads the MapLibre ES module on demand),
`js/pmtiles-protocol.js`, `js/categories.js` and `js/areas.js` (pure
category colors and area grid), `js/map-legend.js`, and the registered views
(`js/data-view-list-map.js`, `js/data-view-detail-map.js`,
`js/data-view-list-areas.js`). The shared plumbing is deliberately importable
— future map extensions (e.g. a heat map) can build on it. A custom UI that
does not use the component registry can draw the same clustered map with
`map-layers.js`, `maplibre-shim.js` and `pmtiles-protocol.js` alone (see the
example at the top of `map-layers.js`).

Both map views fill the remaining viewport height via core's `.fill-height`
class (see the public-contract comment in `core/assets/stylesheets/base.css`);
all map-specific styling lives in `css/point-map.css`.
`css/maplibre-pico-reset.css` (the Pico reset for MapLibre controls) is
byte-identical across the map extensions and loaded once per page via
`ensureStylesheet`'s `maplibre-pico-reset` key — never add
extension-specific rules to it.

## Dependencies

Vendored under `vendor/` (declared in `deps.json`, downloaded by
`npm run vendorize`): `maplibre-gl` (BSD-3-Clause), `pmtiles`
(BSD-3-Clause). The extension
imports everything by relative path; the page import map is not involved.

Module installation is explicit: the entrypoint exports `register(api)`. See [architecture and plugin migration](../../../ARCHITECTURE.md).

MapLibre 6 requires WebGL2. Its module worker is vendored beside the main
ES module and loads from the same static host; no CDN or blob worker is needed.

## Clustering

Set `tables.<table>.options.point_map.clustering` to `true`, `false`, or
`"auto"`. Omitted settings behave like `"auto"`: clustering starts above
1,000 visible points. A configured perspective can override the table's
`point_map` options through its own `options` bag. Cluster circles show counts
and zoom in when clicked; individual points open registered detail-table
popups. With clustering disabled, DOM markers also support keyboard activation.
Count labels use the bundled glyph asset.
