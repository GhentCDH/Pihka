import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { URL } from 'node:url';
import { openDataset } from '../../pihka/core/engine/index.js';
import { readMetadata } from '../../pihka/core/engine/metadata.js';

const wasmDir = new URL('../../pihka/core/vendor/@sqlite.org/sqlite-wasm/dist/', import.meta.url);

// A real in-memory SQLite (vendored sqlite-wasm) behind a minimal datasource,
// recording each executed SELECT so the test can EXPLAIN its query plan.
async function memoryPlugin(setupSql) {
    // Silence the browser-only OPFS VFS install warnings under Node.
    globalThis.sqlite3ApiConfig = { warn: () => {} };
    const { default: init } = await import(new URL('index.mjs', wasmDir).href);
    const sqlite3 = await init({ wasmBinary: readFileSync(new URL('sqlite3.wasm', wasmDir)) });
    const db = new sqlite3.oo1.DB();
    db.exec(setupSql);
    const log = [];
    const source = {
        ready: Promise.resolve(), capabilities: { readOnly: false },
        async exec(sql, { bind, rowMode = 'object', callback } = {}) {
            log.push({ sql, bind });
            const rows = db.exec({ sql, bind, rowMode, returnValue: 'resultRows' });
            rows.forEach(row => callback?.(row));
            return rows;
        },
        metadata() { return readMetadata(source); },
        close() { db.close(); },
    };
    const plan = ({ sql, bind }) => db.exec({ sql: `EXPLAIN QUERY PLAN ${sql}`, bind, rowMode: 'object', returnValue: 'resultRows' })
        .map(r => r.detail).join('\n');
    return { log, plan, plugin: { register(api) { api.registerDataSource('memory', () => source); } } };
}

const SETUP = `
    CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT COLLATE NOCASE, score INTEGER);
    CREATE INDEX items_name ON items(name);
    CREATE INDEX items_score ON items(score);
    INSERT INTO items (name, score) VALUES
        ('banana', 3), ('Apple', NULL), (NULL, 1), ('apple', 2), ('Cherry', 3), ('avocado', 1), ('BANANA', NULL);
`;

test('unpaginated sort keeps result order but skips the sort index', async () => {
    const mem = await memoryPlugin(SETUP);
    const session = await openDataset({ databaseUrl: '/memory.db', config: { datasource: { type: 'memory' }, enrichment: { fts: false } }, plugins: [mem.plugin] });
    const lastSelect = () => mem.log.findLast(e => e.sql.includes('SELECT "items".*'));

    for (const column of ['name', 'score']) {
        for (const direction of ['ASC', 'DESC']) {
            const sort = { column, direction };
            const paged = await session.store.queryTable('items', { sort, pageSize: 100 });
            const pagedPlan = mem.plan(lastSelect());
            const all = await session.store.queryTable('items', { sort, pageSize: null });
            const allPlan = mem.plan(lastSelect());

            // Same order (collation, NULL placement, direction) — compare the
            // sort keys only; ties may legitimately come back in either order.
            const keys = r => r.rows.map(row => typeof row[column] === 'string' ? row[column].toLowerCase() : row[column]);
            assert.deepEqual(keys(all), keys(paged), `${column} ${direction}`);
            assert.equal(all.rows.length, 7);

            assert.match(allPlan, /USE TEMP B-TREE FOR ORDER BY/, `${column} ${direction} unpaginated: ${allPlan}`);
            assert.doesNotMatch(allPlan, new RegExp(`items_${column}`));
            assert.match(pagedPlan, new RegExp(`items_${column}`), `${column} ${direction} paginated: ${pagedPlan}`);
        }
    }
    // NOCASE collation survives the unary "+": apple/Apple and banana/BANANA sort together.
    const all = await session.store.queryTable('items', { sort: { column: 'name', direction: 'ASC' }, pageSize: null });
    assert.deepEqual(all.rows.map(r => r.name?.toLowerCase() ?? null), [null, 'apple', 'apple', 'avocado', 'banana', 'banana', 'cherry']);
    await session.close();
});
