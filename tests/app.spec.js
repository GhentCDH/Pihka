import { test, expect } from "@playwright/test";

// Helper: load a route directly. Routes are hash fragments, so deep links
// load on any static server without rewrite rules. Wait for the app header
// (only the loaded app renders one — the loading/error screen does not).
async function gotoRoute(page, route) {
  await page.goto(!route || route === "/" ? "/" : "/#" + route);
  await page.waitForSelector("#app header", { timeout: 10000 });
}

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Pihka/i);
});

test("categories/1 contains Novel", async ({ page }) => {
  await gotoRoute(page, "/categories/1");
  await expect(page.locator("body")).toContainText("Novel");
});

test("authors/1 contains Virginia", async ({ page }) => {
  await gotoRoute(page, "/authors/1");
  await expect(page.locator("body")).toContainText("Virginia");
});

test("detail page lists related objects in a paginated table", async ({ page }) => {
  // categories/1 (Novel) → related works_categories junction rows, with the
  // work_id FK cells resolved to work titles.
  await gotoRoute(page, "/en/categories/1/table");
  const related = page.locator(".detail-related");
  await expect(related.locator("h3")).toContainText(/work categories/i);
  await expect(related.locator("tbody tr")).toHaveCount(10);
  await expect(related.locator(".faceted-count")).toContainText("Showing 1 to 10 of 1734");

  // Page through with the shared pagination controls
  const firstTitle = await related.locator("tbody tr td:nth-child(2)").first().textContent();
  await related.locator("nav[aria-label='Pagination'] button", { hasText: "›" }).click();
  await expect(related.locator(".faceted-count")).toContainText("Showing 11 to 20 of 1734");
  const secondPageTitle = await related.locator("tbody tr td:nth-child(2)").first().textContent();
  expect(secondPageTitle).not.toBe(firstTitle);

  // View-all link jumps to the filtered list view
  await related.locator("a", { hasText: "View all" }).click();
  await expect(page).toHaveURL(/works_categories\/table\?category_id=1/);
  await expect(page.locator(".faceted-count")).toContainText("of 1734");
});

test("configured column labels and types render in the works table", async ({ page }) => {
  await gotoRoute(page, "/en/works/table");
  // "cover" column is configured with label "Cover" and type "asset"
  await expect(page.locator("thead th", { hasText: "Cover" })).toBeVisible();
  await expect(page.locator("tbody tr").first().locator("td img")).toBeVisible();
  // Table label "Works" shows in the breadcrumb
  await expect(page.locator("#app header nav")).toContainText("Works");
});

test("language switcher rewrites the lang segment and labels", async ({ page }) => {
  await gotoRoute(page, "/en/works/table");
  await expect(page.locator("#app header nav")).toContainText("Works");
  await page.locator(".lang-switcher").click();
  await expect(page).toHaveURL(/\/nl\/works\/table/);
  await expect(page.locator("#app header nav")).toContainText("Boeken");
  await expect(page.locator("thead th", { hasText: "Omslag" })).toBeVisible();
});

test("search filters reactively on input", async ({ page }) => {
  await gotoRoute(page, "/en/works/table");
  await expect(page.locator(".faceted-count")).toContainText("of 1743");
  // fill() fires input events; no Enter pressed — the debounce applies it
  await page.locator(".fts-search-input").fill("love");
  await expect(page).toHaveURL(/q=love/);
  await expect(page.locator(".faceted-count")).not.toContainText("of 1743");
  // Exactly one clear button (native WebKit × is suppressed)
  await expect(page.locator(".fts-search-clear")).toHaveCount(1);
  await page.locator(".fts-search-clear").click();
  await expect(page.locator(".faceted-count")).toContainText("of 1743");
});

test("trigram search matches mid-word fragments", async ({ page }) => {
  await gotoRoute(page, "/en/works/table");
  await expect(page.locator(".faceted-count")).toContainText("of 1743");
  // "ightho" is not a word — only trigram substring matching finds "Lighthouse"
  await page.locator(".fts-search-input").fill("ightho");
  await expect(page).toHaveURL(/q=ightho/);
  await expect(page.locator(".faceted-count")).toContainText("of 1");
  await expect(page.locator("tbody")).toContainText("To the Lighthouse");
});

