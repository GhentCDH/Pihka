import { h } from "preact";
import FilterBar from "./filter-bar.js";
import DataViewListTable from "./data-views/data-view-list-table.js";
import { useUrlState } from "../utilities/use-url-state.js";

export default function FacetedTable({ name, store, perspective }) {
    const defaultPageSize = perspective?.page_size ?? 25;
    const defaultSort = perspective?.default_sort ?? null;

    const {
        columns, rows, totalRows, page, totalPages, pageSize,
        sort, filterMeta, filters,
        onSort, onRangeChange, onMultiChange, onPageChange, onPageSizeChange,
    } = useUrlState(store, name, { defaultPageSize, defaultSort });

    const { rangeMeta, multiMeta, rangeColumns, multiColumns } = filterMeta;

    const rangeFilterProps = rangeColumns.map(col => ({
        colName: col.name,
        min: rangeMeta[col.name].min,
        max: rangeMeta[col.name].max,
        currentMin: filters[col.name]?.min ?? null,
        currentMax: filters[col.name]?.max ?? null,
        step: col.type === "REAL" ? 0.01 : 1,
    }));

    const multiFilterProps = multiColumns.map(col => ({
        colName: col.name,
        label: multiMeta[col.name].label,
        options: multiMeta[col.name].options,
        selected: filters[col.name]?.selected ?? new Set(),
    }));

    const firstRow = page * pageSize + 1;
    const lastRow = Math.min((page + 1) * pageSize, totalRows);

    return h("section", { id: name },
        h(FilterBar, {
            rangeFilters: rangeFilterProps,
            multiFilters: multiFilterProps,
            onRangeChange,
            onMultiChange,
        }),
        h("div", { style: "display:flex;justify-content:space-between;align-items:center;margin:.75rem 0;flex-wrap:wrap;gap:.5rem" },
            h("span", { style: "font-size:.85em;color:var(--text-muted)" },
                totalRows > 0
                    ? `Showing ${firstRow} to ${lastRow} of ${totalRows} results`
                    : "No results",
            ),
            h("select", {
                value: pageSize,
                onChange: (e) => onPageSizeChange(parseInt(e.target.value, 10)),
                style: "width:auto;padding:.25rem .5rem;font-size:.85em",
            },
                [10, 25, 50, 100].map(n =>
                    h("option", { key: n, value: n }, n),
                ),
            ),
        ),
        totalRows === 0
            ? null
            : h(DataViewListTable, { name, columns, rows, sort, onSort }),
        totalPages > 1 && h("nav", { "aria-label": "Pagination", style: "display:flex;align-items:center;gap:.25rem;margin:.75rem 0;flex-wrap:wrap" },
            h("button", {
                disabled: page === 0,
                onClick: () => onPageChange(0),
                style: "min-width:2rem",
            }, "\u00AB"),
            h("button", {
                disabled: page === 0,
                onClick: () => onPageChange(page - 1),
                style: "min-width:2rem",
            }, "\u2039"),
            ...pageButtons(page, totalPages).map(p =>
                p === "..."
                    ? h("span", { key: `ellipsis-${Math.random()}`, style: "padding:0 .25rem;color:var(--text-muted)" }, "\u2026")
                    : h("button", {
                        key: p,
                        onClick: () => onPageChange(p),
                        style: p === page
                            ? "min-width:2rem;font-weight:bold;background:var(--accent);color:#fff;border-color:var(--accent)"
                            : "min-width:2rem",
                    }, String(p + 1)),
            ),
            h("button", {
                disabled: page >= totalPages - 1,
                onClick: () => onPageChange(page + 1),
                style: "min-width:2rem",
            }, "\u203A"),
            h("button", {
                disabled: page >= totalPages - 1,
                onClick: () => onPageChange(totalPages - 1),
                style: "min-width:2rem",
            }, "\u00BB"),
        ),
    );
}

/**
 * Generate page button values: numbers and "..." ellipsis markers.
 * Shows first, last, and a window around the current page.
 */
function pageButtons(current, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i);

    const pages = new Set([0, 1, total - 2, total - 1, current - 1, current, current + 1]);
    const sorted = [...pages].filter(p => p >= 0 && p < total).sort((a, b) => a - b);

    const result = [];
    for (let i = 0; i < sorted.length; i++) {
        if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
            result.push("...");
        }
        result.push(sorted[i]);
    }
    return result;
}
