// @ts-check
import { h, Fragment } from "preact";
import { localize } from "../runtime/table-config.js";
import { resolveAssetPath } from "../runtime/site-content.js";

/**
 * Site-wide footer: dataset information (licence, citation, version,
 * contact …), an optional credits line and link row, and partner logos.
 * Content comes from footer.json (app override → core default, see
 * site-content.js). All keys optional; renders nothing when empty.
 *
 * `dataset` is a template list so every deployment can describe its own
 * data: [{ label, value, href? }] where label and value are strings or
 * { en, nl, … } maps. Items without a value are skipped. The `credits`
 * HTML is injected verbatim — trusted as authored, like app/config.json.
 *
 * Props:
 *   footer - parsed footer.json, or null
 *   lang   - current language code (for localizing HTML/labels)
 */
export default function SiteFooter({ footer, lang }) {
    if (!footer || typeof footer !== "object") return null;

    const dataset = (Array.isArray(footer.dataset) ? footer.dataset : [])
        .map(item => ({ ...item, text: localize(item.value, lang, ""), name: localize(item.label, lang, "") }))
        .filter(item => item.text);
    const credits = localize(footer.credits, lang, "");
    const links = Array.isArray(footer.links) ? footer.links : [];
    const logos = Array.isArray(footer.logos) ? footer.logos : [];

    if (dataset.length === 0 && !credits && links.length === 0 && logos.length === 0) return null;

    const external = (href) => (/^https?:\/\//i.test(href || "") ? { target: "_blank", rel: "noopener noreferrer" } : {});

    const logoLinks = logos.length > 0 && h("div", { class: "footer-logos" },
        logos.map((logo, i) => {
            const img = h("img", { src: resolveAssetPath(logo.src), alt: logo.alt || "", loading: "lazy" });
            return logo.href
                ? h("a", { key: i, href: logo.href, target: "_blank", rel: "noopener noreferrer", title: logo.alt || undefined }, img)
                : h(Fragment, { key: i }, img);
        }),
    );

    return h("footer", { class: "site-footer container-fluid" },
        // Dataset information on the left, partner logos aligned to its first row.
        (dataset.length > 0 || logoLinks) && h("div", { class: "footer-main" },
            dataset.length > 0 && h("dl", { class: "footer-dataset" },
                dataset.map((item, i) => h("div", { key: i, class: "footer-dataset-item" },
                    h("dt", { class: "micro-label" }, item.name),
                    h("dd", null, item.href
                        ? h("a", { href: item.href, ...external(item.href) }, item.text)
                        : item.text),
                )),
            ),
            logoLinks,
        ),
        (credits || links.length > 0) && h("div", { class: "footer-details" },
            credits && h("div", { dangerouslySetInnerHTML: { __html: credits } }),
            links.length > 0 && h("nav", { class: "footer-links", "aria-label": "Footer links" },
                links.map((link, i) => h("a", {
                    key: i,
                    href: link.href,
                    ...external(link.href),
                }, localize(link.label, lang, link.href))),
            ),
        ),
    );
}
