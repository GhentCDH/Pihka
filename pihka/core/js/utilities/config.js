import { assetUrl } from "./router.js";

let cached = null;

/**
 * Load and cache the app's config.json. Returns an empty object if the file
 * is missing, unreachable, or unparsable — every consumer is expected to
 * handle absent fields anyway.
 */
export async function loadConfig() {
    if (cached) return cached;
    try {
        const res = await fetch(assetUrl("app/config.json"));
        if (!res.ok) {
            console.warn(`[config] app/config.json returned ${res.status}; using defaults`);
            cached = {};
        } else {
            cached = await res.json();
        }
    } catch (err) {
        console.warn("[config] failed to load app/config.json; using defaults:", err);
        cached = {};
    }
    return cached;
}
