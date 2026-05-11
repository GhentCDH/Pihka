/**
 * Pure helpers for map data extraction. No maplibre/pmtiles imports — these
 * functions are safe to call from any component, even before the map
 * dependencies have been loaded.
 */

const LAT_RE = /^lat(itude)?$/i;
const LON_RE = /^lon(gitude)?$|^lng$/i;
const NUMERIC_TYPES = new Set(["REAL", "FLOAT", "DOUBLE", "NUMERIC", "DECIMAL"]);

/**
 * Find the lat/lon column metadata in a columns array.
 * Returns { latCol, lonCol } or null if either is missing or non-numeric.
 */
export function findGeoColumns(columns) {
    if (!Array.isArray(columns)) return null;
    const latCol = columns.find(c => LAT_RE.test(c.name));
    const lonCol = columns.find(c => LON_RE.test(c.name));
    if (!latCol || !lonCol) return null;
    // Best-effort type check: SQLite stores numbers loosely, but we still want
    // to avoid surfacing the map button for TEXT lat columns.
    const typeOk = (c) => !c.type || NUMERIC_TYPES.has(String(c.type).toUpperCase());
    if (!typeOk(latCol) || !typeOk(lonCol)) return null;
    return { latCol, lonCol };
}

/**
 * Project a single row to a point or return null if coordinates are not
 * present or not finite.
 */
export function rowToPoint(row, latCol, lonCol) {
    if (!row || !latCol || !lonCol) return null;
    const lat = parseFloat(row[latCol.name]);
    const lon = parseFloat(row[lonCol.name]);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
    return { lat, lon, row };
}

/**
 * Project an array of rows, filtering out any without finite coordinates.
 */
export function rowsToPoints(rows, latCol, lonCol) {
    if (!Array.isArray(rows) || !latCol || !lonCol) return [];
    const out = [];
    for (const row of rows) {
        const p = rowToPoint(row, latCol, lonCol);
        if (p) out.push(p);
    }
    return out;
}
