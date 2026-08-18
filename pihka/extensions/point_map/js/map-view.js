import { h, Fragment, render } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { loadMaplibre } from "./maplibre-shim.js";
import { ensurePmtilesProtocol } from "./pmtiles-protocol.js";
import MapPopup from "./map-popup.js";
import { pointsToGeoJSON } from "./geo.js";

const TILES_URL = "pmtiles://" + new URL("../assets/world.pmtiles", import.meta.url).href;
// Built by hand (not via `new URL(...)`) because the URL constructor
// percent-encodes the literal "{fontstack}"/"{range}" template braces that
// MapLibre's glyphs spec requires.
const GLYPHS_URL = new URL("../assets/glyphs/", import.meta.url).href + "{fontstack}/{range}.pbf";
const CLUSTER_SOURCE_ID = "pm-points";
const EMPTY_FC = { type: "FeatureCollection", features: [] };

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
 * Shared map component. Both the list-view and detail-view map wrappers
 * delegate here. All maplibre/pmtiles interaction lives in this file (plus
 * pmtiles-protocol.js); no other component imports those libraries.
 *
 * Props:
 *   points          - Array<{ lat, lon, row }> already projected by the caller
 *   columns         - column schema (passed through to popup)
 *   fkResolved      - FK display map (passed through to popup)
 *   tableName       - perspective.table (for popup heading)
 *   lang            - language code (for popup link)
 *   perspectiveId   - perspective id (for popup link)
 *   height          - CSS height string, default "480px"
 *   popupComponent  - optional override, defaults to MapPopup
 *   cluster         - render points via a clustered GeoJSON source/layers
 *                      instead of individual pin markers. Default false.
 */
