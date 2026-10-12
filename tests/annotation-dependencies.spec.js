import { test, expect } from "@playwright/test";
import { startBrowserTestServer } from "../scripts/test-browser-server.js";

let server;
test.beforeAll(async () => { server = await startBrowserTestServer(); });
test.afterAll(async () => { await server.close(); });

for (const mode of ["download", "http-vfs"]) {
    test(`${mode}: annotation clicks and repeated view mounts survive dependency updates`, async ({ page }) => {
        const errors = [];
        page.on("pageerror", error => errors.push(error.message));
        await page.goto(`${server.origin}/${mode}/#/en/text_pages/1/annotated-text`);
        const svg = page.locator("svg.ghent-cdh-annotation-svg");
        const highlight = svg.locator("path[fill^='rgba']");
        await expect(svg).toHaveCount(1);
        await expect(highlight).toHaveCount(1);
        await highlight.click();
        await expect(page).toHaveURL(/#\/en\/annotations\/1\/table$/);
        await expect(page.getByRole("cell", { name: "Virginia Woolf", exact: true })).toBeVisible();
        await expect(svg).toHaveCount(0);

        await page.goBack();
        await expect(page).toHaveURL(/#\/en\/text_pages\/1\/annotated-text$/);
        await expect(svg).toHaveCount(1);
        await expect(highlight).toHaveCount(1);

        for (let i = 0; i < 2; i++) {
            await page.locator(".view-toggles button", { hasText: "table" }).click();
            await expect(page).toHaveURL(/text_pages\/1\/table$/);
            await expect(svg).toHaveCount(0);
            await page.locator(".view-toggles button", { hasText: "🖍" }).click();
            await expect(svg).toHaveCount(1);
            await expect(highlight).toHaveCount(1);
            await expect(page.locator(".annotated-text-detail-view")).toContainText("Virginia Woolf wrote Mrs Dalloway.");
        }
        await highlight.click();
        await expect(page).toHaveURL(/#\/en\/annotations\/1\/table$/);
        expect(errors).toEqual([]);
    });
}
