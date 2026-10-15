import { test } from 'node:test';
import assert from 'node:assert/strict';
import { openDataset } from '../../pihka/core/engine/index.js';
import { buildWhereClause } from '../../pihka/core/engine/filter-sql.js';

function fixture() {
    let closes = 0;
    const source = {
        ready: Promise.resolve(), capabilities: { readOnly: true },
        metadata: async () => ({ tables: { things: { type: 'table', columns: [
            { name: 'id', type: 'INTEGER', primaryKey: true },
            { name: 'score', type: null },
        ] } } }),
        async exec(sql, { callback } = {}) {
            const rows = sql.includes('COUNT(*)') ? [{ n: 1 }] : sql.includes('SELECT "things".*') ? [{ id: 1, score: 5 }] : [];
            rows.forEach(row => callback?.(row)); return rows;
        },
        close() { closes++; },
    };
    return { source, closes: () => closes, plugin: { register(api) { api.registerDataSource('fixture', () => source); } } };
}
const options = plugin => ({ databaseUrl: '/fixture.db', config: { datasource: { type: 'fixture' }, enrichment: { fts: false }, columns: { things: { score: { numeric: true } } } }, plugins: [plugin] });

test('independent engine session freezes schema, queries JSON and closes terminally', async () => {
    const fake = fixture();
    const session = await openDataset(options(fake.plugin));
    assert.equal(session.schema.tables.things.columns[1].numeric, true);
    assert.ok(Object.isFrozen(session.schema.tables.things.columns));
    assert.equal((await session.store.queryTable('things')).totalRows, 1);
    assert.deepEqual(session.store.capabilities.filters, ['search', 'range', 'multi', 'm2m']);
    await session.close(); await session.close();
    assert.equal(fake.closes(), 1);
    await assert.rejects(session.store.queryTable('things'), /closed/);
    assert.throws(() => session.store.getSchema('things'), /closed/);
});

test('JSON filters retain SQL and invalid selections reject', () => {
    const filters = { score: { type: 'multi', selected: [1, 2] } };
    assert.deepEqual(buildWhereClause(filters), buildWhereClause(JSON.parse(JSON.stringify(filters))));
    assert.deepEqual(buildWhereClause(filters).bindParams, [1, 2]);
    assert.throws(() => buildWhereClause({ score: { type: 'multi', selected: {} } }), /array/);
    assert.throws(() => buildWhereClause({ score: { type: 'range', min: NaN } }), /finite/);
});

test('failed registration commits nothing and registry does not leak across sessions', async () => {
    let api;
    const broken = { register(scope) { api = scope; scope.registerDataSource('broken', () => fixture().source); scope.registerFilterType('leak', {}); throw new Error('failure'); } };
    const fake = fixture();
    const session = await openDataset({ ...options(fake.plugin), plugins: [broken, fake.plugin] });
    assert.equal(session.store.capabilities.filters.includes('leak'), false);
    assert.throws(() => api.registerFilterType('late', {}), /closed/);
    await assert.rejects(openDataset({ databaseUrl: '/fixture.db', config: { datasource: { type: 'fixture' } } }), /Unknown datasource/);
    await session.close();
});

test('failed initialization closes selected datasource', async () => {
    const fake = fixture(); fake.source.metadata = async () => { throw new Error('metadata failed'); };
    await assert.rejects(openDataset(options(fake.plugin)), /metadata failed/);
    assert.equal(fake.closes(), 1);
});

test('asynchronous installers are rejected without partial registration', async () => {
    const fake = fixture();
    const asyncPlugin = { async register(api) { api.registerFilterType('async', {}); } };
    const session = await openDataset({ ...options(fake.plugin), plugins: [asyncPlugin, fake.plugin] });
    assert.equal(session.store.capabilities.filters.includes('async'), false);
    await session.close();
});

test('registered filters are session-local and malformed extension SQL stays inert', async () => {
    const first = fixture(), second = fixture();
    const custom = { register(api) { api.registerFilterType('custom', { buildSql() { return { conditions: 'bad', params: [] }; } }); } };
    const a = await openDataset({ ...options(first.plugin), plugins: [first.plugin, custom] });
    const b = await openDataset(options(second.plugin));
    assert.ok(a.store.capabilities.filters.includes('custom'));
    assert.equal(b.store.capabilities.filters.includes('custom'), false);
    assert.equal((await a.store.queryTable('things', { filters: { score: { type: 'custom' } } })).totalRows, 1);
    await Promise.all([a.close(), b.close()]);
});

test('close rejects cached read methods too', async () => {
    const fake = fixture();
    const session = await openDataset(options(fake.plugin));
    await session.store.resolveForeignKeys('things');
    await session.store.getFilterMeta('things');
    await session.close();
    await assert.rejects(session.store.resolveForeignKeys('things'), /closed/);
    await assert.rejects(session.store.getFilterMeta('things'), /closed/);
    await assert.rejects(session.store.queryRow('missing', 1), /closed/);
    await assert.rejects(session.store.queryRelated('things', null), /closed/);
});

test('bounds engine metadata preserves numeric coordinate ranges', async () => {
    const { register } = await import('../../pihka/extensions/geo-filter/geo-filter-engine.js');
    const fake = fixture();
    fake.source.metadata = async () => ({ tables: { places: { type: 'table', columns: [
        { name: 'lat', type: 'REAL', primaryKey: false },
        { name: 'lon', type: 'REAL', primaryKey: false },
    ] } } });
    const session = await openDataset({ ...options(fake.plugin), plugins: [fake.plugin, { register }] });
    const meta = await session.store.getFilterMeta('places');
    assert.deepEqual(meta.rangeColumns.map(c => c.name), ['lat', 'lon']);
    assert.deepEqual(Object.keys(meta.rangeMeta), ['lat', 'lon']);
    assert.equal(meta.geoMeta.latCol, 'lat');
    await session.close();
});

test('values facet `only` limits options and orders them as configured', async () => {
    const fake = fixture();
    fake.source.exec = async (sql, { callback } = {}) => {
        const rows = sql.includes('GROUP BY') ? [{ value: 'a', count: 5 }, { value: 'b', count: 3 }, { value: 'c', count: 1 }] : [];
        rows.forEach(row => callback?.(row)); return rows;
    };
    const session = await openDataset(options(fake.plugin));
    const meta = await session.store.getFacetMeta('things', [
        { field: 'score', type: 'values', only: ['c', 'a', 'z'] },
    ]);
    assert.deepEqual(meta.score.options.map(o => o.value), ['c', 'a']);
    await session.close();
});
