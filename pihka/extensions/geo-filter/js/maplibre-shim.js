/**
 * maplibre-gl ships only as a UMD bundle (no native ESM), so an
 *   import maplibregl from "maplibre-gl"
 * resolves to a module with no default export. This shim loads the UMD
 * script on demand and resolves to the global `maplibregl` it installs.
 *
 * Several extensions vendor their own maplibre copy; the load is guarded
 * through globals so only the FIRST caller injects a script — later
 * callers (even from another extension, mid-load) share it.
 */

const UMD_PATH = new URL("../vendor/maplibre-gl/dist/maplibre-gl.js", import.meta.url).href;

export function loadMaplibre() {
    if (globalThis.maplibregl) return Promise.resolve(globalThis.maplibregl);
    if (globalThis.__pihkaMaplibreLoading) return globalThis.__pihkaMaplibreLoading;

    globalThis.__pihkaMaplibreLoading = new Promise((resolve, reject) => {
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
    return globalThis.__pihkaMaplibreLoading;
}
