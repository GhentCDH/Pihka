import { createContext, h } from "preact";
import { useState, useContext, useEffect } from "preact/hooks";

const VALID_VIEWS = new Set(["table", "cards", "card", "map"]);

/**
 * Parse the current URL into a route descriptor.
 *
 * New patterns:
 *   /:lang/:perspective/:view          → list view
 *   /:lang/:perspective/:id/:view      → detail view
 *
 * Legacy patterns (redirected on first render):
 *   /:perspective                       → /{defaultLang}/:perspective/table
 *   /:perspective/:id                   → /{defaultLang}/:perspective/:id/table
 *
 * Query params are parsed into a plain object.
 */
function parseLocation() {
    const parts = window.location.pathname.replace(/^\//, "").split("/").filter(Boolean);
    const params = Object.fromEntries(new URLSearchParams(window.location.search));

    // Home: /
    if (parts.length === 0) {
        return { lang: null, perspective: null, id: null, view: null, params };
    }

    // Legacy: /:perspective (1 segment, not a lang code)
    if (parts.length === 1) {
        return { lang: null, perspective: parts[0], id: null, view: null, params, legacy: true };
    }

    // Legacy: /:perspective/:id (2 segments, second is not a valid view)
    if (parts.length === 2 && !VALID_VIEWS.has(parts[1])) {
        return { lang: null, perspective: parts[0], id: parts[1], view: null, params, legacy: true };
    }

    // New: /:lang/:perspective/:view (3 segments)
    if (parts.length === 3 && VALID_VIEWS.has(parts[2])) {
        return { lang: parts[0], perspective: parts[1], id: null, view: parts[2], params };
    }

    // New: /:lang/:perspective/:id/:view (4 segments)
    if (parts.length === 4 && VALID_VIEWS.has(parts[3])) {
        return { lang: parts[0], perspective: parts[1], id: parts[2], view: parts[3], params };
    }

    // 2 segments where second IS a valid view: treat as /:lang/:perspective with default view
    if (parts.length === 2 && VALID_VIEWS.has(parts[1])) {
        // Ambiguous: could be /en/table or /perspective/table
        // Treat as /:perspective/:view for consistency
        return { lang: null, perspective: parts[0], id: null, view: parts[1], params, legacy: true };
    }

    // Fallback: best-effort
    return { lang: parts[0] ?? null, perspective: parts[1] ?? null, id: null, view: null, params };
}

/**
 * Build a URL path with optional query params.
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
 * Push a new path (creates history entry). Used for navigation between perspectives/views.
 */
export function navigate(path, params) {
    const url = buildUrl(path, params);
    window.history.pushState(null, "", url);
    window.dispatchEvent(new Event("pushstate"));
}

/**
 * Update query params without creating a history entry.
 * Used for filter/sort/page changes — prevents flooding the back button.
 * Passing null for a value removes that param.
 */
export function updateParams(updates) {
    const current = new URLSearchParams(window.location.search);
    for (const [k, v] of Object.entries(updates)) {
        if (v == null || v === "") {
            current.delete(k);
        } else {
            current.set(k, String(v));
        }
    }
    const qs = current.toString();
    const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new Event("replacestate"));
}

/**
 * Wrap the app in <Router> to make useRouter() available to any descendant.
 */
export function Router({ children }) {
    const [location, setLocation] = useState(parseLocation);

    useEffect(() => {
        const update = () => setLocation(parseLocation());
        window.addEventListener("popstate", update);
        window.addEventListener("pushstate", update);
        window.addEventListener("replacestate", update);

        const onClick = (e) => {
            const link = e.target.closest("a[href]");
            if (!link) return;
            const href = link.getAttribute("href");
            if (!href || !href.startsWith("/") || href.startsWith("//")) return;
            if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
            e.preventDefault();
            navigate(href);
        };
        document.addEventListener("click", onClick);

        return () => {
            window.removeEventListener("popstate", update);
            window.removeEventListener("pushstate", update);
            window.removeEventListener("replacestate", update);
            document.removeEventListener("click", onClick);
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
