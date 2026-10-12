// @ts-check
import { registerBuiltins } from "./builtin-filters.js";

function guarded(fn, type, name) {
    if (fn == null) return undefined;
    if (typeof fn !== "function") throw new TypeError(`Invalid ${name} for ${type}`);
    return (...args) => {
        const fail = (error) => {
            console.warn(`[pihka] filter type "${type}" ${name}() failed:`, error);
            return null;
        };
        try {
            const value = fn(...args);
            return value?.then ? value.catch(fail) : value;
        } catch (error) {
            return fail(error);
        }
    };
}
export function createFilterRegistry() {
    const types = new Map();
    let sealed = false;
    const registry = {
        register(type, definition, builtin = false) {
            if (sealed) throw new Error("Filter registry sealed");
            if (typeof type !== "string" || !type || !definition || typeof definition !== "object")
                throw new TypeError("Invalid filter definition");
            const def = { type };
            for (const name of ["buildSql", "filterMeta"]) {
                if (definition[name] != null && typeof definition[name] !== "function")
                    throw new TypeError(`Invalid ${name}`);
                def[name] = builtin ? definition[name] : guarded(definition[name], type, name);
            }
            types.set(type, Object.freeze(def));
        },
        get: (type) => types.get(type),
        list: () => [...types.values()],
        seal() {
            sealed = true;
        },
    };
    registerBuiltins((type, def) => registry.register(type, def, true));
    return registry;
}
