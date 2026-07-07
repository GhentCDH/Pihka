import { useMemo } from "preact/hooks";
import { useRouter, updateParams } from "./router.js";
import { usePref, setPref } from "./prefs.js";
import { listFilterTypes, getFilterType, allReservedParams, preservedParams } from "../utilities-data/filter-registry.js";

/**
 * Decode URL query params into filter/sort/page state.
 *
 * Core param encoding:
 *   sort=title            → sort by column ASC
 *   sort_dir=desc         → sort direction
 *   page=2                → page number (1-indexed in URL)
 *   pageSize=25           → rows per page
 *
 * Everything else is delegated to the registered filter types (see
 * utilities-data/filter-registry.js): each type decodes the params it
 * understands, e.g. {col}_min/{col}_max (range), {col}=1,3,7 (multi), or
 * whatever params extension filter types reserve for themselves. Params
 * reserved by a filter type never reach the generic decoders.
 */
const CORE_PARAMS = new Set(["sort", "sort_dir", "page", "pageSize"]);

function decodeParams(params, filterMeta, facets) {
    const filters = {};
    const ctx = { filterMeta, facets };
    const reserved = allReservedParams();
    for (const def of listFilterTypes()) {
        if (!def.decode) continue;
        // Each type sees its own reserved params, but never the core
        // params or those another type claimed.
        const own = new Set(def.reservedParams);
        const visible = {};
        for (const [key, value] of Object.entries(params)) {
            if (CORE_PARAMS.has(key)) continue;
            if (reserved.has(key) && !own.has(key)) continue;
            visible[key] = value;
        }
        const contributed = def.decode(visible, ctx);
        if (contributed && typeof contributed === "object") Object.assign(filters, contributed);
    }

    const sort = params.sort
        ? { column: params.sort, direction: (params.sort_dir || "asc").toUpperCase() === "DESC" ? "DESC" : "ASC" }
        : null;

    const page = params.page ? Math.max(0, parseInt(params.page, 10) - 1) : 0;
    const pageSize = params.pageSize ? parseInt(params.pageSize, 10) : null;
    const search = typeof params.q === "string" ? params.q : "";

    return { filters, sort, page, pageSize, search };
}

/**
 * Stable string key for a filter state object, usable as a useMemo
 * dependency (the decoded filters object is rebuilt every render, so
 * identity comparison would never hit). Derived from each filter's URL
 * encoding, which every type keeps stable by contract.
 */
export function serializeFilters(filters) {
    return Object.entries(filters)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, f]) => {
            try {
                return `${key}:${JSON.stringify(getFilterType(f.type)?.encode?.(key, f) ?? null)}`;
            } catch {
                return `${key}:!error`;
            }
        })
        .join("|");
}

// Params that are NOT filter encodings and must be preserved when a
// filter toggles: sort/pagination plus params of filter types that mark
// theirs preserved (e.g. the full-text query "q").
function isPreservedParam(key) {
    return key === "sort" || key === "sort_dir" || key === "pageSize" || preservedParams().has(key);
}

/**
 * Build an updates object that clears every URL param except the
 * preserved-meta ones (sort/pagination/search). Used before re-encoding
 * filters so stale filter params don't linger.
 */
function clearFilterParams(currentParams) {
    const updates = {};
    for (const key of Object.keys(currentParams)) {
        if (!isPreservedParam(key)) updates[key] = null;
    }
    return updates;
}

/**
 * Encode filter state back into URL param updates, delegating each entry
 * to its registered filter type.
 */
function encodeFilters(filters) {
    const params = {};
    for (const [key, filter] of Object.entries(filters)) {
        const patch = getFilterType(filter.type)?.encode?.(key, filter);
        if (patch && typeof patch === "object") Object.assign(params, patch);
    }
    return params;
}

