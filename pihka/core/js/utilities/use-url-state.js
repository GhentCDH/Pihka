import { useMemo } from "preact/hooks";
import { useRouter, updateParams } from "./router.js";

/**
 * Decode URL query params into filter/sort/page state.
 *
 * Param encoding:
 *   sort=title            → sort by column ASC
 *   sort_dir=desc         → sort direction
 *   page=2                → page number (1-indexed in URL)
 *   pageSize=25           → rows per page
 *   {col}_min=100         → range filter min
 *   {col}_max=200         → range filter max
 *   {col}=1,3,7           → multi-select filter (comma-separated)
 */
function decodeParams(params, filterMeta) {
    const filters = {};
    const { rangeColumns, multiColumns } = filterMeta;

    const rangeNames = new Set(rangeColumns.map(c => c.name));
    const multiNames = new Set(multiColumns.map(c => c.name));

    for (const [key, value] of Object.entries(params)) {
        if (key === "sort" || key === "sort_dir" || key === "page" || key === "pageSize" || key === "q") continue;

        // Range filter: {col}_min or {col}_max
        const minMatch = key.match(/^(.+)_min$/);
        if (minMatch && rangeNames.has(minMatch[1])) {
            const col = minMatch[1];
            if (!filters[col]) filters[col] = { type: "range", min: null, max: null };
            filters[col].min = Number(value);
            continue;
        }
        const maxMatch = key.match(/^(.+)_max$/);
        if (maxMatch && rangeNames.has(maxMatch[1])) {
            const col = maxMatch[1];
            if (!filters[col]) filters[col] = { type: "range", min: null, max: null };
            filters[col].max = Number(value);
            continue;
        }

        // Multi-select filter: {col}=1,3,7
        if (multiNames.has(key) && value) {
            const values = value.split(",").map(v => {
                const n = Number(v);
                return Number.isFinite(n) ? n : v;
            });
            filters[key] = { type: "multi", selected: new Set(values) };
        }
    }

    const sort = params.sort
        ? { column: params.sort, direction: (params.sort_dir || "asc").toUpperCase() === "DESC" ? "DESC" : "ASC" }
        : null;

    const page = params.page ? Math.max(0, parseInt(params.page, 10) - 1) : 0;
    const pageSize = params.pageSize ? parseInt(params.pageSize, 10) : null;
    const search = typeof params.q === "string" ? params.q : "";

    return { filters, sort, page, pageSize, search };
}

// Params that are NOT filter encodings and must be preserved when a
// filter toggles (sort, pagination, page size, full-text query).
const PRESERVED_PARAMS = new Set(["sort", "sort_dir", "pageSize", "q"]);

/**
 * Build an updates object that clears every URL param except the
 * preserved-meta ones (sort/pagination/search). Used before re-encoding
 * filters so stale filter params don't linger.
 */
function clearFilterParams(currentParams) {
    const updates = {};
    for (const key of Object.keys(currentParams)) {
        if (!PRESERVED_PARAMS.has(key)) updates[key] = null;
    }
    return updates;
}

/**
 * Encode filter state back into URL param updates.
 */
function encodeFilters(filters) {
    const params = {};
    for (const [col, filter] of Object.entries(filters)) {
        if (filter.type === "range") {
            params[`${col}_min`] = filter.min != null ? String(filter.min) : null;
            params[`${col}_max`] = filter.max != null ? String(filter.max) : null;
        } else if (filter.type === "multi" && filter.selected.size > 0) {
            params[col] = Array.from(filter.selected).join(",");
        }
    }
    return params;
}

/**
 * URL-driven state hook. Reads filter/sort/page from URL query params,
 * queries DataStore synchronously, and provides setters that update the URL.
 *
 * @param {import('./data-store.js').DataStore} store
 * @param {string} table
 * @param {{ defaultPageSize?: number, defaultSort?: string }} options
 */
export function useUrlState(store, table, { defaultPageSize = 25, defaultSort = null } = {}) {
    const { params } = useRouter();

    const filterMeta = useMemo(
        () => store.getFilterMeta(table),
        [store, table],
    );

    const decoded = decodeParams(params, filterMeta);
    const filters = decoded.filters;
    const sort = decoded.sort || (defaultSort ? { column: defaultSort, direction: "ASC" } : null);
    const page = decoded.page;
    const pageSize = decoded.pageSize || defaultPageSize;
    const search = decoded.search;

    const queryResult = store.queryTable(table, {
        filters, sort, page, pageSize, search,
    });
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

    const onPageChange = (newPage) => {
        updateParams({ page: newPage > 0 ? String(newPage + 1) : null });
    };

    const onPageSizeChange = (newSize) => {
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
        fkResolved,
        search,
        searchError,
        onSort,
        onRangeChange,
        onMultiChange,
        onPageChange,
        onPageSizeChange,
        onSearchChange,
    };
}
