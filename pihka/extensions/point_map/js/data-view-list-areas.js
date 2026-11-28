// @ts-check
import { h } from "preact";
import { useEffect, useMemo, useRef } from "preact/hooks";
import { extensionOptions, useRegistry } from "../../../core/ui/index.js";
import { findGeoColumns, rowsToPoints } from "./geo.js";
import { buildStyle, openPopup } from "./map-view.js";
import { loadMaplibre } from "./maplibre-shim.js";
import { ensurePmtilesProtocol } from "./pmtiles-protocol.js";
import MapPopup from "./map-popup.js";
import MapLegend from "./map-legend.js";
import { categorize, categoryOf } from "./categories.js";
import { areaFeatures, areaSettings, coreBounds, sites } from "./areas.js";

const AREAS = "pa-areas";
const POINTS = "pa-points";
const EMPTY = { type: "FeatureCollection", features: [] };
const DEFAULT_MAX_SITES = 5000;

/**
 * Area map list view, in the style of a dialect atlas: every row is colored
 * by its category (the `colorBy` column, see categories.js) and the region
 * around each location takes the color of its nearest location's category.
 * The area layer sits below the basemap water, so seas stay blue.
 *
 * Options (`options.point_map`, resolved by areaSettings() in areas.js):
 *   areas          - true or an object; switches the view on
 *   colorBy        - category column (required), shared with the map view
 *   maxTypes       - categories with their own color (rest is "other")
 *   neutral        - category values that stay grey and draw no area
 *   areas.maxDistanceKm - how far an area reaches from its location (150)
 *   areas.maxSites - above this many distinct locations, only points are
 *                    drawn (5000)
 * An `areas` object may also override colorBy/maxTypes/neutral.
 */
export default function DataViewListAreas({ name, id, columns, rows, fkResolved, lang, perspectiveId, options }) {
    const registry = useRegistry();
    const settings = areaSettings(extensionOptions(options, "point_map")) ?? {};
    const { colorBy, maxTypes, neutral = [], maxDistanceKm = 150, maxSites = DEFAULT_MAX_SITES } = settings;
    const geo = findGeoColumns(columns);

    const { points, legend, areaData, pointData, tooMany } = useMemo(() => {
        const points = geo && colorBy ? rowsToPoints(rows, geo.latCol, geo.lonCol) : [];
        const { legend, colorOf } = categorize(points, colorBy, { maxTypes, neutral });
        const siteList = sites(points, colorBy, neutral);
        const tooMany = siteList.length > maxSites;
        return {
            points,
            legend,
            tooMany,
            areaData: tooMany ? EMPTY : areaFeatures(siteList, colorOf, { maxDistanceKm }),
            pointData: {
                type: "FeatureCollection",
                features: points.map((p, i) => ({
                    type: "Feature",
                    geometry: { type: "Point", coordinates: [p.lon, p.lat] },
                    properties: { __pmIndex: i, color: colorOf(categoryOf(p, colorBy)) },
                })),
            },
        };
    }, [rows, geo?.latCol?.name, geo?.lonCol?.name, colorBy, maxDistanceKm, maxTypes, maxSites, neutral.join("\u0000")]);

    const containerRef = useRef(null);
    const readyRef = useRef(/** @type {Promise<any> | null} */ (null));
    const pointsRef = useRef(points);
    pointsRef.current = points;
    const popupNodesRef = useRef(new Set());
    const popupsRef = useRef(new Set());
    const popupPropsRef = useRef(null);
    popupPropsRef.current = { PopupComponent: MapPopup, tableName: name, columns, fkResolved, lang, perspectiveId, registry };

    // Create the map once; data changes only replace the two sources.
    useEffect(() => {
        let disposed = false;
        let map = null;
        let observer = null;
        readyRef.current = (async () => {
            const maplibregl = await loadMaplibre();
            await ensurePmtilesProtocol();
            if (disposed || !containerRef.current) return null;
            map = new maplibregl.Map({
                container: containerRef.current,
                style: buildStyle(),
                center: [0, 20],
                zoom: 1.5,
                attributionControl: { compact: true },
            });
            map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
            if (typeof ResizeObserver !== "undefined") {
                observer = new ResizeObserver(() => map?.resize());
                observer.observe(containerRef.current);
            }
            await new Promise((resolve) => map.once("load", resolve));
            if (disposed) return null;
            map.resize();
            map.addSource(AREAS, { type: "geojson", data: EMPTY });
            map.addSource(POINTS, { type: "geojson", data: EMPTY });
            map.addLayer(
                {
                    id: AREAS,
                    type: "fill",
                    source: AREAS,
                    // No antialiasing, so neighbouring rectangles show no seams.
                    paint: { "fill-color": ["get", "color"], "fill-opacity": 0.55, "fill-antialias": false },
                },
                "water",
            );
            map.addLayer({
                id: POINTS,
                type: "circle",
                source: POINTS,
                paint: {
                    "circle-color": ["get", "color"],
                    "circle-radius": 5,
                    "circle-stroke-width": 1.5,
                    "circle-stroke-color": "#fff",
                },
            });
            map.on("click", POINTS, (e) => {
                const point = pointsRef.current?.[e.features?.[0]?.properties?.__pmIndex];
                if (point) openPopup(maplibregl, map, point, popupNodesRef, popupsRef, popupPropsRef.current);
            });
            map.on("mouseenter", POINTS, () => (map.getCanvas().style.cursor = "pointer"));
            map.on("mouseleave", POINTS, () => (map.getCanvas().style.cursor = ""));
            return { map };
        })().catch((error) => {
            console.error("[point-map] area map failed to initialise:", error);
            return null;
        });
        return () => {
            disposed = true;
            observer?.disconnect();
            for (const popup of [...popupsRef.current]) popup.remove();
            map?.remove();
        };
    }, []);

    useEffect(() => {
        let stale = false;
        readyRef.current?.then((ready) => {
            if (stale || !ready) return;
            const { map } = ready;
            // Open popups may belong to rows the new filter removed.
            for (const popup of [...popupsRef.current]) popup.remove();
            map.getSource(AREAS)?.setData(areaData);
            map.getSource(POINTS)?.setData(pointData);
            if (points.length > 1) {
                // Frame the core of the data, so a few far-off (often
                // mistyped) coordinates do not zoom the areas out of sight.
                map.fitBounds(coreBounds(points), { padding: 40, maxZoom: 8, duration: 0 });
            } else if (points.length === 1) {
                map.setCenter([points[0].lon, points[0].lat]);
                map.setZoom(7);
            }
        });
        return () => {
            stale = true;
        };
    }, [areaData, pointData]);

    const nl = lang === "nl";
    const note = tooMany
        ? nl
            ? "Te veel locaties voor gebieden; alleen punten."
            : "Too many locations for areas; showing points only."
        : null;
    // The canvas stays mounted (hidden) through empty states so the live
    // map survives a filter that momentarily matches no mappable rows.
    return h(
        "section",
        { class: "map-list-section fill-height point-legend-host", id: id ?? name },
        !points.length &&
            h("p", { style: "color:var(--text-muted)" }, nl ? "Geen locaties om te tonen." : "No location data to display."),
        h("div", { ref: containerRef, class: "map-canvas fill-height", style: points.length ? "" : "display:none" }),
        points.length > 0 && h(MapLegend, { legend, lang, note }),
    );
}
