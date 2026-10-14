// @ts-check
// Composition root: the only place that combines engine, runtime and concrete defaults.
import { openDataset } from "./core/engine/index.js";
import { createComponentRegistry } from "./core/ui/registry/index.js";
import { installPlugin, mountUI, showStatus } from "./core/ui/index.js";
import * as defaults from "./core/ui/defaults/index.js";
import { loadFooter, loadMenu } from "./core/ui/runtime/site-content.js";
import { loadConfig, loadPluginModules, normalizeEngineConfig } from "./bootstrap.js";

async function main() {
    const element = document.getElementById("app");
    const registry = createComponentRegistry();
    installPlugin(registry, defaults);
    const status = (message, error = null) => showStatus({ element, registry, message, error });
    status("Loading…");
    let session;
    try {
        const baseUrl = new URL("./", import.meta.url);
        const config = await loadConfig(new URL("app/config.json", baseUrl));
        const timeoutMs =
            Number(config.componentLoadTimeoutMs) > 0
                ? Number(config.componentLoadTimeoutMs)
                : 10000;
        const options = { baseUrl: baseUrl.href, timeoutMs };
        const enginePlugins = await loadPluginModules(config.enginePlugins, options);
        const databaseUrl = new URL(config.database || "app/database/sample.db", baseUrl);
        if (config.databaseVersion)
            databaseUrl.searchParams.set("v", String(config.databaseVersion));
        session = await openDataset({
            databaseUrl: databaseUrl.href,
            config: normalizeEngineConfig(config),
            plugins: enginePlugins,
            onProgress: ({ phase, bytes }) =>
                status(
                    phase === "loading" && bytes
                        ? `Opening database (${(bytes / (1024 * 1024)).toFixed(1)} MB)…`
                        : {
                              opening: "Opening database…",
                              downloading: "Downloading database…",
                              indexing: "Indexing for search…",
                          }[phase] || "Loading…",
                ),
        });
        for (const plugin of await loadPluginModules(config.uiPlugins, options)) {
            try {
                installPlugin(registry, plugin);
            } catch (error) {
                console.warn("[pihka] UI plugin registration failed — skipped:", error);
            }
        }
        registry.seal();
        const [footer, menu] = await Promise.all([loadFooter(), loadMenu()]);
        const ui = await mountUI({ element, registry, ...session, config, footer, menu });
        const dispose = (event) => {
            if (event.persisted) return;
            window.removeEventListener("pagehide", dispose);
            ui.unmount();
            session.close().catch((error) => console.warn("[pihka] cleanup failed:", error));
        };
        window.addEventListener("pagehide", dispose);
    } catch (error) {
        try {
            await session?.close();
        } catch (cleanupError) {
            console.warn("[pihka] cleanup failed:", cleanupError);
        }
        console.error("[pihka] startup failed:", error);
        status(null, error);
    }
}

main();
