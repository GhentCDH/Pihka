import { h } from "preact";
import { useState } from "preact/hooks";

const STORAGE_KEY = "pihka-theme";
const CYCLE = ["auto", "light", "dark"];
const ICONS = { auto: "\u25D1", light: "\u2600\uFE0E", dark: "\u263E" };

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
 * Small header button cycling auto -> light -> dark, persisted in
 * localStorage. The saved theme is applied before first paint by an inline
 * script in index.html to avoid a flash of the wrong theme.
 */
export default function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return CYCLE.includes(saved) ? saved : "auto";
    });

    const onClick = () => {
        const next = CYCLE[(CYCLE.indexOf(theme) + 1) % CYCLE.length];
        setTheme(next);
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
    };

    return h("button", {
        class: "theme-toggle outline secondary",
        title: `Theme: ${theme} (click to change)`,
        "aria-label": `Theme: ${theme}`,
        onClick,
    }, `${ICONS[theme]} ${theme}`);
}
