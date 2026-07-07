# Plan: Site footer (credits/provenance/logos) + menu.json nav pages

> **Status: implemented.** Decisions taken during build: (1) HTML from footer/menu/pages is trusted as-authored and injected verbatim (same trust as config.json). (2) The sample app ships a *full* override set (`app/footer.json`, `app/menu.json`, `app/pages/`, `app/assets/logo/ghentcdh.svg`) exercising all three menu content forms — asset `src`, inline `html`, and external `href`. One bug surfaced and was fixed in `StaticPage`: state is keyed on the resolved URL (not seeded once via useState), so navigating between two page routes without a remount never shows stale content. 41 Playwright tests pass (5 new).

## Context

Published datasets need to describe themselves: credits, data provenance, and logos of universities/funders, plus explanatory pages (About, Instructions) reachable from the top navigation. Core ships sensible defaults; apps override content via `app/footer.json` and `app/menu.json` (same convention as `app/config.json`). Menu content is multilingual and either inline HTML or read from an HTML asset; default pages and logos live under `core/assets/`.

## Verified architecture facts

- `app.js` `Layout` = `Fragment(Header, main)` — the one insertion point for a site-wide `Footer` (every route renders through it). `Status` (loading screen) has no header/footer — leave it that way.
- `Header` right `<ul>`: GlobalSearchInput, ThemeToggle, LangSwitcher — menu links slot in here (before the search box). `effectiveLang` = URL > pref > default is computed in `App` and available to pass down.
- Router `parseLocation()` has a reserved-segment precedent: `parts.length === 2 && parts[1] === "search"`. A 2-segment `/#/en/about` would today mis-parse as legacy `/:perspective/:id` — so pages get a **reserved `page` segment**: `/#/:lang/page/:id` (3 parts, `parts[1] === "page"`), placed before the generic 3-segment view branch. `onLangChange` in app.js needs a matching rewrite branch.
- `loadConfig()` (`utilities-data/config.js`): module-cached `fetch(assetUrl(...))`, warn + `{}` fallback — the loader pattern to copy.
- `localize(label, lang, fallback)` exported from `table-config.js` — reuse for labels and for picking multilingual HTML/src variants.
- No `dangerouslySetInnerHTML` in app code yet (Preact supports it); content trust level = same as config.json (site-author controlled).
- `core/assets/` has only `stylesheets/`; no logo/pages dirs anywhere; base.css styles `#app > header` (footer will mirror as `#app > footer`); no footer CSS exists.
- Hardening rules apply: loaders fail-soft; the footer and page components should be wrapped with the existing `withErrorBoundary` so malformed content can't take the app down.

## Design

### Content files & override chain

| Content | App override (checked first) | Core default (fallback) |
|---|---|---|
| Footer | `app/footer.json` | `core/assets/footer.json` |
| Menu | `app/menu.json` | `core/assets/menu.json` |
| Pages | any path the menu entry names | `core/assets/pages/*.html` |
| Logos | any path in footer.json (e.g. `app/assets/logo/...`) | `core/assets/logo/*.svg` |

Loader: fetch app path; on non-ok/throw fall back to core path; on both failing → `null` (component renders nothing). Module-cached, `console.warn` on fallback only when the core default also fails.

**footer.json** (all keys optional, HTML values are inline HTML, multilingual `{lang: ...}` or plain string):
```json
{
    "credits":    { "en": "<p>…</p>", "nl": "<p>…</p>" },
    "provenance": { "en": "<p>Data: …</p>", "nl": "…" },
    "links": [ { "label": { "en": "Contact" }, "href": "mailto:…" } ],
    "logos": [ { "src": "core/assets/logo/pihka.svg", "alt": "Pihka", "href": "https://…" } ]
}
```

**menu.json** — array of items; content via inline `html` (multilingual) OR `src` (string or `{lang: path}` map of HTML asset paths); `href` entries are plain external links:
```json
[
    { "id": "about", "label": { "en": "About", "nl": "Over" },
      "src": { "en": "core/assets/pages/about.en.html", "nl": "core/assets/pages/about.nl.html" } },
    { "id": "instructions", "label": { "en": "Instructions", "nl": "Handleiding" },
      "src": { "en": "core/assets/pages/instructions.en.html", "nl": "core/assets/pages/instructions.nl.html" } }
]
```
`id` must match `^[a-z][a-z0-9_-]*$` (it is a URL segment); invalid entries are warned about and skipped.

### Implementation steps

