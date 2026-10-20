// @ts-check
/**
 * Framework-free MapLibre setup for point maps: the basemap style, one
 * clustered GeoJSON source per pin color, and the pin images. MapView uses
 * these, and custom UIs can drive a map with them without Preact or the
 * component registry.
 *
 *   const maplibregl = await loadMaplibre();
 *   await ensurePmtilesProtocol();
 *   const pins = await loadPinImages();
 *   const map = new maplibregl.Map({ container, style: buildStyle() });
 *   map.on("load", () => addClusterLayers(map, pins, { onPointClick: (i) => … }));
 *   whenClusterSource(map, () => setClusterData(map, points));
 */
import { pointsToGeoJSON } from "./geo.js";
import { OTHER_COLOR, PALETTE } from "./categories.js";

const TILES_URL = "pmtiles://" + new URL("../assets/world.pmtiles", import.meta.url).href;
// Built by hand (not via `new URL(...)`) because the URL constructor
// percent-encodes the literal "{fontstack}"/"{range}" template braces that
// MapLibre's glyphs spec requires.
const GLYPHS_URL = new URL("../assets/glyphs/", import.meta.url).href + "{fontstack}/{range}.pbf";
export const MARKER_URL = new URL("../assets/marker.svg", import.meta.url).href;
const EMPTY_FC = { type: "FeatureCollection", features: [] };

// One clustered source per pin color, so a cluster only joins points of
// one color and takes that color. Uncolored points use the first group,
// which keeps the original ids.
export const CLUSTER_GROUPS = [
    { color: null, fill: "#b35309", source: "pm-points", clusters: "pm-clusters", count: "pm-cluster-count", unclustered: "pm-unclustered" },
    ...[...PALETTE, OTHER_COLOR].map((color, i) => ({
        color,
        fill: color,
        source: `pm-points-${i}`,
        clusters: `pm-clusters-${i}`,
        count: `pm-cluster-count-${i}`,
        unclustered: `pm-unclustered-${i}`,
    })),
];
const GROUP_BY_COLOR = new Map(CLUSTER_GROUPS.map((group) => [group.color, group]));
const groupOf = (point) => GROUP_BY_COLOR.get(point.color ?? null) ?? CLUSTER_GROUPS[0];

/**
 * Put `points` ({lat, lon, color?}) in the cluster sources. Each feature
 * keeps its index into `points` as the `__pmIndex` property.
 */
export function setClusterData(map, points) {
    const features = new Map(CLUSTER_GROUPS.map((group) => [group, []]));
    pointsToGeoJSON(points).features.forEach((feature, i) => features.get(groupOf(points[i])).push(feature));
    for (const [group, list] of features) map.getSource(group.source)?.setData({ type: "FeatureCollection", features: list });
}

