// @ts-check
import { h } from "preact";

/**
 * Category legend floating over the lower left of a map: one swatch per
 * entry from `categorize()` (see areas.js), plus an optional note above it.
 */
export default function MapLegend({ legend, lang, note = null }) {
    const nl = lang === "nl";
    return h(
        "div",
        { class: "point-areas-legend" },
        note && h("p", { class: "text-meta" }, note),
        h(
            "ul",
            null,
            legend.map((item) =>
                h(
                    "li",
                    { key: item.value ?? "\u0000other" },
                    h("span", { class: item.neutral ? "point-areas-swatch neutral" : "point-areas-swatch", style: `background:${item.color}` }),
                    h("span", { class: "point-areas-label" },
                        item.value ?? (nl ? `overige (${item.types} types)` : `other (${item.types} types)`)),
                    h("span", { class: "point-areas-count" }, item.count),
                ),
            ),
        ),
    );
}
