// @ts-check
/**
 * Lazily load MapLibre's native ES module and its local worker. Each map
 * extension vendors a self-contained copy; a shared promise ensures both
 * extensions use one module instance and one protocol registry per page.
 */
export function loadMaplibre() {
    if (globalThis.maplibregl) return Promise.resolve(globalThis.maplibregl);
    if (!globalThis.__pihkaMaplibreLoading) {
        globalThis.__pihkaMaplibreLoading = import("../vendor/maplibre-gl/dist/maplibre-gl.mjs")
            .then(module => {
                globalThis.maplibregl = module;
                return module;
            })
            .catch(error => {
                globalThis.__pihkaMaplibreLoading = null;
                throw error;
            });
    }
    return globalThis.__pihkaMaplibreLoading;
}
