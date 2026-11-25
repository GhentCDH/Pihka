// @ts-check
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { registeredComponent } from "../runtime/component-host.js";
import { t } from "../runtime/strings.js";

const ThemeToggle = registeredComponent("control", "theme");
const LangSwitcher = registeredComponent("control", "language");

const iconProps = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
    "stroke-width": 1.75, "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" };

function FullscreenToggle({ lang }) {
    const [active, setActive] = useState(() => !!document.fullscreenElement);

    useEffect(() => {
        const onChange = () => setActive(!!document.fullscreenElement);
        document.addEventListener("fullscreenchange", onChange);
        return () => document.removeEventListener("fullscreenchange", onChange);
    }, []);

    if (!document.fullscreenEnabled) return null;
    const label = t(active ? "ui.fullscreen.exit" : "ui.fullscreen.enter", lang);
    return h("button", {
        type: "button",
        class: "fullscreen-toggle icon-btn",
        title: label,
        "aria-label": label,
        onClick: () => (active ? document.exitFullscreen() : document.documentElement.requestFullscreen()).catch(() => {}),
    }, h("svg", iconProps, h("path", {
        d: active
            ? "M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"
            : "M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5",
    })));
}

/**
 * Header control group (right of the search): light/dark, full screen and
 * a segmented language switch. Quiet, borderless icon buttons so the header
 * stays calm; each part renders nothing when it does not apply (no
 * fullscreen support, fewer than two languages).
 *
 * Props: lang, languages, onLangChange
 */
export default function HeaderControls({ lang, languages, onLangChange }) {
    return h("div", { class: "header-controls", role: "toolbar", "aria-label": t("ui.controls", lang) },
        h(ThemeToggle, { lang }),
        h(FullscreenToggle, { lang }),
        h(LangSwitcher, { lang, languages, onChange: onLangChange }),
    );
}
