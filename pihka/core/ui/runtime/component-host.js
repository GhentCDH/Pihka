// @ts-check
import { h, createContext } from "preact";
import { useContext } from "preact/hooks";
import { withErrorBoundary, guardPredicate } from "./error-boundary.js";
export const RegistryContext = createContext(null);
export const useRegistry = () => useContext(RegistryContext);
const guarded = new WeakMap();
export function guardedDefinition(def) {
    if (!def) return undefined;
    if (!guarded.has(def))
        guarded.set(def, {
            ...def,
            component: withErrorBoundary(
                def.component,
                `${def.kind} ${def.context ? def.context + ":" : ""}${def.id}`,
                def.kind === "cell" ? (props) => String(props.value ?? "") : null,
            ),
            availableFor: guardPredicate(def.availableFor, `${def.kind} ${def.id}`),
        });
    return guarded.get(def);
}
export function ComponentHost({
    kind,
    id,
    context = undefined,
    registry: supplied = null,
    ...props
}) {
    const inherited = useRegistry();
    const def = guardedDefinition((supplied || inherited)?.get(kind, id, context));
    return def
        ? h(def.component, props)
        : h("span", { class: "component-error" }, `Missing component: ${kind}:${id}`);
}
export const registeredComponent = (kind, id, context) => (props) =>
    h(ComponentHost, { ...props, kind, id, context });
