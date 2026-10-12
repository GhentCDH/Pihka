// @ts-check
import sqlite3InitModule from "./vendor/@sqlite.org/sqlite-wasm/dist/index.mjs";
import { installSyncHttpVfs } from "./vendor/sqlite-wasm-http/dist/vfs-sync-http.js";
import { installValidatedHttp } from "./validated-http.js";

let db;
let transportError = () => null;
let queue = Promise.resolve();
globalThis.onmessage = ({ data }) => {
    queue = queue.then(async () => {
        const { id, method } = data;
        try {
            let result;
            if (method === "open") {
                const { url, options } = data;
                if (!/^https?:\/\//i.test(url)) throw new Error("HTTP VFS requires an HTTP(S) URL");
                if (options.headers && Object.keys(options.headers).some(k => /^(range|if-range|if-match|if-none-match|if-modified-since|if-unmodified-since|accept-encoding)$/i.test(k))) throw new Error("Range, conditional and encoding headers are managed by the VFS");
                transportError = installValidatedHttp(options);
                // This worker uses HTTP only. SQLite 3.53's documented bootstrap
                // configuration disables both OPFS proxy workers, even on hosts
                // whose COOP/COEP headers enable SharedArrayBuffer.
                globalThis.sqlite3ApiConfig = {
                    disable: { vfs: { opfs: true, "opfs-wl": true, "opfs-sahpool": true, kvvfs: true } },
                };
                const sqlite3 = await sqlite3InitModule();
                installSyncHttpVfs(sqlite3, { cacheSize: 8192, maxPageSize: 65536, ...options });
                db = new sqlite3.oo1.DB(url, "r", "http");
                db.exec("PRAGMA query_only=ON; PRAGMA temp_store=MEMORY;");
                result = null;
            } else if (method === "exec") {
                if (transportError()) throw transportError();
                const rows = [];
                db.exec({ sql: data.sql, bind: data.options.bind, rowMode: data.options.rowMode, callback: row => { rows.push(row); } });
                result = rows;
            } else throw new Error(`Unknown worker method: ${method}`);
            if (transportError()) throw transportError();
            globalThis.postMessage({ id, result });
        } catch (err) {
            const error = transportError() || err;
            globalThis.postMessage({ id: data.id, error: { message: error.message, code: error.code } });
        }
    });
};
