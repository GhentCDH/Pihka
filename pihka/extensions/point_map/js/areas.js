// @ts-check
/**
 * Pure helpers for the area map: reduce points to one site per location and
 * turn nearest-site regions into rectangles on a lat/lon grid. Category
 * ranking and colors come from categories.js. No maplibre imports, so they
 * run (and can be tested) without a map.
 */
import { categoryOf } from "./categories.js";

const KM_PER_DEGREE = 111.32;
const MAX_CELLS = 80000;

/** @typedef {{ lat: number, lon: number, value: string }} Site */

/**
 * Resolve the area view's settings from the `point_map` options slice, or
 * null when the view is off. `areas` (true or an object) switches it on; an
 * object may override the shared `colorBy`/`maxTypes`/`neutral` and add
 * `maxDistanceKm`/`maxSites`. Without a `colorBy` column there is nothing
 * to draw, so the view stays off.
 */
export function areaSettings(pointMap = {}) {
    const { areas, colorBy, maxTypes, neutral } = pointMap ?? {};
    if (!areas) return null;
    const settings = { colorBy, maxTypes, neutral, ...(typeof areas === "object" ? areas : {}) };
    return typeof settings.colorBy === "string" ? settings : null;
}

/**
 * One site per coordinate, labelled with its most frequent category.
 * `neutral` categories (e.g. "no reconstruction") draw no area, so they
 * make no site.
 *
 * @returns {Site[]}
 */
export function sites(points, column, neutral = []) {
    const neutralSet = new Set(neutral);
    const byCoordinate = new Map();
    for (const point of points) {
        const value = categoryOf(point, column);
        if (neutralSet.has(value)) continue;
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
 * rectangle with properties `{ value, color: colorOf(value) }`. Distances
 * use an equirectangular projection, which is accurate enough at this
 * scale. The grid has at most 80,000 cells unless `cellDegrees` is given.
 *
 * @param {Site[]} siteList
 * @param {(value: string) => string} colorOf
 * @param {{ maxDistanceKm?: number, cellDegrees?: number }} [settings]
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
