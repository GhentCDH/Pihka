import { h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";

const DEBOUNCE_MS = 300;

const SYNTAX_HELP =
    'word1 word2 = both · word1 OR word2 = either · "exact phrase" · '
    + "pre* = prefix · column:word · NOT word · NEAR(a b, 5)";

/**
 * Free-text search input backed by SQLite FTS5. Filters live while typing
 * (debounced); malformed mid-type queries surface as a friendly error from
 * the data layer rather than crashing. Enter applies immediately.
 *
 * Props:
 *   value         - committed query string (from URL state)
 *   onSubmit      - (query: string) => void — fires debounced on input,
 *                   immediately on Enter or clear
 *   error         - optional error message from the FTS engine
 *   available     - false when the current table has no FTS index
 */
export default function FtsSearchInput({ value, onSubmit, error, available }) {
    const [draft, setDraft] = useState(value || "");
    const timerRef = useRef(null);
    const cancelPending = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    // External resets (e.g. "Clear all") should sync into the local input —
    // but never clobber in-flight typing that already matches.
    useEffect(() => {
        setDraft(d => ((value || "") === d.trim() ? d : (value || "")));
    }, [value]);

    // Don't fire a stale debounced submit after unmount.
    useEffect(() => cancelPending, []);

    const onInput = (e) => {
        const next = /** @type {HTMLInputElement} */ (e.target).value;
        setDraft(next);
        cancelPending();
        timerRef.current = setTimeout(() => {
            timerRef.current = null;
            onSubmit(next.trim());
        }, DEBOUNCE_MS);
    };

    const submit = (e) => {
        e?.preventDefault();
        cancelPending();
        onSubmit(draft.trim());
    };

    const clear = () => {
        cancelPending();
        setDraft("");
        onSubmit("");
    };

    return h("div", { class: "fts-search" },
        h("form", { onSubmit: submit, class: "fts-search-form" },
            // The tooltip lives on the wrapper because <input> is a replaced
            // element and can't render Pico's ::before/::after tooltip —
            // hovering the input hovers the wrapper, so it reads the same.
            h("span", {
                class: "fts-search-box",
                ...(available && {
                    "data-tooltip": SYNTAX_HELP,
                    "data-placement": "bottom",
                }),
            },
                h("input", {
                    type: "search",
                    placeholder: available ? "Search…" : "Search not available",
                    disabled: !available,
                    value: draft,
                    onInput,
                    class: "facet-search fts-search-input",
                    "aria-label": "Full-text search",
                }),
                draft && h("button", {
                    type: "button",
                    onClick: clear,
                    class: "fts-search-clear",
                    title: "Clear search",
                    "aria-label": "Clear search",
                }, "×"),
            ),
        ),
        error && h("p", { class: "fts-error" }, error),
    );
}
