import { h } from "preact";
import CellValue from "./cell-value.js";
import { localize, visibleColumns } from "../../utilities-data/table-config.js";

/**
 * Renders a single row as a card.
 *
 * Props:
 *   columns     - array of column metadata objects (hidden ones filtered out)
 *   row         - row data object (keyed by column name)
 *   fkResolved    - (optional) { colName: { displayMap, referencedTable } }
 *   lang          - (optional) current language code
 *   perspectiveId - (optional) perspective id, for registered cell renderers
 */
export default function DataViewDetailCard({ columns, row, fkResolved, lang = null, perspectiveId = null }) {
    return h("article", null,
        h("dl", { style: "margin:0" },
            visibleColumns(columns).flatMap(col => [
                h("dt", { key: `${col.name}-dt`, style: "font-size:.75em;opacity:.6;margin-top:.5em" },
                    localize(col.label, lang, col.name)),
                h("dd", { key: `${col.name}-dd`, style: "margin:0" },
                    h(CellValue, { col, value: row[col.name], row, columns, fkResolved, lang, perspectiveId, imageHeight: "6rem" })),
            ]),
        ),
    );
}
