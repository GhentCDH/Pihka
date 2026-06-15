/**
 * Static-asset path resolution. Deliberately dependency-free (no preact) so
 * the data layer can fetch the database, config, and assets without dragging
 * in any UI code — this is what keeps utilities-data/ reusable on its own.
 *
 * In-app navigation hrefs (hash anchors) are a separate, UI concern and live
 * in utilities-ui/router.js (buildPath).
 */

/**
 * Auto-detect the base path from the location of this module file.
 * paths.js lives at <base>/core/js/utilities-data/paths.js, so we strip
 * the known suffix to recover the base path.
 * E.g. if served at /pihka/core/js/utilities-data/paths.js → base is "/pihka".
 * If served at /core/js/utilities-data/paths.js → base is "".
 */
export const basePath = (() => {
    const url = new URL(import.meta.url);
    const path = url.pathname;
    const suffix = "/core/js/utilities-data/paths.js";
    const idx = path.lastIndexOf(suffix);
    if (idx === -1) return "";
    return path.slice(0, idx); // e.g. "/pihka" or ""
})();

/**
 * Resolve an asset path relative to the app root.
 * Usage: assetUrl("app/config.json") → "/pihka/app/config.json" (or "/app/config.json" at root)
 */
export function assetUrl(relativePath) {
    return basePath + "/" + relativePath;
}
