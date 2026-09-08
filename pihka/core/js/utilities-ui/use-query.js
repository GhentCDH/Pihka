import { useEffect, useMemo, useState } from "preact/hooks";
import { h } from "preact";

// Hide the previous result immediately when dependencies change, and ignore
// completions from superseded requests (including after unmount).
export function useQuery(load, dependencies, enabled = true) {
    const key = useMemo(() => ({}), [...dependencies, enabled]);
    const [state, setState] = useState(null);
    useEffect(() => {
        if (!enabled) return;
        let current = true;
        Promise.resolve().then(load).then(
            data => { if (current) setState({ key, data, error: null }); },
            error => { if (current) setState({ key, data: null, error }); },
        );
        return () => { current = false; };
    }, [key]);
    return state?.key === key ? { ...state, loading: false }
        : { data: null, previousData: state?.data, error: null, loading: enabled };
}

export function QueryStatus({ error = null }) {
    return error
        ? h("p", { role: "alert" }, `Could not load data: ${error.message || error}`)
        : h("p", { "aria-busy": "true" }, "Loading data...");
}
