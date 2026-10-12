import { test, expect } from "@playwright/test";
import { URL } from "node:url";
import { startBrowserTestServer } from "../scripts/test-browser-server.js";

let server;
test.beforeAll(async () => { server = await startBrowserTestServer(); });
test.afterAll(async () => { await server.close(); });

for (const mode of ["download", "http-vfs"]) {
    test(`${mode}: maps share a local ESM runtime and load their worker`, async ({ page }) => {
        const failures = [];
        const modules = new Set();
        page.on("pageerror", error => failures.push(error.message));
        page.on("request", request => {
            if (request.url().endsWith("/maplibre-gl.mjs")) modules.add(request.url());
        });
        const requestStart = server.requests.length;
        await page.goto(`${server.origin}/${mode}/#/en/authors/map`);
        await expect(page.locator("section .maplibregl-marker")).toHaveCount(2);
        // MapLibre adds a version query to its worker URL. The fixture server
        // records the pathname and actual response independently of that query.
        await expect.poll(() => server.requests.slice(requestStart).some(request =>
            request.path.startsWith(`/${mode}/`) &&
            request.path.endsWith("/maplibre-gl-worker.mjs") &&
            request.status === 200 && request.bytes > 0)).toBe(true);
        await expect.poll(() => page.workers().some(worker =>
            new URL(worker.url()).pathname.endsWith("/maplibre-gl-worker.mjs"))).toBe(true);
        await expect.poll(() => server.requests.slice(requestStart).some(request =>
            request.path.endsWith("/assets/world.pmtiles") &&
            request.status === 206 && request.bytes > 0)).toBe(true);
        await expect(page.locator(".map-bounds-canvas canvas")).toBeVisible();
        expect(modules.size).toBe(1);
        const runtimesMatch = await page.evaluate(async () => {
            const base = window.location.pathname;
            const [pointMap, geoFilter] = await Promise.all([
                import(`${base}extensions/point_map/js/maplibre-shim.js`),
                import(`${base}extensions/geo-filter/js/maplibre-shim.js`),
            ]);
            return (await pointMap.loadMaplibre()) === (await geoFilter.loadMaplibre());
        });
        expect(runtimesMatch).toBe(true);
        const marker = page.locator("section .maplibregl-marker").first();
        await expect(marker).toHaveAttribute("role", "button");
        await expect(marker).toHaveAttribute("tabindex", "0");
        await marker.focus();
        await marker.press("Enter");
        await expect(page.locator(".maplibregl-popup-content")).toContainText("Virginia Woolf");
        await page.locator(".maplibregl-popup-close-button").click();
        await marker.focus();
        await marker.press("Space");
        await expect(page.locator(".maplibregl-popup-content")).toContainText("Virginia Woolf");
        await page.locator(".view-toggles button", { hasText: "table" }).click();
        await expect(page.locator("section .maplibregl-map")).toHaveCount(0);
        await page.locator(".view-toggles button", { hasText: "⌖" }).click();
        await expect(page.locator("section .maplibregl-marker")).toHaveCount(2);
        expect(failures).toEqual([]);
    });
}
