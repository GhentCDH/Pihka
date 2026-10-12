import { test, expect } from "@playwright/test";
import { startBrowserTestServer } from "../scripts/test-browser-server.js";

let server;
test.beforeAll(async () => { server = await startBrowserTestServer({ fixtureSql: "CREATE VIEW excerpt_view AS SELECT body FROM text_pages; CREATE VIEW complete_view AS SELECT body FROM text_pages;" }); });
test.afterAll(async () => { await server.close(); });

for (const mode of ["download", "http-vfs"]) {
    test(`${mode}: word previews link to full details and table fills workspace`, async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.route("**/app/config.json", async route => {
            const response = await route.fetch();
            const config = await response.json();
            config.tables.text_pages.columns.body = { type: "text", maxWords: 3 };
            await route.fulfill({ json: config });
        });
        await page.goto(`${server.origin}/${mode}/#/nl/text_pages/table`);
        const more = page.getByRole("link", { name: "Lees meer", exact: true });
        await expect(more).toBeVisible();
        await expect(page.locator("section tbody")).toContainText("Virginia Woolf wrote…");
        await expect(page.locator("section tbody")).not.toContainText("Mrs Dalloway.");
        const layout = await page.evaluate(() => {
            const table = document.querySelector(".table-scroll");
            const footer = document.querySelector(".site-footer");
            return { width: table.clientWidth, scroll: table.scrollWidth,
                bottom: table.getBoundingClientRect().bottom, footer: footer.getBoundingClientRect().top,
                height: window.innerHeight };
        });
        expect(layout.scroll).toBeLessThanOrEqual(layout.width + 1);
        expect(layout.height - layout.bottom).toBeLessThanOrEqual(10);
        expect(layout.footer).toBeGreaterThanOrEqual(layout.height);
        await page.locator(".site-footer").scrollIntoViewIfNeeded();
        await expect(page.locator(".site-footer")).toBeInViewport();
        await more.click();
        await expect(page.locator(".detail-view")).toContainText("Virginia Woolf wrote Mrs Dalloway.");
        await expect(page.getByRole("link", { name: "Lees meer", exact: true })).toHaveCount(0);
        await page.goto(`${server.origin}/${mode}/#/nl/text_pages/cards`);
        await expect(page.getByRole("link", { name: "Lees meer", exact: true })).toBeVisible();
    });
}

for (const mode of ["download", "http-vfs"]) {
    test(`${mode}: exact word limits and records without detail links`, async ({ page }) => {
        await page.route("**/app/config.json", async route => {
            const config = await (await route.fetch()).json();
            config.perspectives = [
                { id: "excerpt", table: "excerpt_view", query: "SELECT body FROM text_pages" },
                { id: "complete", table: "complete_view", query: "SELECT body FROM text_pages" },
            ];
            config.tables.excerpt_view = { columns: { body: { type: "text", maxWords: 3 } } };
            config.tables.complete_view = { columns: { body: { type: "text", maxWords: 5 } } };
            await route.fulfill({ json: config });
        });
        await page.goto(`${server.origin}/${mode}/#/en/excerpt/table`);
        const more = page.getByRole("button", { name: "Read more", exact: true });
        await expect(more).toBeVisible();
        await more.click();
        await expect(page.locator("section tbody")).toContainText("Virginia Woolf wrote Mrs Dalloway.");
        await page.getByRole("button", { name: "Show less", exact: true }).click();
        await expect(page.locator("section tbody")).not.toContainText("Mrs Dalloway.");
        await page.goto(`${server.origin}/${mode}/#/en/complete/table`);
        await expect(page.locator("section tbody")).toContainText("Virginia Woolf wrote Mrs Dalloway.");
        await expect(page.locator(".cell-text-toggle")).toHaveCount(0);
    });
}