test("searches shorter than 3 characters leave all rows in place", async ({ page }) => {
  await gotoRoute(page, "/en/works/table");
  await page.locator(".fts-search-input").fill("lo");
  await expect(page).toHaveURL(/q=lo/);
  // Too short for a trigram — treated as "no search yet", not zero results
  await expect(page.locator(".faceted-count")).toContainText("of 1743");
});

test("global search from the header shows grouped results", async ({ page }) => {
  await gotoRoute(page, "/");
  const box = page.locator(".global-search input");
  await expect(box).toBeVisible();
  await box.fill("novel");
  await box.press("Enter");
  await expect(page).toHaveURL(/\/en\/search\?q=novel/);
  await expect(page.locator(".search-results-summary")).toContainText("in 2 of 5 searchable tables");
  // One section per matching entity, capped at 5 rows each
  const groups = page.locator(".search-results-group");
  await expect(groups).toHaveCount(2);
  await expect(groups.filter({ hasText: "Categories" }).locator("tbody tr")).toHaveCount(1);
  await expect(groups.filter({ hasText: "Works" }).locator("tbody tr")).toHaveCount(5);
  // "View all" jumps to the filtered per-table list view
  await groups.filter({ hasText: "Works" }).locator(".search-results-more").click();
  await expect(page).toHaveURL(/works\/table\?q=novel/);
  await expect(page.locator(".faceted-count")).not.toContainText("of 1743");
});

test("punctuation in a search is matched literally, not a syntax error", async ({ page }) => {
  await gotoRoute(page, "/en/works/table");
  // "2014." is invalid FTS5 syntax; the literal-quoted retry matches the
  // descriptions ending in "published in 2014."
  await page.locator(".fts-search-input").fill("2014.");
  await expect(page).toHaveURL(/q=2014/);
  await expect(page.locator(".fts-error")).toHaveCount(0);
  await expect(page.locator(".faceted-count")).not.toContainText("of 1743");
  await expect(page.locator("tbody tr").first()).toBeVisible();
});

test("advanced FTS5 syntax still reaches the engine unescaped", async ({ page }) => {
  await gotoRoute(page, "/en/search?q=lighthouse OR woolf");
  // OR across tables: matches works ("To the Lighthouse") and authors ("Virginia Woolf")
  await expect(page.locator(".search-results-group")).toHaveCount(2);
  await expect(page.locator("main")).not.toContainText("Invalid search query");
});

test("global search rejects queries under 3 characters", async ({ page }) => {
  await gotoRoute(page, "/en/search?q=lo");
  await expect(page.locator("main")).toContainText("at least 3 characters");
  await expect(page.locator(".search-results-group")).toHaveCount(0);
});

test("page size preference persists across navigation", async ({ page }) => {
  await gotoRoute(page, "/en/works/table");
  await page.locator(".faceted-pagesize").selectOption("50");
  await expect(page.locator(".faceted-count")).toContainText("Showing 1 to 50");
  // Leave and come back without a pageSize in the URL
  await page.locator(".app-brand").click();
  await page.locator("a.perspective-card", { hasText: "Works" }).click();
  await expect(page).not.toHaveURL(/pageSize/);
  await expect(page.locator(".faceted-count")).toContainText("Showing 1 to 50");
});

test("view preference persists across navigation", async ({ page }) => {
  await gotoRoute(page, "/en/works/table");
  await page.locator(".view-toggles button", { hasText: "cards" }).click();
  await expect(page).toHaveURL(/\/works\/cards/);
  // The home card now targets the remembered view
  await page.locator(".app-brand").click();
  await page.locator("a.perspective-card", { hasText: "Works" }).click();
  await expect(page).toHaveURL(/\/works\/cards/);
});

test("works view shows sidebar with facet filters", async ({ page }) => {
  await gotoRoute(page, "/en/works/table");
  const sidebar = page.locator("aside.facet-sidebar");
  await expect(sidebar).toBeVisible();
  await expect(sidebar).toContainText("Filters");
  // Year range slider in sidebar
  await expect(sidebar.locator("input[type='range']")).toHaveCount(2);
  // Author dropdown (direct FK) + Categories dropdown (m2m through the
  // works_categories junction table).
  await expect(sidebar.locator(".facet-dropdown")).toHaveCount(2);
});

