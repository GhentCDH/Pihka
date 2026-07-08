import { h } from "preact";
import { buildPath } from "../../../core/js/utilities-ui/router.js";

/**
 * Cell renderer for "annotated-text" columns: a small badge linking to
 * the row's detail page in the "annotated-text" view, where the full
 * text renders with its annotations highlighted. Rows without a primary
 * key (perspective views) have no detail page to link to and fall back
 * to a short plain excerpt.
 */
export function AnnotatedTextCell({ value, row, columns, lang, perspectiveId }) {
    const pkCol = columns?.find(c => c.primaryKey);
    const pk = pkCol && row ? row[pkCol.name] : null;

    if (pk != null && perspectiveId) {
        const href = lang
            ? `/${lang}/${perspectiveId}/${pk}/annotated-text`
            : `/${perspectiveId}/${pk}/annotated-text`;
        return h("a", {
            href: buildPath(href),
            class: "annotated-text-badge",
            title: "Open annotated text",
        }, "Annotated 🖍");
    }

    const excerpt = String(value);
    return h("span", { class: "annotated-text-excerpt" },
        excerpt.length > 100 ? excerpt.slice(0, 100) + "…" : excerpt);
}
