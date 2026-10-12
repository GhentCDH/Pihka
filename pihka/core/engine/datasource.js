// @ts-check
import { readMetadata } from "./metadata.js";
import sqlite3InitModule from "@sqlite.org/sqlite-wasm";


let _sqlite3Promise = null;

function getSqlite3() {
    if (!_sqlite3Promise) _sqlite3Promise = sqlite3InitModule();
    return _sqlite3Promise;
}

export class DataSource extends EventTarget {
    #db = null;
    #closed = false;
    #abort = new globalThis.AbortController();
    capabilities = { readOnly: false };

    /**
     * Resolves when open and ready to query. Rejects on initialization failure
     * or with AbortError if closed before opening. Callers must handle rejection.
     */
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
            // Yield one microtask so the caller constructing this source can
            // attach event listeners before the first event fires.
            await Promise.resolve();
            this.#abort.signal.throwIfAborted();

            this.dispatchEvent(new CustomEvent("downloading"));

            const res = await fetch(url, { signal: this.#abort.signal });
            this.#abort.signal.throwIfAborted();
            if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
            const buf = await res.arrayBuffer();
            this.#abort.signal.throwIfAborted();

            this.dispatchEvent(new CustomEvent("loading", { detail: { bytes: buf.byteLength } }));
            this.#abort.signal.throwIfAborted();

            const sqlite3 = await getSqlite3();
            this.#abort.signal.throwIfAborted();

            const bytes = new Uint8Array(buf);
            const n = bytes.byteLength;
            let pBuf = sqlite3.wasm.alloc(n);
            let db = null;
            try {
                sqlite3.wasm.heap8u().set(bytes, pBuf);
                db = new sqlite3.oo1.DB();
                const rc = sqlite3.capi.sqlite3_deserialize(
                    db.pointer, "main", pBuf, n, n,
                    sqlite3.capi.SQLITE_DESERIALIZE_FREEONCLOSE |
                    sqlite3.capi.SQLITE_DESERIALIZE_RESIZEABLE,
                );
                // FREEONCLOSE transfers ownership even when deserialize fails.
                pBuf = 0;
                db.checkRc(rc);
                this.#db = db;
                db = null;
            } finally {
                if (pBuf) sqlite3.wasm.dealloc(pBuf);
                db?.close();
            }

            this.dispatchEvent(new CustomEvent("ready"));
        } catch (cause) {
            const error = this.#closed ? this.#abort.signal.reason : cause;
            this.dispatchEvent(new CustomEvent("error", { detail: { error } }));
            throw error;
        }
    }

    /**
     * Execute SQL against the in-memory database.
     * Portable datasource subset only: bind parameters, object/array rows,
     * and a synchronous callback(row) (no SQLite statement handle).
     * Returning false stops row delivery, including subsequent statements;
     * this downloader also stops stepping the current statement. Other
     * sources may finish execution before delivering rows. The returned array
     * contains exactly the delivered rows, including the row that stopped it.
     *
     * @param {string} sql
     * @param {Object} [options]
     * @param {Array|Object} [options.bind] Positional or named SQL parameters.
     * @param {"object"|"array"} [options.rowMode="object"]
     * @param {(row: Object|Array) => unknown} [options.callback]
     * @returns {Promise<Array<Object|Array>>}
     */
    async exec(sql, options = {}) {
        if (this.#closed) throw new Error("DataSource closed");
        if (!this.#db) throw new Error("DataSource not ready — await ds.ready first");
        if (typeof sql !== "string") throw new TypeError("Datasource sql must be a string");
        if (!options || typeof options !== "object" || Array.isArray(options)) throw new TypeError("Datasource exec options must be an object");
        for (const key of Reflect.ownKeys(options)) {
            if (typeof key !== "string" || !["bind", "rowMode", "callback"].includes(key)) throw new TypeError(`Unsupported datasource exec option: ${String(key)}`);
        }
        const { bind, rowMode = "object", callback } = options;
        if (rowMode !== "object" && rowMode !== "array") throw new TypeError("Unsupported rowMode: use object or array");
        if (callback !== undefined && typeof callback !== "function") throw new TypeError("Datasource callback must be a function");
        const rows = [];
        let stopped = false;
        this.#db.exec({ sql, bind, rowMode, callback: row => {
            if (stopped) return false;
            rows.push(row);
            if (callback?.(row) === false) {
                stopped = true;
                return false;
            }
        } });
        return rows;
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
        return readMetadata(this);
    }

    /** Terminal and idempotent; cancels pending download/initialization. */
    async close() {
        this.#closed = true;
        this.#abort.abort();
        this.#db?.close();
        this.#db = null;
    }
}

