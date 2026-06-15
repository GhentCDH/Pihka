import { fts5Plugin } from "./fts5.js";

/**
 * Load-time database enrichment pipeline.
 *
 * Each plugin is `(ds, meta, config) => Promise<void> | void` and may:
 *   - run SQL against `ds` (e.g. CREATE VIRTUAL TABLE, INSERT, …)
 *   - mutate `meta` in place to advertise what it added
 *
 * Plugins run sequentially in the order returned by `buildPipeline`.
 * Failures bubble up — individual plugins are responsible for wrapping
 * per-table work in try/catch if they want best-effort behaviour.
 */
export async function runEnrichment(ds, meta, config = {}) {
    const plugins = buildPipeline(config);
    for (const plugin of plugins) {
        await plugin(ds, meta, config);
    }
}

function buildPipeline(config) {
    const e = config?.enrichment || {};
    const plugins = [];
    // FTS5 is on unless explicitly disabled.
    if (e.fts !== false) plugins.push(fts5Plugin);
    return plugins;
}
