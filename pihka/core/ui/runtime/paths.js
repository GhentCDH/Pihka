// @ts-check
/** Resolve UI assets relative to this static deployment. */

export const basePath = new URL("../../../", import.meta.url).pathname.replace(/\/$/, "");

/**
 * Resolve an asset path relative to the app root.
 * Usage: assetUrl("app/config.json") → "/pihka/app/config.json" (or "/app/config.json" at root)
 */
export function assetUrl(relativePath) {
    if (/^https?:\/\//i.test(relativePath) || relativePath.startsWith("/")) return relativePath;
    return basePath + "/" + relativePath;
}
