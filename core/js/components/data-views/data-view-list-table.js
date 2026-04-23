import { h } from "preact";
import { isImagePath } from "./render-helpers.js";

function SortIndicator({ direction }) {
    if (!direction) return null;
    return h("span", { "aria-label": direction === "ASC" ? "sorted ascending" : "sorted descending",
        style: "margin-left:.3em" },
        direction === "ASC" ? "\u25B2" : "\u25BC",
    );
}

function ColumnHeader({ col, sort, onSort }) {
    const isSorted = sort && sort.column === col.name;

    if (onSort) {
        return h("th", {
            style: "cursor:pointer;user-select:none",
            onClick: () => onSort(col.name),
        },
            col.name,
            col.primaryKey && h("sup", null, " PK"),
            col.type && h("span", {
                style: "color:var(--text-muted);font-weight:normal;margin-left:.4em;font-size:.8em",
            }, col.type),
            isSorted && h(SortIndicator, { direction: sort.direction }),
        );
    }

    return h("th", null,
        col.name,
        col.primaryKey && h("sup", null, " PK"),
        col.type && h("span", {
            style: "color:var(--text-muted);font-weight:normal;margin-left:.4em;font-size:.8em",
        }, col.type),
    );
}

/**
 * Render a table cell. FK columns show resolved display name + magnifying glass.
 * PK columns link to the detail page.
 */
function Cell({ col, value, fkResolved, lang, perspectiveId }) {
    const raw = value ?? "";

    // Primary key → link to detail page
    if (col.primaryKey && perspectiveId && lang) {
        return h("td", null,
            h("a", { href: `/${lang}/${perspectiveId}/${raw}/table` }, raw),
        );
    }

    // Foreign key → show resolved display name + 🔍 link to referenced entity
    if (col.references && fkResolved && fkResolved[col.name]) {
        const fk = fkResolved[col.name];
        const displayName = fk.displayMap[raw] ?? String(raw);
        const detailHref = `/${fk.referencedTable}/${raw}`;

        return h("td", null,
            displayName,
            " ",
            h("a", {
                href: detailHref,
                title: `View ${displayName}`,
                style: "opacity:.5;text-decoration:none",
            }, "\uD83D\uDD0D"),
        );
    }

    // Image file → render as <img>
    if (isImagePath(String(raw))) {
        return h("td", null,
            h("img", { src: `./app/assets/${raw}`, alt: raw, style: "max-height:4rem;border-radius:3px" }),
        );
    }

    // Regular value
    return h("td", null, raw);
}

/**
 * Renders a table of rows.
 *
 * Props:
 *   name          - table name (for section id)
 *   columns       - column schema array
 *   rows          - array of row objects
 *   sort          - (optional) { column, direction } current sort state
 *   onSort        - (optional) callback(columnName) to request sort
 *   fkResolved    - (optional) { colName: { displayMap, referencedTable } }
 *   lang          - (optional) current language code
 *   perspectiveId - (optional) perspective id for detail links
 */
export default function DataViewListTable({ name, columns, rows, sort, onSort, fkResolved, lang, perspectiveId }) {
    return h("div", { style: "overflow-x:auto" },
        rows.length === 0
            ? h("p", null, "No rows.")
            : h("table", null,
                h("thead", null,
                    h("tr", null,
                        columns.map(col =>
                            h(ColumnHeader, { key: col.name, col, sort, onSort }),
                        ),
                    ),
                ),
                h("tbody", null,
                    rows.map((row, i) =>
                        h("tr", { key: i },
                            columns.map(col =>
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
