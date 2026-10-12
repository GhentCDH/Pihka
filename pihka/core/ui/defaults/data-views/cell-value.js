// @ts-check
import { h } from "preact";
import { useState } from "preact/hooks";
import { isImagePath } from "./render-helpers.js";
import { buildPath } from "../../runtime/router.js";
import { getCellRenderer } from "../../runtime/cell-renderers.js";
import { assetUrl } from "../../runtime/paths.js";
import { formatValue } from "../../runtime/table-config.js";

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
 *      the component registry — plugins register cell renderers here)
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
 *   context       - list (default) or detail; passed to registered renderers
 *   detailHref    - derived record URL passed to renderers, null without a single PK
 *   perspectiveId - (optional) current perspective, for registered renderers
 */
export default function CellValue({ col, value, fkResolved, lang, imageHeight = "4rem", row = null, columns = null, perspectiveId = null, context = "list" }) {
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

    const type = col.displayType || (isImagePath(String(raw)) ? "asset" : "plain");
    const renderer = getCellRenderer(type);
    const primaryKey = columns?.filter(column => column.primaryKey) ?? [];
    const key = primaryKey.length === 1 ? primaryKey[0] : null;
    const target = key?.linkTo || perspectiveId;
    const id = key && row ? row[key.name] : null;
    const detailHref = target && id != null
        ? buildPath(`/${lang || "en"}/${target}/${encodeURIComponent(id)}/table`) : null;
    return renderer ? h(renderer, { col, value: raw, row, columns, fkResolved, lang, perspectiveId, imageHeight, context, detailHref }) : String(raw);
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
function TextPreview({ col, value, context, detailHref, lang }) {
    const [expanded, setExpanded] = useState(false);
    value = String(value);
    if (col.maxWords) {
        if (context === "detail") return h("span", { class: "cell-text" }, value);
        const words = value.match(/\S+/g) ?? [];
        if (words.length <= col.maxWords) return value;
        const preview = words.slice(0, col.maxWords).join(" ") + "… ";
        const more = lang === "nl" ? "Lees meer" : "Read more";
        return h("span", { class: "cell-text" },
            expanded ? value + " " : preview,
            detailHref ? h("a", { href: detailHref }, more)
                : h("button", { type: "button", class: "cell-text-toggle", onClick: () => setExpanded(e => !e) },
                    expanded ? (lang === "nl" ? "Toon minder" : "Show less") : more),
        );
    }
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

export function register(api) {
    const definitions = {
        plain: ({ value }) => String(value),
        list: ListValue,
        text: TextPreview,
        url: ({value}) => h("a", {href:String(value),target:"_blank",rel:"noopener noreferrer"},String(value)),
        asset: ({value,imageHeight}) => h("img", {src:assetUrl(`app/assets/${value}`),alt:String(value),style:`max-height:${imageHeight};border-radius:3px`}),
        number: ({col,value,lang}) => formatValue(col,value,lang),
        date: ({col,value,lang}) => formatValue(col,value,lang),
    };
    for (const [id,component] of Object.entries(definitions)) api.registerComponent({kind:"cell",id,component});
}
