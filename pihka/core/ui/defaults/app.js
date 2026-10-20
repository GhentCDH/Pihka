// @ts-check
import { registeredComponent } from "../runtime/component-host.js";
import { h, Fragment } from "preact";
const DetailView = registeredComponent("page", "detail");
const PerspectiveList = registeredComponent("page", "home");
const PerspectiveView = registeredComponent("page", "perspective");
const SearchView = registeredComponent("page", "search");
const StaticPage = registeredComponent("page", "static");
const SiteFooter = registeredComponent("control", "footer");
const GlobalSearchInput = registeredComponent("control", "global-search");
const ThemeToggle = registeredComponent("control", "theme");
const LangSwitcher = registeredComponent("control", "language");
import { useRouter, navigate, buildPath } from "../runtime/router.js";
import { localize } from "../runtime/table-config.js";
import { usePref, setPref } from "../runtime/prefs.js";
import { preferredView } from "../runtime/perspectives.js";
import { useQuery, QueryStatus } from "../runtime/use-query.js";
import { Brand } from "./brand.js";

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
export function Header({ crumbs, lang, languages, onLangChange, search, menu = [] }) {
    return h("header", { class: "container-fluid" },
        h("nav", null,
            h("ul", null,
                h("li", null, h(Brand, {})),
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

export function Layout({ crumbs = null, lang = null, languages = null, onLangChange = null, search = null, menu = [], footer = null, children = null }) {
    return h(Fragment, null,
        h(RegisteredHeader, { crumbs, lang, languages, onLangChange, search, menu }),
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
        return h(RegisteredLayout, { ...layoutProps, crumbs: ["Search"] },
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
            return h(RegisteredLayout, layoutProps, h("p", null, "Page not found."));
        }
        return h(RegisteredLayout, { ...layoutProps, crumbs: [localize(item.label, effectiveLang, rowId)] },
            h(StaticPage, { item, lang: effectiveLang }),
        );
    }

    // Detail view: /:lang/:perspective/:id/:view
    if (perspectiveId && rowId) {
        const p = perspectives.find(p => p.id === perspectiveId);
        const tableName = p ? p.table : perspectiveId;
        const displayName = localize(p?.label, effectiveLang, p ? p.name : perspectiveId);

        return h(RegisteredLayout, {
            ...layoutProps,
            crumbs: [
                h("a", { href: buildPath(`/${effectiveLang}/${perspectiveId}/${preferredView(p) || "table"}`) }, displayName),
                String(rowId),
            ],
        },
            h(DetailRoute, {
                key: `${tableName}:${rowId}`,
                tableName: displayName, table: tableName, store, perspectives,
                view, lang: effectiveLang,
                perspectiveId, rowId, options: p?.options ?? null,
            }),
        );
    }

    // Perspective view: /:lang/:perspective/:view
    if (perspectiveId) {
        const p = perspectives.find(p => p.id === perspectiveId);
        if (!p) return h(RegisteredLayout, layoutProps,
            h("p", null, `Perspective not found: ${perspectiveId}`),
        );
        return h(RegisteredLayout, { ...layoutProps, crumbs: [localize(p.label, effectiveLang, p.name)] },
            h(PerspectiveView, { key: p.id, perspective: p, store, view, lang: effectiveLang }),
        );
    }

    // Home: /
    return h(RegisteredLayout, layoutProps,
        h(PerspectiveList, { perspectives, store, lang: effectiveLang }),
    );
}

function DetailRoute({ perspectives, ...props }) {
    const { store, table, rowId } = props;
    const query = useQuery(async () => {
        const result = await store.queryRow(table, rowId);
        const related = (await store.queryRelated(table, result.row)).map(rel => ({
            ...rel,
            perspectiveId: perspectives.find(p => p.table === rel.table)?.id ?? null,
        }));
        return { ...result, related };
    }, [store, table, rowId, perspectives]);
    if (query.loading || query.error) return h(QueryStatus, { error: query.error });
    return h(DetailView, { ...props, ...query.data });
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

const RegisteredLayout = registeredComponent("shell", "layout");
const RegisteredHeader = registeredComponent("control", "header");
