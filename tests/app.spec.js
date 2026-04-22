import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Pihka/i);
});

test("categories/1 contains Novel", async ({ page }) => {
  await page.goto("/categories/1");
  await expect(page.locator("body")).toContainText("Novel");
});

test("authors/1 contains Virginia", async ({ page }) => {
  await page.goto("/authors/1");
  await expect(page.locator("body")).toContainText("Virginia");
});

test("works view shows sidebar with facet filters", async ({ page }) => {
  await page.goto("/en/works/table");
  const sidebar = page.locator("aside.facet-sidebar");
  await expect(sidebar).toBeVisible();
  await expect(sidebar).toContainText("Filters");
  // Year range slider in sidebar
  await expect(sidebar.locator("input[type='range']")).toHaveCount(2);
  // Category and Author dropdown facets
  await expect(sidebar.locator(".facet-dropdown")).not.toHaveCount(0);
});

test("year range filter narrows works rows", async ({ page }) => {
  await page.goto("/en/works/table");
  const content = page.locator(".faceted-content");
  await expect(content).toBeVisible();
  await expect(content.locator("tbody tr")).toHaveCount(25);
  // Drag min range slider to exclude some rows
  const sidebar = page.locator("aside.facet-sidebar");
  const minSlider = sidebar.locator("input[type='range']").first();
  await minSlider.fill("1950");
  // Should show fewer rows
  const rowCount = await content.locator("tbody tr").count();
  expect(rowCount).toBeLessThan(25);
});

test("category dropdown facet filters works rows", async ({ page }) => {
  await page.goto("/en/works/table");
  const content = page.locator(".faceted-content");
  await expect(content).toContainText("of 25");
  // Open category dropdown and click Novel checkbox
  const sidebar = page.locator("aside.facet-sidebar");
  await sidebar.locator(".facet-dropdown-trigger").first().click();
  await sidebar.locator(".facet-option", { hasText: "Novel" }).click();
  // Should filter to 15 novels
  await expect(content).toContainText("of 15");
});

test("authors view has birth_year range filter in sidebar", async ({ page }) => {
  await page.goto("/en/authors/table");
  const sidebar = page.locator("aside.facet-sidebar");
  await expect(sidebar).toBeVisible();
  // birth_year configured as range facet = 2 range inputs (min + max)
  await expect(sidebar.locator("input[type='range']")).toHaveCount(2);
  await expect(sidebar).toContainText("Birth year");
});

test("categories view has no filter controls", async ({ page }) => {
  await page.goto("/en/categories/table");
  // Categories has no FK columns and no numeric columns → no sidebar or empty sidebar
  const sidebar = page.locator("aside.facet-sidebar");
  await expect(sidebar.locator("input[type='range']")).toHaveCount(0);
  await expect(sidebar.locator(".facet-dropdown")).toHaveCount(0);
});

test("works table shows pagination with page size control", async ({ page }) => {
  await page.goto("/en/works/table?pageSize=3");
  const content = page.locator(".faceted-content");
  await expect(content).toBeVisible();
  // Pagination visible
  const nav = content.locator("nav[aria-label='Pagination']");
  await expect(nav).toBeVisible();
  // Only 3 rows visible
  await expect(content.locator("section tbody tr")).toHaveCount(3);
});

test("clicking next page advances to page 2", async ({ page }) => {
  await page.goto("/en/works/table?pageSize=3");
  const content = page.locator(".faceted-content");
  await expect(content).toContainText("Showing 1 to 3 of 25");
  // Click the next (›) button
  await content.locator("nav[aria-label='Pagination'] button", { hasText: "›" }).click();
  await expect(content).toContainText("Showing 4 to 6 of 25");
});

test("filtering resets page to 1", async ({ page }) => {
  await page.goto("/en/works/table?pageSize=3");
  const content = page.locator(".faceted-content");
  // Go to page 2
  await content.locator("nav[aria-label='Pagination'] button", { hasText: "›" }).click();
  await expect(content).toContainText("Showing 4 to 6");
  // Apply a category filter via sidebar dropdown
  const sidebar = page.locator("aside.facet-sidebar");
  await sidebar.locator(".facet-dropdown-trigger").first().click();
  await sidebar.locator(".facet-option", { hasText: "Novel" }).click();
  // Should reset to page 1
  await expect(content).toContainText("Showing 1 to");
});

test("URL query params are bookmarkable", async ({ page }) => {
  await page.goto("/en/works/table?category_id=1&sort=year&sort_dir=desc");
  const content = page.locator(".faceted-content");
  await expect(content).toBeVisible();
  // Should show only novels (15), sorted by year descending
  await expect(content).toContainText("of 15");
  // First row should be the most recent novel
  const firstYear = await content.locator("section tbody tr").first().locator("td").nth(4).textContent();
  expect(parseInt(firstYear)).toBeGreaterThan(1930);
});

test("view toggle switches between table and cards", async ({ page }) => {
  await page.goto("/en/works/table?category_id=1");
  // Click the cards toggle
  await page.locator(".view-toggles button", { hasText: "cards" }).click();
  // URL should change to cards view
  await expect(page).toHaveURL(/\/en\/works\/cards/);
  // Filter should be preserved
  await expect(page).toHaveURL(/category_id=1/);
});

test("home page shows perspective navigation", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("nav[aria-label='Perspectives']")).toBeVisible();
  await expect(page.locator("a[href='/en/works/table']")).toBeVisible();
  await expect(page.locator("a[href='/en/authors/table']")).toBeVisible();
});
