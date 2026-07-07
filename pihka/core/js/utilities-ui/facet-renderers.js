/**
 * Registry of custom facet renderers — the facet-sidebar counterpart of the
 * view and cell-renderer registries. Component modules (extensions, app)
 * register a Preact component that renders an extra facet block in the
 * sidebar for tables where it applies (e.g. a map viewport filter for
 * tables with coordinate columns).
 *
 * A facet renderer component receives:
 *   autoFilterMeta - from store.getFilterMeta(table): rangeMeta, multiMeta,
 *                    rangeColumns, multiColumns, plus whatever registered
 *                    filter types contribute via their filterMeta hooks
 *   filters        - current filter state decoded from the URL
 *   actions        - bundled mutation callbacks from useUrlState
 *   lang           - current language code
 */

import { withErrorBoundary, guardPredicate } from "./error-boundary.js";

const renderers = new Map();

/**
 * Register a facet renderer. Re-registering an id overrides it. The
 * component and predicate are guarded at registration — core does not
 * trust them: a crash degrades to a warning + inline fallback.
 *
 * @param {string} id - stable key, also used as the render key
 * @param {{ component: import("preact").ComponentType<any>,
 *           availableFor?: (autoFilterMeta: Object) => boolean }} def
 */
export function registerFacetRenderer(id, { component, availableFor = null }) {
    if (typeof id !== "string" || !id) {
        throw new Error(`registerFacetRenderer: invalid id "${id}"`);
    }
    if (typeof component !== "function") {
        throw new Error(`registerFacetRenderer: "${id}" needs a component function`);
    }
    const label = `facet ${id}`;
    renderers.set(id, {
        id,
        component: withErrorBoundary(component, label),
        availableFor: guardPredicate(availableFor, label),
    });
}

/**
 * All registered facet renderers, in registration order.
 *
 * @returns {Array<{ id: string, component: import("preact").ComponentType<any>,
 *                   availableFor: ((autoFilterMeta: Object) => boolean)|null }>}
 */
export function listFacetRenderers() {
    return [...renderers.values()];
}
