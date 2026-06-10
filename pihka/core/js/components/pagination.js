import { h } from "preact";

/**
 * Compact pagination controls: first/prev, numbered pages with ellipses,
 * next/last. Shared by the faceted list views and the related-object
 * tables on detail pages.
 *
 * Props:
 *   page         - current page (0-based)
 *   totalPages   - total page count
 *   onPageChange - callback(newPage)
 */
export default function Pagination({ page, totalPages, onPageChange }) {
    return h("nav", {
        "aria-label": "Pagination",
        class: "faceted-pagination",
    },
        h("button", { disabled: page === 0, onClick: () => onPageChange(0) }, "«"),
        h("button", { disabled: page === 0, onClick: () => onPageChange(page - 1) }, "‹"),
        ...pageButtons(page, totalPages).map((p, i) =>
            p === "..."
                ? h("span", { key: `ellipsis-${i}`, class: "pagination-ellipsis" }, "…")
                : h("button", {
                    key: p,
                    onClick: () => onPageChange(p),
                    class: p === page ? "pagination-active" : "",
                }, String(p + 1)),
        ),
        h("button", { disabled: page >= totalPages - 1, onClick: () => onPageChange(page + 1) }, "›"),
        h("button", { disabled: page >= totalPages - 1, onClick: () => onPageChange(totalPages - 1) }, "»"),
    );
}

function pageButtons(current, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i);
    const pages = new Set([0, 1, total - 2, total - 1, current - 1, current, current + 1]);
    const sorted = [...pages].filter(p => p >= 0 && p < total).sort((a, b) => a - b);
    const result = [];
    for (let i = 0; i < sorted.length; i++) {
        if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("...");
        result.push(sorted[i]);
    }
    return result;
}
