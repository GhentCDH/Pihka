import { h } from "preact";

/**
 * Header button cycling through the app's configured languages
 * (config.json `languages`, e.g. ["en", "nl"]). Renders nothing unless at
 * least two languages are configured.
 *
 * The component is presentation-only: it reports the next language via
 * onChange; the app updates the URL's lang segment and persists the choice.
 *
 * Props:
 *   lang      - current language code
 *   languages - configured language codes
 *   onChange  - (nextLang) => void
 */
export default function LangSwitcher({ lang, languages, onChange }) {
    if (!Array.isArray(languages) || languages.length < 2) return null;
    const next = languages[(languages.indexOf(lang) + 1) % languages.length];
    return h("button", {
        class: "lang-switcher outline secondary",
        title: `Language: ${lang} (click to switch to ${next})`,
        "aria-label": `Language: ${lang}`,
        onClick: () => onChange(next),
    }, `🌐 ${lang}`);
}
