/**
 * Central registry of view types. The single place where "what views exist"
 * is defined — the router, perspective normalization, and the view-toggle
 * UIs all consult it. Registering a view here is the extension point for
 * custom research-data views: an app can add its own list or detail
 * renderers (see "Custom views" in AGENTS.md) or override a builtin one by
 * re-registering its id.
 *
 * Components are stored opaquely. Core does not trust what is registered:
 * components are wrapped in an error boundary and availableFor predicates
 * in a try/catch at registration time, so a crashing extension degrades to
 * a warning + fallback instead of taking the app down.
 *
 * Props passed to registered components:
 *
 * @typedef {Object} ListViewProps
 * @property {string} id - perspective id (also used as section id)
 * @property {string} name - table name
 * @property {string} perspectiveId - perspective id (for detail links)
 * @property {Array} columns - column schema
 * @property {Array} rows - row objects (all filtered rows when the view is
 *   not paginated, otherwise the current page)
 * @property {Object|null} sort - { column, direction } current sort state
 * @property {Function|null} onSort - callback(columnName) to request sort
 * @property {Object|null} fkResolved - FK display maps
 * @property {string|null} lang - current language code
 *
 * @typedef {Object} DetailViewProps
 * @property {string} tableName
 * @property {Array} columns
 * @property {Object} row
 * @property {Object|null} fkResolved
 * @property {string|null} lang
 * @property {string|null} perspectiveId
 *
 * @typedef {Object} ViewDefinition
 * @property {string} id - URL segment, e.g. "table", "cards", "map"
 * @property {"list"|"detail"} context - list views render many rows,
 *   detail views render one
 * @property {import("preact").ComponentType<any>} component - Preact
 *   component receiving ListViewProps or DetailViewProps depending on context
 * @property {string} icon - short glyph shown on the view-toggle button
 * @property {boolean} paginated - list views only: whether the view shows
 *   one page at a time (drives pagination UI and which row set it receives)
 * @property {((columns: Array) => boolean)|null} availableFor - optional
 *   predicate deciding whether the view is offered for a table, based on
 *   its column schema (e.g. map views require lat/lon columns)
 */

import { withErrorBoundary, guardPredicate } from "./error-boundary.js";

const ID_RE = /^[a-z][a-z0-9_-]*$/;
const CONTEXTS = new Set(["list", "detail"]);

/** @type {Map<string, ViewDefinition>} */
const views = new Map();

/**
 * Register a view (or override an existing one with the same context + id).
 *
 * @param {Object} def
 * @param {string} def.id
 * @param {"list"|"detail"} def.context
 * @param {import("preact").ComponentType<any>} def.component
 * @param {string} [def.icon]
 * @param {boolean} [def.paginated]
 * @param {(columns: Array) => boolean} [def.availableFor]
 */
export function registerView({ id, context, component, icon = "", paginated = true, availableFor = null }) {
    if (!ID_RE.test(id ?? "")) {
        throw new Error(`registerView: invalid view id "${id}" (expected ${ID_RE})`);
    }
    if (!CONTEXTS.has(context)) {
        throw new Error(`registerView: invalid context "${context}" (expected "list" or "detail")`);
    }
    if (typeof component !== "function") {
        throw new Error(`registerView: "${context}:${id}" needs a component function`);
    }
    const label = `view ${context}:${id}`;
    views.set(`${context}:${id}`, {
        id, context, icon, paginated,
        component: withErrorBoundary(component, label),
        availableFor: guardPredicate(availableFor, label),
    });
}

/**
 * All views for a context, in registration order.
 *
 * @param {"list"|"detail"} context
 * @returns {ViewDefinition[]}
 */
export function listViews(context) {
    return [...views.values()].filter(v => v.context === context);
}

/**
 * Look up one view.
 *
 * @param {"list"|"detail"} context
 * @param {string} id
 * @returns {ViewDefinition|undefined}
 */
export function getView(context, id) {
    return views.get(`${context}:${id}`);
}

/**
 * Whether an id names a registered view in either context. Used by the
 * router to tell view segments apart from row ids when parsing URLs.
 *
 * @param {string} id
 * @returns {boolean}
 */
export function isValidViewId(id) {
    return views.has(`list:${id}`) || views.has(`detail:${id}`);
}
