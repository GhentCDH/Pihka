import { test } from 'node:test';
import assert from 'node:assert/strict';
import { categorize, OTHER_COLOR, PALETTE } from '../../pihka/extensions/point_map/js/categories.js';

const point = (lat, lon, type) => ({ lat, lon, row: { type } });

test('categories rank by frequency, share an "other" color and list neutral values last', () => {
    const points = [
        point(0, 0, 'a'), point(0, 0, 'a'), point(0, 0, 'a'),
        point(1, 1, 'b'), point(1, 1, 'b'),
        point(2, 2, 'c'),
        point(3, 3, 'none'), point(3, 3, 'none'),
    ];
    const { legend, colorOf } = categorize(points, 'type', { maxTypes: 2, neutral: ['none'] });
    assert.deepEqual(legend, [
        { value: 'a', color: PALETTE[0], count: 3 },
        { value: 'b', color: PALETTE[1], count: 2 },
        { value: null, color: OTHER_COLOR, count: 1, types: 1 },
        { value: 'none', color: OTHER_COLOR, count: 2, neutral: true },
    ]);
    assert.equal(colorOf('c'), OTHER_COLOR);
    assert.equal(colorOf('none'), OTHER_COLOR);
});
