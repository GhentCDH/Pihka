/**
 * Test if a string value looks like an image file path.
 * Matches paths ending in common image extensions.
 */
const IMAGE_RE = /\.(jpe?g|png|gif|webp|svg)$/i;

export function isImagePath(value) {
    return typeof value === "string" && value.length > 0 && IMAGE_RE.test(value);
}
