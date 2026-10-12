// @ts-check
import { h } from "preact";
import DataViewDetailCard from "./data-view-detail-card.js";

/**
 * Renders a table's rows as a responsive grid of cards.
 *
 * Props:
 *   columns  - array of column metadata objects
 *   rows     - array of row data objects
 */
export default function DataViewListCards({ columns, rows, fkResolved, lang = null, perspectiveId = null }) {
    return h("div", { class: "cards-view" },
        rows.length === 0
            ? h("p", null, "No rows.")
            : h("div", {
                style: "display:grid;grid-template-columns:repeat(auto-fill,minmax(16rem,1fr));gap:1rem",
            },
                rows.map((row, i) =>
                    h(DataViewDetailCard, { key: i, context: "list", columns, row, fkResolved, lang, perspectiveId }),
                ),
            ),
    );
}
