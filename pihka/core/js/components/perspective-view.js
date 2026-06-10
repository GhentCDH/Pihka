import { h } from "preact";
import FacetedView from "./faceted-view.js";
import DataViewListTable from "./data-views/data-view-list-table.js";

/**
 * Renders a single perspective's data view.
 *
 * Props:
 *   perspective  - Perspective object from loadPerspectives()
 *   store        - DataStore instance
 *   view         - View override from URL
 *   lang         - Current language code
 */
export default function PerspectiveView({ perspective: p, store, view, lang }) {
    const schema = store.getSchema(p.table);

    if (!schema) {
        return h("p", null, `Unknown table: ${p.table}`);
    }

    // Custom query perspectives get static display, no facets
    if (p.query) {
        const { columns, rows, error } = store.queryPerspective(p);
        if (error) return h("p", null, `Query failed: ${error}`);
        return h(DataViewListTable, { columns, rows });
    }

    // All non-custom perspectives go through FacetedView (sidebar + content)
    return h(FacetedView, { perspective: p, store, view, lang });
}
