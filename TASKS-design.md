# Pihka visual refinement

Goal: A restrained amber identity, consistent system typography and clear responsive layouts on refactor.

Done means: shared horizontal SVG branding, compact footer, mobile filters in normal flow, desktop sticky sidebar, localized About attribution, focused regression tests, Chrome visual checks and full verification pass.

Constraints: Preserve engine/data/plugin boundaries, existing functionality and published data. No new dependencies or fonts. Facet shading is confined to the logo, as requested. Three text sizes for authored UI; simplify existing CSS.

Stop and ask: unresolved user-only decisions, unexplained failures or unrelated destructive changes.

- [x] Add shared amber cylinder/wordmark SVG and header/footer branding.
- [x] Simplify footer and move Gutenberg attribution to demo About pages.
- [x] Consolidate typography and fix responsive sidebar positioning.
- [x] Add regression tests for scrolling, branding, attribution and responsive layout.
- [x] Inspect representative views in Chrome at mobile/desktop sizes and both themes; record screenshots/evidence.
- [x] Run full browser suite on both transports, Node suites, lint/typecheck and authored diff checks.

## Blocked on user
None. Desktop-only sticky filters selected in planning.

## Log
- Implementation started; prior architecture and dependency changes retained.

- User refinement: faceted amber enclosing a database, inspired by the supplied amber photograph. SVG uses currentColor so the wordmark and interface links share the active theme accent.

- Completed: 135 browser tests, 18 engine/architecture tests, 17 script tests; lint, typecheck, offline vendor check and authored whitespace checks pass. Chrome evidence: tests/design-results.md.
- Final logo refinement: smaller database inclusion underneath translucent front facets, with light/shadow for depth.

- Reference refinement: supplied Baltic amber photograph and Amber Framework crystal informed a clearer faceted outline, luminous center, dark rim and smaller tilted silhouette inside the continuous front surface. Wordmark still follows the shared theme accent.
