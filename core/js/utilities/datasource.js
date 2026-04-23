import sqlite3InitModule from "@sqlite.org/sqlite-wasm";


let _sqlite3Promise = null;

function getSqlite3() {
    if (!_sqlite3Promise) _sqlite3Promise = sqlite3InitModule();
    return _sqlite3Promise;
}

export class DataSource extends EventTarget {
    #db = null;

    /** Resolves when the database is open and ready to query. */
    ready;

    /**
     * @param {string} url  Path to the .sqlite / .db file to load.
     */
    constructor(url) {
        super();
        this.ready = this.#init(url);
    }

    async #init(url) {
        try {

            this.dispatchEvent(new CustomEvent("downloading"));

            const res = await fetch(url);
            if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
            const buf = await res.arrayBuffer();

            this.dispatchEvent(new CustomEvent("loading", { detail: { bytes: buf.byteLength } }));

            const sqlite3 = await getSqlite3();

            const bytes = new Uint8Array(buf);
            const n = bytes.byteLength;
            const pBuf = sqlite3.wasm.alloc(n);
            sqlite3.wasm.heap8u().set(bytes, pBuf);

            const db = new sqlite3.oo1.DB();
            const rc = sqlite3.capi.sqlite3_deserialize(
                db.pointer, "main", pBuf, n, n,
                sqlite3.capi.SQLITE_DESERIALIZE_FREEONCLOSE |
                sqlite3.capi.SQLITE_DESERIALIZE_RESIZEABLE,
            );
            db.checkRc(rc);
            this.#db = db;

            this.dispatchEvent(new CustomEvent("ready"));
        } catch (error) {
            this.dispatchEvent(new CustomEvent("error", { detail: { error } }));
            throw error;
        }
    }

    /**
     * Execute SQL against the in-memory database.
     * Accepts the same options object as sqlite3.oo1.DB#exec().
     *
     * @param {string} sql
     * @param {object} [options]
     */
    exec(sql, options = {}) {
        if (!this.#db) throw new Error("DataSource not ready — await ds.ready first");
        return this.#db.exec({ sql, ...options });
    }

    /**
     * Introspect the database schema and return a description of every
     * user-visible table/view, its columns (with declared types), and any
     * foreign-key relationships.
     *
     * Returned shape:
     * ```
     * {
     *   tables: {
     *     [tableName]: {
     *       type: "table" | "view" | "virtual",
     *       columns: [
     *         {
     *           name: string,
     *           type: string | null,   // declared affinity, e.g. "INTEGER", "TEXT"
     *           notNull: boolean,
     *           primaryKey: boolean,
     *           references: { table: string, column: string } | null
     *         }
     *       ]
     *     }
     *   }
     * }
     * ```
     *
     * Foreign-key links are embedded directly on each column so a consumer
     * can navigate from a column to its referenced table:
     *   `meta.tables[col.references.table]`
     */
    metadata() {
        if (!this.#db) throw new Error("DataSource not ready — await ds.ready first");

        const tables = {};

        // PRAGMA table_list (SQLite ≥ 3.37) lists every table/view in the
        // database and its kind. "shadow" rows are FTS5/R-Tree internal tables;
        // sqlite_* rows are SQLite system objects — both are excluded.
        const tableList = [];
        this.#db.exec({
            sql: "PRAGMA table_list",
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
            this.#db.exec({
                sql: `PRAGMA table_info(${quotedName})`,
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
            this.#db.exec({
                sql: `PRAGMA foreign_key_list(${quotedName})`,
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

    close() {
        this.#db?.close();
        this.#db = null;
    }
}