test("year range filter narrows works rows", async ({ page }) => {
  await gotoRoute(page, "/en/works/table");
  const content = page.locator(".faceted-content");
  await expect(content).toBeVisible();
  await expect(content.locator("tbody tr")).toHaveCount(25);
  // Drag min range slider to exclude some rows
  const sidebar = page.locator("aside.facet-sidebar");
  const minSlider = sidebar.locator("input[type='range']").first();
  await minSlider.fill("2025");
  // Should show fewer rows
  const rowCount = await content.locator("tbody tr").count();
  expect(rowCount).toBeLessThan(25);
});

test("category dropdown facet filters junction rows", async ({ page }) => {
  // Both junction columns are FKs, so the works_categories list view gets
  // auto dropdown facets: work (nth 0) and category (nth 1).
  await gotoRoute(page, "/en/works_categories/table");
  const content = page.locator(".faceted-content");
  await expect(content).toContainText("of 4363");
  const sidebar = page.locator("aside.facet-sidebar");
  await sidebar.locator(".facet-dropdown-trigger").nth(1).click();
  await sidebar.locator(".facet-option", { hasText: "Short Story" }).click();
  await expect(content).toContainText("of 155");
});

test("m2m demo: junction table behavior", async ({ page }) => {
  // The works↔categories relation is many-to-many via works_categories.
  // The junction table itself behaves like any table (homepage card,
  // related sections of raw junction rows), while the detected relation
  // additionally yields automatic m2m facets on both sides.

  // Homepage: the junction table gets its own card like any table.
  await gotoRoute(page, "/");
  await expect(page.locator("a.perspective-card", { hasText: "Work categories" })).toBeVisible();

  // Works detail: a related section of junction rows, category resolved.
  await gotoRoute(page, "/en/works/1/table");
  const related = page.locator(".detail-related", { hasText: "Work categories" });
  await expect(related.locator("h3")).toContainText("Work categories");
  await expect(related).toContainText("Novel"); // Mrs Dalloway's curated category

  // Junction list view: FK cells resolve to work titles / category names.
  await gotoRoute(page, "/en/works_categories/table");
  await expect(page.locator("tbody tr").first()).toContainText("Mrs Dalloway");
  await expect(page.locator("tbody tr").first()).toContainText("Novel");
});

test("full text: matched work shows an expandable preview; unmatched is empty", async ({ page }) => {
  // Mrs Dalloway (id 1) is public domain and has a Gutenberg full text; the
  // famous opening line sits past the 300-char preview cut-off, so it only
  // appears once expanded.
  const OPENING = "Mrs. Dalloway said she would buy the flowers";
  await gotoRoute(page, "/en/works/1/table");
  const cell = page.locator(".cell-text");
  await expect(cell).toBeVisible();
  await expect(cell.locator("button.cell-text-toggle")).toHaveText("Show more");
  await expect(page.locator("body")).not.toContainText(OPENING);

  await cell.locator("button.cell-text-toggle").click();
  await expect(cell.locator("button.cell-text-toggle")).toHaveText("Show less");
  await expect(cell).toContainText(OPENING);

  // full_text is stored but NOT keyword-indexed: a phrase found only in a
  // novel body returns nothing, while title search still works.
  await gotoRoute(page, "/en/works/table");
  await page.locator(".fts-search-input").fill("buy the flowers herself");
  await expect(page).toHaveURL(/q=buy/);
  await expect(page.locator(".faceted-count")).toContainText("No results");

  // A modern (in-copyright) work has no full text: no preview cell.
  await gotoRoute(page, "/en/works/26/table"); // A. Scott Berg — Kate Remembered (2003)
  await expect(page.locator(".detail-view")).toBeVisible();
  await expect(page.locator(".cell-text")).toHaveCount(0);
});

test("m2m facet: works gets an automatic category facet from the junction", async ({ page }) => {
  await gotoRoute(page, "/en/works/table");
  const sidebar = page.locator("aside.facet-sidebar");
  await expect(sidebar.locator(".facet-dropdown-trigger")).toHaveCount(2);
  await expect(sidebar).toContainText("Categories");

  // Select Drama in the m2m dropdown: filters through the junction table.
  await sidebar.locator(".facet-dropdown-trigger").nth(1).click();
  await sidebar.locator(".facet-option", { hasText: "Drama" }).click();
  await expect(page.locator(".faceted-content")).toContainText("of 152");
  await expect(page).toHaveURL(/category_id=5/);
});

