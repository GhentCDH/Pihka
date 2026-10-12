// @ts-check
/**
 * Geo-filter extension: geographic viewport filtering for tables with
 * lat/lon columns. Registers the "bounds" URL codec (bbox=w,s,e,n)
 * and the "location" facet — a mini map whose
 * viewport acts as the filter, rendered on its own basemap served from
 * assets/world.pmtiles.
 *
 * Enable it like any component module:
 *
 *   "enginePlugins": ["extensions/geo-filter/geo-filter-engine.js"],
 *   "uiPlugins": ["extensions/geo-filter/geo-filter-component.js"]
 *
 * Independent of the point_map extension: either works without the other.
 * MapLibre and PMTiles are vendored under vendor/ but load only once per
 * page even when several map extensions are enabled (global guards in
 * js/maplibre-shim.js and js/pmtiles-protocol.js).
 */

import { h } from "preact";
import { boundsFilterType, VIEWPORT_KEY } from "./js/bounds-filter-type.js";
import MapBoundsFilter from "./js/map-bounds-filter.js";

export function register(api) {
api.stylesheet(new URL("./vendor/maplibre-gl/dist/maplibre-gl.css", import.meta.url).href, { key: "maplibre-gl-css" });
api.stylesheet(new URL("./css/maplibre-pico-reset.css", import.meta.url).href, { key: "maplibre-pico-reset" });
api.stylesheet(new URL("./css/geo-filter.css", import.meta.url).href);

api.registerFilterCodec("bounds", boundsFilterType);

// Location facet: the map viewport acts as a filter. The wrapper maps the
// generic facet contract onto the pure viewport-control props, and builds
// the typed "bounds" filter object for the generic onFilterChange action.
api.registerComponent({ kind: "facet", id: "location", supplemental: true,
    replacesRanges: meta => meta.geoMeta ? [meta.geoMeta.latCol, meta.geoMeta.lonCol] : [],
    availableFor: (autoFilterMeta) => !!autoFilterMeta?.geoMeta,
    component: ({ autoFilterMeta, filters, actions }) => h(MapBoundsFilter, {
        geoMeta: autoFilterMeta.geoMeta,
        activeBounds: filters[VIEWPORT_KEY] ?? null,
        onBoundsChange: (bounds) => actions.onFilterChange(VIEWPORT_KEY, bounds ? {
            type: "bounds",
            latCol: autoFilterMeta.geoMeta.latCol,
            lonCol: autoFilterMeta.geoMeta.lonCol,
            ...bounds,
        } : null),
    }),
});

}
