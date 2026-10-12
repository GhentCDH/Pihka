// @ts-check
export async function readMetadata(ds) {

        const tables = {};

        // PRAGMA table_list (SQLite ≥ 3.37) lists every table/view in the
        // database and its kind. "shadow" rows are FTS5/R-Tree internal tables;
        // sqlite_* rows are SQLite system objects — both are excluded.
        const tableList = [];
        await ds.exec("PRAGMA table_list", {
            rowMode: "object",
            callback: row => tableList.push(row),
        });

        const userTables = tableList.filter(
            t => t.type !== "shadow" && !t.name.startsWith("sqlite_"),
        );

        for (const { name, type } of userTables) {
            const quotedName = `"${name.replace(/"/g, '""')}"`;

            // Columns: cid, name, type, notnull, dflt_value, pk (1-based PK position)
            const columns = [];
            await ds.exec(`PRAGMA table_info(${quotedName})`, {
                rowMode: "object",
                callback: row => columns.push({
                    name: row.name,
                    type: row.type || null,
                    notNull: row.notnull === 1,
                    primaryKey: row.pk > 0,
                    references: null,
                }),
            });

            // Foreign keys: id, seq, table, from, to, on_update, on_delete
            // Attach each FK directly onto the originating column.
            await ds.exec(`PRAGMA foreign_key_list(${quotedName})`, {
                rowMode: "object",
                callback: fk => {
                    const col = columns.find(c => c.name === fk.from);
                    if (col) col.references = { table: fk.table, column: fk.to };
                },
            });

            tables[name] = { type, columns };
        }

        return { tables };
}