test("m2m facet: URLs are bookmarkable and compose with other filters", async ({ page }) => {
  // Deep link decodes straight from the URL param.
  await gotoRoute(page, "/en/works/table?category_id=1");
  await expect(page.locator(".faceted-count")).toContainText("of 1734");

  await gotoRoute(page, "/en/works/table?category_id=4");
  const content = page.locator(".faceted-content");
  await expect(content).toContainText("of 155");

  // Full-text search composes on top (AND) and the m2m param survives
  // the filter re-encoding round-trip.
  await page.locator(".fts-search-input").fill("the");
  await expect(page).toHaveURL(/q=the/);
  await expect(page).toHaveURL(/category_id=4/);
  await expect(content).not.toContainText("of 155");
  await expect(content.locator("tbody tr").first()).toBeVisible();
});

test("m2m facet: symmetric side renders as a capped autocomplete", async ({ page }) => {
  // categories gets the symmetric Works facet; 1743 options render as an
  // autocomplete capped at 100 visible entries.
  await gotoRoute(page, "/en/categories/table");
  const sidebar = page.locator("aside.facet-sidebar");
  await expect(sidebar.locator("input[type='range']")).toHaveCount(0);
  await expect(sidebar.locator(".facet-dropdown")).toHaveCount(1);
  await expect(sidebar).toContainText("Works");

  await sidebar.locator(".facet-dropdown-trigger").click();
  await expect(sidebar.locator(".facet-option")).toHaveCount(100);
  await expect(sidebar.locator(".facet-options-truncated")).toContainText("Showing 100 of 1743");

  // Typing narrows; selecting filters categories through the junction.
  await sidebar.locator(".facet-dropdown-panel .facet-search").fill("Mrs Dalloway");
  await sidebar.locator(".facet-option", { hasText: "Mrs Dalloway" }).click();
  await expect(page.locator(".faceted-count")).toContainText("of 2"); // Novel + Poetry
  await expect(page).toHaveURL(/work_id=1/);

  // The selected option stays visible (and unticked-able) above the cap
  // after the search is cleared.
  await sidebar.locator(".facet-dropdown-panel .facet-search").fill("");
  const first = sidebar.locator(".facet-option").first();
  await expect(first).toContainText("Mrs Dalloway");
  await expect(first.locator("input")).toBeChecked();
});

test("authors view has birth_year range filter in sidebar", async ({ page }) => {
  await gotoRoute(page, "/en/authors/table");
  const sidebar = page.locator("aside.facet-sidebar");
  await expect(sidebar).toBeVisible();
  // birth_year configured as range facet
  await expect(sidebar.locator("input[type='range']")).not.toHaveCount(0);
  await expect(sidebar.locator(".facet-label", { hasText: "birth_year" })).toBeVisible();
});

test("works table shows pagination with page size control", async ({ page }) => {
  await gotoRoute(page, "/en/works/table?pageSize=3");
  const content = page.locator(".faceted-content");
  await expect(content).toBeVisible();
  // Pagination visible
  const nav = content.locator("nav[aria-label='Pagination']");
  await expect(nav).toBeVisible();
  // Only 3 rows visible
  await expect(content.locator("section tbody tr")).toHaveCount(3);
});

test("clicking next page advances to page 2", async ({ page }) => {
  await gotoRoute(page, "/en/works/table?pageSize=3");
  const content = page.locator(".faceted-content");
  await expect(content).toContainText("Showing 1 to 3 of 1743");
  // Click the next (›) button
  await content.locator("nav[aria-label='Pagination'] button", { hasText: "›" }).click();
  await expect(content).toContainText("Showing 4 to 6 of 1743");
});

test("filtering resets page to 1", async ({ page }) => {
  await gotoRoute(page, "/en/works/table?pageSize=3");
  const content = page.locator(".faceted-content");
  // Go to page 2
  await content.locator("nav[aria-label='Pagination'] button", { hasText: "›" }).click();
  await expect(content).toContainText("Showing 4 to 6");
  // Apply an author filter via sidebar dropdown
  const sidebar = page.locator("aside.facet-sidebar");
  await sidebar.locator(".facet-dropdown-trigger").first().click();
  await sidebar.locator(".facet-dropdown-panel .facet-search").fill("Woolf");
  await sidebar.locator(".facet-option", { hasText: "Virginia Woolf" }).click();
  // Should reset to page 1
  await expect(content).toContainText("Showing 1 to");
});

