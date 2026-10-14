// @ts-check
/**
 * Point map extension: renders rows with lat/lon columns as markers on a
 * MapLibre + PMTiles basemap served from assets/world.pmtiles.
 *
 * Enable it like any component module:
 *
 *   "uiPlugins": ["extensions/point_map/point-map-component.js"]
 *
 * Any table or perspective with numeric latitude/longitude columns
 * (lat/latitude + lon/lng/longitude) then gets ⌖ list and detail views,
 * and a ▦ area list view when `options.point_map.areas.colorBy` names a
 * category column (see js/data-view-list-areas.js).
 * Viewport *filtering* (the location facet + bbox URL param) is the
 * separate geo-filter extension. MapLibre and PMTiles are vendored under
 * vendor/ (see deps.json and `npm run vendorize`) and load only once per
 * page even when several map extensions are enabled.
 */

import { findGeoColumns } from "./js/geo.js";
import DataViewListMap from "./js/data-view-list-map.js";
import DataViewDetailMap from "./js/data-view-detail-map.js";
import DataViewListAreas from "./js/data-view-list-areas.js";
import { extensionOptions } from "../../core/ui/index.js";

export function register(api) {
api.stylesheet(new URL("./vendor/maplibre-gl/dist/maplibre-gl.css", import.meta.url).href, { key: "maplibre-gl-css" });
api.stylesheet(new URL("./css/maplibre-pico-reset.css", import.meta.url).href, { key: "maplibre-pico-reset" });
api.stylesheet(new URL("./css/point-map.css", import.meta.url).href);

const hasGeo = (columns) => !!findGeoColumns(columns);

api.registerComponent({ kind: "view",
    id: "map",
    context: "list",
    component: DataViewListMap,
    icon: "⌖",
    paginated: false, // maps need every filtered row, not one page
    ordered: false, // marker order does not matter, so skip the sort
    availableFor: hasGeo,
});

// Dialect-atlas style areas, only where `point_map.areas.colorBy` is set.
api.registerComponent({ kind: "view",
    id: "areas",
    context: "list",
    component: DataViewListAreas,
    icon: "▦",
    paginated: false,
    ordered: false,
    availableFor: (columns, options) =>
        hasGeo(columns) && typeof extensionOptions(options, "point_map").areas?.colorBy === "string",
});

api.registerComponent({ kind: "view",
    id: "map",
    context: "detail",
    component: DataViewDetailMap,
    icon: "⌖",
    availableFor: hasGeo,
});

}
