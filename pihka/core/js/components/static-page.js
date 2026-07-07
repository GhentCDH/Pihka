import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { localize } from "../utilities-data/table-config.js";
import { resolveAssetPath } from "../utilities-data/site-content.js";

// Fetched HTML assets are cached per resolved URL — pages don't change
// within a session and the same page is often revisited.
const htmlCache = new Map();

/**
 * A static menu page (About, Instructions, …). Its content is either
 * inline `html` (a string or a {lang: html} map) or an HTML asset `src`
 * (a path string or {lang: path} map, fetched on demand). Content is
 * injected verbatim — trusted as authored, like app/config.json.
 *
 * Props:
 *   item - the menu entry ({ id, label, html?, src? })
 *   lang - current language code
 */
export default function StaticPage({ item, lang }) {
    const inlineHtml = item?.html != null ? localize(item.html, lang, "") : null;
    const src = item?.src != null ? localize(item.src, lang, "") : null;
    const url = src ? resolveAssetPath(src) : null;

    // Fetched state is keyed by url; a cached url shows immediately, so
    // switching between pages never leaves stale content on screen.
    const [fetched, setFetched] = useState(() => (url && htmlCache.has(url))
        ? { url, html: htmlCache.get(url), error: null }
        : { url: null, html: null, error: null });

    useEffect(() => {
        if (inlineHtml || !url) return;
        if (htmlCache.has(url)) {
            setFetched({ url, html: htmlCache.get(url), error: null });
            return;
        }
        let cancelled = false;
        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error(`${res.status}`);
                return res.text();
            })
            .then(text => {
                htmlCache.set(url, text);
                if (!cancelled) setFetched({ url, html: text, error: null });
            })
            .catch(err => {
                if (!cancelled) setFetched({ url, html: null, error: err });
            });
        return () => { cancelled = true; };
    }, [url, inlineHtml]);

    if (inlineHtml) {
        return h("article", { class: "static-page", dangerouslySetInnerHTML: { __html: inlineHtml } });
    }
    if (!url) {
        return h("article", { class: "static-page" }, h("p", null, "This page has no content."));
    }
    // Only trust fetched content that matches the current url — during a
    // page switch the effect hasn't run yet, so show loading, not the
    // previous page.
    if (fetched.url !== url) {
        return h("article", { class: "static-page", "aria-busy": "true" }, "Loading…");
    }
    if (fetched.error || fetched.html == null) {
        return h("article", { class: "static-page" },
            h("p", { style: "color:var(--pico-muted-color)" }, "This page could not be loaded."),
        );
    }
    return h("article", { class: "static-page", dangerouslySetInnerHTML: { __html: fetched.html } });
}
