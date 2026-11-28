import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeFacets } from '../../pihka/core/ui/runtime/facets.js';

const noop = () => {};
const actions = { onRangeChange: noop, onMultiChange: noop, onFilterChange: noop };

function normalize(...defs) {
    const registry = { list: kind => kind === 'facet' ? defs.map(d => ({ kind: 'facet', supplemental: true, component: noop, ...d })) : [] };
    const autoFilterMeta = {
        rangeColumns: [{ name: 'year', type: 'INTEGER' }],
        rangeMeta: { year: { min: 1900, max: 2000 } },
        multiColumns: [], multiMeta: {}, m2mColumns: [], m2mMeta: {},
    };
    return normalizeFacets({ facetMeta: null, autoFilterMeta, filters: {}, actions, lang: 'en' }, registry);
}

test('supplemental facets default to the sidebar and may be placed on top', () => {
    const descriptors = normalize({ id: 'side' }, { id: 'grid', placement: 'top' }, { id: 'odd', placement: 'footer' });
    const placement = Object.fromEntries(descriptors.map(d => [d.id, d.placement]));
    assert.equal(placement.year, 'sidebar');
    assert.equal(placement.side, 'sidebar');
    assert.equal(placement.grid, 'top');
    assert.equal(placement.odd, 'sidebar');
});

test('a top facet is still subject to availableFor', () => {
    const descriptors = normalize({ id: 'grid', placement: 'top', availableFor: () => false });
    assert.deepEqual(descriptors.map(d => d.id), ['year']);
});
