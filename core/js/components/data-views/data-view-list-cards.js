import { h } from "preact";
import DataViewDetailCard from "./data-view-detail-card.js";

/**
 * Renders a table's rows as a responsive grid of cards.
 *
 * Props:
 *   name     - table name (used as section heading)
 *   columns  - array of column metadata objects
 *   rows     - array of row data objects
 */
export default function DataViewListCards({ name, id, columns, rows, fkResolved }) {
    return h("section", { id: id ?? name },
        h("h2", null, name),
        rows.length === 0
            ? h("p", null, "No rows.")
            : h("div", {
                style: "display:grid;grid-template-columns:repeat(auto-fill,minmax(16rem,1fr));gap:1rem",
            },
                rows.map((row, i) =>
                    h(DataViewDetailCard, { key: i, columns, row, fkResolved }),
                ),
            ),
    );
}
