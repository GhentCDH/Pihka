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

        // Optional app extension: a module registering custom views
        // (config key "views", e.g. "app/views.js"). A broken module must
        // not take the site down — builtin views still work, so warn and
        // continue.
        if (typeof config.views === "string") {
            try {
                await import(assetUrl(config.views));
            } catch (err) {
                console.warn("[pihka] failed to load custom views module:", err);
            }
        }

        const ds = new DataSource(assetUrl(config.database || "app/database/sample.db"));
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
        const store = new DataStore(ds, meta);
        const { perspectives, defaultLanguage } = await loadPerspectives(meta);

        render(
            h(Router, null, h(App, {
                perspectives,
                store,
                defaultLang: defaultLanguage,
                languages: Array.isArray(config.languages) ? config.languages : null,
            })),
            app,
        );
    } catch (error) {
        console.error("[pihka] startup failed:", error);
        showStatus(null, error);
    }
}

main();
