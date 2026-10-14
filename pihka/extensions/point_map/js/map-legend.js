// @ts-check
import { h } from "preact";

/**
 * Category legend floating over the lower left of a map: one swatch per
 * entry from `categorize()` (see categories.js).
 */
export default function MapLegend({ legend, lang }) {
    const nl = lang === "nl";
    return h(
        "div",
        { class: "point-legend" },
        h(
            "ul",
            null,
            legend.map((item) =>
                h(
                    "li",
                    { key: item.value ?? "\u0000other" },
                    h("span", { class: item.neutral ? "point-legend-swatch neutral" : "point-legend-swatch", style: `background:${item.color}` }),
                    h("span", { class: "point-legend-label" },
                        item.value ?? (nl ? `overige (${item.types} types)` : `other (${item.types} types)`)),
                    h("span", { class: "point-legend-count" }, item.count),
                ),
            ),
        ),
    );
}
