import { h } from "preact";
import { buildPath } from "../utilities/router.js";

/**
 * Navigation list of all configured perspectives.
 *
 * Props:
 *   perspectives  - Perspective[] from loadPerspectives()
 *   store         - DataStore instance (for column counts)
 *   lang          - Current language code
 */
export default function PerspectiveList({ perspectives, store, lang = "en" }) {
    return h("div", { class: "perspective-grid" },
        perspectives.map(p => {
            const view = p.default_view || p.view || "table";
            const schema = store.getSchema(p.table);
            const colCount = schema ? schema.columns.length : null;
            const kind = p.query ? "query" : "table";
            const meta = colCount != null ? `${kind} (${colCount} columns)` : kind;
            return h("a", { key: p.id, class: "perspective-card", href: buildPath(`/${lang}/${p.id}/${view}`) },
                h("span", { class: "perspective-card-name" }, p.label || p.name),
                h("small", { class: "perspective-card-meta" }, meta),
            );
        }),
    );
}
