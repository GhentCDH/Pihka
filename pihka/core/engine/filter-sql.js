// @ts-check
import { createFilterRegistry } from "./filter-registry.js";

export function buildWhereClause(
    filters,
    { exclude = null, registry = createFilterRegistry() } = {},
) {
    if (!filters || typeof filters !== "object" || Array.isArray(filters))
        throw new TypeError("Filters must be an object");
    const conditions = [],
        params = [];
    for (const [key, filter] of Object.entries(filters)) {
        if (!filter || typeof filter !== "object" || typeof filter.type !== "string")
            throw new TypeError("Invalid filter descriptor");
        if (key === exclude) continue;
        const built = registry.get(filter.type)?.buildSql?.(key, filter);
        if (!built) continue;
        if (
            !Array.isArray(built.conditions) ||
            !built.conditions.every((c) => typeof c === "string") ||
            !Array.isArray(built.params)
        ) {
            console.warn(
                `[pihka] filter type "${filter.type}" returned a malformed fragment — skipped`,
            );
            continue;
        }
        conditions.push(...built.conditions);
        params.push(...built.params);
    }
    return {
        whereClause: conditions.length ? "WHERE " + conditions.join(" AND ") : "",
        bindParams: params,
    };
}
