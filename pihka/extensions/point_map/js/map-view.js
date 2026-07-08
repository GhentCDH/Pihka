import { h, Fragment, render } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { loadMaplibre } from "./maplibre-shim.js";
import { ensurePmtilesProtocol } from "./pmtiles-protocol.js";
import MapPopup from "./map-popup.js";

const TILES_URL = "pmtiles://" + new URL("../assets/world.pmtiles", import.meta.url).href;

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

                map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
                return map;
            })().catch((err) => {
                console.error("[MapView] failed to initialise:", err);
                return null;
            });
        }
        return mapPromiseRef.current;
    };

    // Destroy the map only on real unmount.
    useEffect(() => () => {
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
    }, []);

    // Update markers in place whenever the point set changes: diff against
    // the live registry so surviving markers stay untouched in the DOM and
    // the basemap never reloads.
    useEffect(() => {
        // Nothing rendered yet and nothing to clear — don't create a map
        // just to show zero points.
        if ((!points || points.length === 0) && !mapPromiseRef.current) return;

        let stale = false;
        (async () => {
            const map = await ensureMap();
            if (stale || !map || unmountedRef.current) return;
            const maplibregl = maplibreRef.current;
            const { tableName: table, columns: cols } = popupPropsRef.current;

            // Key markers by table + row PK when available (stable across
            // filter changes); rows without a PK fall back to coordinates,
            // with a suffix disambiguating exact duplicates.
            const pkCol = cols?.find(c => c.primaryKey)?.name ?? null;
            const seen = new Set();
            const keyed = (points ?? []).map(p => {
                let key = pkCol && p.row?.[pkCol] != null
                    ? `${table}:pk:${p.row[pkCol]}`
                    : `${table}:${p.lon},${p.lat}`;
                while (seen.has(key)) key += "+";
                seen.add(key);
                return [key, p];
            });

            // Open popups may belong to rows the new filter removed.
            for (const popup of [...popupsRef.current]) popup.remove();

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
                    openPopup(maplibregl, map, entry.point, popupNodesRef, popupsRef, popupPropsRef.current);
                });
                markers.set(key, entry);
            }

            // Same viewport behavior as the old full rebuild: refit to the
            // new point set (instantly), single point gets a close-up.
            if (keyed.length > 1) {
                const bounds = new maplibregl.LngLatBounds();
                for (const [, p] of keyed) bounds.extend([p.lon, p.lat]);
                map.fitBounds(bounds, { padding: 40, maxZoom: 10, duration: 0 });
            } else if (keyed.length === 1) {
                map.setCenter([keyed[0][1].lon, keyed[0][1].lat]);
                map.setZoom(10);
            }
        })();

        return () => {
            stale = true;
        };
    }, [points]);

    const empty = !points || points.length === 0;

    // `fill` mode: grow to fill a flex-column parent via core's
    // .fill-height (the map's ResizeObserver calls map.resize() once
    // layout settles). Otherwise use the explicit `height`. Either way
    // MapLibre needs a definite box. The container stays mounted (hidden)
    // through empty states so the live map survives a zero-point filter.
    return h(Fragment, null,
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
            tableName, columns, row: point.row, fkResolved, lang, perspectiveId,
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
