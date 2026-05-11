import { assetUrl } from "./router.js";
import { findGeoColumns } from "../components/map/map-utils.js";

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
        const res = await fetch(assetUrl("app/config.json"));
        if (res.ok) cfg = await res.json();
    } catch (_) {
        // Network or parse error — fall through to auto-generate
    }

    const defaultLanguage = cfg.defaultLanguage || "en";

    const meta = ds.metadata();
    let perspectives;
    if (Array.isArray(cfg.perspectives) && cfg.perspectives.length > 0) {
        perspectives = cfg.perspectives.map(p => normalizePerspective(p, meta));
    } else {
        perspectives = Object.entries(meta.tables)
            .filter(([, t]) => t.type !== "virtual")
            .map(([name]) => normalizePerspective({ id: name, name, table: name, view: "table" }, meta));
    }

    perspectives.sort((a, b) => a.name.localeCompare(b.name));

    return { defaultLanguage, perspectives };
}

const VALID_VIEWS = ["table", "cards", "map"];

function normalizePerspective(p, meta) {
    const view = VALID_VIEWS.includes(p.view) ? p.view : "table";

    let allowedViews;
    if (Array.isArray(p.allowed_views)) {
        allowedViews = p.allowed_views.filter(v => VALID_VIEWS.includes(v));
    } else {
        // Auto-expand to table + cards, plus map if the table has geo columns.
        allowedViews = ["table", "cards"];
        const tableMeta = meta?.tables?.[p.table];
        if (tableMeta && findGeoColumns(tableMeta.columns)) {
            allowedViews.push("map");
        }
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
        default_view:  VALID_VIEWS.includes(p.default_view) ? p.default_view : allowedViews[0],
        default_sort:  p.default_sort || null,
        page_size:     typeof p.page_size === "number" ? p.page_size : 25,
        query:         typeof p.query === "string" ? p.query : null,
        facets:        Array.isArray(p.facets) ? p.facets : null,
        fields:        Array.isArray(p.fields) ? p.fields : null,
    };
}
