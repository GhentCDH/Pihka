import { h } from "preact";
import { registerView } from "../../utilities/view-registry.js";
import { findGeoColumns } from "../../utilities/geo.js";
import DataViewListTable from "./data-view-list-table.js";
import DataViewListCards from "./data-view-list-cards.js";
import DataViewListMap from "./data-view-list-map.js";
import DataViewDetailTable from "./data-view-detail-table.js";
import DataViewDetailCard from "./data-view-detail-card.js";
import DataViewDetailMap from "./data-view-detail-map.js";

/**
 * Registers the builtin list and detail views. Imported once (for its side
 * effects) by index.html before anything renders. Apps add their own views
 * the same way: a module that calls registerView(), loaded via the
 * "views" key in app/config.json.
 */

const hasGeo = (columns) => !!findGeoColumns(columns);

// DataViewDetailCard is also reused by the cards grid, so the standalone
// detail variant adds its width constraint here rather than in the
// component itself.
function DetailCardView(props) {
    return h("div", { class: "detail-card", style: "max-width:32rem" },
        h(DataViewDetailCard, props),
    );
}

registerView({ id: "table", context: "list", component: DataViewListTable, icon: "☰" });
registerView({ id: "cards", context: "list", component: DataViewListCards, icon: "⬚" });
registerView({
    id: "map", context: "list", component: DataViewListMap, icon: "🌍",
    paginated: false, availableFor: hasGeo,
});

registerView({ id: "table", context: "detail", component: DataViewDetailTable, icon: "☰" });
registerView({ id: "card", context: "detail", component: DetailCardView, icon: "⬚" });
registerView({
    id: "map", context: "detail", component: DataViewDetailMap, icon: "🌍",
    availableFor: hasGeo,
});
