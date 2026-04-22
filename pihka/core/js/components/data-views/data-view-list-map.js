import { h } from "preact";
import { useEffect, useRef } from "preact/hooks";

/**
 * Renders all rows as markers on a shared map.
 * Expects rows to have numeric `lat` and `lon` (or `lng`) columns.
 *
 * Props:
 *   name     - table name (used as section heading)
 *   columns  - array of column metadata objects
 *   rows     - array of row data objects
 */
export default function DataViewListMap({ name, id, columns, rows }) {
    const mapRef = useRef(null);
    const instanceRef = useRef(null);

    const latCol = columns.find(c => /^lat(itude)?$/i.test(c.name));
    const lonCol = columns.find(c => /^lon(gitude)?$|^lng$/i.test(c.name));

    const points = rows
        .map(row => ({
            lat: latCol ? parseFloat(row[latCol.name]) : NaN,
            lon: lonCol ? parseFloat(row[lonCol.name]) : NaN,
            row,
        }))
        .filter(p => !isNaN(p.lat) && !isNaN(p.lon));

    useEffect(() => {
        if (!mapRef.current || points.length === 0) return;

        import("maplibre-gl").then(({ default: maplibregl }) => {
            if (instanceRef.current) instanceRef.current.remove();

            const center = points.length === 1
                ? [points[0].lon, points[0].lat]
                : [
                    points.reduce((s, p) => s + p.lon, 0) / points.length,
                    points.reduce((s, p) => s + p.lat, 0) / points.length,
                ];

            const map = new maplibregl.Map({
                container: mapRef.current,
                style: "https://demotiles.maplibre.org/style.json",
                center,
                zoom: points.length === 1 ? 10 : 4,
            });

            for (const p of points) {
                new maplibregl.Marker()
                    .setLngLat([p.lon, p.lat])
                    .addTo(map);
            }

            instanceRef.current = map;
        });

        return () => {
            if (instanceRef.current) {
                instanceRef.current.remove();
                instanceRef.current = null;
            }
        };
    }, [points.length]);

    const hasLocationCols = latCol && lonCol;

    return h("section", { id: id ?? name },
        h("h2", null, name),
        !hasLocationCols
            ? h("p", { style: "color:var(--text-muted)" }, "No location data (expected lat/lon columns).")
            : points.length === 0
                ? h("p", null, "No rows.")
                : h("div", { ref: mapRef, style: "width:100%;height:480px;border-radius:var(--border-radius,4px)" }),
    );
}
