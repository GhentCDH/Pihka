/**
 * Basemap style for the viewport-filter mini map. The extension serves its
 * own basemap copy from ../assets/world.pmtiles — swap that file (and, if
 * its schema differs, this style) to use another basemap without touching
 * any other extension.
 */

const TILES_URL = "pmtiles://" + new URL("../assets/world.pmtiles", import.meta.url).href;

/**
 * Minimal MapLibre style targeting the Protomaps basemap schema.
 */
export function buildStyle() {
    return {
        version: 8,
        sources: {
            protomaps: {
                type: "vector",
                url: TILES_URL,
                attribution: "© OpenStreetMap, Protomaps",
            },
        },
        layers: [
            { id: "background", type: "background", paint: { "background-color": "#aac7e8" } },
            { id: "earth", type: "fill", source: "protomaps", "source-layer": "earth",
                paint: { "fill-color": "#f3eddc" } },
            { id: "landcover", type: "fill", source: "protomaps", "source-layer": "landcover",
                paint: { "fill-color": "#d6e2c3", "fill-opacity": 0.7 } },
            { id: "landuse", type: "fill", source: "protomaps", "source-layer": "landuse",
                paint: { "fill-color": "#e6e0c8", "fill-opacity": 0.5 } },
            { id: "water", type: "fill", source: "protomaps", "source-layer": "water",
                paint: { "fill-color": "#aac7e8" } },
            { id: "boundaries", type: "line", source: "protomaps", "source-layer": "boundaries",
                paint: { "line-color": "#888", "line-width": 0.6, "line-dasharray": [2, 2] } },
            { id: "roads", type: "line", source: "protomaps", "source-layer": "roads",
                paint: { "line-color": "#cdb892", "line-width": 0.5 } },
        ],
    };
}
