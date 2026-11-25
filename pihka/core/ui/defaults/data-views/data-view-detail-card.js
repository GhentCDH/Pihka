// @ts-check
import { h } from "preact";
import CellValue from "./cell-value.js";
import { buildPath } from "../../runtime/router.js";
import { localize, visibleColumns } from "../../runtime/table-config.js";
import { isImagePath } from "./render-helpers.js";

const MEDIA_TYPES = new Set(["resource-image", "asset"]);
// Display types a compact card may summarise. Anything else (list chips and
// any type a plugin registers) only appears in the full detail view.
const SUMMARY_TYPES = new Set(["number", "date", "text", "url", "resource-audio", "resource-video"]);
const SUMMARY_FACTS = 3;

const summarizable = (col) => !col.displayType || SUMMARY_TYPES.has(col.displayType);

/** Pick title, media and a few fact columns for the compact list card. */
export function summarize(cols, row) {
    const media = cols.find(c => MEDIA_TYPES.has(c.displayType) || isImagePath(String(row[c.name] ?? "")));
    const pk = cols.find(c => c.primaryKey);
    const title =
        cols.find(c => c !== media && !c.primaryKey && summarizable(c) && c.type === "TEXT")
        ?? cols.find(c => c !== media);
    const facts = cols
        .filter(c => c !== media && c !== title && c !== pk && summarizable(c))
        .filter(c => row[c.name] != null && row[c.name] !== "")
        .slice(0, SUMMARY_FACTS);
    return { media, pk, title, facts };
}

/**
 * Renders a single row as a card.
 *
 * Detail context: every visible column as label/value pairs.
 * List context: compact summary (media, title, a few facts) linking to the
 * record, so a grid of cards scans quickly.
 *
 * Props:
 *   columns     - array of column metadata objects (hidden ones filtered out)
 *   row         - row data object (keyed by column name)
 *   fkResolved    - (optional) { colName: { displayMap, referencedTable } }
 *   lang          - (optional) current language code
 *   perspectiveId - (optional) perspective id, for registered cell renderers
 *   context       - "detail" (default) or "list"
 */
export default function DataViewDetailCard({ columns, row, fkResolved, lang = null, perspectiveId = null, context = "detail" }) {
    const cols = visibleColumns(columns);
    const cell = (col, imageHeight) =>
        h(CellValue, { col, value: row[col.name], row, columns, fkResolved, lang, perspectiveId, context, imageHeight });

    if (context !== "list") {
        return h("article", null,
            h("dl", { style: "margin:0" },
                cols.flatMap(col => [
                    h("dt", { key: `${col.name}-dt`, class: "card-label" }, localize(col.label, lang, col.name)),
                    h("dd", { key: `${col.name}-dd`, style: "margin:0" }, cell(col, "6rem")),
                ]),
            ),
        );
    }

    const { media, pk, title, facts } = summarize(cols, row);
    const href = pk && perspectiveId && lang
        ? buildPath(`/${lang}/${perspectiveId}/${row[pk.name]}/table`)
        : null;
    const titleText = title ? cell(title, "6rem") : null;

    return h("article", { class: "record-card" },
        media && row[media.name] ? h("div", { class: "card-media" }, cell(media, "100%")) : null,
        h("h3", { class: "card-title" }, href ? h("a", { href }, titleText) : titleText),
        facts.length > 0 && h("dl", { class: "card-facts" },
            facts.flatMap(col => [
                h("dt", { key: `${col.name}-dt`, class: "card-label" }, localize(col.label, lang, col.name)),
                h("dd", { key: `${col.name}-dd` }, cell(col, "2rem")),
            ]),
        ),
    );
}
