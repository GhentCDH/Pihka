import { h } from "preact";
import DataViewDetailTable from "../data-views/data-view-detail-table.js";
import { buildPath } from "../../utilities/router.js";

/**
 * Default popup body for a marker. Renders the same detail-table layout
 * that the detail view uses, followed by a "View details" link.
 *
 * Callers can pass a different `popupComponent` to <MapView> to swap this out.
 *
 * Props:
 *   tableName     - table name (for the heading in the detail table)
 *   columns       - column schema array
 *   row           - row data object
 *   fkResolved    - FK display name map (optional)
 *   lang          - current language code
 *   perspectiveId - perspective id for the detail URL
 */
export default function MapPopup({ tableName, columns, row, fkResolved, lang, perspectiveId }) {
    const rowId = row?.id ?? row?.[columns.find(c => c.primaryKey)?.name];
    const detailHref = (lang && perspectiveId && rowId != null)
        ? buildPath(`/${lang}/${perspectiveId}/${rowId}/table`)
        : null;

    return h("div", { class: "map-popup", style: "max-width:24rem;max-height:60vh;overflow:auto" },
        h(DataViewDetailTable, { tableName, columns, row, fkResolved }),
        detailHref && h("p", { style: "margin:.5rem 0 0;text-align:right" },
            h("a", { href: detailHref }, "View details →"),
        ),
    );
}
