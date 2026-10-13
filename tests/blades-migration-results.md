# PicoCSS → Blades' Pico fork verification — 2026-10-13

Issue #3. `pihka/core/assets/stylesheets/pico.min.css` was replaced in place by the unmodified
`css/pico.min.css` of `@anyblades/blades@3.0.0` ("Blades CSS' Pico fork v2.5",
SHA-256 `562e9519…a189ee`). The full `blades.css` was deliberately not used: its standalone kit adds
global element rules (`body` as a flex column, `hyphens: auto`, `table td { vertical-align: top }`,
float labels on `label:has(> span)`, `dl dd` timeline borders, `ul ul` font size) that would change
the data tables and the `.fill-height` layout. The fork keeps every `--pico-*` variable, `data-theme`,
`data-tooltip`, `aria-busy`, `.container-fluid`, `.outline` and `.grid` that Pihka relies on; the only
selector change is `:root` → `:scope`, which outside `@scope` matches the root with equal specificity.

## Chrome DevTools MCP — computed-style diff

The old (2.1.1) and new stylesheets were swapped on the live page and the computed styles of every
element (colour, background, font size/weight, line height, padding, margins, borders, radius,
display, size, shadow, hyphens, vertical-align, `::before`/`::after`) were compared. A control run
without Pico confirmed the swap takes effect (links fall back to `rgb(0, 0, 238)`).

| Routes | Themes | Viewport | Differing elements |
|---|---|---|---|
| home, works table/cards/export, works detail table/card/iiif, search, About, page-not-found | light, dark | 1440×900 | 0 |
| home, works table, work card, author-overview, About | auto (OS) | 390-wide | 0 |
| authors map (list + detail), text_pages annotated-text, annotations table | light, dark | 1440×900 | 0 |

## Automated checks

- Engine/architecture: **18 passed**; scripts/vendoring (incl. core dependency policy): **17 passed**.
- `vendorize:check` (6 owners, offline) and ESLint pass.
- Playwright: **142 passed, 2 failed**. `point_map extension: geo tables get map views…` passed on
  rerun (flaky). `full text: matched work shows an expandable preview…` fails identically on
  unmodified `origin/main` (expects a "Show more" toggle that the word-preview change replaced) —
  pre-existing, unrelated to CSS.
