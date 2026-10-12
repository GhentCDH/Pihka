// @ts-check
import { h } from "preact";
import DataViewListTable from "./data-view-list-table.js";
import DataViewListCards from "./data-view-list-cards.js";
import DataViewDetailTable from "./data-view-detail-table.js";
import DataViewDetailCard from "./data-view-detail-card.js";
import DataViewExport from "./data-view-export.js";

/** Explicit default view installer. */

// DataViewDetailCard is also reused by the cards grid, so the standalone
// detail variant adds its width constraint here rather than in the
// component itself.
function DetailCardView(props) {
    return h("div", { class: "detail-card", style: "max-width:32rem" },
        h(DataViewDetailCard, props),
    );
}

// DataViewListTable is also reused by related sections and search results
// (natural height, page scrolling), so only the top-level list view opts
// into filling the viewport with internal scrolling.
function ListTableView(props) {
    return h(DataViewListTable, { ...props, fill: props.presentation !== "embedded" });
}

export function register(api) {
api.registerComponent({ kind: "view", id: "table", context: "list", component: ListTableView, icon: "☰" });
api.registerComponent({ kind: "view", id: "cards", context: "list", component: DataViewListCards, icon: "⬚" });
// Non-paginated so the export receives the complete current selection.
api.registerComponent({ kind: "view", id: "export", context: "list", component: DataViewExport, icon: "⤓", paginated: false });

api.registerComponent({ kind: "view", id: "table", context: "detail", component: DataViewDetailTable, icon: "☰" });
api.registerComponent({ kind: "view", id: "card", context: "detail", component: DetailCardView, icon: "⬚" });

}
