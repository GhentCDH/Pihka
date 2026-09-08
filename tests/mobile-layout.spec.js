import { test, expect } from "@playwright/test";
import { DatabaseSync } from "node:sqlite";
import { createServer } from "node:http";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

async function expectSettledLayout(page) {
    await expect(page.locator('main [aria-busy="true"]')).toHaveCount(0);
    await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([...document.querySelectorAll("main img")].map(img => img.decode().catch(() => {})));
        await new Promise(resolve => window.requestAnimationFrame(() => window.requestAnimationFrame(resolve)));
    });
    // Check repeatedly, not just during the transient empty/loading render.
    for (let frame = 0; frame < 5; frame++) {
        const widths = await page.evaluate(async () => {
            await new Promise(window.requestAnimationFrame);
            return { document: document.documentElement.scrollWidth, viewport: document.documentElement.clientWidth };
        });
        expect(widths.document).toBeLessThanOrEqual(widths.viewport + 1);
    }
}

test("mobile: sample detail and related tables stay within the viewport", async ({ page }) => {
    await page.goto("/#/en/authors/1/table");
    await expect(page.locator(".detail-related tbody").first()).toContainText("Mrs Dalloway");
    await expectSettledLayout(page);
    const related = page.locator(".detail-related .table-scroll").first();
    expect(await related.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
    await related.evaluate(el => { el.scrollLeft = el.scrollWidth; });
    expect(await related.evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
    await page.goto("/#/en/works/1/table");
    await expect(page.locator(".detail-view > div > table")).toContainText("Mrs Dalloway");
    await expectSettledLayout(page);
});

test("mobile: minimal HTTP detail keeps a wide table locally scrollable", async ({ page }) => {
    const directory = mkdtempSync(join(tmpdir(), "pihka-mobile-"));
    const path = join(directory, "fixture.db");
    const db = new DatabaseSync(path);
    db.exec(`CREATE TABLE records(id INTEGER PRIMARY KEY, exceptionally_long_unbroken_field_name_that_exceeds_a_mobile_viewport TEXT);
        INSERT INTO records VALUES(1, 'A detail value');`);
    db.close();
    const bytes = readFileSync(path);
    const server = createServer((req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Range, If-Match");
        res.setHeader("Access-Control-Expose-Headers", "Content-Length, Content-Range, Accept-Ranges, ETag");
        res.setHeader("ETag", '"mobile-fixture"');
        res.setHeader("Accept-Ranges", "bytes");
        if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }
        if (req.method === "HEAD") { res.setHeader("Content-Length", bytes.length); res.end(); return; }
        const range = /^bytes=(\d+)-(\d+)$/.exec(req.headers.range || "");
        if (!range) { res.end(bytes); return; }
        const start = Number(range[1]), end = Math.min(Number(range[2]), bytes.length - 1);
        res.writeHead(206, { "Content-Range": `bytes ${start}-${end}/${bytes.length}` });
        res.end(bytes.subarray(start, end + 1));
    });
    try {
        await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
        await page.route("**/app/config.json", route => route.fulfill({ json: {
            database: `http://127.0.0.1:${server.address().port}/fixture.db`,
            components: ["extensions/http-vfs/http-vfs-component.js"],
            datasource: { type: "http-vfs" },
        } }));
        await page.goto("/#/en/records/1/table");
        const table = page.locator(".detail-view > div > table");
        await expect(table).toContainText("A detail value");
        await expectSettledLayout(page);
        const wrapper = table.locator("..");
        expect(await wrapper.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
        await wrapper.evaluate(el => { el.scrollLeft = el.scrollWidth; });
        expect(await wrapper.evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
    } finally {
        await page.close();
        await new Promise(resolve => server.close(resolve));
        rmSync(directory, { recursive: true, force: true });
    }
});
