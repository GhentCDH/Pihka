// @ts-check
import { h } from "preact";

// Unit-radius organic shapes: a filled drop of resin and a loose hand-drawn
// outline loop. They are offset on purpose so the two only half-agree.
const FILL = "M0.989 0.149C0.953 0.368 0.743 0.600 0.552 0.748C0.361 0.897 0.056 1.074 -0.157 1.038C-0.370 1.002 -0.582 0.733 -0.724 0.534C-0.866 0.336 -1.042 0.055 -1.009 -0.152C-0.975 -0.359 -0.715 -0.571 -0.522 -0.708C-0.330 -0.846 -0.067 -1.003 0.148 -0.979C0.362 -0.955 0.624 -0.752 0.765 -0.564C0.905 -0.376 1.024 -0.069 0.989 0.149Z";
const LINE = "M0.781 0.558C0.643 0.760 0.394 1.014 0.175 1.046C-0.045 1.077 -0.334 0.894 -0.535 0.749C-0.735 0.603 -0.993 0.383 -1.026 0.171C-1.059 -0.041 -0.874 -0.318 -0.732 -0.523C-0.591 -0.727 -0.388 -1.016 -0.176 -1.055C0.036 -1.094 0.343 -0.905 0.540 -0.757C0.737 -0.609 0.966 -0.387 1.006 -0.168C1.046 0.051 0.920 0.356 0.781 0.558Z";

/**
 * Hero artwork: a filled resin blob with a thin outline loop slightly off
 * register. Inline SVG so it follows the theme (`--resin`, text colour).
 * Decorative only (aria-hidden); size, blending and dark-mode treatment live
 * in CSS (`.home-art`).
 */
export default function HomeArt() {
    return h("svg", {
        class: "home-art",
        viewBox: "0 0 200 200",
        "aria-hidden": "true",
        focusable: "false",
    },
        h("path", { class: "art-fill", d: FILL, transform: "translate(92 108) scale(76)" }),
        h("path", { class: "art-line", d: LINE, transform: "translate(106 94) scale(82)" }),
    );
}
