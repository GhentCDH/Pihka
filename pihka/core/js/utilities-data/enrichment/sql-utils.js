/**
 * Shared SQL helpers — kept tiny so any module can import them without
 * pulling in the wider data layer.
 */

/**
 * Quote a SQL identifier safely.
 *   quoteIdentifier('foo')      → '"foo"'
 *   quoteIdentifier('a"b')      → '"a""b"'
 */
export function quoteIdentifier(name) {
    return `"${String(name).replace(/"/g, '""')}"`;
}

const TEXT_TYPES = new Set([
    "TEXT", "VARCHAR", "CHAR", "CLOB",
    "NCHAR", "NVARCHAR", "NCLOB", "STRING",
]);

/**
 * Returns the columns that should be treated as full-text-indexable.
 * Excludes primary keys and rows whose declared type is clearly non-textual.
 * If a column has no declared type, we still consider it text — SQLite is
 * loose about affinities and an un-typed column commonly holds text.
 */
export function findTextColumns(columns) {
    if (!Array.isArray(columns)) return [];
    return columns.filter(c => {
        if (c.primaryKey) return false;
        if (!c.type) return true;
        return TEXT_TYPES.has(String(c.type).toUpperCase());
    });
}
