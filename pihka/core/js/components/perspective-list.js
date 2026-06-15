import { h, Fragment } from "preact";
import { buildPath } from "../utilities-ui/router.js";
import { localize, visibleColumns } from "../utilities-data/table-config.js";
import { preferredView } from "../utilities-ui/perspectives.js";

/**
 * Homepage navigation: configured perspectives first, then the auto-
 * generated table cards. Section headings only appear when both groups
 * exist (an unconfigured app just sees its tables, a fully curated app
 * may hide all tables and see only perspectives).
 *
 * Props:
 *   perspectives  - Perspective[] from loadPerspectives()
 *   store         - DataStore instance (for column counts)
 *   lang          - Current language code
 */
export default function PerspectiveList({ perspectives, store, lang = "en" }) {
    const configured = perspectives.filter(p => p.kind === "perspective");
    const tables = perspectives.filter(p => p.kind !== "perspective");
    const showHeadings = configured.length > 0 && tables.length > 0;

    return h(Fragment, null,
        configured.length > 0 && h(Fragment, null,
            showHeadings && h("h2", { class: "perspective-section-title" }, "Perspectives"),
            h(Grid, { perspectives: configured, store, lang }),
        ),
        tables.length > 0 && h(Fragment, null,
            showHeadings && h("h2", { class: "perspective-section-title" }, "Tables"),
            h(Grid, { perspectives: tables, store, lang }),
        ),
    );
}

function Grid({ perspectives, store, lang }) {
    return h("div", { class: "perspective-grid" },
        perspectives.map(p => {
            const view = preferredView(p) || "table";
            const schema = store.getSchema(p.table);
            const colCount = schema ? visibleColumns(schema.columns).length : null;
            const kind = p.kind === "perspective" ? "perspective" : "table";
            const meta = colCount != null ? `${kind} (${colCount} columns)` : kind;
            return h("a", { key: p.id, class: "perspective-card", href: buildPath(`/${lang}/${p.id}/${view}`) },
                h("span", { class: "perspective-card-name" }, localize(p.label, lang, p.name)),
                h("small", { class: "perspective-card-meta" }, meta),
            );
        }),
    );
}
