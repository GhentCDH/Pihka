/**
 * Error boundary for registered components. Core does not trust
 * extensions or app modules: a component that throws while rendering must
 * degrade to a small inline fallback instead of unmounting the whole app.
 * Every registry wraps the components it stores with withErrorBoundary(),
 * so builtins and extensions get the same safety net.
 */

import { h, Component } from "preact";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    componentDidCatch(error) {
        console.warn(`[pihka] component "${this.props.label}" crashed:`, error);
        this.setState({ error });
    }

    // New props (e.g. navigating to another row) retry the child — a
    // broken render for one input must not poison the next. If the child
    // throws again, componentDidCatch re-arms the fallback.
    componentWillReceiveProps() {
        if (this.state.error) this.setState({ error: null });
    }

    render() {
        if (this.state.error) {
            if (this.props.fallback) return this.props.fallback(this.props.childProps);
            return h("span", {
                class: "component-error",
                style: "color:var(--text-muted);font-size:.8em",
                title: String(this.state.error),
            }, `⚠ ${this.props.label} failed to render`);
        }
        return this.props.children;
    }
}

/**
 * Wrap a component so its render errors degrade to an inline fallback.
 *
 * @param {import("preact").ComponentType<any>} Inner
 * @param {string} label - shown in the fallback and the console warning
 * @param {(props: Object) => any} [fallback] - optional custom fallback
 *   render receiving the original props (e.g. cell renderers fall back to
 *   the raw value)
 * @returns {import("preact").ComponentType<any>}
 */
export function withErrorBoundary(Inner, label, fallback = null) {
    return (props) => h(ErrorBoundary, { label, fallback, childProps: props },
        h(Inner, props),
    );
}

/**
 * Guard a registered predicate (e.g. availableFor): a throw degrades to
 * `false` + a console warning instead of crashing the caller. Null/absent
 * predicates pass through unchanged.
 *
 * @param {((...args: any[]) => boolean)|null|undefined} predicate
 * @param {string} label
 * @returns {((...args: any[]) => boolean)|null}
 */
export function guardPredicate(predicate, label) {
    if (typeof predicate !== "function") return null;
    return (...args) => {
        try {
            return predicate(...args);
        } catch (err) {
            console.warn(`[pihka] ${label} availableFor() failed:`, err);
            return false;
        }
    };
}
