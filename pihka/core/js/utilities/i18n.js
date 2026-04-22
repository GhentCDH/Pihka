/**
 * Resolve a label object to a string for the given language.
 * Falls back to English, then to the first available value.
 *
 * @param {Object|string|null} labelObj - { en: "Books", nl: "Boeken" } or a plain string
 * @param {string} lang - Language code (e.g. "en", "nl")
 * @returns {string}
 */
export function t(labelObj, lang) {
    if (!labelObj) return "";
    if (typeof labelObj === "string") return labelObj;
    return labelObj[lang] || labelObj["en"] || Object.values(labelObj)[0] || "";
}
