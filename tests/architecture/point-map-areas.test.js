import { test } from 'node:test';
import assert from 'node:assert/strict';
import { areaFeatures, categorize, coreBounds, OTHER_COLOR, PALETTE, sites } from '../../pihka/extensions/point_map/js/areas.js';

const point = (lat, lon, type) => ({ lat, lon, row: { type } });
const valueAt = (collection, lat, lon) => collection.features.find(({ geometry }) => {
    const [[w, s], [e], [, n]] = geometry.coordinates[0];
    return lon >= w && lon < e && lat >= s && lat < n;
})?.properties.value ?? null;

test('categories rank by frequency, share an "other" color and keep neutral values out of areas', () => {
    const points = [
        point(0, 0, 'a'), point(0, 0, 'a'), point(0, 0, 'a'),
        point(1, 1, 'b'), point(1, 1, 'b'),
        point(2, 2, 'c'),
        point(3, 3, 'none'), point(3, 3, 'none'),
    ];
    const { legend, colorOf, inArea } = categorize(points, 'type', { maxTypes: 2, neutral: ['none'] });
    assert.deepEqual(legend, [
        { value: 'a', color: PALETTE[0], count: 3 },
        { value: 'b', color: PALETTE[1], count: 2 },
        { value: null, color: OTHER_COLOR, count: 1, types: 1 },
        { value: 'none', color: OTHER_COLOR, count: 2, neutral: true },
    ]);
    assert.equal(colorOf('c'), OTHER_COLOR);
    assert.equal(inArea('none'), false);
    assert.deepEqual(sites(points, 'type', inArea).map((s) => s.value), ['a', 'b', 'c']);
});

test('a location takes its most frequent category', () => {
    const points = [point(5, 5, 'x'), point(5, 5, 'y'), point(5, 5, 'y')];
    assert.deepEqual(sites(points, 'type', () => true), [{ lat: 5, lon: 5, value: 'y' }]);
});

test('areas follow the nearest location and stop at the maximum distance', () => {
    const siteList = [{ lat: 0, lon: 0, value: 'west' }, { lat: 0, lon: 4, value: 'east' }];
    const areas = areaFeatures(siteList, (v) => v, { maxDistanceKm: 300, cellDegrees: 0.1 });
    assert.equal(valueAt(areas, 0.05, 0.05), 'west');
    assert.equal(valueAt(areas, 0.05, 1.5), 'west');
    assert.equal(valueAt(areas, 0.05, 2.5), 'east');
    assert.equal(valueAt(areas, 0.05, 3.95), 'east');
    // 3° north is about 334 km away from both locations: outside every area.
    assert.equal(valueAt(areas, 3, 0), null);
    assert.ok(areas.features.every((f) => f.properties.color === f.properties.value));
    assert.deepEqual(areaFeatures([], () => 'x').features, []);
});

test('core bounds ignore a few outliers but keep every point when there are few', () => {
    const cluster = Array.from({ length: 38 }, (_, i) => point(-5 + (i % 10) * 0.5, 12 + Math.floor(i / 10), 'a'));
    const outliers = [point(27.6, 20, 'a'), point(-30, 45, 'a')];
    assert.deepEqual(coreBounds([...cluster, ...outliers]), [[12, -5], [15, -0.5]]);
    assert.deepEqual(coreBounds([point(0, 0, 'a'), point(40, 30, 'a')]), [[0, 0], [30, 40]]);
});
