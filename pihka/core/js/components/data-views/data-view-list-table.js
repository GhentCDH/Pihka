import { h } from "preact";
import CellValue from "./cell-value.js";
import { buildPath } from "../../utilities-ui/router.js";
import { localize, visibleColumns } from "../../utilities-data/table-config.js";

function SortIndicator({ direction }) {
    if (!direction) return null;
    return h("span", { "aria-label": direction === "ASC" ? "sorted ascending" : "sorted descending",
        style: "margin-left:.3em" },
        direction === "ASC" ? "▲" : "▼",
    );
}

function ColumnHeader({ col, lang, sort, onSort }) {
    const isSorted = sort && sort.column === col.name;
    const label = localize(col.label, lang, col.name);

    // Sorting an aggregated list column compares concatenated strings —
    // meaningless, so no sort affordance.
    if (onSort && col.displayType !== "list") {
        return h("th", {
            style: "cursor:pointer;user-select:none",
            onClick: () => onSort(col.name),
        },
            label,
            col.primaryKey && h("sup", null, " PK"),
            col.type && h("span", {
                style: "color:var(--text-muted);font-weight:normal;margin-left:.4em;font-size:.8em",
            }, col.type),
            isSorted && h(SortIndicator, { direction: sort.direction }),
        );
    }

    return h("th", null,
        label,
        col.primaryKey && h("sup", null, " PK"),
        col.type && h("span", {
            style: "color:var(--text-muted);font-weight:normal;margin-left:.4em;font-size:.8em",
        }, col.type),
    );
}

/**
 * Render a table cell. PK columns link to the detail page; everything else
 * goes through the shared CellValue renderer.
 */
function Cell({ col, value, fkResolved, lang, perspectiveId }) {
    const raw = value ?? "";

    // Primary key → link to detail page
    if (col.primaryKey && perspectiveId && lang) {
        return h("td", null,
            h("a", { href: buildPath(`/${lang}/${perspectiveId}/${raw}/table`) }, raw),
        );
    }

    return h("td", null, h(CellValue, { col, value, fkResolved, lang, imageHeight: "4rem" }));
}

/**
 * Renders a table of rows.
 *
 * Props:
 *   columns       - column schema array (hidden columns are filtered out)
 *   rows          - array of row objects
 *   sort          - (optional) { column, direction } current sort state
 *   onSort        - (optional) callback(columnName) to request sort
 *   fkResolved    - (optional) { colName: { displayMap, referencedTable } }
 *   lang          - (optional) current language code
 *   perspectiveId - (optional) perspective id for detail links
 */
export default function DataViewListTable({ columns, rows, sort = null, onSort = null, fkResolved = null, lang = null, perspectiveId = null }) {
    const cols = visibleColumns(columns);
    return h("div", { style: "overflow-x:auto" },
        rows.length === 0
            ? h("p", null, "No rows.")
            : h("table", null,
                h("thead", null,
                    h("tr", null,
                        cols.map(col =>
                            h(ColumnHeader, { key: col.name, col, lang, sort, onSort }),
                        ),
                    ),
                ),
                h("tbody", null,
                    rows.map((row, i) =>
                        h("tr", { key: i },
                            cols.map(col =>
                                h(Cell, {
                                    key: col.name, col,
                                    value: row[col.name],
                                    fkResolved, lang, perspectiveId,
                                }),
                            ),
                        ),
                    ),
                ),
            ),
    );
}
