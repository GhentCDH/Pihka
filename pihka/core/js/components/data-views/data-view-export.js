import { h, Fragment } from "preact";
import { visibleColumns } from "../../utilities-data/table-config.js";
import { toCsv } from "../../utilities-data/csv.js";

/**
 * Export list view: downloads the dataset in machine-readable formats.
 * Registered like any list view (icon ⤓), non-paginated, so `rows` is the
 * complete current selection — every row matching the active filters and
 * search, exactly the data the other views render.
 *
 * Four options:
 *   - the full SQLite database, linked straight from its HTTP source file
 *   - the current selection as JSON
 *   - the current selection as CSV (header row + rows)
 *   - the full entity (all rows, filters ignored) as CSV
 *
 * Exports carry the visible columns with raw values — no display
 * formatting, no FK resolution; hidden columns stay hidden here as in
 * every view (the database download contains everything regardless).
 */
export default function DataViewExport({ name, columns, rows, store }) {
    const cols = visibleColumns(columns ?? []);
    const colNames = cols.map(c => c.name);
    const pick = (row) => {
        const out = {};
        for (const col of colNames) out[col] = row[col];
        return out;
    };

    const databaseUrl = store?.databaseUrl ?? null;
    const databaseFile = databaseUrl ? databaseUrl.split("/").pop() : null;
    const selection = rows ?? [];

    const exportJson = () => downloadText(
        `${name}-selection.json`,
        "application/json",
        JSON.stringify(selection.map(pick), null, 2),
    );
    const exportCsv = () => downloadText(
        `${name}-selection.csv`,
        "text/csv",
        toCsv(colNames, selection.map(pick)),
    );
    const exportFullCsv = () => {
        const all = store.queryTable(name, { pageSize: null });
        downloadText(`${name}-full.csv`, "text/csv", toCsv(colNames, (all?.rows ?? []).map(pick)));
    };

    const option = (title, description, action) => h("article", { class: "export-option" },
        h("header", null, h("strong", null, title)),
        h("p", null, h("small", null, description)),
        action,
    );

    return h("div", { class: "export-view", style: "max-width:38rem" },
        option(
            "Current selection (JSON)",
            `The ${selection.length.toLocaleString("en")} rows matching the active filters and search, as an array of objects.`,
            h("button", { onClick: exportJson }, `⤓ ${name}-selection.json`),
        ),
        option(
            "Current selection (CSV)",
            `The same ${selection.length.toLocaleString("en")} rows as comma-separated values with a header row.`,
            h("button", { onClick: exportCsv }, `⤓ ${name}-selection.csv`),
        ),
        store && option(
            `All items in the ${name} table (CSV)`,
            `Every row of ${name}, ignoring filters, as comma-separated values with a header row.`,
            h("button", { onClick: exportFullCsv }, `⤓ ${name}-full.csv`),
        ),
        databaseUrl && option(
            "Full database (SQLite)",
            h(Fragment, null,
                `The complete dataset as published — every table, served as the static file ${databaseFile}. Open it with `,
                h("a", { href: "https://sqlite.org/", target: "_blank", rel: "noopener noreferrer" }, "SQLite"),
                " or any ",
                h("a", { href: "https://1bench.dev/best/sqlite-gui-clients", target: "_blank", rel: "noopener noreferrer" }, "SQLite GUI client"),
                ".",
            ),
            h("a", { href: databaseUrl, download: "", role: "button" }, `⤓ ${databaseFile}`),
        ),
    );
}

/** Offer `text` as a file download without leaving the page. */
function downloadText(filename, mime, text) {
    const url = URL.createObjectURL(new Blob([text], { type: `${mime};charset=utf-8` }));
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}
