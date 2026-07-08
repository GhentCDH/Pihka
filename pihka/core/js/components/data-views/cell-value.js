import { h } from "preact";
import { useState } from "preact/hooks";
import { isImagePath } from "./render-helpers.js";
import { buildPath } from "../../utilities-ui/router.js";
import { getCellRenderer } from "../../utilities-ui/cell-renderers.js";
import { assetUrl } from "../../utilities-data/paths.js";
import { formatValue } from "../../utilities-data/table-config.js";

const LIST_SEPARATOR = "|";
const LIST_LIMIT = 3;
const PREVIEW_CHARS = 300;

/**
 * Render a single value according to its column metadata. The one shared
 * implementation behind table cells, card fields, and detail rows.
 *
 * Priority:
 *   1. FK columns: resolved display name + 🔍 link to the referenced row
 *      (link suppressed when the referenced table is hidden)
 *   2. Registered cell renderer for the column's type (see
 *      utilities-ui/cell-renderers.js — extensions plug in here)
 *   3. Configured display type: url → external link, asset → image,
 *      number/date → Intl-formatted text
 *   4. Image-extension heuristic (for unconfigured apps)
 *   5. Plain text
 *
 * Props:
 *   col           - column metadata (references, displayType, format, ...)
 *   value         - raw cell value
 *   fkResolved    - FK display maps for the row's table
 *   lang          - current language (Intl locale + not used for FK links,
 *                   which ride the legacy redirect)
 *   imageHeight   - CSS max-height for image rendering (context-dependent)
 *   row           - (optional) full row object, for registered renderers
 *   columns       - (optional) row's column schema, for registered renderers
 *   perspectiveId - (optional) current perspective, for registered renderers
 */
export default function CellValue({ col, value, fkResolved, lang, imageHeight = "4rem", row = null, columns = null, perspectiveId = null }) {
    const raw = value ?? "";

    // Foreign key → resolved display name + link to referenced entity
    if (col.references && fkResolved && fkResolved[col.name]) {
        const fk = fkResolved[col.name];
        const displayName = fk.displayMap[raw] ?? String(raw);
        if (fk.referencedTableHidden) return h("span", null, displayName);
        return h("span", null,
            displayName,
            " ",
            h("a", {
                href: buildPath(`/${fk.referencedTable}/${raw}`),
                title: `View ${displayName}`,
                style: "opacity:.5;text-decoration:none",
            }, "🔍"),
        );
    }

    if (raw === "") return "";

    // Configured link into another perspective's detail page (used on view
    // columns, which carry no FK metadata).
    if (col.linkTo) {
        const href = lang ? `/${lang}/${col.linkTo}/${raw}/table` : `/${col.linkTo}/${raw}`;
        return h("a", { href: buildPath(href) }, String(raw));
    }

    // Registered renderer for this column type; registering a builtin type
    // name overrides the builtin rendering below.
    const custom = getCellRenderer(col.displayType);
    if (custom) {
        return h(custom, { col, value: raw, row, columns, fkResolved, lang, perspectiveId, imageHeight });
    }

    if (col.displayType === "list") {
        return h(ListValue, { col, value: String(raw) });
    }

    if (col.displayType === "text") {
        return h(TextPreview, { value: String(raw) });
    }

    if (col.displayType === "url") {
        return h("a", { href: String(raw), target: "_blank", rel: "noopener noreferrer" }, String(raw));
    }

    if (col.displayType === "asset") {
        return h("img", {
            src: assetUrl(`app/assets/${raw}`),
            alt: String(raw),
            style: `max-height:${imageHeight};border-radius:3px`,
        });
    }

    if (col.displayType === "number" || col.displayType === "date") {
        return formatValue(col, raw, lang);
    }

    // Heuristic for unconfigured apps: image-looking paths render as images.
    if (isImagePath(String(raw))) {
        return h("img", {
            src: assetUrl(`app/assets/${raw}`),
            alt: String(raw),
            style: `max-height:${imageHeight};border-radius:3px`,
        });
    }

    return String(raw);
}

/**
 * Aggregated multi-value cell (e.g. GROUP_CONCAT of an author's works):
 * values render as chips, collapsed to the first `col.limit` with a
 * "+N more" toggle.
 */
function ListValue({ col, value }) {
    const [expanded, setExpanded] = useState(false);

    const values = value
        .split(col.separator ?? LIST_SEPARATOR)
        .map(v => v.trim())
        .filter(Boolean);
    const limit = col.limit ?? LIST_LIMIT;
    const shown = expanded ? values : values.slice(0, limit);
    const hiddenCount = values.length - shown.length;

    return h("span", { class: "cell-list" },
        shown.map((v, i) => h("span", { key: i, class: "cell-list-item" }, v)),
        (hiddenCount > 0 || expanded) && values.length > limit && h("button", {
            type: "button",
            class: "cell-list-toggle",
            onClick: () => setExpanded(e => !e),
        }, expanded ? "Show less" : `+${hiddenCount} more`),
    );
}

/**
 * Long free text (e.g. a full document body): shown truncated to the first
 * PREVIEW_CHARS with an inline "Show more/less" toggle. Same self-contained
 * pattern as ListValue, so it works identically in list and detail views.
 */
function TextPreview({ value }) {
    const [expanded, setExpanded] = useState(false);
    if (value.length <= PREVIEW_CHARS) return value;

    const preview = value.slice(0, PREVIEW_CHARS).trimEnd();
    return h("span", { class: "cell-text" },
        expanded ? value : preview + "… ",
        h("button", {
            type: "button",
            class: "cell-text-toggle",
            onClick: () => setExpanded(e => !e),
        }, expanded ? "Show less" : "Show more"),
    );
}
