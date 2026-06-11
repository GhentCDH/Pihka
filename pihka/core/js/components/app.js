import { h, Fragment } from "preact";
import DetailView from "./detail-view.js";
import PerspectiveList from "./perspective-list.js";
import PerspectiveView from "./perspective-view.js";
import ThemeToggle from "./theme-toggle.js";
import LangSwitcher from "./lang-switcher.js";
import { useRouter, navigate, buildPath } from "../utilities/router.js";
import { localize } from "../utilities/table-config.js";
import { usePref, setPref } from "../utilities/prefs.js";
import { preferredView } from "../utilities/perspectives.js";

// Slim app header: brand, breadcrumb, language switcher, theme toggle.
function Header({ crumbs, lang, languages, onLangChange }) {
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
                h("li", null, h(ThemeToggle, null)),
                h("li", null, h(LangSwitcher, { lang, languages, onChange: onLangChange })),
            ),
        ),
    );
}

function Layout({ crumbs = null, lang = null, languages = null, onLangChange = null, children = null }) {
    return h(Fragment, null,
        h(Header, { crumbs, lang, languages, onLangChange }),
        h("main", { class: "container-fluid" }, children),
    );
}

/**
 * Root route dispatcher: renders the home grid, a perspective's list view,
 * or a row's detail view based on the current route.
 */
export function App({ perspectives, store, defaultLang, languages = null }) {
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
        if (lang && perspectiveId) {
            const path = rowId
                ? `/${next}/${perspectiveId}/${rowId}/${view}`
                : `/${next}/${perspectiveId}/${view}`;
            navigate(path, route.params, { replace: true });
        }
    };

    const layoutProps = { lang: effectiveLang, languages, onLangChange };

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
