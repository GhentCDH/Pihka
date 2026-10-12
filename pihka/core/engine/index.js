// @ts-check
import { DataStore } from "./data-store.js";
import { createFilterRegistry } from "./filter-registry.js";
import { createPerspectiveViews } from "./perspective-views.js";
import { runEnrichment } from "./enrichment/index.js";
export { DataStore } from "./data-store.js";

function freeze(value) {
    if (value && typeof value === "object" && !Object.isFrozen(value)) {
        for (const child of Object.values(value)) freeze(child);
        Object.freeze(value);
    }
    return value;
}

/** Open an independent query session. Plugins expose synchronous register(api).
 * @param {{databaseUrl: string, config?: Object, plugins?: Array<{register: Function}>, onProgress?: Function}} options
 */
export async function openDataset({ databaseUrl, config = {}, plugins = [], onProgress }) {
    if (typeof databaseUrl !== "string" || !databaseUrl)
        throw new TypeError("databaseUrl is required");
    /** @type {Map<string, Function|null>} */
    const sources = new Map([["download", null]]);
    const filters = createFilterRegistry();
    for (const plugin of plugins) {
        let active = true;
        const stagedSources = [],
            stagedFilters = [];
        const assertActive = () => {
            if (!active) throw new Error("Plugin registration scope closed");
        };
        try {
            if (typeof plugin?.register !== "function")
                throw new TypeError("Engine plugin must export register(api)");
            const result = plugin.register(
                Object.freeze({
                    registerDataSource(type, factory) {
                        assertActive();
                        if (typeof type !== "string" || !type || typeof factory !== "function")
                            throw new TypeError("Invalid datasource registration");
                        stagedSources.push([type, factory]);
                    },
                    registerFilterType(type, def) {
                        assertActive();
                        // Validate and snapshot immediately, before committing any registration.
                        const validation = createFilterRegistry();
                        validation.register(type, def);
                        stagedFilters.push([
                            type,
                            { buildSql: def.buildSql, filterMeta: def.filterMeta },
                        ]);
                    },
                }),
            );
            if (result?.then) {
                Promise.resolve(result).catch(() => {});
                throw new TypeError("Engine plugin register must be synchronous");
            }
            for (const [type, factory] of stagedSources) sources.set(type, factory);
            for (const [type, def] of stagedFilters) filters.register(type, def);
        } catch (error) {
            console.warn("[pihka] engine plugin registration failed — skipped:", error);
        } finally {
            active = false;
        }
    }
    filters.seal();
    const sourceType = config.datasource?.type ?? "download";
    let factory = sources.get(sourceType);
    if (sourceType === "download" && factory === null) {
        const { DataSource } = await import("./datasource.js");
        factory = (url) => new DataSource(url);
    }
    if (!factory) throw new Error(`Unknown datasource "${sourceType}". Enable its engine plugin.`);
    /** @type {any} */
    let ds;
    /** @type {Array<[string, Function]>} */
    const listeners = [];
    const progress = (phase, detail = {}) => {
        try {
            onProgress?.({ phase, ...detail });
        } catch (error) {
            console.warn("[pihka] progress callback failed:", error);
        }
    };
    try {
        ds = factory(databaseUrl, config.datasource?.options ?? {});
        if (ds?.then) ds = await ds;
        for (const phase of ["opening", "downloading", "loading"]) {
            const listener = (event) => progress(phase, event.detail);
            ds.addEventListener?.(phase, listener);
            listeners.push([phase, listener]);
        }
        await ds.ready;
        await createPerspectiveViews(ds, config);
        const schema = await ds.metadata();
        for (const [table, columns] of Object.entries(config.columns ?? {})) {
            for (const [name, hints] of Object.entries(columns ?? {})) {
                const col = schema.tables[table]?.columns.find((column) => column.name === name);
                if (!col) continue;
                if (hints.numeric === true) col.numeric = true;
                if (hints.noFts === true) col.noFts = true;
            }
        }
        progress("indexing");
        await runEnrichment(ds, schema, config);
        // Index relations are internal even when search enrichment is disabled.
        const definitions = await ds.exec(
            "SELECT name, sql FROM sqlite_schema WHERE type = 'table' AND sql IS NOT NULL",
        );
        for (const { name, sql } of definitions) {
            if (/\bUSING\s+fts5\s*\(/i.test(sql) && schema.tables[name])
                schema.tables[name].internal = true;
        }
        freeze(schema);
        const store = new DataStore(ds, schema, databaseUrl, filters);
        let closePromise;
        return {
            store,
            schema,
            close() {
                store.close();
                return (closePromise ??= Promise.resolve().then(() => ds.close()));
            },
        };
    } catch (error) {
        try {
            await ds?.close();
        } catch (cleanupError) {
            console.warn("[pihka] datasource cleanup failed:", cleanupError);
        }
        throw error;
    } finally {
        for (const [phase, listener] of listeners) ds?.removeEventListener?.(phase, listener);
    }
}
