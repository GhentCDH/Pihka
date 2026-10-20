// @ts-check
import { quoteIdentifier, findTextColumns } from "./sql-utils.js";

const RESERVED_FTS5_COLS = new Set(["rowid", "rank"]);
const INDEXABLE_TYPES = new Set(["table", "view"]);

// Tokenizer modes selectable via config.enrichment.fts. Trigram gives
// substring ("autocomplete-like") matching; unicode61 matches whole words
// but supports the full FTS5 query syntax (prefix*, NEAR, column:).
// remove_diacritics on trigram needs SQLite >= 3.45 (vendored wasm is 3.51).
const TOKENIZERS = {
    trigram: "trigram remove_diacritics 1",
    unicode61: "unicode61 remove_diacritics 2",
};

const DEFAULT_MODE = "trigram";

// SQLite identifier matching folds ASCII only, not Unicode case pairs.
function foldIdentifier(name) {
    return name.replace(/[A-Z]/g, c => c.toLowerCase());
}

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

// Perspective views indexed on request only: an index on a view over an
// indexed table lists the same records twice in search.
function ftsViews(config) {
    const perspectives = Array.isArray(config?.perspectives) ? config.perspectives : [];
    return new Set(perspectives
        .filter(p => p?.fts === true && typeof p.table === "string")
        .map(p => foldIdentifier(p.table)));
}

/**
 * Build an external-content FTS5 virtual table for every user table that
 * has at least one text column and a single INTEGER PRIMARY KEY. Views of
 * perspectives with `fts: true` qualify through their INTEGER `id` column,
 * which metadata marks as the primary key. Published indexes over views
 * are reused without that setting.
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
export async function fts5Plugin(ds, meta, config) {
    const mode = resolveFtsMode(config);
    // Inspect published definitions rather than guessing from an index name.
    // Only external-content indexes with understood tokenizers are reusable.
    const definitions = await ds.exec("SELECT name, sql FROM sqlite_schema WHERE type = 'table' AND sql IS NOT NULL", { rowMode: "object" });
    const layouts = await ds.exec("SELECT name, wr FROM pragma_table_list WHERE schema = 'main'", { rowMode: "object" });
    const tableNames = new Map(Object.keys(meta.tables).map(name => [foldIdentifier(name), name]));
    for (const { name, sql } of definitions) {
        if (!/\bUSING\s+fts5\s*\(/i.test(sql)) continue;
        if (meta.tables[name]) meta.tables[name].internal = true;
        const option = (key) => {
            const match = sql.match(new RegExp(`\\b${key}\\s*=\\s*(?:'((?:[^']|'')*)'|"((?:[^"]|"")*)"|([\\w]+))`, "i"));
            return match ? (match[1]?.replace(/''/g, "'") ?? match[2]?.replace(/""/g, '"') ?? match[3]) : null;
        };
        const source = tableNames.get(foldIdentifier(option("content") ?? ""));
        const target = meta.tables[source];
        const rowidOption = foldIdentifier(option("content_rowid") || "rowid");
        const tokenizer = (option("tokenize") || "unicode61").trim().split(/\s+/)[0].toLowerCase();
        const indexedColumns = meta.tables[name]?.columns ?? [];
        const detail = (option("detail") || "full").toLowerCase();
        if (detail !== "full") {
            console.warn(`[fts5] cannot reuse "${name}": unsupported detail=${detail}; detail=full is required for phrase and trigram search`);
            continue;
        }
        if (!target || !INDEXABLE_TYPES.has(target.type) || !TOKENIZERS[tokenizer] || !indexedColumns.length) continue;
        const rowidColumn = target.columns.find(c => foldIdentifier(c.name) === rowidOption);
        const layout = layouts.find(t => foldIdentifier(t.name) === foldIdentifier(source));
        // Views have no implicit rowid, so they always need an explicit integer column.
        const validRowid = rowidColumn ? /^INTEGER$/i.test(rowidColumn.type || "")
            : target.type === "table" && layout?.wr === 0 && ["rowid", "_rowid_", "oid"].includes(rowidOption);
        if (!validRowid) {
            console.warn(`[fts5] cannot reuse "${name}": content rowid "${rowidOption}" is missing or not INTEGER (WITHOUT ROWID tables require an explicit integer column)`);
            continue;
        }
        const columns = indexedColumns.map(c => target.columns.find(t => foldIdentifier(t.name) === foldIdentifier(c.name)));
        if (!columns.every(c => c && !c.noFts)) {
            console.warn(`[fts5] cannot reuse "${name}": indexed columns are missing or excluded by noFts`);
            continue;
        }
        target.fts ??= { table: name, columns: columns.map(c => c.name), mode: tokenizer, rowid: rowidColumn?.name ?? rowidOption };
    }
    const views = ftsViews(config);
    for (const [name, tableMeta] of Object.entries(meta.tables)) {
        const indexable = tableMeta.type === "table"
            || (tableMeta.type === "view" && views.has(foldIdentifier(name)));
        if (!indexable) continue;
        if (tableMeta.fts || ds.capabilities?.readOnly) continue;
        try {
            await buildIndex(ds, name, tableMeta, mode);
        } catch (err) {
            console.warn(`[fts5] skipped "${name}":`, err.message);
        }
    }
}

async function buildIndex(ds, tableName, tableMeta, mode) {
    if (tableMeta.columns.filter(c => c.primaryKey).length !== 1) return;
    const pkCol = tableMeta.columns.find(
        c => c.primaryKey && /^INTEGER$/i.test(c.type || ""),
    );
    if (!pkCol) return; // FTS5 external content needs an integer rowid

    const textCols = findTextColumns(tableMeta.columns)
        .filter(c => !RESERVED_FTS5_COLS.has(c.name.toLowerCase()) && !c.noFts);
    if (textCols.length === 0) return;

    // Published objects (including FTS shadow tables) must never be replaced.
    const names = new Set((await ds.exec("SELECT name FROM sqlite_schema UNION ALL SELECT name FROM sqlite_temp_schema"))
        .map(r => foldIdentifier(r.name)));
    let ftsName = `${tableName}_fts`;
    for (let suffix = 1; ["", "_data", "_idx", "_content", "_docsize", "_config"]
        .some(part => names.has(foldIdentifier(ftsName + part))); suffix++) {
        ftsName = `${tableName}_fts_${suffix}`;
    }
    const qFts = quoteIdentifier(ftsName);
    const qSrc = quoteIdentifier(tableName);
    const qPk = quoteIdentifier(pkCol.name);
    const colDefs = textCols.map(c => quoteIdentifier(c.name)).join(", ");

    // FTS5 needs the source table name as a string literal in the option,
    // so we single-quote it (escaping any internal single-quotes).
    const sourceLiteral = `'${tableName.replace(/'/g, "''")}'`;
    const pkLiteral = `'${pkCol.name.replace(/'/g, "''")}'`;

    await ds.exec(
        `CREATE VIRTUAL TABLE ${qFts} USING fts5(`
        + `${colDefs},`
        + ` content=${sourceLiteral},`
        + ` content_rowid=${pkLiteral},`
        + ` tokenize='${TOKENIZERS[mode]}'`
        + `)`,
    );

    await ds.exec(
        `INSERT INTO ${qFts}(rowid, ${colDefs}) `
        + `SELECT ${qPk}, ${colDefs} FROM ${qSrc}`,
    );

    tableMeta.fts = {
        table: ftsName,
        columns: textCols.map(c => c.name),
        mode,
        rowid: pkCol.name,
    };
}
