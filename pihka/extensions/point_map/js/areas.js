// @ts-check
/**
 * Pure helpers for the area map: group points by a category column and
 * turn nearest-site regions into rectangles on a lat/lon grid. No maplibre
 * imports, so they run (and can be tested) without a map.
 */

export const PALETTE = [
    "#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f",
    "#edc948", "#b07aa1", "#ff9da7", "#9c755f", "#86bcb6",
];
export const OTHER_COLOR = "#b8b8b8";
const KM_PER_DEGREE = 111.32;
const MAX_CELLS = 80000;

export const categoryOf = (point, column) => String(point.row?.[column] ?? "—");

/**
 * One color per category: the `maxTypes` most frequent categories get a
 * palette color and the rest share OTHER_COLOR. `neutral` categories
 * (e.g. "no reconstruction") are grey and draw no area.
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
        inArea: (value) => !neutralSet.has(value),
    };
}

/** One site per coordinate, labelled with its most frequent area category. */
export function sites(points, column, inArea) {
    const byCoordinate = new Map();
    for (const point of points) {
        const value = categoryOf(point, column);
        if (!inArea(value)) continue;
        const key = `${point.lat},${point.lon}`;
        let site = byCoordinate.get(key);
        if (!site) byCoordinate.set(key, (site = { lat: point.lat, lon: point.lon, counts: new Map() }));
        site.counts.set(value, (site.counts.get(value) ?? 0) + 1);
    }
    return [...byCoordinate.values()].map(({ lat, lon, counts }) => ({
        lat,
        lon,
        value: [...counts].sort((a, b) => b[1] - a[1])[0][0],
    }));
}

/**
 * Bounds ([[west, south], [east, north]]) of the central `share` of the
 * points per axis. With few points, all points count.
 */
export function coreBounds(points, share = 0.9) {
    const trim = points.length >= 20 ? (1 - share) / 2 : 0;
    const range = (values) => {
        values.sort((a, b) => a - b);
        const at = (q) => values[Math.min(values.length - 1, Math.max(0, Math.round(q * (values.length - 1))))];
        return [at(trim), at(1 - trim)];
    };
    const [south, north] = range(points.map((p) => p.lat));
    const [west, east] = range(points.map((p) => p.lon));
    return [[west, south], [east, north]];
}

/**
 * Nearest-site regions as GeoJSON rectangles: every cell of a lat/lon grid
 * takes the category of its nearest site within `maxDistanceKm`, and
 * neighbouring cells of one category in a grid row merge into one
 * rectangle. Distances use an equirectangular projection, which is
 * accurate enough at this scale.
 */
export function areaFeatures(siteList, colorOf, { maxDistanceKm = 150, cellDegrees } = {}) {
    const features = [];
    if (!siteList.length) return { type: "FeatureCollection", features };

    const reach = maxDistanceKm / KM_PER_DEGREE;
    const lats = siteList.map((s) => s.lat);
    const lons = siteList.map((s) => s.lon);
    const edgeLat = Math.min(85, Math.max(...lats.map(Math.abs)) + reach);
    // A degree of longitude shrinks towards the poles, so its reach grows.
    const lonReach = reach / Math.cos((edgeLat * Math.PI) / 180);
    const south = Math.min(...lats) - reach;
    const north = Math.max(...lats) + reach;
    const west = Math.min(...lons) - lonReach;
    const east = Math.max(...lons) + lonReach;
    const step = cellDegrees ?? Math.max(0.02, Math.sqrt(((north - south) * (east - west)) / MAX_CELLS));

    // Buckets of one reach wide, so a cell only checks the 3 × 3 around it.
    const buckets = new Map();
    for (const site of siteList) {
        const key = `${Math.floor(site.lat / reach)}:${Math.floor(site.lon / lonReach)}`;
        if (!buckets.has(key)) buckets.set(key, []);
        buckets.get(key).push(site);
    }
    const nearest = (lat, lon, cos) => {
        const row = Math.floor(lat / reach);
        const col = Math.floor(lon / lonReach);
        let best = reach * reach;
        let value = null;
        for (let i = row - 1; i <= row + 1; i++)
            for (let j = col - 1; j <= col + 1; j++)
                for (const site of buckets.get(`${i}:${j}`) ?? []) {
                    const dy = site.lat - lat;
                    const dx = (site.lon - lon) * cos;
                    const distance = dx * dx + dy * dy;
                    if (distance <= best) {
                        best = distance;
                        value = site.value;
                    }
                }
        return value;
    };
    const rectangle = (from, to, s, value) => {
        const w = west + from * step;
        const e = west + to * step;
        const n = s + step;
        return {
            type: "Feature",
            geometry: { type: "Polygon", coordinates: [[[w, s], [e, s], [e, n], [w, n], [w, s]]] },
            properties: { value, color: colorOf(value) },
        };
    };

    const rows = Math.ceil((north - south) / step);
    const cols = Math.ceil((east - west) / step);
    for (let r = 0; r < rows; r++) {
        const s = south + r * step;
        const lat = s + step / 2;
        const cos = Math.cos((lat * Math.PI) / 180);
        let run = null;
        let start = 0;
        for (let c = 0; c <= cols; c++) {
            const value = c < cols ? nearest(lat, west + (c + 0.5) * step, cos) : null;
            if (value === run) continue;
            if (run !== null) features.push(rectangle(start, c, s, run));
            run = value;
            start = c;
        }
    }
    return { type: "FeatureCollection", features };
}
