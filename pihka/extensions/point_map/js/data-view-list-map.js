import { h } from "preact";
import MapView from "./map-view.js";
import { findGeoColumns, rowsToPoints } from "./geo.js";
import { extensionOptions } from "../../../core/js/utilities-data/extension-options.js";

// Above this many points, "auto" clustering mode switches on. Individual
// pin markers are fine (and look better) below this; past it, per-marker
// DOM rendering starts costing enough to matter.
const AUTO_CLUSTER_THRESHOLD = 1000;

/**
 * Resolve the point_map extension's `clustering` setting (false | true |
 * "auto", default false) plus the current point count into a plain
 * boolean for MapView.
 */
function resolveCluster(mode, count) {
    if (mode === true || mode === false) return mode;
    return count > AUTO_CLUSTER_THRESHOLD;
}

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
 *   options       - resolved view options; this component reads its own
 *                   slice via extensionOptions(options, "point_map")
 */
export default function DataViewListMap({
    name,
    id,
    columns,
    rows,
    fkResolved,
    lang,
    perspectiveId,
    options,
}) {
    const geo = findGeoColumns(columns);

    if (!geo) {
        return h(
            "section",
            { id: id ?? name },
            h(
                "p",
                { style: "color:var(--text-muted)" },
                "No location data (expected lat/lon columns).",
            ),
        );
    }

    const points = rowsToPoints(rows, geo.latCol, geo.lonCol);
    const { clustering } = extensionOptions(options, "point_map");
    const cluster = resolveCluster(clustering, points.length);

    // MapView stays mounted through empty point sets (it renders its own
    // "no location data" note) so the live map survives a filter that
    // momentarily matches no mappable rows — no teardown, no flicker.
    return h(
        "section",
        { class: "map-list-section fill-height", id: id ?? name },
        h(MapView, {
            points,
            columns,
            fkResolved,
            tableName: name,
            lang,
            perspectiveId,
            fill: true,
            cluster,
        }),
    );
}