export default function MapView({
    points,
    columns,
    fkResolved,
    tableName,
    lang,
    perspectiveId,
    height = "480px",
    fill = false,
    popupComponent: PopupComponent = MapPopup,
    cluster = false,
}) {
    const containerRef = useRef(null);
    const mapRef = useRef(null);
    const maplibreRef = useRef(null);
    const mapPromiseRef = useRef(null);
    const markersRef = useRef(new Map()); // key -> { marker, point }
    const popupNodesRef = useRef(new Set());
    const popupsRef = useRef(new Set()); // open maplibre Popup instances
    const resizeObserverRef = useRef(null);
    const unmountedRef = useRef(false);

    // Marker click handlers read the popup props through this ref at click
    // time, so they never go stale and prop changes never force a marker —
    // let alone a map — rebuild.
    const popupPropsRef = useRef(null);
    popupPropsRef.current = { PopupComponent, tableName, columns, fkResolved, lang, perspectiveId };
    const pointsRef = useRef(points);
    pointsRef.current = points;

    // Create the map lazily, at most once per component life. The map must
    // survive every prop change — tearing down the WebGL context on each
    // filter tweak is exactly the white flicker this component had. Called
    // from the marker effect so a component that mounts with zero points
    // still gets its map the first time points arrive.
    const ensureMap = () => {
        if (!mapPromiseRef.current && containerRef.current) {
            mapPromiseRef.current = (async () => {
                const maplibregl = await loadMaplibre();
                await ensurePmtilesProtocol();
                if (unmountedRef.current) return null;

                // add the marker image to the map, and use that are the unclustered layer
                const markerImg = new Image(35, 35);
                const svgCode =
                    '<svg xmlns="http://www.w3.org/2000/svg" display="block" height="41px" width="27px" viewBox="0 0 27 41"><g fill-rule="nonzero"><g transform="translate(3.0, 29.0)" fill="#000000"><ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="10.5" ry="5.25002273"></ellipse><ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="10.5" ry="5.25002273"></ellipse><ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="9.5" ry="4.77275007"></ellipse><ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="8.5" ry="4.29549936"></ellipse><ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="7.5" ry="3.81822308"></ellipse><ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="6.5" ry="3.34094679"></ellipse><ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="5.5" ry="2.86367051"></ellipse><ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="4.5" ry="2.38636864"></ellipse></g><g fill="#c33"><path d="M27,13.5 C27,19.074644 20.250001,27.000002 14.75,34.500002 C14.016665,35.500004 12.983335,35.500004 12.25,34.500002 C6.7499993,27.000002 0,19.222562 0,13.5 C0,6.0441559 6.0441559,0 13.5,0 C20.955844,0 27,6.0441559 27,13.5 Z"></path></g><g opacity="0.25" fill="#000000"><path d="M13.5,0 C6.0441559,0 0,6.0441559 0,13.5 C0,19.222562 6.7499993,27 12.25,34.5 C13,35.522727 14.016664,35.500004 14.75,34.5 C20.250001,27 27,19.074644 27,13.5 C27,6.0441559 20.955844,0 13.5,0 Z M13.5,1 C20.415404,1 26,6.584596 26,13.5 C26,15.898657 24.495584,19.181431 22.220703,22.738281 C19.945823,26.295132 16.705119,30.142167 13.943359,33.908203 C13.743445,34.180814 13.612715,34.322738 13.5,34.441406 C13.387285,34.322738 13.256555,34.180814 13.056641,33.908203 C10.284481,30.127985 7.4148684,26.314159 5.015625,22.773438 C2.6163816,19.232715 1,15.953538 1,13.5 C1,6.584596 6.584596,1 13.5,1 Z"></path></g><g transform="translate(6.0, 7.0)" fill="#FFFFFF"></g><g transform="translate(8.0, 8.0)"><circle fill="#000000" opacity="0.25" cx="5.5" cy="5.5" r="5.4999962"></circle><circle fill="#FFFFFF" cx="5.5" cy="5.5" r="5.4999962"></circle></g></g></svg>';
                markerImg.src = "data:image/svg+xml;base64," + btoa(svgCode);
                await markerImg.decode();

                const first = (pointsRef.current ?? [])[0];
                const map = new maplibregl.Map({
                    container: containerRef.current,
                    style: buildStyle(),
                    center: first ? [first.lon, first.lat] : [0, 20],
                    zoom: first ? 4 : 1.5,
                    attributionControl: { compact: true },
                });
                maplibreRef.current = maplibregl;
                mapRef.current = map;

                // The container's final size may not be known when Map() runs
                // (Preact layout, flex parents). Observe size changes and call
                // resize() so the map fills the container once layout settles.
                if (typeof ResizeObserver !== "undefined") {
                    resizeObserverRef.current = new ResizeObserver(() => {
                        if (mapRef.current) mapRef.current.resize();
                    });
                    resizeObserverRef.current.observe(containerRef.current);
                }
                // Belt-and-braces: in a flex-fill container MapLibre can render
                // its first frame before the flex height resolves and then never
                // get a size change to observe. Force a resize once loaded.
                map.on("load", () => {
                    if (mapRef.current) mapRef.current.resize();
                });

                map.addControl(
                    new maplibregl.NavigationControl({ showCompass: false }),
                    "top-right",
                );

                // Clustered rendering path: a GeoJSON source + GPU-rendered
                // circle/symbol layers, added once and always present
                // (empty when the `cluster` prop is off) so switching modes
                // never needs to touch the map/style, only source data.
                map.on("load", () => {
                    if (map.getSource(CLUSTER_SOURCE_ID)) return;

                    if (!map.hasImage("marker")) {
                        map.addImage("marker", markerImg);
                    }

                    map.addSource(CLUSTER_SOURCE_ID, {
                        type: "geojson",
                        data: EMPTY_FC,
                        cluster: true,
                        clusterMaxZoom: 14,
                        clusterRadius: 60,
                    });
                    map.addLayer({
                        id: "pm-clusters",
                        type: "circle",
                        source: CLUSTER_SOURCE_ID,
                        filter: ["has", "point_count"],
                        paint: {
                            "circle-color": "#933",
                            "circle-opacity": 0.75,
                            "circle-radius": [
                                "step",
                                ["get", "point_count"],
                                20,
                                50,
                                25,
                                250,
                                35,
                                1000,
                                45,
                                10000,
                                60,
                            ],
                            "circle-stroke-width": 3,
                            "circle-stroke-color": "#fff",
                        },
                    });
                    map.addLayer({
                        id: "pm-cluster-count",
                        type: "symbol",
                        source: CLUSTER_SOURCE_ID,
                        filter: ["has", "point_count"],
                        layout: {
                            "text-field": ["get", "point_count_abbreviated"],
                            "text-font": ["Noto Sans Regular"],
                            "text-size": 12,
                        },
                        paint: { "text-color": "#fff" },
                    });
                    map.addLayer({
                        id: "pm-unclustered",
                        type: "symbol",
                        source: CLUSTER_SOURCE_ID,
                        filter: ["!", ["has", "point_count"]],
                        layout: {
                            "icon-image": "marker",
                            "icon-size": 1,
                        },
                    });

                    map.on("click", "pm-clusters", async (e) => {
                        const clusterId = e.features?.[0]?.properties?.cluster_id;
                        const center = e.features?.[0]?.geometry?.coordinates;
                        if (clusterId == null || !center) return;
                        // Capture `center` before the await — MapLibre may
                        // reuse/clear `e.features` once the handler yields.
                        const source = map.getSource(CLUSTER_SOURCE_ID);
                        const zoom = await source.getClusterExpansionZoom(clusterId);
                        map.easeTo({ center, zoom });
                    });
                    map.on("click", "pm-unclustered", (e) => {
                        const idx = e.features?.[0]?.properties?.__pmIndex;
                        const point = idx != null ? pointsRef.current?.[idx] : null;
                        if (!point) return;
                        openPopup(
                            maplibreRef.current,
                            map,
                            point,
                            popupNodesRef,
                            popupsRef,
                            popupPropsRef.current,
                        );
                    });
                    map.on("mouseenter", "pm-clusters", () => {
                        map.getCanvas().style.cursor = "pointer";
                    });
                    map.on("mouseleave", "pm-clusters", () => {
                        map.getCanvas().style.cursor = "";
                    });
                    map.on("mouseenter", "pm-unclustered", () => {
                        map.getCanvas().style.cursor = "pointer";
                    });
                    map.on("mouseleave", "pm-unclustered", () => {
                        map.getCanvas().style.cursor = "";
                    });
                });

                return map;
            })().catch((err) => {
                console.error("[MapView] failed to initialise:", err);
                return null;
            });
        }
        return mapPromiseRef.current;
    };

    // Destroy the map only on real unmount.
    useEffect(
        () => () => {
            unmountedRef.current = true;
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
                resizeObserverRef.current = null;
            }
            // Unmount any open popup Preact trees so they don't leak.
            for (const node of popupNodesRef.current) {
                render(null, node);
            }
            popupNodesRef.current.clear();
            popupsRef.current.clear();
            markersRef.current.clear();
            if (mapRef.current) {
                mapRef.current.remove(); // takes markers and popups with it
                mapRef.current = null;
            }
        },
        [],
    );

    // Update markers/cluster data in place whenever the point set (or the
    // cluster mode) changes. Never touches the map/style itself — only the
    // marker registry or the GeoJSON source's data — so the basemap never
    // reloads.
    useEffect(() => {
        // Nothing rendered yet and nothing to clear — don't create a map
        // just to show zero points.
        if ((!points || points.length === 0) && !mapPromiseRef.current) return;

        let stale = false;
        (async () => {
            const map = await ensureMap();
            if (stale || !map || unmountedRef.current) return;
            const maplibregl = maplibreRef.current;

            // Open popups may belong to rows the new filter removed.
            for (const popup of [...popupsRef.current]) popup.remove();

            if (cluster) {
                // Drop any individual pin markers left over from a
                // previous non-cluster render of this same component.
                for (const [, entry] of markersRef.current) entry.marker.remove();
                markersRef.current.clear();

                const setClusterData = () => {
                    map.getSource(CLUSTER_SOURCE_ID)?.setData(pointsToGeoJSON(points));
                };
                if (map.isStyleLoaded() && map.getSource(CLUSTER_SOURCE_ID)) setClusterData();
                else map.once("load", setClusterData);
            } else {
                // Clear the cluster source so leftover cluster circles from
                // a previous cluster-mode render don't linger.
                const clearClusterSource = () => {
                    map.getSource(CLUSTER_SOURCE_ID)?.setData(EMPTY_FC);
                };
                if (map.isStyleLoaded() && map.getSource(CLUSTER_SOURCE_ID)) clearClusterSource();
                else map.once("load", clearClusterSource);

                const { tableName: table, columns: cols } = popupPropsRef.current;

                // Key markers by table + row PK when available (stable
                // across filter changes); rows without a PK fall back to
                // coordinates, with a suffix disambiguating exact duplicates.
                const pkCol = cols?.find((c) => c.primaryKey)?.name ?? null;
                const seen = new Set();
                const keyed = (points ?? []).map((p) => {
                    let key =
                        pkCol && p.row?.[pkCol] != null
                            ? `${table}:pk:${p.row[pkCol]}`
                            : `${table}:${p.lon},${p.lat}`;
                    while (seen.has(key)) key += "+";
                    seen.add(key);
                    return [key, p];
                });

                const markers = markersRef.current;
                const nextKeys = new Set(keyed.map(([key]) => key));
                for (const [key, entry] of markers) {
                    if (!nextKeys.has(key)) {
                        entry.marker.remove();
                        markers.delete(key);
                    }
                }
                for (const [key, p] of keyed) {
                    const existing = markers.get(key);
                    if (existing) {
                        existing.point = p;
                        const at = existing.marker.getLngLat();
                        if (at.lng !== p.lon || at.lat !== p.lat) {
                            existing.marker.setLngLat([p.lon, p.lat]);
                        }
                        continue;
                    }
                    const entry = {
                        point: p,
                        marker: new maplibregl.Marker({ color: "#c33" })
                            .setLngLat([p.lon, p.lat])
                            .addTo(map),
                    };
                    const el = entry.marker.getElement();
                    el.style.cursor = "pointer";
                    el.addEventListener("click", (e) => {
                        e.stopPropagation();
                        openPopup(
                            maplibregl,
                            map,
                            entry.point,
                            popupNodesRef,
                            popupsRef,
                            popupPropsRef.current,
                        );
                    });
                    markers.set(key, entry);
                }
            }

            // Same viewport behavior regardless of rendering mode: refit to
            // the new point set (instantly), single point gets a close-up.
            const safePoints = points ?? [];
            if (safePoints.length > 1) {
                const bounds = new maplibregl.LngLatBounds();
                for (const p of safePoints) bounds.extend([p.lon, p.lat]);
                map.fitBounds(bounds, { padding: 40, maxZoom: 10, duration: 0 });
            } else if (safePoints.length === 1) {
                map.setCenter([safePoints[0].lon, safePoints[0].lat]);
                map.setZoom(10);
            }
        })();

        return () => {
            stale = true;
        };
    }, [points, cluster]);

    const empty = !points || points.length === 0;

    // `fill` mode: grow to fill a flex-column parent via core's
    // .fill-height (the map's ResizeObserver calls map.resize() once
    // layout settles). Otherwise use the explicit `height`. Either way
    // MapLibre needs a definite box. The container stays mounted (hidden)
    // through empty states so the live map survives a zero-point filter.
    return h(
        Fragment,
        null,
        empty && h("p", { style: "color:var(--text-muted)" }, "No location data to display."),
        h("div", {
            ref: containerRef,
            class: fill ? "map-canvas fill-height" : "map-canvas",
            style: (fill ? "" : `height:${height};`) + (empty ? "display:none" : ""),
        }),
    );
}

function openPopup(maplibregl, map, point, popupNodesRef, popupsRef, popupProps) {
    const { PopupComponent, tableName, columns, fkResolved, lang, perspectiveId } = popupProps;
    const node = document.createElement("div");
    popupNodesRef.current.add(node);

    render(
        h(PopupComponent, {
            tableName,
            columns,
            row: point.row,
            fkResolved,
            lang,
            perspectiveId,
        }),
        node,
    );

    const popup = new maplibregl.Popup({ offset: 25, maxWidth: "26rem" })
        .setLngLat([point.lon, point.lat])
        .setDOMContent(node)
        .addTo(map);
    popupsRef.current.add(popup);

    popup.on("close", () => {
        render(null, node);
        popupNodesRef.current.delete(node);
        popupsRef.current.delete(popup);
    });
}
