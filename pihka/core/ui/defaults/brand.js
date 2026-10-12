// @ts-check
import { h } from "preact";
import { buildPath } from "../runtime/router.js";
import { assetUrl } from "../runtime/paths.js";

/** Shared home link for the default header and footer. */
export function Brand({ size = "header" }) {
    const [width, height] = size === "footer" ? [193.6, 48.4] : [112, 28];
    return h("a", { class: "app-brand", href: buildPath("/") },
        h("svg", {
            class: "brand-logo",
            viewBox: "0 0 160 40",
            role: "img",
            "aria-label": "Pihka",
            width,
            height,
        }, h("use", { href: `${assetUrl("core/assets/logo/pihka.svg")}#pihka` })),
    );
}
