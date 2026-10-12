// @ts-check
/** URL codecs are scoped to the UI registry, never SQL handlers. */
export function codecHelpers(registry, capabilities) {
    const enabled = new Set(capabilities?.filters || ["search", "range", "multi", "m2m"]);
    const definitions = registry.codecs().filter((d) => enabled.has(d.type));
    const safe = definitions.map((def) => ({
        ...def,
        decode:
            def.decode &&
            ((...args) => {
                try {
                    return def.decode(...args);
                } catch (e) {
                    console.warn(`[pihka] codec ${def.type} decode failed`, e);
                    return null;
                }
            }),
        encode:
            def.encode &&
            ((...args) => {
                try {
                    return def.encode(...args);
                } catch (e) {
                    console.warn(`[pihka] codec ${def.type} encode failed`, e);
                    return null;
                }
            }),
    }));
    return {
        listFilterTypes: () => safe,
        getFilterType: (type) => safe.find((d) => d.type === type),
        allReservedParams: () => new Set(safe.flatMap((d) => d.reservedParams)),
        preservedParams: () =>
            new Set(safe.filter((d) => d.preservesParams).flatMap((d) => d.reservedParams)),
    };
}
