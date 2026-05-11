/**
 * maplibre-gl ships only as a UMD bundle (no native ESM), so an
 *   import maplibregl from "maplibre-gl"
 * resolves to a module with no default export. This shim loads the UMD
 * script on demand and resolves to the global `maplibregl` it installs.
 *
 * Confining this hack to one file means callers can keep writing normal
 * `await loadMaplibre()` and stay agnostic of the loading mechanism.
 */
import { assetUrl } from "../../utilities/router.js";

const UMD_PATH = assetUrl("core/vendor/maplibre-gl/dist/maplibre-gl.js");

let promise = null;

export function loadMaplibre() {
    if (globalThis.maplibregl) return Promise.resolve(globalThis.maplibregl);
    if (promise) return promise;

    promise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = UMD_PATH;
        script.async = true;
        script.onload = () => {
            if (globalThis.maplibregl) resolve(globalThis.maplibregl);
            else reject(new Error("maplibre-gl loaded but globalThis.maplibregl is undefined"));
        };
        script.onerror = () => reject(new Error(`Failed to load maplibre-gl from ${UMD_PATH}`));
        document.head.appendChild(script);
    });
    return promise;
}