1. **Loaders — `core/js/utilities-data/site-content.js`** (new): `loadFooter()`, `loadMenu()` following the config.js pattern with the app→core fallback chain; menu entries validated/filtered. Also export `resolveAssetPath(src)` helper: absolute `http(s)://` or `/` passes through, everything else goes through `assetUrl()` (used for logos and page srcs).
2. **Router — reserved `page` segment** (`utilities-ui/router.js`): new branch in `parseLocation` before the 3-segment view branch: `parts.length === 3 && parts[1] === "page"` → `{ lang: parts[0], perspective: "page", id: parts[2], view: null, params }`. Update the header comment. (2-segment legacy `/page/x` not needed.)
3. **Components** (new, both wrapped with the existing `withErrorBoundary` where they're used):
   - `core/js/components/site-footer.js` — `SiteFooter({ footer, lang })`: `<footer class="container-fluid">` with provenance + credits blocks (`dangerouslySetInnerHTML`, localized via `localize`), links row, logo row (`<img>`/`<a>` via `resolveAssetPath`). Renders null when `footer` is null/empty.
   - `core/js/components/static-page.js` — `StaticPage({ item, lang })`: inline `html` → localize + innerHTML; `src` → localize the path map, `fetch(resolveAssetPath(...))` in `useEffect` (cached per path), `aria-busy` while loading, muted error text on failure. Renders inside `<article class="static-page">`.
4. **app.js wiring**:
   - `Layout` gains `footer`/`lang` props and renders `h(SiteFooter, ...)` after `main`.
   - `Header` gains `menu` + `lang`: localized menu links (`buildPath(\`/${lang}/page/${id}\`)` or external `href` with `target="_blank"`) in the right `<ul>` before the search box.
   - New route branch (mirroring search): `if (perspectiveId === "page")` → find menu item by `route.id`, render `StaticPage` with crumbs `[label]`; unknown id → "Page not found".
   - `onLangChange` gains the page branch: `/${next}/page/${route.id}`.
   - `App` receives `footer`/`menu` props from `main.js` (loaded alongside config, before render — all fail-soft).
5. **Default content** (new files):
   - `core/assets/logo/pihka.svg` — simple wordmark (⛁ Pihka) usable in light+dark (currentColor).
   - `core/assets/footer.json` — generic: provenance placeholder ("This site publishes a research dataset as a static SQLite website"), credits "Published with Pihka", the Pihka logo.
   - `core/assets/menu.json` — About + Instructions entries as in the schema above.
   - `core/assets/pages/about.{en,nl}.html` — what Pihka is (zero-backend SQLite publishing, archival goals), note that this page is a default overridable via `app/menu.json`.
   - `core/assets/pages/instructions.{en,nl}.html` — how to browse/search/filter (global search, facets, view toggles, shareable URLs, language switch).
   - Demo override exercising the chain: `pihka/app/footer.json` crediting Ghent Centre for Digital Humanities + data provenance for the sample dataset (Open Library-derived sample data), reusing the core Pihka logo.
6. **CSS** (`core/assets/stylesheets/base.css`): `#app > footer` (border-top, muted small text, flex sections), `.footer-logos` (flex row, capped logo height, grayscale-friendly), `.static-page` (readable max-width). Keep both themes working (colors via existing vars).
7. **Docs**: AGENTS.MD — new "Site footer and menu pages" section (override chain, schemas, reserved `page` segment added to the naming caveats list, `core/assets/logo` + `pages` conventions).
8. **Tests** (Playwright): footer visible on home + detail routes with app-override credits text; About link in header navigates to `/#/en/page/about` and renders default content; language switch on a page route rewrites to `/#/nl/page/about` and shows Dutch; external-link menu entries render as plain anchors (covered implicitly if demo has none — assert internal only); fault: intercept `app/menu.json` + `core/assets/menu.json` with garbage → site boots, no menu links, core works (extends the `fault:` suite).

## Files touched

Modify: `core/js/components/app.js`, `core/js/utilities-ui/router.js`, `core/js/main.js`, `core/assets/stylesheets/base.css`, `AGENTS.MD`, `tests/app.spec.js`.
Create: `core/js/utilities-data/site-content.js`, `core/js/components/site-footer.js`, `core/js/components/static-page.js`, `core/assets/footer.json`, `core/assets/menu.json`, `core/assets/logo/pihka.svg`, `core/assets/pages/{about,instructions}.{en,nl}.html`, `pihka/app/footer.json`.

## Verification

1. `npm run dev`; chrome-devtools MCP:
   - Home + a detail page show the footer with the app-override GhentCDH credits and the Pihka logo; dark/light themes both legible.
   - Header shows About + Instructions; click About → `/#/en/page/about` renders the default HTML; switch language → `/#/nl/page/about` in Dutch; Instructions likewise.
   - Delete-simulate override (route-intercept `app/footer.json` → 404) → core default footer text appears.
   - Console clean.
2. Playwright suite: all existing 36 + new footer/menu/page/fault tests green.
3. `npm run lint` + `npm run typecheck` (only the pre-existing error).
