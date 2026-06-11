import { h } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { loadMaplibre } from "./maplibre-shim.js";
import { ensurePmtilesProtocol } from "./pmtiles-protocol.js";
import { buildStyle } from "./map-view.js";

/**
 * Location facet: a small interactive map whose viewport acts as a filter.
 *
 * The component is a pure viewport control — it knows nothing about SQL,
 * tables, or where the data comes from. Its contract is plain JSON in,
 * events out:
 *
 * Props (in):
 *   geoMeta        - { bounds: { minLat, maxLat, minLon, maxLon } } — the
 *                    data extent the map starts fitted to
 *   activeBounds   - { minLat, maxLat, minLon, maxLon } | null — the
 *                    currently applied viewport filter (from the URL)
 * Events (out):
 *   onBoundsChange - (bounds|null) => void — emitted with the new viewport
 *                    after the user pans/zooms, or null when cleared
 *
 * Only user-driven moves emit: programmatic movements (initial fitBounds,
 * container resizes, the refit after clearing) end in a moveend too, which
 * must not emit — `userMoveRef` gates that per gesture. After mount the
 * component never reads `activeBounds` back, so emitting can never move
 * the map again: no feedback loop.
 */
export default function MapBoundsFilter({ geoMeta, activeBounds, onBoundsChange }) {
    const containerRef = useRef(null);
    const mapRef = useRef(null);
    const resizeObserverRef = useRef(null);
    const userMoveRef = useRef(false);

    // Refs refreshed every render so the mount-only effect and its event
    // handlers always see the current values without being effect deps.
    const onBoundsChangeRef = useRef(onBoundsChange);
    onBoundsChangeRef.current = onBoundsChange;
    const initialBoundsRef = useRef(activeBounds);
    const dataBoundsRef = useRef(geoMeta?.bounds);
    dataBoundsRef.current = geoMeta?.bounds;

    useEffect(() => {
        if (!containerRef.current) return;

        let cancelled = false;
        let map = null;

        (async () => {
            const maplibregl = await loadMaplibre();
            await ensurePmtilesProtocol();
            if (cancelled) return;

            map = new maplibregl.Map({
                container: containerRef.current,
                style: buildStyle(),
                attributionControl: { compact: true },
            });
            mapRef.current = map;

            if (typeof ResizeObserver !== "undefined") {
                resizeObserverRef.current = new ResizeObserver(() => {
                    if (mapRef.current) mapRef.current.resize();
                });
                resizeObserverRef.current.observe(containerRef.current);
            }

            map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

            fitTo(map, initialBoundsRef.current ?? dataBoundsRef.current);

            // A move is user-driven only when its movestart carries an
            // original DOM event (drag, wheel, pinch, nav buttons).
            // Programmatic moves — initial fitBounds, container resizes,
            // the refit after clearing — have none and must not emit.
            // The flag resets on every moveend so a later programmatic
            // move can never replay the user's previous gesture.
            map.on("movestart", (e) => {
                userMoveRef.current = !!e.originalEvent;
            });
            map.on("moveend", () => {
                if (!userMoveRef.current) return;
                userMoveRef.current = false;
                onBoundsChangeRef.current(viewportBounds(map));
            });
        })().catch((err) => {
            console.error("[MapBoundsFilter] failed to initialise:", err);
        });

        return () => {
            cancelled = true;
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
                resizeObserverRef.current = null;
            }
            if (map) map.remove();
            mapRef.current = null;
        };
    }, []);

    const onClear = () => {
        onBoundsChangeRef.current(null);
        if (mapRef.current && dataBoundsRef.current) {
            fitTo(mapRef.current, dataBoundsRef.current);
        }
    };

    return h("div", { class: "map-bounds-filter" },
        h("div", { style: "display:flex;align-items:baseline;gap:.5rem;margin-bottom:.15rem" },
            h("label", { style: "font-size:.8em;font-weight:600" }, "Location"),
            activeBounds && h("button", {
                class: "outline",
                style: "padding:.1em .5em;font-size:.7em;margin-left:auto",
                onClick: onClear,
                title: "Clear location filter",
            }, "× clear"),
        ),
        h("div", {
            ref: containerRef,
            style: "width:100%;height:200px;border-radius:var(--border-radius,4px);overflow:hidden",
        }),
        h("p", { style: "font-size:.7em;color:var(--text-muted);margin:.15rem 0 .25rem" },
            activeBounds ? "Showing items in the map view" : "Move the map to filter by location",
        ),
    );
}

function fitTo(map, bounds) {
    if (!bounds) return;
    map.fitBounds(
        [[bounds.minLon, bounds.minLat], [bounds.maxLon, bounds.maxLat]],
        { padding: 20, duration: 0, maxZoom: 10 },
    );
}

/**
 * Read the map viewport as a plain bounds object, clamped to valid
 * lat/lon ranges. A viewport wider than the whole world becomes the full
 * longitude range; otherwise longitudes are wrapped into [-180, 180]
 * (minLon > maxLon then means the viewport crosses the antimeridian).
 */
function viewportBounds(map) {
    const b = map.getBounds();
    const minLat = Math.max(-90, b.getSouth());
    const maxLat = Math.min(90, b.getNorth());

    let minLon = b.getWest();
    let maxLon = b.getEast();
    if (maxLon - minLon >= 360) {
        minLon = -180;
        maxLon = 180;
    } else {
        const wrap = (lon) => ((((lon + 180) % 360) + 360) % 360) - 180;
        minLon = wrap(minLon);
        maxLon = wrap(maxLon);
    }

    return { minLat, maxLat, minLon, maxLon };
}