/**
 * URL-driven state hook. Reads filter/sort/page from URL query params,
 * queries DataStore synchronously, and provides setters that update the URL.
 *
 * @param {import('./data-store.js').DataStore} store
 * @param {string} table
 * @param {{ defaultPageSize?: number, defaultSort?: string, facets?: Array|null, perspectiveId?: string|null }} options
 */
export function useUrlState(store, table, { defaultPageSize = 25, defaultSort = null, facets = null, perspectiveId = null } = {}) {
    const { params } = useRouter();

    const filterMeta = useMemo(
        () => store.getFilterMeta(table),
        [store, table],
    );

    const decoded = decodeParams(params, filterMeta, facets);
    const filters = decoded.filters;
    const sort = decoded.sort || (defaultSort ? { column: defaultSort, direction: "ASC" } : null);
    const page = decoded.page;
    // Page size: explicit URL param > stored per-perspective preference >
    // configured default.
    const pageSizePrefKey = `pageSize:${perspectiveId ?? table}`;
    const prefPageSize = usePref(pageSizePrefKey);
    const pageSize = decoded.pageSize || prefPageSize || defaultPageSize;
    const search = decoded.search;
    const filtersKey = serializeFilters(filters);

    const queryResult = useMemo(
        () => store.queryTable(table, { filters, sort, page, pageSize, search }),
        [store, table, filtersKey, sort?.column, sort?.direction, page, pageSize, search],
    );
    const { columns, rows, totalRows, totalPages, fkResolved, searchError } = queryResult;

    const onSort = (column) => {
        let newSort;
        if (!sort || sort.column !== column) {
            newSort = { sort: column, sort_dir: "asc" };
        } else if (sort.direction === "ASC") {
            newSort = { sort: column, sort_dir: "desc" };
        } else {
            newSort = { sort: null, sort_dir: null };
        }
        updateParams({ ...newSort, page: null });
    };

    const onRangeChange = (colName, bound, value) => {
        const current = filters[colName] || { type: "range", min: null, max: null };
        const updated = { ...current, [bound]: value };

        const newFilters = { ...filters };
        if (updated.min == null && updated.max == null) {
            delete newFilters[colName];
        } else {
            newFilters[colName] = updated;
        }
        updateParams({ ...clearFilterParams(params), ...encodeFilters(newFilters), page: null });
    };

    const onMultiChange = (colName, newSelected) => {
        const newFilters = { ...filters };
        if (newSelected.size === 0) {
            delete newFilters[colName];
        } else {
            newFilters[colName] = { type: "multi", selected: newSelected };
        }
        updateParams({ ...clearFilterParams(params), ...encodeFilters(newFilters), page: null });
    };

    // Generic filter mutation for registered filter types (extensions):
    // set or replace filters[key] with a typed filter object, or clear it
    // with null. The object's `type` must name a registered filter type.
    const onFilterChange = (key, filter) => {
        const newFilters = { ...filters };
        if (!filter) {
            delete newFilters[key];
        } else {
            newFilters[key] = filter;
        }
        updateParams({ ...clearFilterParams(params), ...encodeFilters(newFilters), page: null });
    };

    const onPageChange = (newPage) => {
        updateParams({ page: newPage > 0 ? String(newPage + 1) : null });
    };

    const onPageSizeChange = (newSize) => {
        setPref(pageSizePrefKey, newSize);
        updateParams({ pageSize: String(newSize), page: null });
    };

    const onSearchChange = (newSearch) => {
        const trimmed = (newSearch || "").trim();
        updateParams({ q: trimmed || null, page: null });
    };

    return {
        columns,
        rows,
        totalRows,
        page,
        totalPages,
        pageSize,
        sort,
        filterMeta,
        filters,
        filtersKey,
        fkResolved,
        search,
        searchError,
        // All state mutations bundled in one object — consumers pass it
        // down as a single prop instead of drilling individual callbacks.
        actions: {
            onSort,
            onRangeChange,
            onMultiChange,
            onFilterChange,
            onPageChange,
            onPageSizeChange,
            onSearchChange,
        },
    };
}
