// @ts-check
/** Application composition helpers. Neither the engine nor UI imports this module. */
export function normalizeEngineConfig(config = {}) {
    const columns = {};
    for (const [table, definition] of Object.entries(config.tables ?? {})) {
        columns[table] = {};
        for (const [column, settings] of Object.entries(definition?.columns ?? {})) {
            columns[table][column] = {
                numeric: settings?.type === "number",
                noFts: settings?.fts === false,
            };
        }
    }
    return {
        datasource: config.datasource,
        enrichment: config.enrichment,
        perspectives: (Array.isArray(config.perspectives) ? config.perspectives : [])
            .filter((p) => p && typeof p === "object")
            .map(({ id, table, query }) => ({ id, table, query })),
        columns,
    };
}

export async function loadConfig(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const config = await response.json();
        if (!config || typeof config !== "object" || Array.isArray(config))
            throw new Error("Expected a configuration object");
        return config;
    } catch (error) {
        console.warn("[pihka] failed to load config — using defaults:", error);
        return {};
    }
}

/** Import deadlines never invoke late installers. Timers are always released. */
export async function loadPluginModules(
    paths = [],
    { baseUrl = import.meta.url, timeoutMs = 10000 } = {},
) {
    const modules = [];
    for (const path of Array.isArray(paths) ? paths : [paths]) {
        if (typeof path !== "string" || !path) {
            console.warn("[pihka] ignoring invalid plugin path:", path);
            continue;
        }
        let timer;
        try {
            const module = await Promise.race([
                import(new URL(path, baseUrl).href),
                new Promise((_, reject) => {
                    timer = setTimeout(
                        () => reject(new Error(`timed out after ${timeoutMs}ms`)),
                        timeoutMs,
                    );
                }),
            ]);
            if (typeof module.register !== "function")
                throw new TypeError("Plugin must export register(api)");
            modules.push(module);
        } catch (error) {
            console.warn(
                `[pihka] failed to load component module "${path}" — continuing without it:`,
                error,
            );
        } finally {
            clearTimeout(timer);
        }
    }
    return modules;
}
