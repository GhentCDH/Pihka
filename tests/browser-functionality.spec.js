import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { startBrowserTestServer } from "../scripts/test-browser-server.js";

let server;
test.beforeAll(async () => { server = await startBrowserTestServer(); });
test.afterAll(async () => { await server.close(); });

for (const mode of ["download", "http-vfs"]) {
    test(`${mode}: local UI search, filters, paging, links and export`, async ({ page }) => {
        await page.goto(`${server.origin}/${mode}/#/en/works/table`);
        const rows = page.locator("section tbody tr");
        await expect(rows).toHaveCount(25);
        await page.getByRole("columnheader", { name: "year", exact: false }).click();
        await expect(page).toHaveURL(/sort=year/);
        await page.locator("nav[aria-label='Pagination'] button", { hasText: "›" }).click();
        await expect(rows).toHaveCount(10);
        await expect(page).toHaveURL(/page=2/);
        await page.locator(".facet-sidebar input[type='search']").first().fill("Lighthouse");
        await expect(rows).toHaveCount(1);
        await expect(rows).toContainText("To the Lighthouse");
        await page.locator(".facet-sidebar input[type='search']").first().fill("");
        await expect(rows).toHaveCount(25);
        await page.locator(".facet-dropdown-trigger").nth(1).click();
        await page.locator(".facet-option", { hasText: "Novel" }).click();
        await expect(rows).toHaveCount(2);
        await expect(page).toHaveURL(/category_id=1/);
        await page.locator("input[type='range']").first().fill("1926");
        await expect(rows).toHaveCount(1);
        await expect(rows).toContainText("To the Lighthouse");
        await page.locator(".view-toggles button", { hasText: "cards" }).click();
        await expect(page).toHaveURL(/works\/cards/);
        await expect(page.locator("section")).toHaveCount(1);
        await expect(page.locator("section")).toContainText("To the Lighthouse");
        await page.reload();
        await expect(page).toHaveURL(/category_id=1/);
        await expect(page.locator("section")).toHaveCount(1);
        await expect(page.locator("section")).toContainText("To the Lighthouse");
        await page.locator(".view-toggles button", { hasText: "export" }).click();
        const downloadPromise = page.waitForEvent("download");
        await page.getByRole("button", { name: "works-selection.csv", exact: false }).click();
        const download = await downloadPromise;
        const csv = readFileSync(await download.path(), "utf8");
        expect(csv).toContain("To the Lighthouse"); expect(csv).not.toContain("Mrs Dalloway");
        await page.goto(`${server.origin}/${mode}/#/en/works/1/table`);
        await page.locator('a[href="#/authors/1"]').first().click();
        await expect(page.locator(".detail-related")).toContainText("Mrs Dalloway");
        await page.goBack();
        await expect(page).toHaveURL(/works\/1\/table/);
        await page.locator('a[href="#/en/page/about"]').first().click();
        await expect(page.locator(".static-page")).toBeVisible();
        await page.getByRole("button", { name: "Theme: auto" }).click();
        await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
        await page.getByRole("button", { name: "Language: en" }).click();
        await expect(page).toHaveURL(/#\/nl\/page\/about/);
        await page.reload();
        await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
        await expect(page).toHaveURL(/#\/nl\/page\/about/);
    });

    test(`${mode}: local IIIF, annotations and map plugins`, async ({ page }) => {
        const external = [];
        await page.route("**/*", route => {
            const url = route.request().url();
            if (/^https?:/.test(url) && !url.startsWith(server.origin + "/")) { external.push(url); return route.abort(); }
            return route.continue();
        });
        await page.goto(`${server.origin}/${mode}/#/en/works/table`);
        await page.locator(".iiif-badge").click();
        await expect(page.locator(".iiif-detail-view .tify")).toHaveCount(1);
        await expect.poll(() => server.requests.some(r => r.path === "/fixture/page.png" && r.status === 200)).toBe(true);
        await page.goto(`${server.origin}/${mode}/#/en/text_pages/table`);
        await page.locator(".annotated-text-badge").click();
        await expect(page.locator(".annotated-text-detail-view")).toContainText("Virginia Woolf wrote Mrs Dalloway.");
        await expect(page.locator("svg.ghent-cdh-annotation-svg path[fill^='rgba']")).toHaveCount(1);
        await page.goto(`${server.origin}/${mode}/#/en/authors/table`);
        await page.locator(".view-toggles button", { hasText: "⌖" }).click();
        await expect(page.locator("section .maplibregl-marker")).toHaveCount(2);
        await page.locator("section .maplibregl-marker").first().click();
        await expect(page.locator(".maplibregl-popup-content")).toContainText("Virginia Woolf");
        expect(external).toEqual([]);
    });
}
