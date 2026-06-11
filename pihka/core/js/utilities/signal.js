import { useState, useEffect } from "preact/hooks";

/**
 * Deliberately tiny in-house signal primitive: a mutable value with
 * subscribers, plus a hook to read it reactively from components.
 * Kept in-repo instead of vendoring @preact/signals — the project accepts
 * maintaining small duplicated utilities over adding dependencies
 * (see PAPER.md, "Bundleless Javascript").
 *
 * @template T
 * @param {T} initial
 * @returns {{ value: T, subscribe: (fn: (v: T) => void) => (() => void), peek: () => T }}
 */
export function signal(initial) {
    let value = initial;
    const subscribers = new Set();

    return {
        get value() {
            return value;
        },
        set value(next) {
            if (next === value) return;
            value = next;
            for (const fn of [...subscribers]) fn(next);
        },
        subscribe(fn) {
            subscribers.add(fn);
            return () => subscribers.delete(fn);
        },
        peek() {
            return value;
        },
    };
}

/**
 * Read a signal's value reactively: the component re-renders when the
 * signal changes.
 *
 * @template T
 * @param {{ value: T, subscribe: Function }} sig
 * @returns {T}
 */
export function useSignalValue(sig) {
    const [value, setValue] = useState(sig.value);
    useEffect(() => {
        // Catch changes that happened between first render and subscription.
        setValue(sig.value);
        return sig.subscribe(setValue);
    }, [sig]);
    return value;
}
