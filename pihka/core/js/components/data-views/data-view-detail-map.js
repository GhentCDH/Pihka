import { h } from "preact";
import { useEffect, useRef } from "preact/hooks";

/**
 * Renders a single row's location on a map.
 * Expects the row to have numeric `lat` and `lon` (or `lng`) columns.
 *
 * Props:
 *   columns  - array of column metadata objects
 *   row      - row data object (keyed by column name)
 */
export default function DataViewDetailMap({ columns, row }) {
    const mapRef = useRef(null);
    const instanceRef = useRef(null);

    const latCol = columns.find(c => /^lat(itude)?$/i.test(c.name));
    const lonCol = columns.find(c => /^lon(gitude)?$|^lng$/i.test(c.name));

    const lat = latCol ? parseFloat(row[latCol.name]) : null;
    const lon = lonCol ? parseFloat(row[lonCol.name]) : null;
    const valid = lat != null && lon != null && !isNaN(lat) && !isNaN(lon);

    useEffect(() => {
        if (!valid || !mapRef.current) return;

        // Lazily import maplibre-gl from vendor
        import("maplibre-gl").then(({ default: maplibregl }) => {
            if (instanceRef.current) instanceRef.current.remove();

            const map = new maplibregl.Map({
                container: mapRef.current,
                style: "https://demotiles.maplibre.org/style.json",
                center: [lon, lat],
                zoom: 10,
            });

            new maplibregl.Marker().setLngLat([lon, lat]).addTo(map);
            instanceRef.current = map;
        });

        return () => {
            if (instanceRef.current) {
                instanceRef.current.remove();
                instanceRef.current = null;
            }
        };
    }, [lat, lon, valid]);

    if (!valid) {
        return h("p", { style: "color:var(--text-muted)" },
            "No location data (expected lat/lon columns).",
        );
    }

    return h("div", { ref: mapRef, style: "width:100%;height:320px;border-radius:var(--border-radius,4px)" });
}
