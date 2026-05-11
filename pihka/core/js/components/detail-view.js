import { h } from "preact";
import DataViewDetailTable from "./data-views/data-view-detail-table.js";
import DataViewDetailCard from "./data-views/data-view-detail-card.js";
import DataViewDetailMap from "./data-views/data-view-detail-map.js";
import { findGeoColumns } from "./map/map-utils.js";
import { navigate, buildPath } from "../utilities/router.js";

/**
 * Detail view for a single row with view toggles (table, card, map).
 *
 * Props:
 *   tableName     - name of the table
 *   columns       - column schema array
 *   row           - row data object, or null
 *   fkResolved    - FK display name map
 *   view          - active view type from URL
 *   lang          - current language code
 *   perspectiveId - perspective id for URL building
 *   rowId         - row id for URL building
 */
export default function DetailView({ tableName, columns, row, fkResolved, view, lang, perspectiveId, rowId }) {
    const activeView = view || "table";
    const effectiveLang = lang || "en";

    // Determine available views
    const availableViews = ["table", "card"];
    if (findGeoColumns(columns)) {
        availableViews.push("map");
    }

    const onViewChange = (newView) => {
        navigate(`/${effectiveLang}/${perspectiveId}/${rowId}/${newView}`);
    };

    const backPath = buildPath(`/${effectiveLang}/${perspectiveId}/table`);

    return h("div", null,
        h("a", { href: backPath }, "\u2190 Back"),

        // View toggles
        availableViews.length > 1 && h("div", { class: "view-toggles", style: "margin:.75rem 0" },
            availableViews.map(v =>
                h("button", {
                    key: v,
                    class: v === activeView ? "" : "outline",
                    style: "padding:.3em .7em;font-size:.8em",
                    onClick: () => onViewChange(v),
                }, viewIcon(v), " ", v),
            ),
        ),

        // Render active view
        !row
            ? h("p", null, "Row not found.")
            : renderDetailView(activeView, { tableName, columns, row, fkResolved, lang: effectiveLang, perspectiveId }),
    );
}

function renderDetailView(activeView, { tableName, columns, row, fkResolved, lang, perspectiveId }) {
    if (activeView === "card") {
        return h("div", { class: "detail-card", style: "max-width:32rem" },
            h(DataViewDetailCard, { columns, row, fkResolved }),
        );
    }

    if (activeView === "map") {
        return h(DataViewDetailMap, { tableName, columns, row, fkResolved, lang, perspectiveId });
    }

    // Default: table view
    return h(DataViewDetailTable, { tableName, columns, row, fkResolved });
}

function viewIcon(v) {
    const icons = { table: "\u2630", card: "\u2B1A", map: "\uD83C\uDF0D" };
    return icons[v] || "";
}
