/**
 * Build a WHERE clause from active filters.
 *
 * @param {Object} filters - Map of columnName → filter descriptor
 *   Range:  { type: "range", min: number|null, max: number|null }
 *   Multi:  { type: "multi", selected: Set<any> }
 * @param {Object} [options]
 * @param {string|null} [options.exclude] - Column name to exclude from the WHERE clause.
 *   Used for facet counts: when computing counts for column X, exclude X's own filter
 *   so the user sees counts as if their selection on X weren't applied.
 * @returns {{ whereClause: string, bindParams: any[] }}
 */
export function buildWhereClause(filters, { exclude = null } = {}) {
    const conditions = [];
    const params = [];

    for (const [colName, filter] of Object.entries(filters)) {
        if (exclude && colName === exclude) continue;

        const quoted = `"${colName.replace(/"/g, '""')}"`;

        if (filter.type === "range") {
            if (filter.min != null) {
                conditions.push(`${quoted} >= ?`);
                params.push(filter.min);
            }
            if (filter.max != null) {
                conditions.push(`${quoted} <= ?`);
                params.push(filter.max);
            }
        } else if (filter.type === "multi" && filter.selected.size > 0) {
            const placeholders = Array.from(filter.selected).map(() => "?").join(", ");
            conditions.push(`${quoted} IN (${placeholders})`);
            params.push(...filter.selected);
        }
    }

    return {
        whereClause: conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "",
        bindParams: params,
    };
}
