import { test } from 'node:test';
import assert from 'node:assert/strict';
import { categorize } from '../../pihka/extensions/point_map/js/categories.js';
import { DEFAULT_THEME } from '../../pihka/extensions/point_map/js/theme.js';

const point = (lat, lon, type) => ({ lat, lon, row: { type } });
const points = [
    point(0, 0, 'a'), point(0, 0, 'a'), point(0, 0, 'a'),
    point(1, 1, 'b'), point(1, 1, 'b'),
    point(2, 2, 'c'),
    point(3, 3, 'none'), point(3, 3, 'none'),
];

test('categories rank by frequency, share an "other" color and list neutral values last', () => {
    const { palette, other } = DEFAULT_THEME;
    const { legend, colorOf } = categorize(points, 'type', { maxTypes: 2, neutral: ['none'] });
    assert.deepEqual(legend, [
        { value: 'a', color: palette[0], count: 3 },
        { value: 'b', color: palette[1], count: 2 },
        { value: null, color: other, count: 1, types: 1 },
        { value: 'none', color: other, count: 2, neutral: true },
    ]);
    assert.equal(colorOf('c'), other);
    assert.equal(colorOf('none'), other);
});

test('categories take their colors from the given palette, one category per color', () => {
    const { legend, colorOf } = categorize(points, 'type', { palette: ['red', 'blue'], other: 'grey', neutral: ['none'] });
    assert.deepEqual(legend.map(({ value, color }) => [value, color]), [
        ['a', 'red'], ['b', 'blue'], [null, 'grey'], ['none', 'grey'],
    ]);
    assert.equal(colorOf('c'), 'grey');
});
