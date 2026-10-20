// @ts-check
/**
 * Multi-table perspectives: each configured perspective with a `query`
 * reuses its published relation or becomes a transient SQL view when the
 * datasource is writable and the relation has not been published.
 *
 * The query is plain SQL kept verbatim in app/config.json so joins and
 * GROUP BY stay readable and auditable. Once the view exists it behaves
 * like any table: it appears in the schema metadata, queryTable paginates
 * and filters it, and table display config applies to its columns.
 * Perspectives marked `materialize: true` are published as indexed tables
 * instead (see materializePerspectives).
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

/**
 * Publish each perspective marked `materialize: true` as a real table, so
 * read-only datasources filter, count and sort it through indexes instead
 * of scanning the joined query. Only the publishing step calls this: at
 * runtime the table is reused like any published relation, and an
 * unprepared writable database falls back to a view.
 *
 * The query must return a unique integer `id`, which becomes the INTEGER
 * PRIMARY KEY (for FTS and detail links). Each facet field and the default
 * sort column get an index. An existing relation with the same name is
 * replaced. Errors throw, so publishing fails instead of shipping a gap.
 *
 * @param {import('./datasource.js').DataSource} ds - must be writable
 * @param {Object} config - parsed app/config.json
 */
export async function materializePerspectives(ds, config) {
    if (!Array.isArray(config?.perspectives)) return;

    for (const p of config.perspectives) {
        if (!p?.materialize) continue;
        if (typeof p.query !== "string" || !p.query.trim() || typeof p.table !== "string" || !p.table.trim())
            throw new Error(`[perspectives] "${p?.id}": materialize needs a "query" and a "table"`);

        const table = quote(p.table);
        const sourceName = `pihka_materialize_${p.table}`;
        const source = `temp.${quote(sourceName)}`;
        await ds.exec(`DROP VIEW IF EXISTS ${source}`);
        await ds.exec(`CREATE TEMP VIEW ${quote(sourceName)} AS ${p.query}`);
        try {
            const columns = await ds.exec("SELECT name, type FROM pragma_table_xinfo(?, 'temp')", {
                bind: [sourceName],
                rowMode: "object",
            });
            if (!columns.some((c) => c.name === "id"))
                throw new Error(`[perspectives] "${p.id}": a materialized query must return an "id" column`);

            const existing = await ds.exec(
                "SELECT type FROM sqlite_schema WHERE type IN ('table', 'view') AND name = ? COLLATE NOCASE",
                { bind: [p.table], rowMode: "object" },
            );
            for (const { type } of existing) await ds.exec(`DROP ${type === "view" ? "VIEW" : "TABLE"} ${table}`);

            const definitions = columns.map((c) =>
                c.name === "id" ? `"id" INTEGER PRIMARY KEY` : `${quote(c.name)} ${c.type || ""}`.trim(),
            );
            const names = columns.map((c) => quote(c.name)).join(", ");
            await ds.exec(`CREATE TABLE ${table} (${definitions.join(", ")})`);
            await ds.exec(`INSERT INTO ${table} (${names}) SELECT ${names} FROM ${source}`);

            const indexed = new Set(
                [...(Array.isArray(p.facets) ? p.facets.map((f) => f?.field) : []), p.default_sort].filter(
                    (field) => typeof field === "string" && field !== "id" && columns.some((c) => c.name === field),
                ),
            );
            for (const field of indexed)
                await ds.exec(`CREATE INDEX ${quote(`${p.table}_${field}_idx`)} ON ${table} (${quote(field)})`);
        } finally {
            await ds.exec(`DROP VIEW IF EXISTS ${source}`);
        }
    }
}
