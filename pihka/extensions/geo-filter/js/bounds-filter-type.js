/**
 * The "bounds" filter type: a geographic viewport filter on tables with
 * lat/lon columns, encoded in the URL as bbox=w,s,e,n. Registered into the
 * core filter registry by the extension entry module. No preact — this is
 * pure data-layer logic (URL codec, SQL, filter metadata).
 */

import { findGeoColumns } from "./geo.js";

/** The reserved filters key the viewport filter lives under. */
export const VIEWPORT_KEY = "_viewport";

export const boundsFilterType = {
    reservedParams: ["bbox"],

    decode(params, { filterMeta }) {
        // Only meaningful when the table has geo columns.
        if (!params.bbox || !filterMeta.geoMeta) return null;
        const [minLon, minLat, maxLon, maxLat] = params.bbox.split(",").map(Number);
        if (![minLon, minLat, maxLon, maxLat].every(Number.isFinite)) return null;
        return {
            [VIEWPORT_KEY]: {
                type: "bounds",
                latCol: filterMeta.geoMeta.latCol,
                lonCol: filterMeta.geoMeta.lonCol,
                minLat, maxLat, minLon, maxLon,
            },
        };
    },

    encode(key, filter) {
        // ~1m precision keeps URLs short and the filter key stable.
        const round = (v) => String(Math.round(v * 1e5) / 1e5);
        return {
            bbox: [filter.minLon, filter.minLat, filter.maxLon, filter.maxLat]
                .map(round).join(","),
        };
    },

    buildSql(key, filter) {
        const quote = (s) => `"${s.replace(/"/g, '""')}"`;
        const qLat = quote(filter.latCol);
        const qLon = quote(filter.lonCol);
        const conditions = [`${qLat} BETWEEN ? AND ?`];
        const params = [filter.minLat, filter.maxLat];
        if (filter.minLon > filter.maxLon) {
            // Viewport crosses the antimeridian: two half-ranges.
            conditions.push(`(${qLon} >= ? OR ${qLon} <= ?)`);
        } else {
            conditions.push(`${qLon} BETWEEN ? AND ?`);
        }
        params.push(filter.minLon, filter.maxLon);
        return { conditions, params };
    },

    filterMeta({ columns, meta, loadRangeBounds }) {
        const geo = findGeoColumns(columns);
        if (!geo) return;

        // Coordinate columns get the map viewport filter instead of the
        // range sliders the base classification gave them.
        meta.rangeColumns = meta.rangeColumns.filter(c => c !== geo.latCol && c !== geo.lonCol);
        delete meta.rangeMeta[geo.latCol.name];
        delete meta.rangeMeta[geo.lonCol.name];

        // `bounds` is the data extent, so the viewport facet can start
        // fitted to the data.
        const latBounds = loadRangeBounds(geo.latCol.name);
        const lonBounds = loadRangeBounds(geo.lonCol.name);
        meta.geoMeta = {
            latCol: geo.latCol.name,
            lonCol: geo.lonCol.name,
            bounds: {
                minLat: latBounds.min, maxLat: latBounds.max,
                minLon: lonBounds.min, maxLon: lonBounds.max,
            },
        };
    },
};
