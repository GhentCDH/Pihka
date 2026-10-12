// @ts-check
/** Default UI is installed explicitly, through exactly the same API as optional plugins. */
import { App, Status, Header, Layout } from "./app.js";
import DetailView from "./detail-view.js";
import PerspectiveList from "./perspective-list.js";
import PerspectiveView from "./perspective-view.js";
import FacetedView from "./faceted-view.js";
import SearchView from "./search-view.js";
import StaticPage from "./static-page.js";
import SiteFooter from "./site-footer.js";
import GlobalSearchInput from "./global-search-input.js";
import ThemeToggle from "./theme-toggle.js";
import LangSwitcher from "./lang-switcher.js";
import FacetSidebar, { DropdownFacet } from "./facet-sidebar.js";
import Pagination from "./pagination.js";
import FtsSearchInput from "./fts-search-input.js";
import RangeSelector from "./range-selector.js";
import { register as views } from "./data-views/builtin-views.js";
import { register as resources } from "./data-views/builtin-resources.js";
import { register as cells } from "./data-views/cell-value.js";
import { register as codecs } from "./filter-codecs.js";
export function register(api) {
    const groups = {
        shell: { app: App, layout: Layout, status: Status },
        page: {
            home: PerspectiveList,
            perspective: PerspectiveView,
            faceted: FacetedView,
            detail: DetailView,
            search: SearchView,
            static: StaticPage,
        },
        control: {
            header: Header,
            footer: SiteFooter,
            "global-search": GlobalSearchInput,
            theme: ThemeToggle,
            language: LangSwitcher,
            facets: FacetSidebar,
            pagination: Pagination,
            search: FtsSearchInput,
        },
        facet: { range: RangeSelector, values: DropdownFacet },
    };
    for (const [kind, definitions] of Object.entries(groups))
        for (const [id, component] of Object.entries(definitions))
            api.registerComponent({ kind, id, component });
    views(api);
    resources(api);
    cells(api);
    codecs(api);
}
