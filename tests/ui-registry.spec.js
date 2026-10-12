import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { URL } from 'node:url';

const config = JSON.parse(readFileSync(new URL('../pihka/app/config.json', import.meta.url), 'utf8'));
async function configure(page, plugins = []) {
    await page.route('**/app/config.json', route => route.fulfill({ json: {
        ...config, datasource: { type: 'download' },
        uiPlugins: [...(config.uiPlugins || []), ...plugins],
    } }));
}

test('registered list table override reaches main, search and related tables', async ({ page }) => {
    await configure(page, ['app/override-test.js']);
    await page.route('**/app/override-test.js', route => route.fulfill({ contentType: 'text/javascript', body: `
        import { h } from 'preact';
        export function register(api) {
            api.registerComponent({kind:'view',id:'table',context:'list',component:props=>h('div',{
                'data-overridden-table':props.presentation || 'page',
                'data-rows':props.rows?.length || 0,
            },'Registered table replacement')});
        }
    ` }));
    await page.goto('/#/en/works/table');
    await expect(page.locator('[data-overridden-table="page"]')).toBeVisible();
    await expect(page.locator('[data-overridden-table="page"]')).not.toHaveAttribute('data-rows', '0');
    await page.goto('/#/en/search?q=Virginia');
    await expect(page.locator('[data-overridden-table="embedded"]').first()).toBeVisible();
    await page.goto('/#/en/categories/1/table');
    await expect(page.locator('.detail-related [data-overridden-table="embedded"]').first()).toBeVisible();
});

test('registered detail table override reaches detail pages and map popup bodies', async ({ page }) => {
    await configure(page, ['app/detail-override-test.js']);
    await page.route('**/app/detail-override-test.js', route => route.fulfill({ contentType: 'text/javascript', body: `
        import { h } from 'preact';
        export function register(api) {
            api.registerComponent({kind:'view',id:'table',context:'detail',component:props=>h('div',{
                'data-overridden-detail':props.presentation || 'page'
            },'Registered detail replacement')});
        }
    ` }));
    await page.goto('/#/en/categories/1/table');
    await expect(page.locator('[data-overridden-detail="page"]')).toBeVisible();
    await page.evaluate(async () => {
        const { h, render } = await import('preact');
        const { createComponentRegistry, RegistryContext } = await import('/core/ui/index.js');
        const { default: MapPopup } = await import('/extensions/point_map/js/map-popup.js');
        const registry = createComponentRegistry();
        registry.install({ register(api) {
            api.registerComponent({ kind: 'view', id: 'table', context: 'detail', component: props => h('div', { 'data-popup-override': props.presentation }, props.row.title) });
        } });
        const container = document.createElement('div'); container.id = 'popup-test'; document.body.append(container);
        render(h(RegistryContext.Provider, { value: registry }, h(MapPopup, {
            columns: [{ name: 'id', primaryKey: true }, { name: 'title' }], row: { id: 1, title: 'Popup fixture' }, lang: 'en', perspectiveId: 'works',
        })), container);
    });
    await expect(page.locator('#popup-test [data-popup-override="embedded"]')).toHaveText('Popup fixture');
    await expect(page.locator('#popup-test a')).toHaveAttribute('href', '#/en/works/1/table');
});

test('engine geography without its UI plugin retains numeric controls', async ({ page }) => {
    await page.route('**/app/config.json', route => route.fulfill({ json: {
        ...config, datasource: { type: 'download' },
        enginePlugins: ['extensions/geo-filter/geo-filter-engine.js'],
        uiPlugins: [],
    } }));
    await page.goto('/#/en/authors/table');
    await expect(page.locator('#app header')).toBeVisible();
    await expect(page.locator('.facet-sidebar')).toContainText(/lat/i);
    await expect(page.locator('.facet-sidebar')).toContainText(/lon/i);
    await expect(page.getByRole("slider", { name: "latitude minimum", exact: true })).toBeAttached();
    await expect(page.getByRole("slider", { name: "longitude maximum", exact: true })).toBeAttached();
});

test('cell registration changes presentation without modifying engine metadata', async ({ page }) => {
    await page.goto('/');
    const result = await page.evaluate(async () => {
        const { createComponentRegistry } = await import('/core/ui/registry/index.js');
        const { createPresentationStore } = await import('/core/ui/runtime/presentation.js');
        const schema = { tables: { items: { type: 'table', columns: [{ name: 'body', type: 'TEXT', primaryKey: false }] } } };
        const before = JSON.stringify(schema);
        Object.freeze(schema.tables.items.columns[0]);
        const registry = createComponentRegistry();
        registry.install({ register(api) { api.registerComponent({ kind: 'cell', id: 'custom-text', component: () => null }); } });
        const presentation = createPresentationStore({ capabilities: { filters: [] } }, schema, { tables: { items: { columns: { body: { type: 'custom-text' } } } } }, registry);
        return { unchanged: before === JSON.stringify(schema), displayType: presentation.schema.tables.items.columns[0].displayType };
    });
    expect(result).toEqual({ unchanged: true, displayType: 'custom-text' });
});
