import { h } from "preact";

/**
 * Navigation list of all configured perspectives.
 *
 * Props:
 *   perspectives  - Perspective[] from loadPerspectives()
 *   lang          - Current language code
 */
export default function PerspectiveList({ perspectives, lang = "en" }) {
    return h("nav", { "aria-label": "Perspectives" },
        h("ul", null,
            perspectives.map(p => {
                const view = p.default_view || p.view || "table";
                return h("li", { key: p.id },
                    h("a", { href: `/${lang}/${p.id}/${view}` }, p.name),
                    " ",
                    h("small", { style: "opacity:.6" }, view),
                );
            }),
        ),
    );
}
