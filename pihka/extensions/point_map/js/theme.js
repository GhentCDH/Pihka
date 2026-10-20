// @ts-check
/**
 * Colors of a point map, set per table or perspective in app/config.json
 * under `options.point_map.theme`:
 *
 *   palette      category colors, most frequent category first
 *   other        "other" and neutral categories
 *   pin          pins and clusters of points without a category
 *   outline      pin and cluster outline, and the dot in a pin
 *   clusterText  cluster counts
 *   basemap      water, earth, landcover, landuse, boundaries, roads
 *
 * Every key is optional and falls back to DEFAULT_THEME; `basemap` merges
 * per layer. A map takes its theme when it is created. No maplibre imports,
 * so this runs (and can be tested) without a map.
 */

export const DEFAULT_THEME = Object.freeze({
    palette: Object.freeze([
        "#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f",
        "#edc948", "#b07aa1", "#ff9da7", "#9c755f", "#86bcb6",
    ]),
    other: "#b8b8b8",
    pin: "#b35309",
    outline: "#fff",
    clusterText: "#fff",
    basemap: Object.freeze({
        water: "#aac7e8",
        earth: "#f3eddc",
        landcover: "#d6e2c3",
        landuse: "#e6e0c8",
        boundaries: "#888",
        roads: "#cdb892",
    }),
});

const isColor = (value) => typeof value === "string" && value.trim() !== "";

// Per config object, so each map of a perspective gets the same theme (and
// cluster groups) and invalid values are warned about once.
const resolved = new WeakMap();

/**
 * DEFAULT_THEME with the valid keys of `config` applied. Invalid values are
 * warned about and skipped, so a typo in the config never breaks the map.
 *
 * @param {any} [config] - the `point_map.theme` option
 * @returns {typeof DEFAULT_THEME}
 */
export function resolveTheme(config) {
    if (config == null) return DEFAULT_THEME;
    if (typeof config !== "object" || Array.isArray(config)) {
        console.warn("[point-map] theme must be an object; using the default colors");
        return DEFAULT_THEME;
    }
    if (!resolved.has(config)) resolved.set(config, merge(config));
    return resolved.get(config);
}

function merge(config) {
    const skip = (key) => console.warn(`[point-map] theme.${key} is not a valid color; using the default`);
    const pick = (key, value, fallback) => {
        if (value === undefined) return fallback;
        if (isColor(value)) return value;
        skip(key);
        return fallback;
    };

    let palette = DEFAULT_THEME.palette;
    if (config.palette !== undefined) {
        if (Array.isArray(config.palette) && config.palette.length && config.palette.every(isColor))
            palette = Object.freeze([...config.palette]);
        else console.warn("[point-map] theme.palette must be a non-empty list of colors; using the default");
    }

    const basemapConfig = config.basemap && typeof config.basemap === "object" ? config.basemap : {};
    if (config.basemap !== undefined && basemapConfig !== config.basemap)
        console.warn("[point-map] theme.basemap must be an object; using the default colors");
    const basemap = Object.freeze(
        Object.fromEntries(
            Object.entries(DEFAULT_THEME.basemap).map(([layer, fallback]) => [
                layer,
                pick(`basemap.${layer}`, basemapConfig[layer], fallback),
            ]),
        ),
    );

    return Object.freeze({
        palette,
        other: pick("other", config.other, DEFAULT_THEME.other),
        pin: pick("pin", config.pin, DEFAULT_THEME.pin),
        outline: pick("outline", config.outline, DEFAULT_THEME.outline),
        clusterText: pick("clusterText", config.clusterText, DEFAULT_THEME.clusterText),
        basemap: /** @type {typeof DEFAULT_THEME.basemap} */ (basemap),
    });
}