test("URL query params are bookmarkable", async ({ page }) => {
  await gotoRoute(page, "/en/works/table?author_id=1&sort=year&sort_dir=desc");
  const content = page.locator(".faceted-content");
  await expect(content).toBeVisible();
  // Should show only Virginia Woolf's works, sorted by year descending
  await expect(content).toContainText("of 5");
  // First row should be her most recent work (The Waves, 1931)
  const firstYear = await content.locator("section tbody tr").first().locator("td").nth(3).textContent();
  expect(parseInt(firstYear)).toBeGreaterThan(1930);
});

test("view toggle switches between table and cards", async ({ page }) => {
  await gotoRoute(page, "/en/works/table?author_id=1");
  // Click the cards toggle
  await page.locator(".view-toggles button", { hasText: "cards" }).click();
  // URL should change to cards view
  await expect(page).toHaveURL(/\/en\/works\/cards/);
  // Filter should be preserved
  await expect(page).toHaveURL(/author_id=1/);
});

test("home page shows perspectives and tables sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".perspective-section-title", { hasText: "Perspectives" })).toBeVisible();
  await expect(page.locator(".perspective-section-title", { hasText: "Tables" })).toBeVisible();
  await expect(page.locator(".perspective-grid").first()).toBeVisible();
  // 1 configured perspective + 4 tables, the perspective view not double-listed
  await expect(page.locator("a.perspective-card")).toHaveCount(7);
});

test("multi-table perspective aggregates rows with expandable list cells", async ({ page }) => {
  // Virginia Woolf row: 5 works aggregated, ordered by year (top row when
  // sorted by work_count desc; page 1 of name-sorted 1010 won't have her)
  await gotoRoute(page, "/en/author-overview/table?sort=work_count&sort_dir=desc");
  const row = page.locator("tbody tr", { hasText: "Virginia Woolf" });
  await expect(row.locator(".cell-list-item")).toHaveCount(3); // collapsed to limit
  await expect(row.locator(".cell-list-item").first()).toHaveText("Mrs Dalloway"); // earliest year first
  await row.locator(".cell-list-toggle").click(); // "+2 more"
  await expect(row.locator(".cell-list-item")).toHaveCount(5);
  // list column header is not sortable, number column is
  await expect(page.locator("thead th", { hasText: "Titles" })).not.toHaveAttribute("style", /cursor:pointer/);
  // id links into the authors detail page
  await row.locator("td a").first().click();
  await expect(page).toHaveURL(/\/en\/authors\/1\/table/);
});

test("range facet on aggregate column filters the perspective", async ({ page }) => {
  await gotoRoute(page, "/en/author-overview/table?work_count_min=3");
  await expect(page.locator(".faceted-count")).toContainText("of 214");
});

test("iiif extension: cells render badges linking to the iiif detail view", async ({ page }) => {
  await gotoRoute(page, "/en/works/table");
  // 3 sample rows carry a manifest; badge links into the registered detail view
  await expect(page.locator(".iiif-badge")).toHaveCount(3);
  await expect(page.locator(".iiif-badge").first()).toHaveAttribute("href", "#/en/works/1/iiif");
  // extension CSS was injected by the component module itself
  await expect(page.locator('link[href*="iiif-viewer/css/iiif-viewer.css"]')).toHaveCount(1);
});

test("iiif extension: detail page offers the iiif view toggle", async ({ page }) => {
  await gotoRoute(page, "/en/works/1/table");
  // registered view shows up in the view toggle like any builtin
  const toggle = page.locator("a, button", { hasText: "📖" }).first();
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page).toHaveURL(/\/en\/works\/1\/iiif/);
  // TIFY mounts in the extension's container (manifest itself loads from the
  // network; the mounted shell is enough to assert wiring without flakiness)
  await expect(page.locator(".iiif-detail-view .tify")).toHaveCount(1, { timeout: 10000 });
});

