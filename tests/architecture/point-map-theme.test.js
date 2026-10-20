import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_THEME, resolveTheme } from '../../pihka/extensions/point_map/js/theme.js';
import { buildStyle, clusterGroups, markerUrl, pinUrl } from '../../pihka/extensions/point_map/js/map-layers.js';

const silenced = (fn) => {
    const warnings = [];
    const warn = console.warn;
    console.warn = (message) => warnings.push(message);
    try {
        return { result: fn(), warnings };
    } finally {
        console.warn = warn;
    }
};

test('a missing theme is the default theme', () => {
    assert.equal(resolveTheme(undefined), DEFAULT_THEME);
    assert.equal(resolveTheme(null), DEFAULT_THEME);
});

test('a theme overrides the given keys and merges the basemap per layer', () => {
    const theme = resolveTheme({ palette: ['red', 'blue'], pin: 'black', basemap: { water: 'navy' } });
    assert.deepEqual([...theme.palette], ['red', 'blue']);
    assert.equal(theme.pin, 'black');
    assert.equal(theme.other, DEFAULT_THEME.other);
    assert.equal(theme.basemap.water, 'navy');
    assert.equal(theme.basemap.earth, DEFAULT_THEME.basemap.earth);
});

test('invalid theme values fall back to the default with a warning', () => {
    const { result, warnings } = silenced(() =>
        resolveTheme({ palette: [], other: 3, basemap: { roads: '' }, outline: 'white' }),
    );
    assert.equal(result.palette, DEFAULT_THEME.palette);
    assert.equal(result.other, DEFAULT_THEME.other);
    assert.equal(result.basemap.roads, DEFAULT_THEME.basemap.roads);
    assert.equal(result.outline, 'white');
    assert.equal(warnings.length, 3);
    assert.equal(silenced(() => resolveTheme('blue')).result, DEFAULT_THEME);
});

test('the same config object resolves once', () => {
    const config = { other: 5 };
    const first = silenced(() => resolveTheme(config));
    const second = silenced(() => resolveTheme(config));
    assert.equal(first.result, second.result);
    assert.equal(second.warnings.length, 0);
});

test('cluster groups, pins and the basemap use the theme colors', () => {
    const theme = resolveTheme({ palette: ['red', 'blue'], other: 'grey', pin: 'black', outline: 'cream', basemap: { water: 'navy' } });
    assert.deepEqual(clusterGroups(theme).map((group) => [group.color, group.fill, group.source]), [
        [null, 'black', 'pm-points'],
        ['red', 'red', 'pm-points-0'],
        ['blue', 'blue', 'pm-points-1'],
        ['grey', 'grey', 'pm-points-2'],
    ]);
    assert.equal(clusterGroups(theme), clusterGroups(theme));
    assert.equal(clusterGroups().length, DEFAULT_THEME.palette.length + 2);

    assert.equal(markerUrl({ lat: 0, lon: 0 }, theme), pinUrl('black', 'cream'));
    assert.equal(markerUrl({ lat: 0, lon: 0, color: 'red' }, theme), pinUrl('red', 'cream'));
    assert.match(decodeURIComponent(pinUrl('red', 'cream')), /fill="red" stroke="cream"/);

    const paint = Object.fromEntries(buildStyle(theme).layers.map((layer) => [layer.id, layer.paint]));
    assert.equal(paint.background['background-color'], 'navy');
    assert.equal(paint.water['fill-color'], 'navy');
    assert.equal(paint.earth['fill-color'], DEFAULT_THEME.basemap.earth);
});
