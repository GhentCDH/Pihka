// @ts-check
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { usePref, setPref } from "../runtime/prefs.js";
import { t } from "../runtime/strings.js";

/**
 * Apply a theme to the document. "auto" removes the data-theme attribute so
 * the OS preference (prefers-color-scheme) decides. The color-scheme <meta>
 * follows along so native UI (scrollbars, form controls) matches.
 */
function applyTheme(theme) {
    const pinned = theme === "light" || theme === "dark";
    if (pinned) {
        document.documentElement.dataset.theme = theme;
    } else {
        delete document.documentElement.dataset.theme;
    }
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) meta.setAttribute("content", pinned ? theme : "light dark");
}

const systemQuery = () => window.matchMedia("(prefers-color-scheme: dark)");

/**
 * Light/dark switch. Follows the OS until the reader picks a mode; the icon
 * always shows the mode currently in effect (sun = light, moon = dark), and a
 * click switches to the other one. Switching to a mode that differs from the
 * OS stores it; switching back to the OS mode clears the stored choice, so
 * the site follows the OS again instead of being pinned invisibly. A stored
 * choice is never cleared just because the OS later happens to match it.
 *
 * Props: lang - language for the tooltip.
 */
export default function ThemeToggle({ lang = "en" }) {
    const stored = usePref("theme", "auto");
    const [systemDark, setSystemDark] = useState(() => systemQuery().matches);

    useEffect(() => {
        const query = systemQuery();
        const onChange = (e) => setSystemDark(e.matches);
        query.addEventListener("change", onChange);
        return () => query.removeEventListener("change", onChange);
    }, []);

    const effective = stored === "light" || stored === "dark" ? stored : (systemDark ? "dark" : "light");
    const next = effective === "dark" ? "light" : "dark";
    const label = t(next === "light" ? "ui.theme.light" : "ui.theme.dark", lang);

    return h("button", {
        type: "button",
        class: "theme-toggle icon-btn",
        title: label,
        "aria-label": label,
        onClick: () => {
            const followSystem = next === (systemDark ? "dark" : "light");
            setPref("theme", followSystem ? null : next);
            applyTheme(followSystem ? "auto" : next);
        },
    }, effective === "dark" ? h(MoonIcon, null) : h(SunIcon, null));
}

const iconProps = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
    "stroke-width": 2, "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" };

function SunIcon() {
    return h("svg", iconProps,
        h("circle", { cx: 12, cy: 12, r: 4 }),
        h("path", { d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" }),
    );
}

function MoonIcon() {
    return h("svg", iconProps, h("path", { d: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" }));
}
