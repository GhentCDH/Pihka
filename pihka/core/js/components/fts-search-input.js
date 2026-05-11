import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

/**
 * Free-text search input backed by SQLite FTS5. Submits on Enter (no
 * debounce, to avoid surfacing parser errors while the user is mid-type).
 *
 * Props:
 *   value         - committed query string (from URL state)
 *   onSubmit      - (query: string) => void — fires on form submit or clear
 *   error         - optional error message from the FTS engine
 *   available     - false when the current table has no FTS index
 */
export default function FtsSearchInput({ value, onSubmit, error, available }) {
    const [draft, setDraft] = useState(value || "");
    const [helpOpen, setHelpOpen] = useState(false);

    // External resets (e.g. "Clear all") should sync into the local input.
    useEffect(() => { setDraft(value || ""); }, [value]);

    const submit = (e) => {
        e?.preventDefault();
        onSubmit(draft.trim());
    };

    const clear = () => {
        setDraft("");
        onSubmit("");
    };

    return h("div", { class: "fts-search" },
        h("form", { onSubmit: submit, class: "fts-search-form" },
            h("input", {
                type: "search",
                placeholder: available ? "Search…" : "Search not available",
                disabled: !available,
                value: draft,
                onInput: (e) => setDraft(e.target.value),
                class: "facet-search fts-search-input",
                "aria-label": "Full-text search",
            }),
            value && h("button", {
                type: "button",
                onClick: clear,
                class: "fts-search-clear",
                title: "Clear search",
                "aria-label": "Clear search",
            }, "×"),
        ),
        error && h("p", { class: "fts-error" }, error),
        available && h("button", {
            type: "button",
            class: "fts-help-toggle",
            onClick: () => setHelpOpen(o => !o),
            "aria-expanded": helpOpen,
        }, helpOpen ? "Hide search syntax" : "Search syntax"),
        helpOpen && h(FtsHelp),
    );
}

function FtsHelp() {
    return h("div", { class: "fts-help" },
        h("ul", null,
            h("li", null,
                h("code", null, "term1 term2"),
                " — both words required",
            ),
            h("li", null,
                h("code", null, "term1 OR term2"),
                " — either word",
            ),
            h("li", null,
                h("code", null, "term*"),
                " — prefix match",
            ),
            h("li", null,
                h("code", null, "\"hello world\""),
                " — exact phrase",
            ),
            h("li", null,
                h("code", null, "column:term"),
                " — match in a specific column",
            ),
            h("li", null,
                h("code", null, "NOT term"),
                " — exclude",
            ),
            h("li", null,
                h("code", null, "NEAR(word1 word2, 5)"),
                " — words within 5 of each other",
            ),
        ),
    );
}
