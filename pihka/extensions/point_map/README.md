# Point map extension

Renders rows with coordinate columns as markers on a [MapLibre GL](https://maplibre.org)
map with a self-hosted [PMTiles](https://protomaps.com) basemap. Viewport
*filtering* (the location facet + `bbox` URL param) is the separate
`geo-filter` extension — enable either or both.

## Usage

Enable the extension in `app/config.json`:

```json
{
    "components": ["extensions/point_map/point-map-component.js"]
}
```

Any table or perspective whose schema has numeric latitude/longitude columns
(named `lat`/`latitude` and `lon`/`lng`/`longitude`) then gets:

- a 🌍 **map list view** — all filtered rows as markers, popups showing the
  row with a "View details" link;
- a 🌍 **map detail view** — the single row's location.

Without the extension, geo tables simply have no map views.

## Basemap

The world basemap is served from `assets/world.pmtiles` — fully static, no
tile server. Refresh it with `npm run download-world-pmtiles` (requires the
`pmtiles` CLI). The map style in `js/map-view.js` targets the Protomaps
schema layers.

## Structure

`js/map-view.js` (shared map + style), `js/map-popup.js`,
`js/maplibre-shim.js` (loads the maplibre UMD bundle on demand),
`js/pmtiles-protocol.js`, `js/map-bounds-filter.js` (pure viewport control),
and the two registered views. The shared plumbing is deliberately importable
— future map extensions (e.g. a heat map) can build on it.

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
(BSD-3-Clause), and `fflate` (MIT, pmtiles' gzip fallback — vendorize
rewrites pmtiles' bare `fflate` import to a relative path). The extension
imports everything by relative path; the page import map is not involved.
