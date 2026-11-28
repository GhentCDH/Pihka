import { test } from 'node:test';
import assert from 'node:assert/strict';
import { areaFeatures, areaSettings, coreBounds, sites } from '../../pihka/extensions/point_map/js/areas.js';

const point = (lat, lon, type) => ({ lat, lon, row: { type } });
const valueAt = (collection, lat, lon) => collection.features.find(({ geometry }) => {
    const [[w, s], [e], [, n]] = geometry.coordinates[0];
    return lon >= w && lon < e && lat >= s && lat < n;
})?.properties.value ?? null;

test('the area view needs `areas` and a colorBy column; an areas object overrides the shared settings', () => {
    assert.equal(areaSettings({}), null);
    assert.equal(areaSettings({ colorBy: 'type' }), null);
    assert.equal(areaSettings({ areas: true }), null);
    assert.equal(areaSettings({ colorBy: 'type', areas: false }), null);
    assert.deepEqual(areaSettings({ colorBy: 'type', maxTypes: 5, areas: true }), { colorBy: 'type', maxTypes: 5, neutral: undefined });
    assert.deepEqual(
        areaSettings({ colorBy: 'type', neutral: ['—'], areas: { colorBy: 'family', maxDistanceKm: 80 } }),
        { colorBy: 'family', maxTypes: undefined, neutral: ['—'], maxDistanceKm: 80 },
    );
});

test('one site per location, without neutral categories', () => {
    const points = [point(0, 0, 'a'), point(0, 0, 'a'), point(1, 1, 'b'), point(3, 3, 'none')];
    assert.deepEqual(sites(points, 'type', ['none']).map((s) => s.value), ['a', 'b']);
});

test('a location takes its most frequent category', () => {
    const points = [point(5, 5, 'x'), point(5, 5, 'y'), point(5, 5, 'y')];
    assert.deepEqual(sites(points, 'type'), [{ lat: 5, lon: 5, value: 'y' }]);
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
