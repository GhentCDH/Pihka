import { DataSource } from "./datasource.js";

/** @type {Map<string, Function>} */
const sources = new Map([["download", (url) => new DataSource(url)]]);

export function registerDataSource(type, factory) {
    if (typeof type !== "string" || !type || typeof factory !== "function") {
        throw new TypeError("A datasource needs a type and factory");
    }
    sources.set(type, factory);
}

export function createDataSource(url, config = {}) {
    const type = config?.type ?? "download";
    const factory = sources.get(type);
    if (!factory) throw new Error(`Unknown datasource "${type}". Enable its component module.`);
    return factory(url, config?.options ?? {});
}