// assets/marker.svg in another color, for points with a `color`.
export const pinUrl = (color) =>
    "data:image/svg+xml," +
    encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="28" viewBox="0 0 20 28">` +
            `<path d="M10 27C8 24 1 16 1 10a9 9 0 0 1 18 0c0 6-7 14-9 17Z" fill="${color}" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/>` +
            `<circle cx="10" cy="10" r="3" fill="#fff"/></svg>`,
    );
export const markerUrl = (point) => (point.color ? pinUrl(point.color) : MARKER_URL);

// Render at 3× density; the SVG and DOM pins share a 20 × 28 footprint.
async function loadPinImage(url) {
    const image = new window.Image(60, 84);
    image.src = url;
    await image.decode();
    return image;
}

/** One pin image per cluster group, in CLUSTER_GROUPS order. */
export const loadPinImages = () =>
    Promise.all(CLUSTER_GROUPS.map((group) => loadPinImage(group.color ? pinUrl(group.color) : MARKER_URL)));

// Run `update` once the cluster sources exist. They are added in the
// map's single "load" event, so only wait for that while they are missing:
// isStyleLoaded() is also false while tiles or source data load, and a
// later "load" never fires, which would drop the update.
export function whenClusterSource(map, update) {
    if (map.getSource(CLUSTER_GROUPS[0].source)) update();
    else map.once("load", update);
}

/**
 * Minimal MapLibre style targeting the Protomaps basemap schema.
 *
 * The world.pmtiles archive ships with vector layers like `earth`, `water`,
 * `boundaries`, and `places`. We render just enough of them for a usable
 * basemap; richer styling would mean shipping a much larger style JSON.
 */
export function buildStyle() {
    return {
        version: 8,
        glyphs: GLYPHS_URL,
        sources: {
            protomaps: {
                type: "vector",
                url: TILES_URL,
                attribution: "© OpenStreetMap, Protomaps",
            },
        },
        layers: [
            { id: "background", type: "background", paint: { "background-color": "#aac7e8" } },
            {
                id: "earth",
                type: "fill",
                source: "protomaps",
                "source-layer": "earth",
                paint: { "fill-color": "#f3eddc" },
            },
            {
                id: "landcover",
                type: "fill",
                source: "protomaps",
                "source-layer": "landcover",
                paint: { "fill-color": "#d6e2c3", "fill-opacity": 0.7 },
            },
            {
                id: "landuse",
                type: "fill",
                source: "protomaps",
                "source-layer": "landuse",
                paint: { "fill-color": "#e6e0c8", "fill-opacity": 0.5 },
            },
            {
                id: "water",
                type: "fill",
                source: "protomaps",
                "source-layer": "water",
                paint: { "fill-color": "#aac7e8" },
            },
            {
                id: "boundaries",
                type: "line",
                source: "protomaps",
                "source-layer": "boundaries",
                paint: { "line-color": "#888", "line-width": 0.6, "line-dasharray": [2, 2] },
            },
            {
                id: "roads",
                type: "line",
                source: "protomaps",
                "source-layer": "roads",
                paint: { "line-color": "#cdb892", "line-width": 0.5 },
            },
        ],
    };
}

/**
 * Add the empty cluster sources and their layers, once per map; call it
 * from the map's "load" event. A click on a cluster zooms into it; a click
 * on a single pin calls `onPointClick(index)` with the point's index in the
 * array last given to setClusterData. `isActive()` returning false (e.g.
 * after unmount) stops a pending cluster zoom.
 *
 * @param {any} map
 * @param {Array<HTMLImageElement>} pinImages - from loadPinImages()
 * @param {{ onPointClick?: (index: number) => void, isActive?: () => boolean }} [handlers]
 */
export function addClusterLayers(map, pinImages, { onPointClick, isActive = () => true } = {}) {
    if (map.getSource(CLUSTER_GROUPS[0].source)) return;

    CLUSTER_GROUPS.forEach((group, i) => {
        if (!map.hasImage(group.source)) map.addImage(group.source, pinImages[i], { pixelRatio: 3 });
        map.addSource(group.source, {
            type: "geojson",
            data: EMPTY_FC,
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 60,
        });
        map.addLayer({
            id: group.clusters,
            type: "circle",
            source: group.source,
            filter: ["has", "point_count"],
            paint: {
                "circle-color": group.fill,
                "circle-opacity": 0.75,
                "circle-radius": ["step", ["get", "point_count"], 20, 50, 25, 250, 35, 1000, 45, 10000, 60],
                "circle-stroke-width": 3,
                "circle-stroke-color": "#fff",
            },
        });
        map.addLayer({
            id: group.count,
            type: "symbol",
            source: group.source,
            filter: ["has", "point_count"],
            layout: {
                "text-field": ["get", "point_count_abbreviated"],
                "text-font": ["Noto Sans Regular"],
                "text-size": 12,
            },
            paint: { "text-color": "#fff" },
        });
        map.addLayer({
            id: group.unclustered,
            type: "symbol",
            source: group.source,
            filter: ["!", ["has", "point_count"]],
            layout: {
                "icon-image": group.source,
                "icon-size": 1,
                "icon-anchor": "bottom",
                "icon-rotation-alignment": "viewport",
                "icon-pitch-alignment": "viewport",
            },
        });
    });

    const clusterLayers = CLUSTER_GROUPS.map((group) => group.clusters);
    const unclusteredLayers = CLUSTER_GROUPS.map((group) => group.unclustered);
    map.on("click", clusterLayers, async (e) => {
        const clusterId = e.features?.[0]?.properties?.cluster_id;
        const center = e.features?.[0]?.geometry?.coordinates;
        if (clusterId == null || !center) return;
        // Capture `center` and the source before the await —
        // MapLibre may reuse/clear `e.features` once the handler yields.
        const source = map.getSource(e.features[0].source);
        try {
            const zoom = await source.getClusterExpansionZoom(clusterId);
            if (isActive()) map.easeTo({ center, zoom });
        } catch (error) {
            if (isActive()) console.warn("[point-map] cluster expansion failed:", error);
        }
    });
    map.on("click", unclusteredLayers, (e) => {
        const index = e.features?.[0]?.properties?.__pmIndex;
        if (index != null) onPointClick?.(index);
    });
    map.on("mouseenter", [...clusterLayers, ...unclusteredLayers], () => {
        map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", [...clusterLayers, ...unclusteredLayers], () => {
        map.getCanvas().style.cursor = "";
    });
}
