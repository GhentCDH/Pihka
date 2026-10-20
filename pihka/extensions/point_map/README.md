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
- a 🌍 **map detail view** — the single row's location.

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

The `maxTypes` most frequent categories get their own color (at most one per
palette color), the rest share a grey "other". `neutral` values are grey too
and keep their own legend entry. Rows with an empty category fall in "—".
With clustering, each color clusters on its own and its clusters take that
color, so clusters of different colors can overlap.

## Colors

`theme` sets the map's colors. Every key is optional; omitted keys keep the
defaults in `js/theme.js`, and `basemap` merges per layer:

```json
"options": {
    "point_map": {
        "colorBy": "lexical_type",
        "theme": {
            "palette": ["#00418a", "#f14e29", "#3d5940", "#f2a90c"],
            "other": "#b8b8b8",
            "pin": "#b35309",
            "outline": "#fff",
            "clusterText": "#fff",
            "basemap": {
                "water": "#aac7e8",
                "earth": "#f3eddc",
                "landcover": "#d6e2c3",
                "landuse": "#e6e0c8",
                "boundaries": "#888",
                "roads": "#cdb892"
            }
        }
    }
}
```

`palette` holds the category colors, most frequent category first; `other`
colors the remaining and neutral categories; `pin` colors pins and clusters
without a category (and the detail map); `outline` is the pin and cluster
outline and the dot in a pin; `clusterText` colors the cluster counts. Any
CSS color MapLibre accepts works. An invalid value is reported in the
console and replaced by its default. Like the other `point_map` options, the
theme is set per table or perspective; a map keeps the theme it was created
with.

## Basemap

The world basemap is served from `assets/world.pmtiles` — fully static, no
tile server. Refresh it with `npm run download-world-pmtiles` (requires the
`pmtiles` CLI). The map style in `js/map-layers.js` targets the Protomaps
schema layers; its colors come from the theme (see [Colors](#colors)).

## Structure

`js/map-layers.js` (style, per-color cluster sources and pins, without
Preact), `js/theme.js` and `js/categories.js` (colors, without MapLibre),
`js/map-view.js` (shared Preact map), `js/map-popup.js`,
`js/maplibre-shim.js` (loads the MapLibre ES module on demand),
`js/pmtiles-protocol.js`, `js/map-bounds-filter.js` (pure viewport control),
and the two registered views. The shared plumbing is deliberately importable
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
