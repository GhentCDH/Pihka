/**
 * Registry of filter types — the filtering counterpart of the view, cell-
 * renderer, and facet-renderer registries. Every kind of filter the
 * platform understands is registered here: core registers "search"
 * (full-text), "range" (numeric), and "multi" (categoric) in
 * builtin-filters.js; extensions add their own.
 *
 * A filter type owns three concerns, each optional:
 *   - the URL codec (decode params → filter objects, encode back),
 *   - the SQL fragment (filter object → WHERE conditions),
 *   - a filter-metadata hook run by DataStore#getFilterMeta so the type
 *     can annotate (or reshape) what facets the UI offers.
 *
 * This module is part of the data layer: no preact. Facet UI for a filter
 * type is registered separately via utilities-ui/facet-renderers.js.
 */

const types = new Map();

/**
 * @typedef {Object} FilterTypeDefinition
 * @property {string[]} [reservedParams] - raw URL param names this type
 *   claims (e.g. ["q"]); the generic column-param decoder skips them.
 * @property {boolean} [preservesParams] - true when the reserved params are
 *   NOT filter encodings and must survive filter re-encoding (search's "q").
 * @property {(params: Object, ctx: {filterMeta: Object, facets: Array|null}) => Object|null} [decode]
 *   - contribute `{ key: filterObject }` entries decoded from URL params.
 *   Filter objects must carry `type` set to this type's name.
 * @property {(key: string, filter: Object) => Object|null} [encode]
 *   - URL param patch for one filter entry (null values delete params).
 * @property {(key: string, filter: Object) => {conditions: string[], params: any[]}|null} [buildSql]
 *   - WHERE fragment for one filter entry.
 * @property {(ctx: {table: string, columns: Array, meta: Object, loadRangeBounds: (col: string) => {min: number, max: number}}) => void} [filterMeta]
 *   - hook run while building a table's filter metadata; may mutate
 *   `ctx.meta` (add its own metadata, reshape rangeColumns, ...).
 */

/**
 * Guard a filter-type callback: a throw degrades to null (the filter is
 * skipped / the param stays inert) + a console warning, instead of
 * breaking every table query. Core does not trust registered callbacks.
 */
function guardCallback(fn, type, fnName) {
    if (typeof fn !== "function") return undefined;
    return (...args) => {
        try {
            return fn(...args);
        } catch (err) {
            console.warn(`[pihka] filter type "${type}" ${fnName}() failed:`, err);
            return null;
        }
    };
}

/**
 * Register a filter type. Re-registering a name overrides it. All
 * callbacks are wrapped at registration so a crashing one degrades to a
 * warning + skipped filter.
 *
 * @param {string} type
 * @param {FilterTypeDefinition} def
 */
export function registerFilterType(type, def) {
    if (typeof type !== "string" || !type) {
        throw new Error(`registerFilterType: invalid type "${type}"`);
    }
    types.set(type, {
        type,
        reservedParams: Array.isArray(def.reservedParams) ? def.reservedParams : [],
        preservesParams: def.preservesParams === true,
        decode: guardCallback(def.decode, type, "decode"),
        encode: guardCallback(def.encode, type, "encode"),
        buildSql: guardCallback(def.buildSql, type, "buildSql"),
        filterMeta: guardCallback(def.filterMeta, type, "filterMeta"),
    });
}

/** @param {string|undefined} type */
export function getFilterType(type) {
    return types.get(type);
}

/** All registered filter types, in registration order. */
export function listFilterTypes() {
    return [...types.values()];
}

/** Union of every type's reserved URL param names. */
export function allReservedParams() {
    const out = new Set();
    for (const def of types.values()) {
        for (const p of def.reservedParams) out.add(p);
    }
    return out;
}

/** Reserved params of types that preserve them across filter re-encoding. */
export function preservedParams() {
    const out = new Set();
    for (const def of types.values()) {
        if (def.preservesParams) for (const p of def.reservedParams) out.add(p);
    }
    return out;
}
