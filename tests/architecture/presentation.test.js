import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createComponentRegistry } from '../../pihka/core/ui/registry/index.js';
import { createPresentationStore } from '../../pihka/core/ui/runtime/presentation.js';
import { normalizeEngineConfig } from '../../pihka/bootstrap.js';

function freeze(value) {
    if (value && typeof value === 'object') {
        Object.values(value).forEach(freeze);
        Object.freeze(value);
    }
    return value;
}

function fixture() {
    const columns = [
        { name: 'id', type: 'INTEGER', primaryKey: true },
        { name: 'title', type: 'TEXT' },
        { name: 'author_id', type: 'INTEGER', references: { table: 'authors', column: 'id' } },
        { name: 'hidden_author', type: 'INTEGER', references: { table: 'authors', column: 'id' } },
        { name: 'year', type: 'INTEGER' },
        { name: 'internal_score', type: 'REAL' },
        { name: 'linked_number', type: 'INTEGER' },
        { name: 'count', type: null, numeric: true },
        { name: 'lat', type: 'REAL' },
        { name: 'lon', type: 'REAL' },
    ];
    const schema = freeze({ tables: {
        works: { type: 'table', columns },
        authors: { type: 'table', columns: [{ name: 'id', primaryKey: true }, { name: 'name', type: 'TEXT' }] },
        categories: { type: 'table', columns: [{ name: 'id', primaryKey: true }, { name: 'name', type: 'TEXT' }] },
        works_categories: { type: 'table', columns: [{ name: 'work_id' }, { name: 'category_id' }] },
        annotations: { type: 'table', columns: [{ name: 'work_id' }, { name: 'start', type: 'INTEGER' }, { name: 'end', type: 'INTEGER' }] },
        reviews: { type: 'table', columns: [{ name: 'work_id' }, { name: 'body' }] },
    } });
    const fkResolved = freeze({ author_id: { referencedTable: 'authors', displayMap: { 1: 'Virginia Woolf' } } });
    const related = freeze(['authors', 'works_categories', 'annotations', 'reviews'].map(table => ({ table, column: 'work_id', value: 1, totalRows: 2 })));
    const ranges = ['year', 'internal_score', 'linked_number', 'count', 'lat', 'lon'];
    const filterMeta = freeze({
        rangeColumns: columns.filter(c => ranges.includes(c.name)),
        rangeMeta: Object.fromEntries(ranges.map(name => [name, { min: 1, max: 20 }])),
        multiColumns: columns.filter(c => c.references),
        multiMeta: Object.fromEntries(['author_id', 'hidden_author'].map(name => [name, { referencedTable: 'authors', options: [{ value: 1, display: 'Virginia Woolf' }] }])),
        m2mColumns: [{ name: 'category_id', referencedTable: 'categories' }],
        m2mMeta: { category_id: { referencedTable: 'categories', options: [{ value: 1, display: 'Novel' }], filter: { type: 'm2m', table: 'works', refColumn: 'id', junction: 'works_categories', viaColumn: 'work_id', targetColumn: 'category_id' } } },
        geoMeta: { latCol: 'lat', lonCol: 'lon', bounds: { minLat: 1, maxLat: 20, minLon: 1, maxLon: 20 } },
    });
    const result = freeze({ columns, rows: [{ id: 1, title: 'Mrs Dalloway', author_id: 1 }], fkResolved });
    const config = { tables: {
        works: { label: 'Works', columns: {
            title: { label: 'Title' }, author_id: { label: 'Author' },
            hidden_author: { hidden: true }, internal_score: { hidden: true },
            linked_number: { linkTo: 'authors' }, count: { type: 'number', label: 'Work count' },
        } },
        authors: { hidden: true, label: 'Writers' }, categories: { label: 'Categories' },
        works_categories: { hidden: true }, annotations: { hidden: true }, reviews: { label: 'Reviews' },
    } };
    const engine = {
        databaseUrl: '/fixture.db', capabilities: { filters: ['multi', 'm2m', 'range', 'bounds'] },
        getFilterMeta: async () => filterMeta,
        queryTable: async () => result,
        queryRow: async () => ({ ...result, row: result.rows[0] }),
        queryRelated: async () => related,
        resolveForeignKeys: async () => fkResolved,
    };
    const registry = createComponentRegistry();
    registry.install({ register(api) { api.registerComponent({ kind: 'cell', id: 'number', component: () => null }); } });
    return { engine, schema, config, registry, filterMeta, related, fkResolved, result };
}

const present = f => createPresentationStore(f.engine, f.schema, f.config, f.registry);

