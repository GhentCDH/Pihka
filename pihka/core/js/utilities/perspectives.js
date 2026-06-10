import { loadConfig } from "./config.js";
import { getView, listViews } from "./view-registry.js";

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
 * @property {string|null} query - custom SQL query (static display)
 * @property {Array|null} facets
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

    let perspectives;
    if (Array.isArray(cfg.perspectives) && cfg.perspectives.length > 0) {
        perspectives = cfg.perspectives.map(p => normalizePerspective(p, meta));
    } else {
        perspectives = Object.entries(meta.tables)
            .filter(([, t]) => t.type !== "virtual" && !t.hidden)
            .map(([name, t]) => normalizePerspective(
                { id: name, name, table: name, view: "table", label: t.label },
                meta,
            ));
    }

    perspectives.sort((a, b) => a.name.localeCompare(b.name));

    return { defaultLanguage, perspectives };
}

function normalizePerspective(p, meta) {
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
    };
}
