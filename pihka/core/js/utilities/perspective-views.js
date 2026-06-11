/**
 * Multi-table perspectives: each configured perspective with a `query`
 * becomes a SQL view on the in-memory database, created fresh every page
 * load (the database is deserialized per session, so views are transient
 * by design — same pattern as the FTS enrichment).
 *
 * The query is plain SQL kept verbatim in app/config.json so joins and
 * GROUP BY stay readable and auditable. Once the view exists it behaves
 * like any table: it appears in the schema metadata, queryTable paginates
 * and filters it, and table display config applies to its columns.
 */

function quote(s) {
    return `"${s.replace(/"/g, '""')}"`;
}

/**
 * Create one view per configured perspective that defines a query.
 * A failing definition (bad SQL, missing table, name collision) is warned
 * about and skipped — the rest of the site must keep working.
 *
 * @param {import('./datasource.js').DataSource} ds - must be ready
 * @param {Object} config - parsed app/config.json
 */
export function createPerspectiveViews(ds, config) {
    if (!Array.isArray(config?.perspectives)) return;

    for (const p of config.perspectives) {
        if (typeof p?.query !== "string" || !p.query.trim()) continue;
        if (typeof p?.table !== "string" || !p.table.trim()) {
            console.warn(`[perspectives] "${p?.id}": a query needs a "table" name for its view; skipped`);
            continue;
        }

        try {
            // Plain CREATE (not IF NOT EXISTS): colliding with an existing
            // table must fail loudly and skip the perspective rather than
            // silently serving that table's rows.
            ds.exec(`CREATE VIEW ${quote(p.table)} AS ${p.query}`);
            // SQLite stores view bodies unresolved — a broken query only
            // fails at first prepare, which would otherwise happen inside
            // metadata() and take the whole app down. Probe it now.
            ds.exec(`SELECT * FROM ${quote(p.table)} LIMIT 0`);
        } catch (err) {
            console.warn(`[perspectives] "${p.id}" (view "${p.table}") skipped:`, String(err.message || err));
            try {
                ds.exec(`DROP VIEW IF EXISTS ${quote(p.table)}`);
            } catch {
                /* nothing to clean up */
            }
        }
    }
}
