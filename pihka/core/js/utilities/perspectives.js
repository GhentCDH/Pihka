/**
 * Load and normalise the perspectives configuration from app/config.json.
 * Falls back to auto-generating one "table" perspective per non-virtual DB
 * table when config is absent, empty, or has no perspectives defined.
 *
 * @param {import('./datasource.js').DataSource} ds  — must be ready
 * @returns {Promise<{ defaultLanguage: string, perspectives: Perspective[] }>}
 */
export async function loadPerspectives(ds) {
    let cfg = {};
    try {
        const res = await fetch("./app/config.json");
        if (res.ok) cfg = await res.json();
    } catch (_) {
        // Network or parse error — fall through to auto-generate
    }

    const defaultLanguage = cfg.defaultLanguage || "en";

    let perspectives;
    if (Array.isArray(cfg.perspectives) && cfg.perspectives.length > 0) {
        perspectives = cfg.perspectives.map(normalizePerspective);
    } else {
        const meta = ds.metadata();
        perspectives = Object.entries(meta.tables)
            .filter(([, t]) => t.type !== "virtual")
            .map(([name]) => normalizePerspective({ id: name, name, table: name, view: "table" }));
    }

    return { defaultLanguage, perspectives };
}

const VALID_VIEWS = ["table", "cards", "map"];

function normalizePerspective(p) {
    const view = VALID_VIEWS.includes(p.view) ? p.view : "table";
    const allowedViews = Array.isArray(p.allowed_views)
        ? p.allowed_views.filter(v => VALID_VIEWS.includes(v))
        : [view];

    return {
        id:            String(p.id),
        name:          String(p.name ?? p.id),
        table:         String(p.table),
        // Legacy: single view field
        view,
        // New: rich config
        label:         p.label || null,
        allowed_views: allowedViews,
        default_view:  VALID_VIEWS.includes(p.default_view) ? p.default_view : allowedViews[0],
        default_sort:  p.default_sort || null,
        page_size:     typeof p.page_size === "number" ? p.page_size : 25,
        query:         typeof p.query === "string" ? p.query : null,
        facets:        Array.isArray(p.facets) ? p.facets : null,
        fields:        Array.isArray(p.fields) ? p.fields : null,
    };
}
