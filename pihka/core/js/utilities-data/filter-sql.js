import { getFilterType } from "./filter-registry.js";

/**
 * Build a WHERE clause from active filters.
 *
 * Each filter object carries a `type` naming a registered filter type
 * (see filter-registry.js); its `buildSql` produces the conditions.
 * Filters of unregistered types are skipped — an extension filter's URL
 * params are inert when that extension is not loaded.
 *
 * @param {Object} filters - Map of key → filter descriptor. The key is
 *   usually a column name; types may use reserved keys (e.g. "_viewport")
 *   with the real column names inside the descriptor.
 * @param {Object} [options]
 * @param {string|null} [options.exclude] - Filter key to exclude.
 *   Used for facet counts: when computing counts for column X, exclude X's own filter
 *   so the user sees counts as if their selection on X weren't applied.
 * @returns {{ whereClause: string, bindParams: any[] }}
 */
export function buildWhereClause(filters, { exclude = null } = {}) {
    const conditions = [];
    const params = [];

    for (const [key, filter] of Object.entries(filters)) {
        if (exclude && key === exclude) continue;

        const built = getFilterType(filter.type)?.buildSql?.(key, filter);
        if (!built) continue;
        // Shape check before splicing into SQL — a malformed fragment from
        // an untrusted filter type is skipped, not executed.
        if (!Array.isArray(built.conditions) || !built.conditions.every(c => typeof c === "string")
            || !Array.isArray(built.params)) {
            console.warn(`[pihka] filter type "${filter.type}" buildSql() returned a malformed fragment — skipped`);
            continue;
        }
        conditions.push(...built.conditions);
        params.push(...built.params);
    }

    return {
        whereClause: conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "",
        bindParams: params,
    };
}
