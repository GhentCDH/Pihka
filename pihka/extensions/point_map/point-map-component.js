/**
 * Point map extension: renders rows with lat/lon columns as markers on a
 * MapLibre + PMTiles basemap served from assets/world.pmtiles.
 *
 * Enable it like any component module:
 *
 *   "components": ["extensions/point_map/point-map-component.js"]
 *
 * Any table or perspective with numeric latitude/longitude columns
 * (lat/latitude + lon/lng/longitude) then gets ⌖ list and detail views.
 * Viewport *filtering* (the location facet + bbox URL param) is the
 * separate geo-filter extension. MapLibre and PMTiles are vendored under
 * vendor/ (see deps.json and `npm run vendorize`) and load only once per
 * page even when several map extensions are enabled.
 */

import { registerView } from "../../core/js/utilities-ui/view-registry.js";
import { ensureStylesheet } from "../../core/js/utilities-ui/stylesheets.js";
import { findGeoColumns } from "./js/geo.js";
import DataViewListMap from "./js/data-view-list-map.js";
import DataViewDetailMap from "./js/data-view-detail-map.js";

ensureStylesheet(new URL("./vendor/maplibre-gl/dist/maplibre-gl.css", import.meta.url).href, { key: "maplibre-gl-css" });
ensureStylesheet(new URL("./css/maplibre-pico-reset.css", import.meta.url).href, { key: "maplibre-pico-reset" });
ensureStylesheet(new URL("./css/point-map.css", import.meta.url).href);

const hasGeo = (columns) => !!findGeoColumns(columns);

registerView({
    id: "map",
    context: "list",
    component: DataViewListMap,
    icon: "⌖",
    paginated: false, // maps need every filtered row, not one page
    availableFor: hasGeo,
});

registerView({
    id: "map",
    context: "detail",
    component: DataViewDetailMap,
    icon: "⌖",
    availableFor: hasGeo,
});
