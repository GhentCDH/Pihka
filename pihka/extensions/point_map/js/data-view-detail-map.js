// @ts-check
import { h } from "preact";
import MapView from "./map-view.js";
import { findGeoColumns, rowToPoint } from "./geo.js";
import { resolveTheme } from "./theme.js";
import { extensionOptions } from "../../../core/ui/index.js";

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
 *   options       - resolved view options; `point_map.theme` sets the colors
 */
export default function DataViewDetailMap({ tableName, columns, row, fkResolved, lang, perspectiveId, options }) {
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

    // Fill the detail-view flex column (see #app > main > .detail-view) so
    // the map uses exactly the space left below the view toggles, without
    // overshooting into a page scrollbar.
    return h(MapView, {
        points: [point],
        columns,
        fkResolved,
        tableName,
        lang,
        perspectiveId,
        fill: true,
        theme: resolveTheme(extensionOptions(options, "point_map").theme),
    });
}
