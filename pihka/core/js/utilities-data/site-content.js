import { assetUrl } from "./paths.js";

/**
 * Loaders for the descriptive site chrome — the footer (credits, data
 * provenance, funder/university logos) and the top-nav menu (About,
 * Instructions, …). Each content file is looked up in the app first, then
 * falls back to a core default; both missing → null so the component
 * renders nothing. Same fail-soft, module-cached style as config.js.
 *
 * Content values are trusted as authored (same trust level as
 * app/config.json and perspective SQL): the site author controls these
 * files, and footer/menu HTML is injected verbatim.
 */

const ID_RE = /^[a-z][a-z0-9_-]*$/;

/**
 * Resolve a content-relative asset path. Absolute URLs (`http(s)://`) and
 * root-absolute paths (`/…`) pass through untouched; everything else is
 * resolved against the app base like any other asset.
 *
 * @param {string} src
 * @returns {string}
 */
export function resolveAssetPath(src) {
    if (/^https?:\/\//i.test(src) || src.startsWith("/")) return src;
    return assetUrl(src);
}

/**
 * Fetch the first of `paths` that loads and parses as JSON. Warns only if
 * every candidate fails (a missing app override falling back to the core
 * default is normal, not worth a warning).
 */
async function loadJsonWithFallback(paths, label) {
    for (const path of paths) {
        try {
            const res = await fetch(assetUrl(path));
            if (res.ok) return await res.json();
        } catch {
            // try the next candidate
        }
    }
    console.warn(`[site-content] no ${label} found (tried ${paths.join(", ")})`);
    return null;
}

let footerCache;
/**
 * Load the footer content: app/footer.json, else core/assets/footer.json,
 * else null.
 * @returns {Promise<Object|null>}
 */
export async function loadFooter() {
    if (footerCache !== undefined) return footerCache;
    footerCache = await loadJsonWithFallback(
        ["app/footer.json", "core/assets/footer.json"],
        "footer.json",
    );
    return footerCache;
}

let menuCache;
/**
 * Load the nav menu: app/menu.json, else core/assets/menu.json, else [].
 * Entries without a valid `id` (URL segment) are dropped with a warning.
 * @returns {Promise<Array>}
 */
export async function loadMenu() {
    if (menuCache !== undefined) return menuCache;
    const raw = await loadJsonWithFallback(
        ["app/menu.json", "core/assets/menu.json"],
        "menu.json",
    );
    if (!Array.isArray(raw)) {
        menuCache = [];
        return menuCache;
    }
    menuCache = raw.filter(item => {
        // External-link items only need a valid href; page items need an id.
        if (item && typeof item.href === "string") return true;
        if (item && ID_RE.test(item.id ?? "")) return true;
        console.warn("[site-content] ignoring invalid menu entry:", item);
        return false;
    });
    return menuCache;
}