test("text-annotations extension: cells render badges linking to the annotated view", async ({ page }) => {
  await gotoRoute(page, "/en/text_pages/table");
  // all 3 sample pages carry a body; badge links into the registered detail view
  await expect(page.locator(".annotated-text-badge")).toHaveCount(3);
  await expect(page.locator(".annotated-text-badge").first())
    .toHaveAttribute("href", "#/en/text_pages/1/annotated-text");
  // extension CSS (own + vendored library) was injected by the component module itself
  await expect(page.locator('link[href*="text-annotations/css/text-annotations.css"]')).toHaveCount(1);
  await expect(page.locator('link[href*="annotated-text/index.css"]')).toHaveCount(1);
});

test("text-annotations extension: detail page renders the annotated text", async ({ page }) => {
  await gotoRoute(page, "/en/text_pages/1/table");
  // registered view shows up in the view toggle like any builtin
  const toggle = page.locator("button", { hasText: "🖍" }).first();
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page).toHaveURL(/\/en\/text_pages\/1\/annotated-text/);
  // the library renders the text plus an SVG highlight layer
  const view = page.locator(".annotated-text-detail-view");
  await expect(view).toContainText("To Sherlock Holmes she is always");
  await expect(view.locator("svg.ghent-cdh-annotation-svg")).toHaveCount(1);
  // 9 annotations on page 1, auto-detected from the annotations table's
  // FK + start/end columns; the type column drives the two-color legend
  await expect(view.locator("svg path[fill^='rgba']")).toHaveCount(9);
  await expect(view.locator(".annotated-text-legend-chip")).toHaveText(["person", "place"]);
  // the annotations table also appears as a plain reverse-FK related section
  await expect(page.locator(".detail-related", { hasText: "Annotations" })).toBeVisible();
});

test("point_map extension: geo tables get map views and the location facet", async ({ page }) => {
  await gotoRoute(page, "/en/authors/table");
  // registered map view appears in the toggle; the location facet mounts
  // its mini map in the sidebar
  const mapToggle = page.locator("button, a", { hasText: "🌍" }).first();
  await expect(mapToggle).toBeVisible();
  await expect(page.locator(".facet-sidebar canvas")).toHaveCount(1);
  // extension CSS was injected by the component module itself
  await expect(page.locator('link[href*="point_map/css/point-map.css"]')).toHaveCount(1);
  // full map view renders markers from the extension-served basemap
  await mapToggle.click();
  await expect(page).toHaveURL(/\/en\/authors\/map/);
  await expect(page.locator(".maplibregl-marker").first()).toBeVisible({ timeout: 10000 });
  // non-geo tables offer no map view
  await gotoRoute(page, "/en/works/table");
  await expect(page.locator("button, a", { hasText: "🌍" })).toHaveCount(0);
});

test("point_map extension: filtering updates markers without rebuilding the map", async ({ page }) => {
  await gotoRoute(page, "/en/authors/map");
  await expect(page.locator(".maplibregl-marker").first()).toBeVisible({ timeout: 10000 });
  const before = await page.locator("section .maplibregl-marker").count();
  // Tag the live canvas, then filter via an in-page hash change (a page.goto
  // would reload and trivially rebuild everything).
  await page.evaluate(() => {
    document.querySelector("section .maplibregl-canvas").dataset.probe = "kept";
    window.location.hash = "#/en/authors/map?birth_year_min=1800";
  });
  // Markers track the filter...
  await expect(async () => {
    expect(await page.locator("section .maplibregl-marker").count()).toBeLessThan(before);
  }).toPass({ timeout: 5000 });
  // ...but the map itself was never torn down: the same canvas is still live.
  await expect(page.locator('section .maplibregl-canvas[data-probe="kept"]')).toHaveCount(1);
});

test("geo-filter extension: bounds filter type + location facet", async ({ page }) => {
  // bbox URL param decodes through the registered "bounds" filter type
  await gotoRoute(page, "/en/authors/table?bbox=-10,35,30,60");
  await expect(page.locator(".facet-sidebar")).toContainText("360 Authors");
  // the location facet mini map mounts in the sidebar
  await expect(page.locator(".facet-sidebar canvas")).toHaveCount(1);
  // lat/lon columns are NOT offered as numeric range facets
  await expect(page.locator(".facet-sidebar")).not.toContainText("latitude");
  // clearing the filter restores the full count
  await page.locator(".facet-sidebar button", { hasText: "Clear all" }).click();
  await expect(page.locator(".facet-sidebar")).toContainText("1010 Authors");
});

