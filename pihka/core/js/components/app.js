import { h, Fragment } from "preact";
import DetailView from "./detail-view.js";
import PerspectiveList from "./perspective-list.js";
import PerspectiveView from "./perspective-view.js";
import SearchView from "./search-view.js";
import StaticPage from "./static-page.js";
import SiteFooter from "./site-footer.js";
import GlobalSearchInput from "./global-search-input.js";
import ThemeToggle from "./theme-toggle.js";
import LangSwitcher from "./lang-switcher.js";
import { useRouter, navigate, buildPath } from "../utilities-ui/router.js";
import { localize } from "../utilities-data/table-config.js";
import { usePref, setPref } from "../utilities-ui/prefs.js";
import { preferredView } from "../utilities-ui/perspectives.js";

// Render one nav menu entry: an external link (href) or a link to a
// static page route (/:lang/page/:id).
function MenuLink({ item, lang }) {
    const label = localize(item.label, lang, item.id || item.href);
    if (typeof item.href === "string") {
        return h("a", {
            href: item.href,
            ...(/^https?:\/\//i.test(item.href) ? { target: "_blank", rel: "noopener noreferrer" } : {}),
        }, label);
    }
    return h("a", { href: buildPath(`/${lang}/page/${item.id}`) }, label);
}

// Slim app header: brand, breadcrumb, menu links, global search, language
// switcher, theme toggle. The search box only renders when some table has
// an FTS index (search: { lang, value } or null). `menu` is the parsed
// menu.json (may be empty).
function Header({ crumbs, lang, languages, onLangChange, search, menu = [] }) {
    return h("header", { class: "container-fluid" },
        h("nav", null,
            h("ul", null,
                h("li", null, h("a", { class: "app-brand", href: buildPath("/") }, "⛁ Pihka")),
                ...(crumbs || []).flatMap((crumb, i) => [
                    h("li", { key: `sep-${i}`, class: "app-crumb" }, "›"),
                    h("li", { key: `crumb-${i}` }, crumb),
                ]),
            ),
            h("ul", null,
                ...menu.map((item, i) => h("li", { key: `menu-${i}`, class: "app-menu-item" },
                    h(MenuLink, { item, lang }),
                )),
                search && h("li", null, h(GlobalSearchInput, {
                    lang: search.lang, value: search.value, key: search.value,
                })),
                h("li", null, h(ThemeToggle, null)),
                h("li", null, h(LangSwitcher, { lang, languages, onChange: onLangChange })),
            ),
        ),
    );
}

function Layout({ crumbs = null, lang = null, languages = null, onLangChange = null, search = null, menu = [], footer = null, children = null }) {
    return h(Fragment, null,
        h(Header, { crumbs, lang, languages, onLangChange, search, menu }),
        h("main", { class: "container-fluid" }, children),
        h(SiteFooter, { footer, lang }),
    );
}

/**
 * Root route dispatcher: renders the home grid, a perspective's list view,
 * or a row's detail view based on the current route.
 */
export function App({ perspectives, store, defaultLang, languages = null, menu = [], footer = null }) {
    const route = useRouter();
    const { lang, perspective: perspectiveId, id: rowId, view } = route;

    // Language preference: the URL's lang segment wins; on routes without
    // one (home) the persisted choice applies, then the configured default.
    const storedLang = usePref("lang");
    const prefLang = Array.isArray(languages) && languages.includes(storedLang) ? storedLang : null;
    const effectiveLang = lang || prefLang || defaultLang;

    const onLangChange = (next) => {
        setPref("lang", next);
        // Rewrite the lang segment in place; replace so Back skips the
        // language flip.
        if (perspectiveId === "search") {
            navigate(`/${next}/search`, route.params, { replace: true });
        } else if (perspectiveId === "page" && rowId) {
            navigate(`/${next}/page/${rowId}`, route.params, { replace: true });
        } else if (lang && perspectiveId) {
            const path = rowId
                ? `/${next}/${perspectiveId}/${rowId}/${view}`
                : `/${next}/${perspectiveId}/${view}`;
            navigate(path, route.params, { replace: true });
        }
    };

    const searchEnabled = perspectives.some(p => store.getFtsInfo(p.table));
    const layoutProps = {
        lang: effectiveLang, languages, onLangChange, menu, footer,
        search: searchEnabled
            ? { lang: effectiveLang, value: perspectiveId === "search" ? (route.params.q || "") : "" }
            : null,
    };

    // Legacy URL redirect: /{perspective} or /{perspective}/{id}.
    // Replace (not push) so the Back button doesn't bounce off the
    // redirecting entry.
    if (route.legacy && perspectiveId) {
        const p = perspectives.find(p => p.id === perspectiveId);
        const effectiveView = view || preferredView(p) || "table";
        const newPath = rowId
            ? `/${effectiveLang}/${perspectiveId}/${rowId}/${effectiveView}`
            : `/${effectiveLang}/${perspectiveId}/${effectiveView}`;
        setTimeout(() => navigate(newPath, undefined, { replace: true }), 0);
        // Fall through to render with resolved values
    }

    // Global search results: /:lang/search?q=... ("search" is a reserved
    // segment — see parseLocation).
    if (perspectiveId === "search") {
        return h(Layout, { ...layoutProps, crumbs: ["Search"] },
            h(SearchView, {
                perspectives, store,
                lang: effectiveLang,
                query: route.params.q || "",
            }),
        );
    }

    // Static menu page: /:lang/page/:id ("page" is a reserved segment).
    if (perspectiveId === "page") {
        const item = menu.find(m => m.id === rowId);
        if (!item) {
            return h(Layout, layoutProps, h("p", null, "Page not found."));
        }
        return h(Layout, { ...layoutProps, crumbs: [localize(item.label, effectiveLang, rowId)] },
            h(StaticPage, { item, lang: effectiveLang }),
        );
    }

    // Detail view: /:lang/:perspective/:id/:view
    if (perspectiveId && rowId) {
        const p = perspectives.find(p => p.id === perspectiveId);
        const tableName = p ? p.table : perspectiveId;
        const displayName = localize(p?.label, effectiveLang, p ? p.name : perspectiveId);
        const { columns, row, fkResolved } = store.queryRow(tableName, rowId);

        // Rows in other tables referencing this one (reverse FKs), with the
        // child table's perspective id attached so the related section can
        // link to detail pages and the filtered list view.
        const related = store.queryRelated(tableName, row).map(rel => ({
            ...rel,
            perspectiveId: perspectives.find(cp => cp.table === rel.table)?.id ?? null,
        }));

        return h(Layout, {
            ...layoutProps,
            crumbs: [
                h("a", { href: buildPath(`/${effectiveLang}/${perspectiveId}/${preferredView(p) || "table"}`) }, displayName),
                String(rowId),
            ],
        },
            h(DetailView, {
                tableName: displayName, columns, row, fkResolved, related, store,
                view, lang: effectiveLang,
                perspectiveId, rowId,
            }),
        );
    }

    // Perspective view: /:lang/:perspective/:view
    if (perspectiveId) {
        const p = perspectives.find(p => p.id === perspectiveId);
        if (!p) return h(Layout, layoutProps,
            h("p", null, `Perspective not found: ${perspectiveId}`),
        );
        return h(Layout, { ...layoutProps, crumbs: [localize(p.label, effectiveLang, p.name)] },
            h(PerspectiveView, { perspective: p, store, view, lang: effectiveLang }),
        );
    }

    // Home: /
    return h(Layout, layoutProps,
        h(PerspectiveList, { perspectives, store, lang: effectiveLang }),
    );
}

/**
 * Loading / error screen shown until the app is ready.
 */
export function Status({ message, error }) {
    return h("main", { class: "container-fluid" },
        error
            ? h(Fragment, null,
                h("h2", null, "Failed to load"),
                h("p", null, String(error.message || error)),
                h("p", null, "Check that the database configured in app/config.json is reachable, then reload."),
            )
            : h("div", { "aria-busy": "true" }, message),
    );
}
