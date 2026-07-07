/**
 * Idempotent runtime stylesheet loading. index.html only links core CSS;
 * component modules (extensions, app) that ship their own CSS call
 * ensureStylesheet() on import so enabling a module in config is all the
 * wiring a stylesheet needs.
 */

/**
 * Append a <link rel="stylesheet"> for `href` unless one already exists.
 * Dedupes on the resolved absolute URL, so relative and absolute spellings
 * of the same stylesheet load once. Pass a `key` when the same stylesheet
 * can arrive from different URLs — e.g. two extensions each vendoring the
 * same library's CSS — so only the first copy loads.
 *
 * @param {string} href
 * @param {{ key?: string }} [options]
 */
export function ensureStylesheet(href, { key = null } = {}) {
    const resolved = new URL(href, document.baseURI).href;
    const links = /** @type {NodeListOf<HTMLLinkElement>} */ (
        document.querySelectorAll("link[rel=stylesheet]")
    );
    for (const link of links) {
        if (link.href === resolved) return;
        if (key && link.dataset.pihkaCss === key) return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = resolved;
    if (key) link.dataset.pihkaCss = key;
    document.head.appendChild(link);
}