// --- Fault tolerance: core must survive broken extensions -----------------
// Failures are injected via route interception so no repo file is broken.

// Core still works: table renders, search input present, a builtin range
// facet works. Shared by the fault-injection tests below.
async function expectCoreWorks(page) {
  await page.waitForSelector("#app header", { timeout: 10000 });
  await page.locator("header a", { hasText: "Pihka" }).click();
  await page.locator("a.perspective-card", { hasText: /Authors/ }).click();
  await expect(page.locator("tbody tr")).toHaveCount(25);
  await expect(page.locator(".facet-sidebar")).toContainText("1010 Authors");
  await expect(page.locator(".facet-sidebar")).toContainText("birth_year");
  // builtin range filter still queries correctly
  await page.goto("/#/en/authors/table?birth_year_min=1990");
  await expect(page.locator(".facet-sidebar")).toContainText("16 Authors");
}

test("fault: extension module that fails to load leaves core working", async ({ page }) => {
  await page.route("**/extensions/iiif-viewer/iiif-viewer-component.js", r => r.abort());
  await page.goto("/");
  await expectCoreWorks(page);
});

test("fault: extension module that throws on load leaves core working", async ({ page }) => {
  await page.route("**/extensions/iiif-viewer/iiif-viewer-component.js", r => r.fulfill({
    contentType: "text/javascript",
    body: 'throw new Error("deliberate test error");',
  }));
  const warnings = [];
  page.on("console", m => m.type() === "warning" && warnings.push(m.text()));
  await page.goto("/");
  await expectCoreWorks(page);
  expect(warnings.some(w => w.includes("failed to load component module"))).toBe(true);
});

test("fault: runtime throws in registered callbacks degrade to fallbacks", async ({ page }) => {
  // Replace geo-filter with a hostile module: every registered callback throws.
  await page.route("**/extensions/geo-filter/geo-filter-component.js", r => r.fulfill({
    contentType: "text/javascript",
    body: `
      import { registerFilterType } from "/core/js/utilities-data/filter-registry.js";
      import { registerFacetRenderer } from "/core/js/utilities-ui/facet-renderers.js";
      import { registerView } from "/core/js/utilities-ui/view-registry.js";
      registerFilterType("hostile", {
        reservedParams: ["bbox"],
        decode() { throw new Error("hostile decode"); },
        buildSql() { throw new Error("hostile sql"); },
        filterMeta() { throw new Error("hostile meta"); },
      });
      registerFacetRenderer("hostile-hidden", {
        availableFor() { throw new Error("hostile availableFor"); },
        component: () => "should never render",
      });
      registerFacetRenderer("hostile-facet", {
        component: () => { throw new Error("hostile facet render"); },
      });
      registerView({
        id: "hostileview", context: "list", icon: "☠",
        component: () => { throw new Error("hostile view render"); },
      });
    `,
  }));
  // bbox param now belongs to the throwing decode — must be inert, not fatal.
  await page.goto("/#/en/authors/table?bbox=-10,35,30,60");
  await page.waitForSelector("#app header", { timeout: 10000 });
  await expect(page.locator("tbody tr")).toHaveCount(25);
  await expect(page.locator(".facet-sidebar")).toContainText("1010 Authors");
  // throwing facet component shows the boundary fallback instead of crashing
  await expect(page.locator(".facet-sidebar .component-error")).toContainText("facet hostile-facet failed to render");
  // facet with throwing availableFor is simply not offered
  await expect(page.locator(".facet-sidebar")).not.toContainText("should never render");
  // the hostile view renders its fallback, then navigating back recovers
  await page.goto("/#/en/authors/hostileview");
  await expect(page.locator(".component-error", { hasText: "view list:hostileview" })).toBeVisible();
  await page.goto("/#/en/authors/table?birth_year_min=1990");
  await expect(page.locator(".facet-sidebar")).toContainText("16 Authors");
});

