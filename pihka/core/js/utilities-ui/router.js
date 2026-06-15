import { createContext, h } from "preact";
import { useState, useContext, useEffect } from "preact/hooks";
import { isValidViewId } from "./view-registry.js";
import { basePath } from "../utilities-data/paths.js";

/**
 * Hash-based router. Routes live entirely in the URL fragment —
 * `/#/en/works/table?bbox=...` — so deep links work on any static host
 * (GitHub Pages, S3, university servers) without rewrite rules: the server
 * only ever sees a request for the app's index.html.
 */

/**
 * Build an app-internal href. Routes are hash fragments, so no base path
 * is needed — the fragment is always relative to the current document.
 * Usage: buildPath(`/${lang}/${perspective}/${view}`)
 *
 * Static-asset URL resolution (assetUrl) is a data-layer concern and lives
 * in ../utilities-data/paths.js, separate from these UI navigation hrefs.
 */
export function buildPath(path) {
    return "#" + path;
}

/**
 * Read the current route + query string from the fragment.
 *
 * Parsed from location.href rather than location.hash: Firefox returns
 * `.hash` percent-decoded, which would corrupt encoded query values
 * (e.g. q=a%26b would split into two params).
 *
 * @returns {{ path: string, search: string }}
 */
function currentHash() {
    const href = window.location.href;
    const i = href.indexOf("#");
    const hash = i === -1 ? "/" : (href.slice(i + 1) || "/");
    const q = hash.indexOf("?");
    return {
        path: q === -1 ? hash : hash.slice(0, q),
        search: q === -1 ? "" : hash.slice(q + 1),
    };
}

/**
 * Parse the current fragment into a route descriptor.
 *
 * New patterns:
 *   #/:lang/:perspective/:view          → list view
 *   #/:lang/:perspective/:id/:view      → detail view
 *
 * Legacy patterns (redirected on first render):
 *   #/:perspective                       → #/{defaultLang}/:perspective/table
 *   #/:perspective/:id                   → #/{defaultLang}/:perspective/:id/table
 *
 * Query params (inside the fragment) are parsed into a plain object.
 */
function parseLocation() {
    const { path, search } = currentHash();
    const parts = path.replace(/^\//, "").split("/").filter(Boolean);
    const params = Object.fromEntries(new URLSearchParams(search));

    // Home: /
    if (parts.length === 0) {
        return { lang: null, perspective: null, id: null, view: null, params };
    }

    // Legacy: /:perspective (1 segment, not a lang code)
    if (parts.length === 1) {
        return { lang: null, perspective: parts[0], id: null, view: null, params, legacy: true };
    }

    // Legacy: /:perspective/:id (2 segments, second is not a valid view)
    if (parts.length === 2 && !isValidViewId(parts[1])) {
        return { lang: null, perspective: parts[0], id: parts[1], view: null, params, legacy: true };
    }

    // New: /:lang/:perspective/:view (3 segments)
    if (parts.length === 3 && isValidViewId(parts[2])) {
        return { lang: parts[0], perspective: parts[1], id: null, view: parts[2], params };
    }

    // New: /:lang/:perspective/:id/:view (4 segments)
    if (parts.length === 4 && isValidViewId(parts[3])) {
        return { lang: parts[0], perspective: parts[1], id: parts[2], view: parts[3], params };
    }

    // 2 segments where second IS a valid view: treat as /:lang/:perspective with default view
    if (parts.length === 2 && isValidViewId(parts[1])) {
        // Ambiguous: could be /en/table or /perspective/table
        // Treat as /:perspective/:view for consistency
        return { lang: null, perspective: parts[0], id: null, view: parts[1], params, legacy: true };
    }

    // Fallback: best-effort
    return { lang: parts[0] ?? null, perspective: parts[1] ?? null, id: null, view: null, params };
}

/**
 * Build a route string with optional query params.
 */
function buildUrl(path, params) {
    if (!params || Object.keys(params).length === 0) return path;
    const search = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
        if (v != null && v !== "") search.set(k, v);
    }
    const qs = search.toString();
    return qs ? `${path}?${qs}` : path;
}

export const RouterContext = createContext(null);

/**
 * Navigate to a path. By default creates a history entry (assigning
 * location.hash pushes and fires hashchange natively). With
 * { replace: true } the current entry is replaced instead — used for
 * redirects so the Back button doesn't bounce off the redirecting route.
 */
export function navigate(path, params, { replace = false } = {}) {
    const url = buildUrl(path, params);
    if (replace) {
        // replaceState never fires hashchange, hence the custom event.
        window.history.replaceState(null, "", "#" + url);
        window.dispatchEvent(new Event("replacestate"));
    } else {
        window.location.hash = url;
    }
}

/**
 * Update query params (inside the fragment) without creating a history
 * entry. Used for filter/sort/page changes — prevents flooding the back
 * button. Passing null for a value removes that param.
 */
export function updateParams(updates) {
    const { path, search } = currentHash();
    const current = new URLSearchParams(search);
    for (const [k, v] of Object.entries(updates)) {
        if (v == null || v === "") {
            current.delete(k);
        } else {
            current.set(k, String(v));
        }
    }
    const qs = current.toString();
    // replaceState never fires hashchange, hence the custom event.
    window.history.replaceState(null, "", "#" + (qs ? `${path}?${qs}` : path));
    window.dispatchEvent(new Event("replacestate"));
}

/**
 * Migrate old path-style deep links (/en/works/table) to the hash format.
 * Only ever runs on hosts that actually serve such paths (e.g. a server
 * with an SPA fallback); on plain static hosts those URLs 404 before any
 * script loads. Called once by the bootstrap before the first render.
 */
export function redirectLegacyPathUrl() {
    let pathname = window.location.pathname;
    if (basePath && pathname.startsWith(basePath)) {
        pathname = pathname.slice(basePath.length);
    }
    const parts = pathname.replace(/^\//, "").split("/").filter(Boolean);
    // A direct index.html load is not a route.
    if (parts[parts.length - 1] === "index.html") parts.pop();
    if (parts.length === 0) return;

    const search = window.location.search.replace(/^\?/, "");
    const route = "/" + parts.join("/") + (search ? "?" + search : "");
    window.history.replaceState(null, "", `${basePath}/#${route}`);
}

/**
 * Wrap the app in <Router> to make useRouter() available to any descendant.
 * In-app links are plain hash anchors (built by buildPath), so the browser
 * handles clicks natively — no document-level click interception needed.
 */
export function Router({ children }) {
    const [location, setLocation] = useState(parseLocation);

    useEffect(() => {
        const update = () => setLocation(parseLocation());
        window.addEventListener("hashchange", update);
        window.addEventListener("replacestate", update);

        return () => {
            window.removeEventListener("hashchange", update);
            window.removeEventListener("replacestate", update);
        };
    }, []);

    return h(RouterContext.Provider, { value: location }, children);
}

/**
 * Returns the current route: { lang, perspective, id, view, params }.
 */
export function useRouter() {
    return useContext(RouterContext);
}