test('presentation overlays immutable engine results and retains hidden lookup labels without links', async () => {
    const f = fixture();
    const before = JSON.stringify({ schema: f.schema, result: f.result, fk: f.fkResolved });
    const { store, schema } = present(f);
    const result = await store.queryTable('works');
    assert.equal(result.columns.find(c => c.name === 'title').label, 'Title');
    assert.equal(result.fkResolved.author_id.displayMap[1], 'Virginia Woolf');
    assert.equal(result.fkResolved.author_id.referencedTableHidden, true);
    assert.equal((await store.resolveForeignKeys('works')).author_id.referencedTableHidden, true);
    assert.equal((await store.queryRow('works', 1)).row.title, 'Mrs Dalloway');
    assert.equal(schema.tables.authors.hidden, true);
    assert.notEqual(schema, f.schema);
    assert.equal(JSON.stringify({ schema: f.schema, result: f.result, fk: f.fkResolved }), before);
});

test('hidden related and annotation tables disappear only from the UI facade; hidden junction facets survive', async () => {
    const f = fixture();
    const { store } = present(f);
    const related = await store.queryRelated('works', { id: 1 });
    assert.deepEqual(related.map(r => r.table), ['reviews']);
    assert.equal(related[0].label, 'Reviews');
    assert.deepEqual((await f.engine.queryRelated('works', { id: 1 })).map(r => r.table), ['authors', 'works_categories', 'annotations', 'reviews']);
    const filters = await store.getFilterMeta('works');
    assert.deepEqual(filters.m2mColumns.map(c => c.name), ['category_id']);
    assert.equal(filters.m2mMeta.category_id.label, 'Categories');
    assert.equal(filters.m2mMeta.category_id.filter.junction, 'works_categories');
    assert.equal(filters.m2mMeta.category_id.options[0].display, 'Novel');
});

test('auto facets suppress hidden and linked columns while retaining numeric aggregate hints', async () => {
    const f = fixture();
    const { store } = present(f);
    const filters = await store.getFilterMeta('works');
    assert.deepEqual(filters.multiColumns.map(c => c.name), ['author_id']);
    assert.equal(filters.multiMeta.author_id.label, 'Author');
    assert.deepEqual(filters.rangeColumns.map(c => c.name), ['year', 'count', 'lat', 'lon']);
    const count = filters.rangeColumns.find(c => c.name === 'count');
    assert.equal(count.numeric, true);
    assert.equal(count.displayType, 'number');
    assert.equal(filters.rangeMeta.count.label, 'Work count');
    assert.equal(normalizeEngineConfig(f.config).columns.works.count.numeric, true);
    assert.equal(f.filterMeta.rangeColumns.length, 6);
    assert.equal(f.filterMeta.multiColumns.length, 2);
});

test('unknown declared display types remain explicit instead of selecting the image heuristic', t => {
    const warn = t.mock.method(console, 'warn', () => {});
    const f = fixture();
    f.config.tables.works.columns.title.type = 'missing-image-plugin';
    const { schema } = present(f);
    const col = schema.tables.works.columns.find(c => c.name === 'title');
    assert.equal(col.displayType, 'missing-image-plugin');
    assert.equal(f.registry.get('cell', col.displayType), undefined);
    assert.match(warn.mock.calls[0].arguments[0], /unknown type.*falling back to plain text/);
    assert.equal(f.schema.tables.works.columns.find(c => c.name === 'title').displayType, undefined);
});

test('coordinate ranges persist without a usable location facet or after callback failures', async t => {
    t.mock.method(console, 'warn', () => {});
    for (const extra of [null,
        { availableFor: () => false, replacesRanges: () => ['lat', 'lon'] },
        { availableFor: () => { throw new Error('predicate failed'); }, replacesRanges: () => ['lat', 'lon'] },
        { availableFor: () => true, replacesRanges: () => { throw new Error('replacement failed'); } },
        { availableFor: () => true, replacesRanges: () => 'lat,lon' },
    ]) {
        const f = fixture();
        if (extra) f.registry.install({ register(api) { api.registerComponent({ kind: 'facet', id: 'location', supplemental: true, component: () => null, ...extra }); } });
        const filters = await present(f).store.getFilterMeta('works');
        assert.deepEqual(filters.rangeColumns.map(c => c.name), ['year', 'count', 'lat', 'lon']);
    }
});

test('an available registered location facet replaces only its declared coordinate controls', async () => {
    const f = fixture();
    f.registry.install({ register(api) { api.registerComponent({
        kind: 'facet', id: 'location', supplemental: true, component: () => null,
        availableFor: meta => !!meta.geoMeta,
        replacesRanges: meta => [meta.geoMeta.latCol, meta.geoMeta.lonCol],
    }); } });
    const filters = await present(f).store.getFilterMeta('works');
    assert.deepEqual(filters.rangeColumns.map(c => c.name), ['year', 'count']);
    assert.ok(filters.rangeMeta.lat);
    assert.deepEqual(f.filterMeta.rangeColumns.map(c => c.name), ['year', 'internal_score', 'linked_number', 'count', 'lat', 'lon']);
});
