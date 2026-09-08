import { h } from "preact";
import { registerCellRenderer } from "../../utilities-ui/cell-renderers.js";
import { assetUrl } from "../../utilities-data/paths.js";

/**
 * Registers the builtin resource cell renderers. Imported once (for its
 * side effects) by main.js next to builtin-views.js — media display is a
 * basic feature, so it lives in core rather than an extension (it needs no
 * external library), but it registers through the exact same registry
 * mechanism component modules use.
 *
 * A column configured with one of the resource types renders its value as
 * the source of the matching media element:
 *
 *   "tables": {
 *       "works": {
 *           "columns": {
 *               "poster":    { "type": "resource-image" },
 *               "recording": { "type": "resource-audio" },
 *               "trailer":   { "type": "resource-video" }
 *           }
 *       }
 *   }
 *
 * The value is a full URL or a file path: http(s) URLs and root-absolute
 * paths pass through unchanged, anything else resolves under app/assets/
 * (same convention as the "asset" type). Audio and video never preload, so
 * a list page full of players fetches no media until the user hits play.
 */

function resourceUrl(raw) {
    if (/^https?:\/\//i.test(raw) || raw.startsWith("/")) return raw;
    return assetUrl(`app/assets/${raw}`);
}

function ResourceImage({ value, imageHeight }) {
    return h("img", {
        src: resourceUrl(String(value)),
        alt: String(value),
        loading: "lazy",
        style: `max-height:${imageHeight};max-width:100%;border-radius:3px`,
    });
}

// Audio players have a fixed chrome height, so the imageHeight hint does
// not apply; a bounded width keeps them inside narrow cells.
function ResourceAudio({ value }) {
    return h("audio", {
        controls: true,
        preload: "none",
        src: resourceUrl(String(value)),
        title: String(value),
        style: "width:16rem;max-width:100%;height:2rem;vertical-align:middle",
    });
}

function ResourceVideo({ value, imageHeight }) {
    return h("video", {
        controls: true,
        preload: "none",
        src: resourceUrl(String(value)),
        title: String(value),
        style: `max-height:${imageHeight};max-width:100%;border-radius:3px`,
    });
}

registerCellRenderer("resource-image", ResourceImage);
registerCellRenderer("resource-audio", ResourceAudio);
registerCellRenderer("resource-video", ResourceVideo);
