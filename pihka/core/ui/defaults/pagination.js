// @ts-check
import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { t } from "../runtime/strings.js";

/**
 * Minimal pagination: previous / "Page [ 5 ] of 70" / next. The current page
 * is a small number box — click it, type another page and press Enter (or
 * leave the box) to jump; Escape cancels. Shared by the faceted list views
 * and the related-object tables on detail pages.
 *
 * Props:
 *   page         - current page (0-based)
 *   totalPages   - total page count
 *   onPageChange - callback(newPage), 0-based
 *   lang         - language for the labels (default "en")
 *   keyboard     - the parent pages with ← / →: announce the shortcuts
 */
export default function Pagination({ page, totalPages, onPageChange, lang = "en", keyboard = false }) {
    const [draft, setDraft] = useState(String(page + 1));
    const cancelled = useRef(false);

    // Follow the real page when it changes from elsewhere (arrows, filters).
    useEffect(() => setDraft(String(page + 1)), [page]);

    const commit = () => {
        if (cancelled.current) {
            cancelled.current = false;
            setDraft(String(page + 1));
            return;
        }
        const typed = parseInt(draft, 10);
        if (Number.isNaN(typed)) {
            setDraft(String(page + 1));
            return;
        }
        const target = Math.min(Math.max(typed, 1), totalPages) - 1;
        setDraft(String(target + 1));
        if (target !== page) onPageChange(target);
    };

    const onKeyDown = (e) => {
        const input = /** @type {HTMLInputElement} */ (e.currentTarget);
        if (e.key === "Enter") {
            e.preventDefault();
            input.blur();
        } else if (e.key === "Escape") {
            cancelled.current = true;
            input.blur();
        }
    };

    return h("nav", { "aria-label": "Pagination", class: "faceted-pagination" },
        h("button", {
            type: "button",
            "aria-label": t("page.previous", lang),
            title: t("page.previous", lang) + (keyboard ? " (←)" : ""),
            "aria-keyshortcuts": keyboard ? "ArrowLeft" : undefined,
            disabled: page <= 0,
            onClick: () => onPageChange(page - 1),
        }, "‹"),
        h("span", { class: "pagination-status" },
            t("page.label", lang),
            h("input", {
                type: "number",
                class: "pagination-input",
                min: 1,
                max: totalPages,
                value: draft,
                style: `width:${Math.max(String(totalPages).length, 2) + 1.4}ch`,
                "aria-label": t("page.goto", lang),
                onInput: (e) => setDraft(/** @type {HTMLInputElement} */ (e.target).value),
                onBlur: commit,
                onKeyDown,
            }),
            h("span", { class: "pagination-total" }, t("page.of", lang, { n: totalPages })),
        ),
        h("button", {
            type: "button",
            "aria-label": t("page.next", lang),
            title: t("page.next", lang) + (keyboard ? " (→)" : ""),
            "aria-keyshortcuts": keyboard ? "ArrowRight" : undefined,
            disabled: page >= totalPages - 1,
            onClick: () => onPageChange(page + 1),
        }, "›"),
    );
}
