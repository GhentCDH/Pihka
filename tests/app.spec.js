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
  await gotoRoute(page, "/en/categories/1/table");
  const related = page.locator(".detail-related");
  await expect(related.locator("h3")).toContainText(/works/i);
  await expect(related.locator("tbody tr")).toHaveCount(10);
  await expect(related.locator(".faceted-count")).toContainText("Showing 1 to 10 of 1733");

  // Page through with the shared pagination controls
  const firstTitle = await related.locator("tbody tr td:nth-child(2)").first().textContent();
  await related.locator("nav[aria-label='Pagination'] button", { hasText: "›" }).click();
  await expect(related.locator(".faceted-count")).toContainText("Showing 11 to 20 of 1733");
  const secondPageTitle = await related.locator("tbody tr td:nth-child(2)").first().textContent();
  expect(secondPageTitle).not.toBe(firstTitle);

  // View-all link jumps to the filtered list view
  await related.locator("a", { hasText: "View all" }).click();
  await expect(page).toHaveURL(/works\/table\?category_id=1/);
  await expect(page.locator(".faceted-count")).toContainText("of 1733");
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

test("works view shows sidebar with facet filters", async ({ page }) => {
  await gotoRoute(page, "/en/works/table");
  const sidebar = page.locator("aside.facet-sidebar");
  await expect(sidebar).toBeVisible();
  await expect(sidebar).toContainText("Filters");
  // Year range slider in sidebar
  await expect(sidebar.locator("input[type='range']")).toHaveCount(2);
  // Category and Author dropdown facets
  await expect(sidebar.locator(".facet-dropdown")).not.toHaveCount(0);
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

test("category dropdown facet filters works rows", async ({ page }) => {
  await gotoRoute(page, "/en/works/table");
  const content = page.locator(".faceted-content");
  await expect(content).toContainText("of 1743");
  // Open category dropdown and click Short Story checkbox
  const sidebar = page.locator("aside.facet-sidebar");
  await sidebar.locator(".facet-dropdown-trigger").nth(1).click();
  await sidebar.locator(".facet-option", { hasText: "Short Story" }).click();
  // Should filter to 4 short stories
  await expect(content).toContainText("of 4");
});

test("authors view has birth_year range filter in sidebar", async ({ page }) => {
  await gotoRoute(page, "/en/authors/table");
  const sidebar = page.locator("aside.facet-sidebar");
  await expect(sidebar).toBeVisible();
  // birth_year configured as range facet
  await expect(sidebar.locator("input[type='range']")).not.toHaveCount(0);
  await expect(sidebar.locator(".range-label", { hasText: "birth_year" })).toBeVisible();
});

test("categories view has no filter controls", async ({ page }) => {
  await gotoRoute(page, "/en/categories/table");
  // Categories has no FK columns and no numeric columns → no sidebar or empty sidebar
  const sidebar = page.locator("aside.facet-sidebar");
  await expect(sidebar.locator("input[type='range']")).toHaveCount(0);
  await expect(sidebar.locator(".facet-dropdown")).toHaveCount(0);
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
  // Apply a category filter via sidebar dropdown
  const sidebar = page.locator("aside.facet-sidebar");
  await sidebar.locator(".facet-dropdown-trigger").nth(1).click();
  await sidebar.locator(".facet-option", { hasText: "Short Story" }).click();
  // Should reset to page 1
  await expect(content).toContainText("Showing 1 to");
});

test("URL query params are bookmarkable", async ({ page }) => {
  await gotoRoute(page, "/en/works/table?category_id=1&sort=year&sort_dir=desc");
  const content = page.locator(".faceted-content");
  await expect(content).toBeVisible();
  // Should show only novels (1733), sorted by year descending
  await expect(content).toContainText("of 1733");
  // First row should be the most recent novel
  const firstYear = await content.locator("section tbody tr").first().locator("td").nth(4).textContent();
  expect(parseInt(firstYear)).toBeGreaterThan(1930);
});

test("view toggle switches between table and cards", async ({ page }) => {
  await gotoRoute(page, "/en/works/table?category_id=1");
  // Click the cards toggle
  await page.locator(".view-toggles button", { hasText: "cards" }).click();
  // URL should change to cards view
  await expect(page).toHaveURL(/\/en\/works\/cards/);
  // Filter should be preserved
  await expect(page).toHaveURL(/category_id=1/);
});

test("home page shows perspectives and tables sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".perspective-section-title", { hasText: "Perspectives" })).toBeVisible();
  await expect(page.locator(".perspective-section-title", { hasText: "Tables" })).toBeVisible();
  await expect(page.locator(".perspective-grid").first()).toBeVisible();
  // 1 configured perspective + 3 tables, the perspective view not double-listed
  await expect(page.locator("a.perspective-card")).toHaveCount(4);
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
