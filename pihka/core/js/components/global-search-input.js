import { h } from "preact";
import { useState } from "preact/hooks";
import { navigate } from "../utilities-ui/router.js";

/**
 * Header-wide search box. Enter navigates to the global search results
 * route (/#/:lang/search?q=...) — a real navigation with a history entry,
 * unlike the per-perspective sidebar search which live-edits query params.
 *
 * Props:
 *   lang  - language segment for the target route
 *   value - current query when already on the search route (prefills the
 *           input; the parent keys this component on it so external
 *           navigation resets the draft)
 */
export default function GlobalSearchInput({ lang, value = "" }) {
    const [draft, setDraft] = useState(value);

    const submit = (e) => {
        e.preventDefault();
        const q = draft.trim();
        if (q) navigate(`/${lang}/search`, { q });
    };

    return h("form", { class: "global-search", onSubmit: submit, role: "search" },
        h("input", {
            type: "search",
            placeholder: "Search…",
            value: draft,
            onInput: (e) => setDraft(/** @type {HTMLInputElement} */ (e.target).value),
            "aria-label": "Search all tables",
        }),
    );
}