test("fault: hanging extension load times out and boot continues", async ({ page }) => {
  // Shrink the timeout via config, then never answer the module request.
  await page.route("**/app/config.json", async r => {
    const response = await r.fetch();
    const config = await response.json();
    config.componentLoadTimeoutMs = 500;
    await r.fulfill({ json: config });
  });
  await page.route("**/extensions/geo-filter/geo-filter-component.js", () => {
    /* never respond */
  });
  await page.goto("/");
  await expectCoreWorks(page);
});

// --- Site footer and menu pages -------------------------------------------

test("footer: app override renders credits, links, logos on every page", async ({ page }) => {
  await gotoRoute(page, "/en/authors/table");
  const footer = page.locator("#app > footer");
  await expect(footer).toBeVisible();
  // app/footer.json override wins over the core default
  await expect(footer).toContainText("Ghent Centre for Digital Humanities");
  await expect(footer.locator(".footer-logos img")).toHaveCount(2);
  await expect(footer.locator(".footer-links a")).toHaveAttribute("href", "mailto:ghentcdh@ugent.be");
  // provenance is intentionally not shown in the footer
  await expect(footer).not.toContainText("provenance");
  await expect(footer.locator(".footer-provenance")).toHaveCount(0);
  // footer is present on a detail page too
  await gotoRoute(page, "/en/authors/1/table");
  await expect(page.locator("#app > footer")).toContainText("Ghent Centre for Digital Humanities");
});

test("menu: header links navigate to static pages", async ({ page }) => {
  await gotoRoute(page, "/en/authors/table");
  const menu = page.locator(".app-menu-item a");
  await expect(menu.filter({ hasText: "About" })).toHaveAttribute("href", "#/en/page/about");
  await menu.filter({ hasText: "About" }).click();
  await expect(page).toHaveURL(/\/en\/page\/about/);
  await expect(page.locator(".static-page h1")).toContainText("About this dataset");
});

test("menu: all three entry forms — asset src, inline html, external link", async ({ page }) => {
  // Inject a menu exercising every content form, independent of what the
  // sample app happens to ship, so all code paths stay covered.
  await page.route("**/app/menu.json", r => r.fulfill({
    contentType: "application/json",
    body: JSON.stringify([
      { id: "about", label: { en: "About" }, src: { en: "app/pages/about.en.html" } },
      { id: "dataset", label: { en: "Dataset" }, html: { en: "<h1>The dataset</h1><p>Inline.</p>" } },
      { label: { en: "External" }, href: "https://example.com" },
    ]),
  }));
  await gotoRoute(page, "/en/authors/table");
  const menu = page.locator(".app-menu-item a");
  // external link opens in a new tab
  await expect(menu.filter({ hasText: "External" })).toHaveAttribute("target", "_blank");
  // asset-src page
  await menu.filter({ hasText: "About" }).click();
  await expect(page.locator(".static-page h1")).toContainText("About this dataset");
  // inline-html page — switching pages must not show stale content
  await menu.filter({ hasText: "Dataset" }).click();
  await expect(page.locator(".static-page h1")).toContainText("The dataset");
});

test("menu: language switch rewrites a page route and shows the other language", async ({ page }) => {
  await gotoRoute(page, "/en/page/about");
  await expect(page.locator(".static-page")).toContainText("demonstration deployment");
  await page.locator("header button", { hasText: /^(en|EN|🌐)/ }).first().click();
  await expect(page).toHaveURL(/\/nl\/page\/about/);
  await expect(page.locator(".static-page")).toContainText("demonstratie van Pihka");
});

test("page: unknown page id renders a not-found message", async ({ page }) => {
  await gotoRoute(page, "/en/page/does-not-exist");
  await expect(page.locator("main")).toContainText("Page not found");
  // core chrome still fine
  await expect(page.locator("#app > footer")).toBeVisible();
});

test("fault: broken footer.json + menu.json leave core working", async ({ page }) => {
  for (const p of ["**/app/footer.json", "**/core/assets/footer.json",
                   "**/app/menu.json", "**/core/assets/menu.json"]) {
    await page.route(p, r => r.fulfill({ contentType: "application/json", body: "{ not json" }));
  }
  await page.goto("/");
  await expectCoreWorks(page);
  // no footer, no menu links, but the app runs
  await expect(page.locator("#app > footer")).toHaveCount(0);
  await expect(page.locator(".app-menu-item")).toHaveCount(0);
});
