import { h } from "preact";
import CellValue from "./cell-value.js";
import { localize, visibleColumns } from "../../utilities-data/table-config.js";

/**
 * Renders a single row as a two-column table (field name | value).
 *
 * Props:
 *   tableName   - display name of the table
 *   columns     - column schema array (hidden ones filtered out)
 *   row         - row data object, or null if not found
 *   fkResolved  - (optional) { colName: { displayMap, referencedTable } }
 *   lang        - (optional) current language code
 */
export default function DataViewDetailTable({ tableName, columns, row, fkResolved, lang = null }) {
    return h("div", null,
        h("h2", null, tableName),
        !row
            ? h("p", null, "Row not found.")
            : h("table", null,
                h("tbody", null,
                    visibleColumns(columns).map(col =>
                        h("tr", { key: col.name },
                            h("th", { style: "text-align:left;white-space:nowrap;width:1%;padding-right:1.5rem" },
                                localize(col.label, lang, col.name)),
                            h("td", null,
                                h(CellValue, { col, value: row[col.name], fkResolved, lang, imageHeight: "8rem" })),
                        ),
                    ),
                ),
            ),
    );
}
