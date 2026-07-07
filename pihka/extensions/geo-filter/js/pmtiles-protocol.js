import { Protocol } from "../vendor/pmtiles/dist/esm/index.js";
import { loadMaplibre } from "./maplibre-shim.js";

/**
 * Register the pmtiles:// protocol on maplibre. Idempotent across
 * extensions — the guard is a global promise, so several extensions with
 * their own vendored pmtiles copy still register the protocol only once.
 */
export function ensurePmtilesProtocol() {
    if (!globalThis.__pihkaPmtilesProtocol) {
        globalThis.__pihkaPmtilesProtocol = (async () => {
            const maplibregl = await loadMaplibre();
            const protocol = new Protocol();
            maplibregl.addProtocol("pmtiles", protocol.tile);
        })();
    }
    return globalThis.__pihkaPmtilesProtocol;
}
