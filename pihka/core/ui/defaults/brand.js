// @ts-check
import { h } from "preact";
import { buildPath } from "../runtime/router.js";
import { assetUrl } from "../runtime/paths.js";

/** Shared home link for the default header. The logo SVG follows the text colour. */
export function Brand() {
    return h("a", { class: "app-brand", href: buildPath("/") },
        h("svg", {
            class: "brand-logo",
            viewBox: "-20 -1586 6439 1687",
            role: "img",
            "aria-label": "Pihka",
            width: 114,
            height: 30,
        }, h("use", { href: `${assetUrl("core/assets/logo/pihka.svg")}#pihka` })),
    );
}
