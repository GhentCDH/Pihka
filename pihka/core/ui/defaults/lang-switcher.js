// @ts-check
import { h } from "preact";
import { t } from "../runtime/strings.js";

/**
 * Language switch as a segmented pill ("EN | NL"): every configured language
 * is a segment, the active one is filled. Renders nothing with fewer than two
 * languages.
 */
export default function LangSwitcher({ lang, languages, onChange }) {
    if (!Array.isArray(languages) || languages.length < 2) return null;
    return h("div", { class: "lang-switcher", role: "group", "aria-label": t("ui.languages", lang) },
        languages.map(code => h("button", {
            key: code,
            type: "button",
            class: code === lang ? "is-active" : "",
            "data-lang": code,
            "aria-pressed": code === lang ? "true" : "false",
            title: code.toUpperCase(),
            onClick: () => { if (code !== lang) onChange(code); },
        }, code.toUpperCase())),
    );
}
