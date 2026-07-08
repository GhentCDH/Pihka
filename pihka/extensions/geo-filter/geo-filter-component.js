/**
 * Geo-filter extension: geographic viewport filtering for tables with
 * lat/lon columns. Registers the "bounds" filter type (bbox=w,s,e,n URL
 * param → SQL BETWEEN clauses) and the "location" facet — a mini map whose
 * viewport acts as the filter, rendered on its own basemap served from
 * assets/world.pmtiles.
 *
 * Enable it like any component module:
 *
 *   "components": ["extensions/geo-filter/geo-filter-component.js"]
 *
 * Independent of the point_map extension: either works without the other.
 * MapLibre and PMTiles are vendored under vendor/ but load only once per
 * page even when several map extensions are enabled (global guards in
 * js/maplibre-shim.js and js/pmtiles-protocol.js).
 */

import { registerFilterType } from "../../core/js/utilities-data/filter-registry.js";
import { registerFacetRenderer } from "../../core/js/utilities-ui/facet-renderers.js";
import { ensureStylesheet } from "../../core/js/utilities-ui/stylesheets.js";
import { h } from "preact";
import { boundsFilterType, VIEWPORT_KEY } from "./js/bounds-filter-type.js";
import MapBoundsFilter from "./js/map-bounds-filter.js";

ensureStylesheet(new URL("./vendor/maplibre-gl/dist/maplibre-gl.css", import.meta.url).href, { key: "maplibre-gl-css" });
ensureStylesheet(new URL("./css/maplibre-pico-reset.css", import.meta.url).href, { key: "maplibre-pico-reset" });
ensureStylesheet(new URL("./css/geo-filter.css", import.meta.url).href);

registerFilterType("bounds", boundsFilterType);

// Location facet: the map viewport acts as a filter. The wrapper maps the
// generic facet contract onto the pure viewport-control props, and builds
// the typed "bounds" filter object for the generic onFilterChange action.
registerFacetRenderer("location", {
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
