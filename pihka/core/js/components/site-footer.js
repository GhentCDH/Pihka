import { h, Fragment } from "preact";
import { localize } from "../utilities-data/table-config.js";
import { resolveAssetPath } from "../utilities-data/site-content.js";

/**
 * Site-wide footer: credits, a link row, and funder/university logos.
 * Content comes from footer.json (app override → core default, see
 * site-content.js). All keys optional; renders nothing when empty.
 *
 * Kept short and Pico-native: the native <footer> landmark, Pico's `.grid`
 * for the two columns (credits | logos, collapsing to one column on small
 * screens), a native <nav> for the links, and <small> for the muted
 * credit line. The `credits` HTML is injected verbatim — trusted as
 * authored, like app/config.json. (A `provenance` key, if present, is not
 * rendered here — provenance belongs on an About page, not the footer.)
 *
 * Props:
 *   footer - parsed footer.json, or null
 *   lang   - current language code (for localizing HTML/labels)
 */
export default function SiteFooter({ footer, lang }) {
    if (!footer || typeof footer !== "object") return null;

    const credits = localize(footer.credits, lang, "");
    const links = Array.isArray(footer.links) ? footer.links : [];
    const logos = Array.isArray(footer.logos) ? footer.logos : [];

    if (!credits && links.length === 0 && logos.length === 0) return null;

    return h("footer", { class: "site-footer container-fluid" },
        h("div", { class: "grid" },
            h("div", null,
                credits && h("small", { dangerouslySetInnerHTML: { __html: credits } }),
                links.length > 0 && h("nav", { class: "footer-links", "aria-label": "Footer links" },
                    links.map((link, i) => h("a", {
                        key: i,
                        href: link.href,
                        ...(/^https?:\/\//i.test(link.href || "") ? { target: "_blank", rel: "noopener noreferrer" } : {}),
                    }, localize(link.label, lang, link.href))),
                ),
            ),
            logos.length > 0 && h("div", { class: "footer-logos" },
                logos.map((logo, i) => {
                    const img = h("img", { src: resolveAssetPath(logo.src), alt: logo.alt || "", loading: "lazy" });
                    return logo.href
                        ? h("a", { key: i, href: logo.href, target: "_blank", rel: "noopener noreferrer", title: logo.alt || undefined }, img)
                        : h(Fragment, { key: i }, img);
                }),
            ),
        ),
    );
}
