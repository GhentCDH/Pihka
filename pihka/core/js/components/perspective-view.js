import { h } from "preact";
import FacetedView from "./faceted-view.js";

/**
 * Renders a single perspective's data view. Query-backed perspectives are
 * SQL views by the time this renders (created at startup), so every
 * perspective gets the same faceted treatment.
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

    return h(FacetedView, { perspective: p, store, view, lang });
}
