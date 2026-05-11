import { quoteIdentifier, findTextColumns } from "./sql-utils.js";

const RESERVED_FTS5_COLS = new Set(["rowid", "rank"]);

/**
 * Build an external-content FTS5 virtual table for every user table that
 * has at least one text column and a single INTEGER PRIMARY KEY.
 *
 * Annotates each enriched table on `meta` so consumers can discover what's
 * searchable:
 *   meta.tables["authors"].fts = {
 *     table: "authors_fts",
 *     columns: ["name", "birthplace"],
 *   }
 *
 * The in-memory DB is rebuilt from the .db file on every page load, so
 * indexes never go stale within a session — no triggers needed.
 */
export function fts5Plugin(ds, meta) {
    for (const [name, tableMeta] of Object.entries(meta.tables)) {
        if (tableMeta.type !== "table") continue; // skip views, virtuals
        try {
            buildIndex(ds, name, tableMeta);
        } catch (err) {
            console.warn(`[fts5] skipped "${name}":`, err.message);
        }
    }
}

function buildIndex(ds, tableName, tableMeta) {
    const pkCol = tableMeta.columns.find(
        c => c.primaryKey && /^INTEGER$/i.test(c.type || ""),
    );
    if (!pkCol) return; // FTS5 external content needs an integer rowid

    const textCols = findTextColumns(tableMeta.columns)
        .filter(c => !RESERVED_FTS5_COLS.has(c.name.toLowerCase()));
    if (textCols.length === 0) return;

    const ftsName = `${tableName}_fts`;
    const qFts = quoteIdentifier(ftsName);
    const qSrc = quoteIdentifier(tableName);
    const qPk = quoteIdentifier(pkCol.name);
    const colDefs = textCols.map(c => quoteIdentifier(c.name)).join(", ");

    // FTS5 needs the source table name as a string literal in the option,
    // so we single-quote it (escaping any internal single-quotes).
    const sourceLiteral = `'${tableName.replace(/'/g, "''")}'`;
    const pkLiteral = `'${pkCol.name.replace(/'/g, "''")}'`;

    ds.exec(
        `CREATE VIRTUAL TABLE ${qFts} USING fts5(`
        + `${colDefs},`
        + ` content=${sourceLiteral},`
        + ` content_rowid=${pkLiteral},`
        + ` tokenize='unicode61 remove_diacritics 2'`
        + `)`,
    );

    ds.exec(
        `INSERT INTO ${qFts}(rowid, ${colDefs}) `
        + `SELECT ${qPk}, ${colDefs} FROM ${qSrc}`,
    );

    tableMeta.fts = {
        table: ftsName,
        columns: textCols.map(c => c.name),
    };
}
