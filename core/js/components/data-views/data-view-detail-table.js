import { h } from "preact";
import { isImagePath } from "./render-helpers.js";
import { buildPath, assetUrl } from "../../utilities/router.js";

/**
 * Renders a single row as a two-column table (field name | value).
 *
 * Props:
 *   tableName   - name of the table (for display)
 *   columns     - column schema array
 *   row         - row data object, or null if not found
 *   fkResolved  - (optional) { colName: { displayMap, referencedTable } }
 */
export default function DataViewDetailTable({ tableName, columns, row, fkResolved }) {
    return h("div", null,
        h("h2", null, tableName),
        !row
            ? h("p", null, "Row not found.")
            : h("table", null,
                h("tbody", null,
                    columns.map(col => {
                        const val = row[col.name] ?? "";
                        let content;

                        if (col.references && fkResolved && fkResolved[col.name]) {
                            const fk = fkResolved[col.name];
                            const displayName = fk.displayMap[val] ?? String(val);
                            const detailHref = buildPath(`/${fk.referencedTable}/${val}`);
                            content = h("span", null,
                                displayName,
                                " ",
                                h("a", {
                                    href: detailHref,
                                    title: `View ${displayName}`,
                                    style: "opacity:.5;text-decoration:none",
                                }, "\uD83D\uDD0D"),
                            );
                        } else if (isImagePath(String(val))) {
                            content = h("img", { src: assetUrl(`app/assets/${val}`), alt: String(val), style: "max-height:8rem;border-radius:3px" });
                        } else {
                            content = String(val);
                        }

                        return h("tr", { key: col.name },
                            h("th", { style: "text-align:left;white-space:nowrap;width:1%;padding-right:1.5rem" }, col.name),
                            h("td", null, content),
                        );
                    }),
                ),
            ),
    );
}
