import { h } from "preact";
import { isImagePath } from "./render-helpers.js";

/**
 * Renders a single row as a card.
 *
 * Props:
 *   columns     - array of column metadata objects
 *   row         - row data object (keyed by column name)
 *   fkResolved  - (optional) { colName: { displayMap, referencedTable } }
 */
export default function DataViewDetailCard({ columns, row, fkResolved }) {
    return h("article", null,
        h("dl", { style: "margin:0" },
            columns.flatMap(col => {
                const val = row[col.name] ?? "";
                let content;

                if (col.references && fkResolved && fkResolved[col.name]) {
                    const fk = fkResolved[col.name];
                    const displayName = fk.displayMap[val] ?? String(val);
                    const detailHref = `/${fk.referencedTable}/${val}`;
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
                    content = h("img", { src: `./app/assets/${val}`, alt: String(val), style: "max-height:6rem;border-radius:3px" });
                } else {
                    content = String(val);
                }

                return [
                    h("dt", { key: `${col.name}-dt`, style: "font-size:.75em;opacity:.6;margin-top:.5em" }, col.name),
                    h("dd", { key: `${col.name}-dd`, style: "margin:0" }, content),
                ];
            }),
        ),
    );
}
