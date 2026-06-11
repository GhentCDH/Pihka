import { signal, useSignalValue } from "./signal.js";

/**
 * Device-local user preferences, persisted as one JSON object under a
 * single localStorage key and exposed as signals so components react to
 * changes from anywhere.
 *
 * Prefs are conveniences, never required state: the URL stays the single
 * source of truth for everything shareable (filters, sort, page, view in
 * the route). Resolution order is always URL > stored pref > config
 * default, and without localStorage the store silently degrades to
 * session-only memory.
 *
 * Flat key convention:
 *   "theme", "lang", "view:<perspectiveId>", "pageSize:<perspectiveId>"
 */

const STORAGE_KEY = "pihka-prefs";

function load() {
    try {
        const prefs = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        // Migrate the pre-prefs standalone keys so existing visitors keep
        // their settings.
        for (const [legacyKey, key] of [["pihka-theme", "theme"], ["pihka-lang", "lang"]]) {
            const v = localStorage.getItem(legacyKey);
            if (v != null && prefs[key] == null) prefs[key] = v;
        }
        return prefs;
    } catch {
        return {};
    }
}

const prefs = load();

/** @type {Map<string, ReturnType<typeof signal>>} */
const signals = new Map();

function prefSignal(key) {
    let sig = signals.get(key);
    if (!sig) {
        sig = signal(prefs[key]);
        signals.set(key, sig);
    }
    return sig;
}

function persist() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
        /* localStorage unavailable — prefs stay session-only */
    }
}

/**
 * Read a preference once (non-reactive — fine for values rendered fresh
 * after navigation, e.g. link targets).
 */
export function getPref(key, fallback = undefined) {
    return prefs[key] ?? fallback;
}

/**
 * Set (or remove, with null/undefined) a preference: updates subscribers
 * and persists.
 */
export function setPref(key, value) {
    if (value == null) {
        delete prefs[key];
    } else {
        prefs[key] = value;
    }
    persist();
    prefSignal(key).value = value ?? undefined;
}

/**
 * Read a preference reactively: the component re-renders when the pref
 * changes (from any component).
 */
export function usePref(key, fallback = undefined) {
    const value = useSignalValue(prefSignal(key));
    return value ?? fallback;
}
