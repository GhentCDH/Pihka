import { h } from "preact";
import MapView from "../map/map-view.js";
import { findGeoColumns, rowToPoint } from "../map/map-utils.js";

/**
 * Renders a single row's location on a map.
 *
 * Props:
 *   tableName     - table name (used as popup heading)
 *   columns       - column schema array
 *   row           - row data object
 *   fkResolved    - FK display map for popup
 *   lang          - language code (for popup link)
 *   perspectiveId - perspective id (for popup link)
 */
export default function DataViewDetailMap({ tableName, columns, row, fkResolved, lang, perspectiveId }) {
    const geo = findGeoColumns(columns);
    if (!geo) {
        return h("p", { style: "color:var(--text-muted)" },
            "No location data (expected lat/lon columns).",
        );
    }

    const point = rowToPoint(row, geo.latCol, geo.lonCol);
    if (!point) {
        return h("p", { style: "color:var(--text-muted)" },
            "This row has no coordinates.",
        );
    }

    return h(MapView, {
        points: [point],
        columns,
        fkResolved,
        tableName,
        lang,
        perspectiveId,
        height: "min(70vh, calc(100vh - 10rem))",
    });
}
