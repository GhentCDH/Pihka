import { test, expect } from "@playwright/test";
import { startBrowserTestServer } from "../scripts/test-browser-server.js";

let server;
test.beforeAll(async () => { server = await startBrowserTestServer(); });
test.afterAll(async () => { await server.close(); });

for (const mode of ["download", "http-vfs"]) {
    test(`${mode}: configured clustering renders local labels and preserves popup registry`, async ({ page }) => {
        const errors = [];
        page.on("pageerror", error => errors.push(error.message));
        await page.route("**/app/config.json", async route => {
            const response = await route.fetch();
            const config = await response.json();
            config.tables.authors = { ...config.tables.authors, options: { point_map: { clustering: true } } };
            await route.fulfill({ json: config });
        });
        // Expose the actual map for source/layer assertions without adding a
        // production debug API or replacing its vendored renderer.
        await page.route("**/point_map/js/map-view.js", async route => {
            const response = await route.fetch();
            await route.fulfill({ response, body: (await response.text()).replace(
                "mapRef.current = map;", "mapRef.current = map; globalThis.testClusterMap = map;",
            ) });
        });
        await page.goto(`${server.origin}/${mode}/#/en/authors/map`);
        await expect.poll(() => page.evaluate(() => !!globalThis.testClusterMap?.getSource("pm-points"))).toBe(true);
        await expect(page.locator("section .maplibregl-marker")).toHaveCount(0);
        await page.evaluate(() => globalThis.testClusterMap.jumpTo({ center: [-3, 53], zoom: 0 }));
        await expect.poll(() => page.evaluate(() => globalThis.testClusterMap.queryRenderedFeatures({ layers: ["pm-clusters"] }).length)).toBeGreaterThan(0);
        await expect.poll(() => server.requests.some(request => request.path.includes("/assets/glyphs/") && request.status === 200)).toBe(true);
        await page.evaluate(async () => {
            const map = globalThis.testClusterMap;
            const cluster = map.queryRenderedFeatures({ layers: ["pm-clusters"] })[0];
            const [point] = await map.getSource("pm-points").getClusterLeaves(cluster.properties.cluster_id, 1, 0);
            map.jumpTo({ center: point.geometry.coordinates, zoom: 15, bearing: 45, pitch: 40 });
        });
        await expect.poll(() => page.evaluate(() => globalThis.testClusterMap.querySourceFeatures("pm-points").filter(feature => !feature.properties.cluster).length)).toBeGreaterThan(0);
        const position = await page.evaluate(async () => {
            const map = globalThis.testClusterMap;
            const point = map.querySourceFeatures("pm-points").find(feature => !feature.properties.cluster);
            map.jumpTo({ center: point.geometry.coordinates, zoom: 15, bearing: 45, pitch: 40 });
            await new Promise(resolve => map.once("idle", resolve));
            const bounds = map.getCanvas().getBoundingClientRect();
            return { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 };
        });
        await expect.poll(() => page.evaluate(() => globalThis.testClusterMap.queryRenderedFeatures({ layers: ["pm-unclustered"] }).length)).toBeGreaterThan(0);
        await page.mouse.click(position.x, position.y - 12);
        await expect(page.locator(".maplibregl-popup-content table")).toBeVisible();
        await expect(page.locator(".maplibregl-popup-content")).toContainText("View details");
        expect(errors).toEqual([]);
    });
}

test("automatic clustering uses the 1000-point threshold and explicit modes win", async ({ page }) => {
    await page.goto(`${server.origin}/download/`);
    const modes = await page.evaluate(async () => {
        const { default: MapList } = await import("/download/extensions/point_map/js/data-view-list-map.js");
        const columns = [{ name: "latitude", type: "REAL" }, { name: "longitude", type: "REAL" }];
        return [[undefined, 1000], [undefined, 1001], [false, 1001], [true, 1]].map(([clustering, count]) => {
            const rows = Array.from({ length: count }, () => ({ latitude: 51, longitude: 3 }));
            return MapList({ name: "items", columns, rows, options: { point_map: { clustering } } }).props.children.props.cluster;
        });
    });
    expect(modes).toEqual([false, true, false, true]);
});
