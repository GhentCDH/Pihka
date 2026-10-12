// @ts-check
import { h } from "preact";
import { assetUrl } from "../../runtime/paths.js";

/**
 * Registers default media cells through the same explicit installer API
 * as other UI plugins. Media display requires no external library.
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

export function register(api) {
api.registerComponent({kind:"cell",id:"resource-image",component:ResourceImage});
api.registerComponent({kind:"cell",id:"resource-audio",component:ResourceAudio});
api.registerComponent({kind:"cell",id:"resource-video",component:ResourceVideo});

}
