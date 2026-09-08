import { registerDataSource } from "../../core/js/utilities-data/datasource-registry.js";
import { readMetadata } from "../../core/js/utilities-data/datasource.js";

export class HttpDataSource extends EventTarget {
    capabilities = { readOnly: true };
    #worker;
    #queue = [];
    #active = null;
    #sequence = 0;
    #closed = false;
    #failure = null;

    constructor(url, options = {}) {
        super();
        // This source uses HTTP only. Disable SQLite's optional OPFS worker,
        // including on hosts whose COOP/COEP headers enable SharedArrayBuffer.
        this.#worker = new globalThis.Worker(new URL("./worker.js?opfs-disable", import.meta.url), { type: "module" });
        this.#worker.onmessage = ({ data }) => {
            const request = this.#active;
            if (!request || data?.id !== request.message.id) return;
            this.#active = null;
            clearTimeout(request.timer);
            if (data.error) request.reject(Object.assign(new Error(data.error.message), { code: data.error.code }));
            else request.resolve(data.result);
            this.#drain();
        };
        this.#worker.onerror = event => this.#fail(new Error(event.message || "HTTP database worker failed"));
        this.#worker.onmessageerror = () => this.#fail(new Error("Invalid HTTP database worker message"));
        this.timeoutMs = Number(options.timeoutMs) > 0 ? Number(options.timeoutMs) : 60000;
        this.ready = Promise.resolve().then(async () => {
            this.dispatchEvent(new CustomEvent("opening"));
            try {
                await this.#request("open", { url: new URL(url, location.href).href, options });
                this.dispatchEvent(new CustomEvent("ready"));
            } catch (error) {
                this.#fail(error);
                this.dispatchEvent(new CustomEvent("error", { detail: { error } }));
                throw error;
            }
        });
    }

    #fail(error) {
        this.#failure ??= error;
        this.#closed = true;
        this.#worker.terminate();
        for (const request of [this.#active, ...this.#queue]) {
            if (!request) continue;
            clearTimeout(request.timer);
            request.reject(this.#failure);
        }
        this.#active = null;
        this.#queue = [];
    }

    #request(method, args = {}) {
        if (this.#closed) return Promise.reject(this.#failure);
        const id = ++this.#sequence;
        return new Promise((resolve, reject) => {
            // Snapshot queued arguments now; clone errors never arm a deadline.
            const message = globalThis.structuredClone({ id, method, ...args });
            this.#queue.push({ resolve, reject, message });
            this.#drain();
        });
    }

    #drain() {
        while (!this.#closed && !this.#active && this.#queue.length) {
            const request = this.#queue.shift();
            this.#active = request;
            try {
                this.#worker.postMessage(request.message);
                request.timer = setTimeout(() => this.#fail(new Error("HTTP database operation timed out")), this.timeoutMs);
            } catch (error) {
                this.#active = null;
                request.reject(error);
            }
        }
    }

    async exec(sql, options = {}) {
        if (typeof sql !== "string") throw new TypeError("HTTP datasource sql must be a string");
        if (!options || typeof options !== "object" || Array.isArray(options)) throw new TypeError("HTTP datasource exec options must be an object");
        for (const key of Reflect.ownKeys(options)) {
            if (!["bind", "rowMode", "callback"].includes(key)) throw new TypeError(`Unsupported HTTP datasource exec option: ${String(key)}`);
        }
        const { bind, rowMode = "object", callback } = options;
        if (!["object", "array"].includes(rowMode)) throw new TypeError("HTTP datasource rowMode must be object or array");
        if (callback !== undefined && typeof callback !== "function") throw new TypeError("HTTP datasource callback must be a function");
        await this.ready;
        const rows = await this.#request("exec", { sql, options: { bind, rowMode } });
        // Rows are already materialized remotely; no statement handles cross the worker boundary.
        for (let i = 0; i < rows.length; i++) {
            if (callback?.(rows[i]) === false) {
                rows.length = i + 1;
                break;
            }
        }
        return rows;
    }

    metadata() { return readMetadata(this); }

    async close() { this.#fail(new Error("HTTP datasource closed")); }
}

registerDataSource("http-vfs", (url, options) => new HttpDataSource(url, options));
