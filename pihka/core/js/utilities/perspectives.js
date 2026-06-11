import { loadConfig } from "./config.js";
import { getView, listViews } from "./view-registry.js";
import { getPref } from "./prefs.js";

/**
 * @typedef {Object} Perspective
 * @property {string} id
 * @property {string} name
 * @property {string} table
 * @property {string} view - legacy single view field
 * @property {Object|string|null} label
 * @property {string[]} allowed_views
 * @property {string} default_view
 * @property {string|null} default_sort
 * @property {number} page_size
 * @property {string|null} query - SQL backing the perspective's view
 * @property {Array|null} facets
 * @property {"perspective"|"table"} kind - configured perspective or
 *   auto-generated table card (drives homepage grouping)
 */

/**
 * Load and normalise the perspectives configuration from app/config.json.
 * Falls back to auto-generating one "table" perspective per non-virtual,
 * non-hidden DB table when config is absent, empty, or has no perspectives
 * defined.
 *
 * @param {{ tables: Object }} meta - schema metadata, already annotated by
 *   applyTableConfig() so table labels and hidden flags are present
 * @returns {Promise<{ defaultLanguage: string, perspectives: Perspective[] }>}
 */
export async function loadPerspectives(meta) {
    const cfg = await loadConfig();
    const defaultLanguage = cfg.defaultLanguage || "en";

    // Configured perspectives (multi-table views or curated table views).
    const configured = Array.isArray(cfg.perspectives)
        ? cfg.perspectives.map(p => normalizePerspective(p, meta, "perspective"))
        : [];

    // Auto-generated table cards: every non-virtual, non-hidden relation
    // that isn't already claimed by a configured perspective. Claimed by
    // `table` covers perspective views; claimed by `id` avoids two
    // perspectives answering the same route.
    const claimed = new Set();
    for (const p of configured) {
        claimed.add(p.table);
        claimed.add(p.id);
    }
    const tables = Object.entries(meta.tables)
        .filter(([name, t]) => t.type !== "virtual" && !t.hidden && !claimed.has(name))
        .map(([name, t]) => normalizePerspective(
            { id: name, name, table: name, view: "table", label: t.label },
            meta,
            "table",
        ));

    configured.sort((a, b) => a.name.localeCompare(b.name));
    tables.sort((a, b) => a.name.localeCompare(b.name));

    return { defaultLanguage, perspectives: [...configured, ...tables] };
}

/**
 * The list view to open a perspective with: the user's stored preference
 * (when still allowed), then the configured default.
 *
 * @param {Perspective|undefined} p
 * @returns {string|null}
 */
export function preferredView(p) {
    if (!p) return null;
    const stored = getPref(`view:${p.id}`);
    if (stored && (!p.allowed_views || p.allowed_views.includes(stored))) return stored;
    return p.default_view || p.view || null;
}

function normalizePerspective(p, meta, kind = "table") {
    const view = getView("list", p.view) ? p.view : "table";

    let allowedViews;
    if (Array.isArray(p.allowed_views)) {
        allowedViews = p.allowed_views.filter(v => getView("list", v));
    } else {
        // Auto-expand to every registered list view whose availableFor
        // predicate accepts this table's columns (e.g. map needs lat/lon).
        const columns = meta?.tables?.[p.table]?.columns ?? [];
        allowedViews = listViews("list")
            .filter(d => !d.availableFor || d.availableFor(columns))
            .map(d => d.id);
    }

    return {
        id:            String(p.id),
        name:          String(p.name ?? p.id),
        table:         String(p.table),
        // Legacy: single view field
        view,
        // New: rich config
        label:         p.label || null,
        allowed_views: allowedViews,
        default_view:  getView("list", p.default_view) ? p.default_view : allowedViews[0],
        default_sort:  p.default_sort || null,
        page_size:     typeof p.page_size === "number" ? p.page_size : 25,
        query:         typeof p.query === "string" ? p.query : null,
        facets:        Array.isArray(p.facets) ? p.facets : null,
        kind,
    };
}
