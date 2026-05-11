import { Protocol } from "pmtiles";
import { loadMaplibre } from "./maplibre-shim.js";

let registered = false;

/**
 * Register the pmtiles:// protocol on maplibre. Idempotent — safe to call
 * from every map instance's effect.
 */
export async function ensurePmtilesProtocol() {
    if (registered) return;
    const maplibregl = await loadMaplibre();
    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);
    registered = true;
}
