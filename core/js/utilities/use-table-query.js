import { useState, useMemo } from "preact/hooks";

/**
 * Custom hook bridging DataStore to UI state.
 * Manages filters, sort, and pagination state; calls store methods
 * synchronously and returns pure JSON data + callbacks.
 *
 * @param {import('./data-store.js').DataStore} store
 * @param {string} table
 * @param {{ pageSize?: number }} options
 */
export function useTableQuery(store, table, { pageSize = 3 } = {}) {
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState(null);
    const [page, setPage] = useState(0);

    // Filter metadata is static per table (range bounds, FK options)
    const filterMeta = useMemo(
        () => store.getFilterMeta(table),
        [store, table],
    );

    // Query data — synchronous because SQLite WASM is in-memory
    const { columns, rows, totalRows, totalPages } = store.queryTable(table, {
        filters, sort, page, pageSize,
    });

    const onSort = (column) => {
        setSort(prev => {
            if (!prev || prev.column !== column) {
                return { column, direction: "ASC" };
            }
            if (prev.direction === "ASC") {
                return { column, direction: "DESC" };
            }
            return null; // third click clears sort
        });
        setPage(0);
    };

    const onRangeChange = (colName, bound, value) => {
        setPage(0);
        setFilters(prev => {
            const current = prev[colName] || { type: "range", min: null, max: null };
            const updated = { ...current, [bound]: value };
            if (updated.min == null && updated.max == null) {
                const { [colName]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [colName]: updated };
        });
    };

    const onMultiChange = (colName, newSelected) => {
        setPage(0);
        setFilters(prev => {
            if (newSelected.size === 0) {
                const { [colName]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [colName]: { type: "multi", selected: newSelected } };
        });
    };

    const onPageChange = (newPage) => {
        setPage(newPage);
    };

    return {
        columns,
        rows,
        totalRows,
        page,
        totalPages,
        sort,
        filterMeta,
        filters,
        onSort,
        onRangeChange,
        onMultiChange,
        onPageChange,
    };
}
