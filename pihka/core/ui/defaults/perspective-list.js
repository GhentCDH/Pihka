// @ts-check
import { h, Fragment } from "preact";
import { buildPath } from "../runtime/router.js";
import { localize } from "../runtime/table-config.js";
import { preferredView } from "../runtime/perspectives.js";
import { registeredComponent } from "../runtime/component-host.js";
import { t } from "../runtime/strings.js";
import HomeArt from "./home-art.js";

const GlobalSearchInput = registeredComponent("control", "global-search");

/**
 * Homepage: the title and a large search line (typography is the hero),
 * the configured perspectives ("Views") as numbered rows, then the
 * remaining tables in a section that starts collapsed. Tables flagged
 * `hidden` in config never reach this list.
 *
 * Props:
 *   perspectives  - Perspective[] from loadPerspectives()
 *   store         - DataStore instance
 *   lang          - Current language code
 *   site          - optional { title, description, tablesCollapsed } from
 *                   config.json (title/description: string or { en, nl, … };
 *                   description is HTML)
 *   searchEnabled - whether any table has a full-text index
 */
export default function PerspectiveList({ perspectives, lang = "en", site = null, searchEnabled = false }) {
    const configured = perspectives.filter(p => p.kind === "perspective");
    const tables = perspectives.filter(p => p.kind !== "perspective");
    // Tables start open so no functionality is hidden; an app with curated
    // views can collapse them with `site.tablesCollapsed: true`. Without
    // views the tables are the entry point and always start open.
    const tablesOpen = configured.length === 0 || site?.tablesCollapsed !== true;
    // Trusted HTML from config.json, like footer credits.
    const description = localize(site?.description, lang, "");

    return h(Fragment, null,
        h("section", { class: "home-hero" },
            h(HomeArt, null),
            h("h1", { class: "home-title" }, localize(site?.title, lang, t("home.title", lang))),
            description && h("div", { class: "home-description", dangerouslySetInnerHTML: { __html: description } }),
            searchEnabled && h(GlobalSearchInput, { lang, value: "", variant: "hero" }),
        ),
        configured.length > 0 && h("section", { class: "home-section" },
            h("h2", { class: "perspective-section-title" }, t("home.views", lang)),
            h(Grid, { perspectives: configured, lang }),
        ),
        tables.length > 0 && h("details", { class: "home-section home-tables", open: tablesOpen },
            h("summary", { class: "perspective-section-title" },
                h("span", null, t("home.tables", lang), " ", h("span", { class: "home-count" }, `(${tables.length})`)),
            ),
            h(Grid, { perspectives: tables, lang }),
        ),
    );
}

function Grid({ perspectives, lang }) {
    return h("div", { class: "perspective-grid" },
        perspectives.map(p => {
            const view = preferredView(p) || "table";
            const description = localize(p.description, lang, "");
            return h("a", { key: p.id, class: "perspective-card", href: buildPath(`/${lang}/${p.id}/${view}`) },
                h("span", { class: "perspective-card-name" }, localize(p.label, lang, p.name)),
                description && h("span", { class: "perspective-card-meta" }, description),
                h("span", { class: "perspective-card-arrow", "aria-hidden": "true" }, "→"),
            );
        }),
    );
}
