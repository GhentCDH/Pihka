// @ts-check
/**
 * Framework-free MapLibre setup for point maps: the basemap style, one
 * clustered GeoJSON source per pin color, and the pin images. MapView uses
 * these, and custom UIs can drive a map with them without Preact or the
 * component registry. Colors come from a theme (see theme.js); give one
 * map the same theme in every call.
 *
 *   const theme = resolveTheme(config);
 *   const maplibregl = await loadMaplibre();
 *   await ensurePmtilesProtocol();
 *   const pins = await loadPinImages(theme);
 *   const map = new maplibregl.Map({ container, style: buildStyle(theme) });
 *   map.on("load", () => addClusterLayers(map, pins, { theme, onPointClick: (i) => … }));
 *   whenClusterSource(map, () => setClusterData(map, points, theme));
 */
import { pointsToGeoJSON } from "./geo.js";
import { DEFAULT_THEME } from "./theme.js";

const TILES_URL = "pmtiles://" + new URL("../assets/world.pmtiles", import.meta.url).href;
// Built by hand (not via `new URL(...)`) because the URL constructor
// percent-encodes the literal "{fontstack}"/"{range}" template braces that
// MapLibre's glyphs spec requires.
const GLYPHS_URL = new URL("../assets/glyphs/", import.meta.url).href + "{fontstack}/{range}.pbf";
const EMPTY_FC = { type: "FeatureCollection", features: [] };
const FIRST_SOURCE = "pm-points";

const groupCache = new WeakMap();

/**
 * One clustered source per pin color, so a cluster only joins points of
 * one color and takes that color: the theme's pin color for uncolored
 * points first (with the original ids), then the palette and "other".
 */
export function clusterGroups(theme = DEFAULT_THEME) {
    let groups = groupCache.get(theme);
    if (!groups) {
        groups = [
            { color: null, fill: theme.pin, source: FIRST_SOURCE, clusters: "pm-clusters", count: "pm-cluster-count", unclustered: "pm-unclustered" },
            ...[...theme.palette, theme.other].map((color, i) => ({
                color,
                fill: color,
                source: `pm-points-${i}`,
                clusters: `pm-clusters-${i}`,
                count: `pm-cluster-count-${i}`,
                unclustered: `pm-unclustered-${i}`,
            })),
        ];
        groupCache.set(theme, groups);
    }
    return groups;
}

/**
 * Put `points` ({lat, lon, color?}) in the cluster sources. Each feature
 * keeps its index into `points` as the `__pmIndex` property. A point whose
 * color is not in the theme joins the uncolored group.
 */
export function setClusterData(map, points, theme = DEFAULT_THEME) {
    const groups = clusterGroups(theme);
    const byColor = new Map(groups.map((group) => [group.color, group]));
    const features = new Map(groups.map((group) => [group, []]));
    pointsToGeoJSON(points).features.forEach((feature, i) =>
        features.get(byColor.get(points[i].color ?? null) ?? groups[0]).push(feature),
    );
    for (const [group, list] of features) map.getSource(group.source)?.setData({ type: "FeatureCollection", features: list });
}

/** The pin as an SVG data URL. */
export const pinUrl = (color, outline = DEFAULT_THEME.outline) =>
    "data:image/svg+xml," +
    encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="28" viewBox="0 0 20 28">` +
            `<path d="M10 27C8 24 1 16 1 10a9 9 0 0 1 18 0c0 6-7 14-9 17Z" fill="${color}" stroke="${outline}" stroke-width="1.5" stroke-linejoin="round"/>` +
            `<circle cx="10" cy="10" r="3" fill="${outline}"/></svg>`,
    );
export const markerUrl = (point, theme = DEFAULT_THEME) => pinUrl(point.color ?? theme.pin, theme.outline);

// Render at 3× density; the SVG and DOM pins share a 20 × 28 footprint.
async function loadPinImage(url) {
    const image = new window.Image(60, 84);
    image.src = url;
    await image.decode();
    return image;
}

/** One pin image per cluster group, in clusterGroups() order. */
export const loadPinImages = (theme = DEFAULT_THEME) =>
    Promise.all(clusterGroups(theme).map((group) => loadPinImage(pinUrl(group.fill, theme.outline))));

// Run `update` once the cluster sources exist. They are added in the
// map's single "load" event, so only wait for that while they are missing:
// isStyleLoaded() is also false while tiles or source data load, and a
// later "load" never fires, which would drop the update.
export function whenClusterSource(map, update) {
    if (map.getSource(FIRST_SOURCE)) update();
    else map.once("load", update);
}

/**
 * Minimal MapLibre style targeting the Protomaps basemap schema.
 *
 * The world.pmtiles archive ships with vector layers like `earth`, `water`,
 * `boundaries`, and `places`. We render just enough of them for a usable
 * basemap; richer styling would mean shipping a much larger style JSON.
 */
export function buildStyle(theme = DEFAULT_THEME) {
    const colors = theme.basemap;
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
            { id: "background", type: "background", paint: { "background-color": colors.water } },
            {
                id: "earth",
                type: "fill",
                source: "protomaps",
                "source-layer": "earth",
                paint: { "fill-color": colors.earth },
            },
            {
                id: "landcover",
                type: "fill",
                source: "protomaps",
                "source-layer": "landcover",
                paint: { "fill-color": colors.landcover, "fill-opacity": 0.7 },
            },
            {
                id: "landuse",
                type: "fill",
                source: "protomaps",
                "source-layer": "landuse",
                paint: { "fill-color": colors.landuse, "fill-opacity": 0.5 },
            },
            {
                id: "water",
                type: "fill",
                source: "protomaps",
                "source-layer": "water",
                paint: { "fill-color": colors.water },
            },
            {
                id: "boundaries",
                type: "line",
                source: "protomaps",
                "source-layer": "boundaries",
                paint: { "line-color": colors.boundaries, "line-width": 0.6, "line-dasharray": [2, 2] },
            },
            {
                id: "roads",
                type: "line",
                source: "protomaps",
                "source-layer": "roads",
                paint: { "line-color": colors.roads, "line-width": 0.5 },
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
 * @param {Array<HTMLImageElement>} pinImages - from loadPinImages(theme)
 * @param {{ theme?: typeof DEFAULT_THEME, onPointClick?: (index: number) => void, isActive?: () => boolean }} [options]
 */
export function addClusterLayers(map, pinImages, { theme = DEFAULT_THEME, onPointClick, isActive = () => true } = {}) {
    if (map.getSource(FIRST_SOURCE)) return;

    const groups = clusterGroups(theme);
    groups.forEach((group, i) => {
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
                "circle-stroke-color": theme.outline,
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
            paint: { "text-color": theme.clusterText },
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

    const clusterLayers = groups.map((group) => group.clusters);
    const unclusteredLayers = groups.map((group) => group.unclustered);
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
