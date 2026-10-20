// @ts-check
/**
 * Pure helpers for coloring points by a category column. No maplibre
 * imports, so they run (and can be tested) without a map.
 */
import { DEFAULT_THEME } from "./theme.js";

export const categoryOf = (point, column) => String(point.row?.[column] ?? "—");

/**
 * One color per category: the `maxTypes` most frequent categories get a
 * `palette` color and the rest share the `other` color. `neutral`
 * categories (e.g. "no reconstruction") get `other` too, with their own
 * legend entry. `palette` and `other` come from a theme (see theme.js).
 */
export function categorize(
    points,
    column,
    { palette = DEFAULT_THEME.palette, other = DEFAULT_THEME.other, maxTypes = palette.length, neutral = [] } = {},
) {
    const counts = new Map();
    for (const point of points) {
        const value = categoryOf(point, column);
        counts.set(value, (counts.get(value) ?? 0) + 1);
    }
    const neutralSet = new Set(neutral);
    const ranked = [...counts].filter(([value]) => !neutralSet.has(value)).sort((a, b) => b[1] - a[1]);
    const colors = new Map(
        ranked.slice(0, Math.min(maxTypes, palette.length)).map(([value], i) => [value, palette[i]]),
    );
    const legend = [...colors].map(([value, color]) => ({ value, color, count: counts.get(value) }));
    const others = ranked.slice(colors.size);
    if (others.length)
        legend.push({
            value: null,
            color: other,
            count: others.reduce((sum, [, count]) => sum + count, 0),
            types: others.length,
        });
    for (const value of neutralSet)
        if (counts.has(value)) legend.push({ value, color: other, count: counts.get(value), neutral: true });
    return {
        legend,
        colorOf: (value) => colors.get(value) ?? other,
    };
}
