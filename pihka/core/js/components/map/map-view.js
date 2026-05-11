import { h, render } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { assetUrl } from "../../utilities/router.js";
import { loadMaplibre } from "./maplibre-shim.js";
import { ensurePmtilesProtocol } from "./pmtiles-protocol.js";
import MapPopup from "./map-popup.js";

const TILES_URL = "pmtiles://" + assetUrl("core/assets/maps/world.pmtiles");

/**
 * Minimal MapLibre style targeting the Protomaps basemap schema.
 *
 * The world.pmtiles archive ships with vector layers like `earth`, `water`,
 * `boundaries`, and `places`. We render just enough of them for a usable
 * basemap; richer styling would mean shipping a much larger style JSON.
 */
function buildStyle() {
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
    popupComponent: PopupComponent = MapPopup,
}) {
    const containerRef = useRef(null);
    const mapRef = useRef(null);
    const popupNodesRef = useRef(new Set());
    const resizeObserverRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current || !points || points.length === 0) return;

        let cancelled = false;
        let map = null;

        (async () => {
            const maplibregl = await loadMaplibre();
            await ensurePmtilesProtocol();
            if (cancelled) return;

            map = new maplibregl.Map({
                container: containerRef.current,
                style: buildStyle(),
                center: [points[0].lon, points[0].lat],
                zoom: 4,
                attributionControl: { compact: true },
            });
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

            map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

            for (const p of points) {
                const marker = new maplibregl.Marker({ color: "#c33" })
                    .setLngLat([p.lon, p.lat])
                    .addTo(map);

                marker.getElement().style.cursor = "pointer";
                marker.getElement().addEventListener("click", (e) => {
                    e.stopPropagation();
                    openPopup(maplibregl, map, p, popupNodesRef, {
                        PopupComponent, tableName, columns, fkResolved, lang, perspectiveId,
                    });
                });
            }

            // Fit bounds for multi-point sets; single point keeps the initial zoom.
            if (points.length > 1) {
                const bounds = new maplibregl.LngLatBounds();
                for (const p of points) bounds.extend([p.lon, p.lat]);
                map.fitBounds(bounds, { padding: 40, maxZoom: 10, duration: 0 });
            } else {
                map.setZoom(10);
            }
        })().catch((err) => {
            console.error("[MapView] failed to initialise:", err);
        });

        return () => {
            cancelled = true;
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
                resizeObserverRef.current = null;
            }
            // Unmount any open popup Preact trees so they don't leak.
            for (const node of popupNodesRef.current) {
                render(null, node);
            }
            popupNodesRef.current.clear();
            if (map) map.remove();
            mapRef.current = null;
        };
    }, [points, tableName, lang, perspectiveId, PopupComponent]);

    if (!points || points.length === 0) {
        return h("p", { style: "color:var(--text-muted)" }, "No location data to display.");
    }

    return h("div", {
        ref: containerRef,
        style: `width:100%;height:${height};border-radius:var(--border-radius,4px);overflow:hidden`,
    });
}

function openPopup(maplibregl, map, point, popupNodesRef, popupProps) {
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

    popup.on("close", () => {
        render(null, node);
        popupNodesRef.current.delete(node);
    });
}
