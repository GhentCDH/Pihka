// @ts-check
/** Framework-independent, instance-owned definitions. No rendering or engine policy. */
export function createComponentRegistry() {
    let sealed = false;
    const components = new Map();
    const codecs = new Map();
    const key = (kind, id, context = "") => `${kind}:${context}:${id}`;
    return {
        get: (kind, id, context) => components.get(key(kind, id, context)),
        list: (kind, context) =>
            [...components.values()].filter(
                (d) => d.kind === kind && (context == null || d.context === context),
            ),
        codecs: () => [...codecs.values()],
        seal() {
            sealed = true;
        },
        install(plugin) {
            if (sealed) throw new Error("UI registry is sealed");
            const staged = new Map();
            const filters = new Map();
            const styles = [];
            let open = true;
            const assertOpen = () => {
                if (!open) throw new Error("Plugin registration scope is closed");
            };
            const api = Object.freeze({
                registerComponent(def) {
                    assertOpen();
                    if (
                        !["shell", "page", "control", "view", "cell", "facet"].includes(def.kind) ||
                        !/^[a-z][a-z0-9_-]*$/.test(def.id) ||
                        typeof def.component !== "function"
                    )
                        throw new Error("Invalid component definition");
                    if (def.kind === "view" && !["list", "detail"].includes(def.context))
                        throw new Error("Invalid view context");
                    staged.set(
                        key(def.kind, def.id, def.context),
                        Object.freeze({ paginated: true, icon: "", ...def }),
                    );
                },
                registerFilterCodec(id, def) {
                    assertOpen();
                    if (typeof id !== "string" || !id) throw new Error("Invalid codec id");
                    filters.set(id, Object.freeze({ reservedParams: [], ...def, type: id }));
                },
                stylesheet(href, options) {
                    assertOpen();
                    styles.push({ href, options });
                },
            });
            try {
                const result = plugin.register(api);
                if (result && typeof result.then === "function") {
                    result.catch(() => {});
                    throw new Error("UI installers must be synchronous");
                }
                for (const [k, v] of staged) components.set(k, v);
                for (const [k, v] of filters) codecs.set(k, v);
                return styles;
            } finally {
                open = false;
            }
        },
    };
}
