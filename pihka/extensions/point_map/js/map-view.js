// @ts-check
import { RegistryContext, useRegistry } from "../../../core/ui/index.js";
import { h, Fragment, render } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { loadMaplibre } from "./maplibre-shim.js";
import { ensurePmtilesProtocol } from "./pmtiles-protocol.js";
import MapPopup from "./map-popup.js";
import {
    addClusterLayers,
    buildStyle,
    loadPinImages,
    markerUrl,
    setClusterData,
    whenClusterSource,
} from "./map-layers.js";
import { DEFAULT_THEME } from "./theme.js";

export { buildStyle };

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
 *   theme           - colors from resolveTheme() (see theme.js), read when
 *                      the map is created. Default DEFAULT_THEME.
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
    theme = DEFAULT_THEME,
}) {
    const registry = useRegistry();
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
    popupPropsRef.current = { PopupComponent, tableName, columns, fkResolved, lang, perspectiveId, registry };
    const pointsRef = useRef(points);
    pointsRef.current = points;
    // The cluster sources and pin images are built for one theme, so the
    // map keeps the theme it was created with.
    const themeRef = useRef(theme);

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

                const pinImages = await loadPinImages(themeRef.current);
                if (unmountedRef.current) return null;

                const first = (pointsRef.current ?? [])[0];
                const map = new maplibregl.Map({
                    container: containerRef.current,
                    style: buildStyle(themeRef.current),
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

                // Clustered rendering path: GeoJSON sources + GPU-rendered
                // circle/symbol layers per color group, added once and always
                // present (empty when the `cluster` prop is off) so switching
                // modes never needs to touch the map/style, only source data.
                map.on("load", () =>
                    addClusterLayers(map, pinImages, {
                        theme: themeRef.current,
                        isActive: () => !unmountedRef.current,
                        onPointClick: (idx) => {
                            const point = pointsRef.current?.[idx];
                            if (!point) return;
                            openPopup(
                                maplibreRef.current,
                                map,
                                point,
                                popupNodesRef,
                                popupsRef,
                                popupPropsRef.current,
                            );
                        },
                    }),
                );

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

                const updateClusterData = () => {
                    if (!stale && !unmountedRef.current) setClusterData(map, points ?? [], themeRef.current);
                };
                whenClusterSource(map, updateClusterData);
            } else {
                // Clear the cluster sources so leftover cluster circles from
                // a previous cluster-mode render don't linger.
                const clearClusterSource = () => {
                    if (!stale && !unmountedRef.current) setClusterData(map, [], themeRef.current);
                };
                whenClusterSource(map, clearClusterSource);

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
                        const url = markerUrl(p, themeRef.current);
                        if (existing.image.src !== url) existing.image.src = url;
                        const at = existing.marker.getLngLat();
                        if (at.lng !== p.lon || at.lat !== p.lat) {
                            existing.marker.setLngLat([p.lon, p.lat]);
                        }
                        continue;
                    }
                    const element = document.createElement("div");
                    element.className = "point-map-pin";
                    const image = document.createElement("img");
                    image.src = markerUrl(p, themeRef.current);
                    image.width = 20;
                    image.height = 28;
                    image.alt = "";
                    image.draggable = false;
                    element.append(image);
                    const entry = {
                        point: p,
                        image,
                        marker: new maplibregl.Marker({
                            element,
                            anchor: "bottom",
                            rotationAlignment: "viewport",
                            pitchAlignment: "viewport",
                        })
                            .setLngLat([p.lon, p.lat])
                            .addTo(map),
                    };
                    const el = entry.marker.getElement();
                    el.style.cursor = "pointer";
                    el.setAttribute("role", "button");
                    el.tabIndex = 0;
                    const activate = (e) => {
                        e.stopPropagation();
                        openPopup(
                            maplibregl,
                            map,
                            entry.point,
                            popupNodesRef,
                            popupsRef,
                            popupPropsRef.current,
                        );
                    };
                    el.addEventListener("click", activate);
                    el.addEventListener("keydown", (e) => {
                        if (e.key !== "Enter" && e.key !== " ") return;
                        e.preventDefault();
                        activate(e);
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
    const { PopupComponent, tableName, columns, fkResolved, lang, perspectiveId, registry } = popupProps;
    const node = document.createElement("div");
    popupNodesRef.current.add(node);

    render(
        h(RegistryContext.Provider, {value:registry}, h(PopupComponent, {
            tableName, columns, row: point.row, fkResolved, lang, perspectiveId,
        })),
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
