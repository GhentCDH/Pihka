// @ts-check
/** Geographic URL codec. SQL compilation belongs to the separate engine plugin. */

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

};
