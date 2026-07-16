/**
 * An extension's own slice of a perspective's resolved `options` bag,
 * namespaced by extension key so multiple extensions can share one
 * `config.tables[table].options` / `perspectives[].options` object without
 * key collisions.
 *
 * @param {Object|null|undefined} options - resolved perspective options
 * @param {string} key - the extension's namespace (e.g. "point_map")
 * @returns {Object}
 */
export function extensionOptions(options, key) {
    return (options && typeof options === "object" && options[key]) || {};
}
