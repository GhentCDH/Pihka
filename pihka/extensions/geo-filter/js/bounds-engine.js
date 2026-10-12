// @ts-check
import { findGeoColumns } from "./geo.js";

export const boundsFilterType = {
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

    async filterMeta({ columns, meta, loadRangeBounds }) {
        const geo = findGeoColumns(columns);
        if (!geo) return;

        // `bounds` is the data extent, so the viewport facet can start
        // fitted to the data.
        const latBounds = await loadRangeBounds(geo.latCol.name);
        const lonBounds = await loadRangeBounds(geo.lonCol.name);
        meta.geoMeta = {
            latCol: geo.latCol.name,
            lonCol: geo.lonCol.name,
            bounds: {
                minLat: latBounds.min,
                maxLat: latBounds.max,
                minLon: lonBounds.min,
                maxLon: lonBounds.max,
            },
        };
    },
};
