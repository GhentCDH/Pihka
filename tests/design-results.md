# Pihka design verification — 2026-10-12

Implemented on `refactor`. The shared SVG depicts a small database inclusion behind translucent amber facets. The wordmark and stone base inherit `--accent` through SVG `currentColor`; light and dark themes therefore use the same accent as interface links. The standalone SVG has a default amber color. The reference photograph was supplied by the user from Bon Parfumeur; the SVG is an original vector drawing.

## Chrome DevTools MCP

Chrome MCP supports live viewport emulation, screenshots, computed-style and geometry inspection, and real UI input. Screenshots were inspected inline. Use `npm run test:browser` for temporary, deterministic `/download/` and `/http-vfs/` fixtures without altering the published database.

- At 390 × 844, the download table sidebar is static and scrolls completely off screen (bottom −41px at scrollY 550). Document width remains 390px; wide tables scroll locally. Footer wraps cleanly.
- At 1440 × 900, the HTTP VFS cards sidebar sticks at 8px with an opaque background. Typing `Dalloway` into the actual search control and pressing Enter updates the URL and returns one card, Mrs Dalloway.
- Download tables and Dutch About were inspected in light/dark themes; HTTP VFS maps and mobile annotated-text detail were also inspected. Map and annotation views retain their layouts.
- Header and larger footer branding share the same SVG. Final shaded amber revision inspected in both themes. The database is smaller and lies beneath the front facets.
- The logo wordmark and link colors match after Pico’s theme transition: light `rgb(179, 83, 9)`, dark `rgb(232, 150, 47)`.
- About typography resolves to 16px body/control text, 14px secondary text, and 20px headings. Both localized About pages contain Gutenberg attribution; footers do not.

## Automated checks

- Full Playwright suite: **135 passed** (30.3s), including real download and HTTP VFS querying, plugins, and six new design cases.
- Node engine/architecture: **18 passed**; script/vendoring tests: **17 passed**.
- ESLint, TypeScript, offline vendor verification (six owners), and authored whitespace checks pass.
- Final SVG-only refinement: all **6 focused design tests passed** (6.1s), across both transports.

Earlier runs exposed old text-only brand selectors and a theme-transition timing assumption in the new test; both were corrected. An overlapping run lost its borrowed BrowserSync server when the owning run exited; the final full run used its own server and passed. Upstream vendor whitespace is excluded from authored diff checks; vendor files were not reformatted.

## Amber inclusion refinement

The supplied Baltic amber photograph and [Amber Framework crystal](https://amberframework.org/assets/brand/amber-crystal-d7bb414ba231426fa6317715ca0adb73.svg) informed a further original SVG revision: a bright translucent center, strong perimeter facets, and a small tilted database silhouette beneath a continuous front surface. The wordmark retains the shared UI accent; the stone uses highlights and shadows within the amber palette. Chrome verified the external SVG gradients at normal header/footer sizes and enlarged, in light and dark themes.
