// App bootstrap: loads the database, runs enrichment, and renders the app.
// index.html only references this module — all logic lives in core/js/.

// Registers the builtin list/detail views (side effect) before anything
// parses URLs or renders.
import "./components/data-views/builtin-views.js";

import { h, render } from "preact";
import { DataSource } from "./utilities-data/datasource.js";
import { DataStore } from "./utilities-data/data-store.js";
import { loadPerspectives } from "./utilities-ui/perspectives.js";
import { loadConfig } from "./utilities-data/config.js";
import { loadFooter, loadMenu } from "./utilities-data/site-content.js";
import { runEnrichment } from "./utilities-data/enrichment/index.js";
import { applyTableConfig } from "./utilities-data/table-config.js";
import { createPerspectiveViews } from "./utilities-data/perspective-views.js";
import { assetUrl } from "./utilities-data/paths.js";
import { Router, redirectLegacyPathUrl } from "./utilities-ui/router.js";
import { App, Status } from "./components/app.js";

async function main() {
    // Old path-style deep links (served by hosts with an SPA fallback)
    // become hash routes before the router first parses the URL.
    redirectLegacyPathUrl();

    const app = document.getElementById("app");
    const showStatus = (message, error) => render(h(Status, { message, error }), app);

    showStatus("Loading…");
    try {
        const config = await loadConfig();

        // Optional component modules: each registers views, cell renderers,
        // facet renderers, and/or filter types, whether it lives in
        // extensions/ or app/ — the loading mechanism makes no distinction.
        // "components" is an array of module paths (a bare string also
        // works); the legacy "views" string is still honored.
        //
        // Core does not trust these modules: a module that fails to load,
        // throws while loading, or hangs (config key componentLoadTimeoutMs,
        // default 10s) is warned about and skipped — builtin viewing and
        // filtering keep working. A timed-out module that finishes later
        // may still register itself; its views then appear on the next
        // navigation, which is harmless.
        const componentModules = [
            ...(Array.isArray(config.components) ? config.components : []),
            ...(typeof config.components === "string" ? [config.components] : []),
            ...(typeof config.views === "string" ? [config.views] : []),
        ];
        const loadTimeoutMs =
            Number(config.componentLoadTimeoutMs) > 0
                ? Number(config.componentLoadTimeoutMs)
                : 10000;
        for (const path of componentModules) {
            if (typeof path !== "string" || !path) {
                console.warn(`[pihka] ignoring non-string "components" entry:`, path);
                continue;
            }
            try {
                await Promise.race([
                    import(assetUrl(path)),
                    new Promise((_, reject) =>
                        setTimeout(
                            () => reject(new Error(`timed out after ${loadTimeoutMs}ms`)),
                            loadTimeoutMs,
                        ),
                    ),
                ]);
            } catch (err) {
                console.warn(
                    `[pihka] failed to load component module "${path}" — continuing without it:`,
                    err,
                );
            }
        }

        const databaseUrl = assetUrl(config.database || "app/database/sample.db");
        const ds = new DataSource(databaseUrl);
        ds.addEventListener("downloading", () => showStatus("Downloading database…"));
        ds.addEventListener("loading", (e) => {
            const { bytes } = /** @type {CustomEvent<{bytes: number}>} */ (e).detail;
            showStatus(`Opening database (${(bytes / (1024 * 1024)).toFixed(1)} MB)…`);
        });
        await ds.ready;

        // Multi-table perspectives become SQL views before the schema is
        // read, so they show up in the metadata like any table.
        createPerspectiveViews(ds, config);

        const meta = ds.metadata();
        applyTableConfig(meta, config);
        showStatus("Indexing for search…");
        await runEnrichment(ds, meta, config);
        const store = new DataStore(ds, meta, databaseUrl);
        const { perspectives, defaultLanguage } = await loadPerspectives(meta);

        // Descriptive chrome (footer credits/provenance/logos + nav menu
        // pages) — fail-soft, so a missing or broken file never blocks boot.
        const [footer, menu] = await Promise.all([loadFooter(), loadMenu()]);

        render(
            h(
                Router,
                null,
                h(App, {
                    perspectives,
                    store,
                    defaultLang: defaultLanguage,
                    languages: Array.isArray(config.languages) ? config.languages : null,
                    menu,
                    footer,
                }),
            ),
            app,
        );
    } catch (error) {
        console.error("[pihka] startup failed:", error);
        showStatus(null, error);
    }
}

main();
