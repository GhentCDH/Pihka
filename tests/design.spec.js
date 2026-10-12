import { test, expect } from "@playwright/test";
import { startBrowserTestServer } from "../scripts/test-browser-server.js";

let server;
test.beforeAll(async () => { server = await startBrowserTestServer(); });
test.afterAll(async () => { await server.close(); });

for (const mode of ["download", "http-vfs"]) {
    test(`${mode}: mobile filters leave the viewport without covering results`, async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(`${server.origin}/${mode}/#/en/works/table`);
        await expect(page.locator("section tbody tr")).toHaveCount(25);
        const sidebar = page.locator(".facet-sidebar");
        const initial = await sidebar.boundingBox();
        expect(initial.height).toBeGreaterThan(0);
        await page.evaluate(y => window.scrollTo(0, y), initial.y + initial.height + 20);
        await expect.poll(async () => {
            const box = await sidebar.boundingBox();
            return box.y + box.height;
        }).toBeLessThanOrEqual(0);
        const dimensions = await page.evaluate(() => ({ width: window.innerWidth, document: document.documentElement.scrollWidth }));
        expect(dimensions.document).toBeLessThanOrEqual(dimensions.width);
        const row = page.locator("section tbody tr").nth(2);
        await row.scrollIntoViewIfNeeded();
        await expect(row).toBeInViewport();
        await expect(sidebar).not.toBeInViewport();
    });

    test(`${mode}: desktop sticky filters remain opaque and within the results layout`, async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto(`${server.origin}/${mode}/#/en/works/cards`);
        await expect(page.locator("section article")).toHaveCount(25);
        const sidebar = page.locator(".facet-sidebar");
        const original = await sidebar.boundingBox();
        await page.evaluate(() => window.scrollTo(0, 250));
        const sticky = await sidebar.boundingBox();
        expect(sticky.y).toBeGreaterThanOrEqual(0);
        expect(sticky.y).toBeLessThan(original.y);
        for (const theme of ["light", "dark"]) {
            await page.locator("html").evaluate((element, value) => element.setAttribute("data-theme", value), theme);
            const background = await sidebar.evaluate(element => window.getComputedStyle(element).backgroundColor);
            expect(background).not.toBe("transparent");
            expect(background).not.toMatch(/rgba\([^)]*,\s*0\)/);
        }
        await sidebar.locator(".facet-dropdown-trigger").first().click();
        await expect(sidebar.locator(".facet-option").first()).toBeVisible();
        await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
        const bottom = await sidebar.boundingBox();
        const footer = await page.locator("#app > footer").boundingBox();
        expect(bottom.y + bottom.height).toBeLessThanOrEqual(footer.y);
    });

    test(`${mode}: shared branding and localized provenance stay in their intended places`, async ({ page }) => {
        await page.goto(`${server.origin}/${mode}/#/en/works/table`);
        await expect(page.locator("section tbody tr")).toHaveCount(25);
        const headerBrand = page.locator("#app > header").getByRole("img", { name: "Pihka", exact: true });
        const footer = page.locator("#app > footer");
        const footerBrand = footer.getByRole("img", { name: "Pihka", exact: true });
        await expect(headerBrand).toBeVisible();
        await expect(footerBrand.locator("use")).toHaveAttribute("href", await headerBrand.locator("use").getAttribute("href"));
        for (const theme of ["light", "dark"]) {
            await page.locator("html").evaluate((element, value) => element.setAttribute("data-theme", value), theme);
            // Pico links animate color changes; compare after the transition.
            await expect.poll(() => page.evaluate(() =>
                window.getComputedStyle(document.querySelector("header .brand-logo")).color ===
                window.getComputedStyle(document.querySelector("section tbody a")).color,
            )).toBe(true);
        }
        const headerSize = await headerBrand.boundingBox();
        const footerSize = await footerBrand.boundingBox();
        expect(footerSize.width).toBeGreaterThan(headerSize.width);
        expect(headerSize.width).toBeGreaterThan(headerSize.height);
        await expect(footer.locator(".footer-logos img")).toHaveCount(1);
        await expect(footer).not.toContainText("Gutenberg");
        await expect(footer.locator('a[href*="gutenberg"]')).toHaveCount(0);
        await headerBrand.click();
        await expect(page.locator(".facet-sidebar")).toHaveCount(0);
        for (const lang of ["en", "nl"]) {
            await page.goto(`${server.origin}/${mode}/#/${lang}/page/about`);
            await expect(page.locator('.static-page a[href*="gutenberg.org"]')).toBeVisible();
            await expect(page.locator("#app > footer")).not.toContainText("Gutenberg");
        }
    });
}
