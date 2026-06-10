import { h } from "preact";
import MapView from "../map/map-view.js";
import { findGeoColumns, rowsToPoints } from "../../utilities/geo.js";

/**
 * Renders all rows as markers on a shared map.
 *
 * Props:
 *   name          - table name (used as section heading)
 *   id            - section id (defaults to name)
 *   columns       - column schema array
 *   rows          - row data objects
 *   fkResolved    - FK display map for popups
 *   lang          - language code (for popup link)
 *   perspectiveId - perspective id (for popup link)
 */
export default function DataViewListMap({ name, id, columns, rows, fkResolved, lang, perspectiveId }) {
    const geo = findGeoColumns(columns);

    if (!geo) {
        return h("section", { id: id ?? name },
            h("p", { style: "color:var(--text-muted)" }, "No location data (expected lat/lon columns)."),
        );
    }

    const points = rowsToPoints(rows, geo.latCol, geo.lonCol);

    return h("section", { id: id ?? name, style: "display:flex;flex-direction:column;min-height:0" },
        points.length === 0
            ? h("p", null, "No rows with coordinates.")
            : h(MapView, {
                points,
                columns,
                fkResolved,
                tableName: name,
                lang,
                perspectiveId,
                height: "calc(100vh - 9rem)",
            }),
    );
}
