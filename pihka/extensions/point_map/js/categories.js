// @ts-check
/**
 * Pure helpers for coloring points by a category column. No maplibre
 * imports, so they run (and can be tested) without a map.
 */

export const PALETTE = [
    "#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f",
    "#edc948", "#b07aa1", "#ff9da7", "#9c755f", "#86bcb6",
];
export const OTHER_COLOR = "#b8b8b8";

export const categoryOf = (point, column) => String(point.row?.[column] ?? "—");

/**
 * One color per category: the `maxTypes` most frequent categories get a
 * palette color and the rest share OTHER_COLOR. `neutral` categories
 * (e.g. "no reconstruction") are grey and get their own legend entry.
 */
export function categorize(points, column, { maxTypes = PALETTE.length, neutral = [] } = {}) {
    const counts = new Map();
    for (const point of points) {
        const value = categoryOf(point, column);
        counts.set(value, (counts.get(value) ?? 0) + 1);
    }
    const neutralSet = new Set(neutral);
    const ranked = [...counts].filter(([value]) => !neutralSet.has(value)).sort((a, b) => b[1] - a[1]);
    const colors = new Map(
        ranked.slice(0, Math.min(maxTypes, PALETTE.length)).map(([value], i) => [value, PALETTE[i]]),
    );
    const legend = [...colors].map(([value, color]) => ({ value, color, count: counts.get(value) }));
    const others = ranked.slice(colors.size);
    if (others.length)
        legend.push({
            value: null,
            color: OTHER_COLOR,
            count: others.reduce((sum, [, count]) => sum + count, 0),
            types: others.length,
        });
    for (const value of neutralSet)
        if (counts.has(value)) legend.push({ value, color: OTHER_COLOR, count: counts.get(value), neutral: true });
    return {
        legend,
        colorOf: (value) => colors.get(value) ?? OTHER_COLOR,
    };
}
