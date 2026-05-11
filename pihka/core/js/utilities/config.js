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
        cached = res.ok ? await res.json() : {};
    } catch (_) {
        cached = {};
    }
    return cached;
}
