import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createComponentRegistry } from '../../pihka/core/ui/registry/index.js';
import { normalizeFacets } from '../../pihka/core/ui/runtime/facets.js';

const facetMeta = {
    c1: { type: 'dropdown', options: [{ value: 'b', display: 'b', count: 3 }] },
    v1: { type: 'dropdown', options: [{ value: 'a', display: 'a', count: 2 }] },
    year: { type: 'range', min: 1, max: 9 },
    noun_class: { type: 'dropdown', options: [] },
};
const actions = { onMultiChange() {}, onRangeChange() {}, onFilterChange() {} };

function normalize(...defs) {
    const registry = createComponentRegistry();
    registry.install({ register(api) {
        for (const def of defs) api.registerComponent({ kind: 'facet', supplemental: true, component: () => null, ...def });
    } });
    return normalizeFacets({ facetMeta, autoFilterMeta: {}, filters: {}, actions, lang: 'en' }, registry);
}

test('supplemental facets append after configured facets and receive facetMeta', () => {
    const descriptors = normalize({ id: 'extra' });
    assert.deepEqual(descriptors.map(d => d.id), ['c1', 'v1', 'year', 'noun_class', 'extra']);
    assert.equal(descriptors.at(-1).props.facetMeta, facetMeta);
});

test('a replacing facet hides its fields and takes the first replaced position', () => {
    const descriptors = normalize({
        id: 'grid',
        availableFor: (_auto, meta) => !!meta?.c1,
        replacesFacets: () => ['v1', 'c1'],
    });
    assert.deepEqual(descriptors.map(d => d.id), ['grid', 'year', 'noun_class']);
});

test('supplemental facets default to the sidebar and may be placed on top', () => {
    const descriptors = normalize({ id: 'side' }, { id: 'grid', placement: 'top' }, { id: 'odd', placement: 'footer' });
    const placement = Object.fromEntries(descriptors.map(d => [d.id, d.placement]));
    assert.equal(placement.side, 'sidebar');
    assert.equal(placement.grid, 'top');
    assert.equal(placement.odd, 'sidebar');
});

test('unavailable or failing replacements leave configured facets intact', t => {
    t.mock.method(console, 'warn', () => {});
    for (const def of [
        { availableFor: () => false, replacesFacets: () => ['c1'] },
        { replacesFacets: () => { throw new Error('replacement failed'); } },
        { replacesFacets: () => 'c1,v1' },
    ]) {
        const descriptors = normalize({ id: 'grid', ...def });
        assert.deepEqual(descriptors.filter(d => d.id !== 'grid').map(d => d.id), ['c1', 'v1', 'year', 'noun_class']);
    }
});
