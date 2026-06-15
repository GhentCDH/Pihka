import { h } from "preact";
import { usePref, setPref } from "../utilities-ui/prefs.js";

const CYCLE = ["auto", "light", "dark"];
const ICONS = { auto: "◑", light: "☀︎", dark: "☾" };

/**
 * Apply a theme to the document. "auto" removes the data-theme attribute so
 * PicoCSS falls back to the OS prefers-color-scheme setting.
 */
function applyTheme(theme) {
    if (theme === "light" || theme === "dark") {
        document.documentElement.dataset.theme = theme;
    } else {
        delete document.documentElement.dataset.theme;
    }
}

/**
 * Small header button cycling auto -> light -> dark, persisted in the
 * prefs store. The saved theme is applied before first paint by an inline
 * script in index.html to avoid a flash of the wrong theme.
 */
export default function ThemeToggle() {
    const stored = usePref("theme", "auto");
    const theme = CYCLE.includes(stored) ? stored : "auto";

    const onClick = () => {
        const next = CYCLE[(CYCLE.indexOf(theme) + 1) % CYCLE.length];
        setPref("theme", next);
        applyTheme(next);
    };

    return h("button", {
        class: "theme-toggle outline secondary",
        title: `Theme: ${theme} (click to change)`,
        "aria-label": `Theme: ${theme}`,
        onClick,
    }, `${ICONS[theme]} ${theme}`);
}
