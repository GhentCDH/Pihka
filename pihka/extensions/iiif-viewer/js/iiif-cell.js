import { h } from "preact";
import { buildPath } from "../../../core/js/utilities-ui/router.js";

/**
 * Cell renderer for "iiif" columns: a small badge linking to the row's
 * detail page in the "iiif" view, where TIFY renders the manifest
 * full-size. Rows without a primary key (perspective views) fall back
 * to an external link to the manifest itself.
 */
export function IiifCell({ value, row, columns, lang, perspectiveId }) {
    const pkCol = columns?.find(c => c.primaryKey);
    const pk = pkCol && row ? row[pkCol.name] : null;

    if (pk != null && perspectiveId) {
        const href = lang
            ? `/${lang}/${perspectiveId}/${pk}/iiif`
            : `/${perspectiveId}/${pk}/iiif`;
        return h("a", {
            href: buildPath(href),
            class: "iiif-badge",
            title: "Open in IIIF viewer",
        }, "IIIF 📖");
    }

    return h("a", {
        href: String(value),
        target: "_blank",
        rel: "noopener noreferrer",
        class: "iiif-badge",
        title: "Open IIIF manifest",
    }, "IIIF 📖");
}
