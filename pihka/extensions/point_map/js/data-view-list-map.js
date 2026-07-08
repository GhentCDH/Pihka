import { h } from "preact";
import MapView from "./map-view.js";
import { findGeoColumns, rowsToPoints } from "./geo.js";

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

    // MapView stays mounted through empty point sets (it renders its own
    // "no location data" note) so the live map survives a filter that
    // momentarily matches no mappable rows — no teardown, no flicker.
    return h("section", { class: "map-list-section fill-height", id: id ?? name },
        h(MapView, {
            points,
            columns,
            fkResolved,
            tableName: name,
            lang,
            perspectiveId,
            fill: true,
        }),
    );
}
