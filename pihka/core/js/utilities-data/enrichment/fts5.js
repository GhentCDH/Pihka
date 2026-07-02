import { quoteIdentifier, findTextColumns } from "./sql-utils.js";

const RESERVED_FTS5_COLS = new Set(["rowid", "rank"]);

// Tokenizer modes selectable via config.enrichment.fts. Trigram gives
// substring ("autocomplete-like") matching; unicode61 matches whole words
// but supports the full FTS5 query syntax (prefix*, NEAR, column:).
// remove_diacritics on trigram needs SQLite >= 3.45 (vendored wasm is 3.51).
const TOKENIZERS = {
    trigram: "trigram remove_diacritics 1",
    unicode61: "unicode61 remove_diacritics 2",
};

const DEFAULT_MODE = "trigram";

function resolveFtsMode(config) {
    const value = config?.enrichment?.fts;
    if (typeof value === "string") {
        if (TOKENIZERS[value]) return value;
        console.warn(
            `[fts5] unknown enrichment.fts value "${value}"; `
            + `expected ${Object.keys(TOKENIZERS).join("/")} or false — using "${DEFAULT_MODE}"`,
        );
    }
    return DEFAULT_MODE;
}

/**
 * Build an external-content FTS5 virtual table for every user table that
 * has at least one text column and a single INTEGER PRIMARY KEY.
 *
 * Annotates each enriched table on `meta` so consumers can discover what's
 * searchable:
 *   meta.tables["authors"].fts = {
 *     table: "authors_fts",
 *     columns: ["name", "birthplace"],
 *     mode: "trigram",
 *   }
 *
 * The in-memory DB is rebuilt from the .db file on every page load, so
 * indexes never go stale within a session — no triggers needed.
 */
export function fts5Plugin(ds, meta, config) {
    const mode = resolveFtsMode(config);
    for (const [name, tableMeta] of Object.entries(meta.tables)) {
        if (tableMeta.type !== "table") continue; // skip views, virtuals
        try {
            buildIndex(ds, name, tableMeta, mode);
        } catch (err) {
            console.warn(`[fts5] skipped "${name}":`, err.message);
        }
    }
}

function buildIndex(ds, tableName, tableMeta, mode) {
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
        + ` tokenize='${TOKENIZERS[mode]}'`
        + `)`,
    );

    ds.exec(
        `INSERT INTO ${qFts}(rowid, ${colDefs}) `
        + `SELECT ${qPk}, ${colDefs} FROM ${qSrc}`,
    );

    tableMeta.fts = {
        table: ftsName,
        columns: textCols.map(c => c.name),
        mode,
    };
}
