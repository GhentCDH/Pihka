/**
 * Multi-table perspectives: each configured perspective with a `query`
 * reuses its published relation or becomes a transient SQL view when the
 * datasource is writable and the relation has not been published.
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
 * A failing definition (bad SQL, missing table) is warned
 * about and skipped — the rest of the site must keep working.
 *
 * @param {import('./datasource.js').DataSource} ds - must be ready
 * @param {Object} config - parsed app/config.json
 */
export async function createPerspectiveViews(ds, config) {
    if (!Array.isArray(config?.perspectives)) return;

    for (const p of config.perspectives) {
        if (typeof p?.query !== "string" || !p.query.trim()) continue;
        if (typeof p?.table !== "string" || !p.table.trim()) {
            console.warn(`[perspectives] "${p?.id}": a query needs a "table" name for its view; skipped`);
            continue;
        }

        let created = false;
        try {
            const existing = await ds.exec(
                "SELECT name FROM sqlite_schema WHERE type IN ('table', 'view') AND name = ? COLLATE NOCASE",
                { bind: [p.table] },
            );
            if (!existing.length && !ds.capabilities?.readOnly) {
                await ds.exec(`CREATE VIEW ${quote(p.table)} AS ${p.query}`);
                created = true;
            }
            // SQLite stores view bodies unresolved — a broken query only
            // fails at first prepare, which would otherwise happen inside
            // metadata() and take the whole app down. Probe it now.
            await ds.exec(`SELECT * FROM ${quote(p.table)} LIMIT 0`);
        } catch (err) {
            console.warn(`[perspectives] "${p.id}" (view "${p.table}") skipped:`, String(err.message || err));
            try {
                if (created) await ds.exec(`DROP VIEW IF EXISTS ${quote(p.table)}`);
            } catch {
                /* nothing to clean up */
            }
        }
    }
}
