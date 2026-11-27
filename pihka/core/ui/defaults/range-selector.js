// @ts-check
import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

const clamp = (value, lo, hi) => Math.min(Math.max(value, lo), hi);

/** Round to the slider step (integers for years, two decimals for REAL). */
function snap(value, step) {
    if (!step) return value;
    const decimals = (String(step).split(".")[1] || "").length;
    return Number((Math.round(value / step) * step).toFixed(decimals));
}

/**
 * One of the two current-range values. Click it, type a number and press
 * Enter (or leave the box) to apply; Escape cancels.
 *
 * Props: value, min, max, step, label (accessible name), onCommit(number)
 */
function ValueBox({ value, min, max, step, label, onCommit }) {
    const [draft, setDraft] = useState(String(value));
    const cancelled = useRef(false);

    // Follow the real value when the slider (or the URL) changes it.
    useEffect(() => setDraft(String(value)), [value]);

    const commit = () => {
        if (cancelled.current) {
            cancelled.current = false;
            setDraft(String(value));
            return;
        }
        const typed = Number(draft);
        if (draft.trim() === "" || Number.isNaN(typed)) {
            setDraft(String(value));
            return;
        }
        onCommit(typed);
    };

    return h("input", {
        type: "number",
        class: "range-value-box range-value-input",
        inputmode: step && step < 1 ? "decimal" : "numeric",
        min, max, step,
        value: draft,
        "aria-label": label,
        style: `width:${Math.max(String(max).length, String(min).length, 3) + 1.6}ch`,
        onFocus: (e) => /** @type {HTMLInputElement} */ (e.currentTarget).select(),
        onInput: (e) => setDraft(/** @type {HTMLInputElement} */ (e.target).value),
        onBlur: commit,
        onKeyDown: (e) => {
            const input = /** @type {HTMLInputElement} */ (e.currentTarget);
            if (e.key === "Enter") {
                e.preventDefault();
                input.blur();
            } else if (e.key === "Escape") {
                cancelled.current = true;
                input.blur();
            }
        },
    });
}

export default function RangeSelector({
    label, min, max, currentMin, currentMax, onChangeMin, onChangeMax, step,
}) {
    const lo = currentMin ?? min;
    const hi = currentMax ?? max;

    const handleMin = (e) => {
        const val = Number(e.target.value);
        onChangeMin(val <= min ? null : val);
        if (val > hi) onChangeMax(val === max ? null : val);
    };
    const handleMax = (e) => {
        const val = Number(e.target.value);
        onChangeMax(val >= max ? null : val);
        if (val < lo) onChangeMin(val === min ? null : val);
    };

    // Typed values are clamped to the data range and to the other bound, so a
    // single change is made (no double URL update like a crossing slider).
    const commitMin = (typed) => {
        const val = clamp(snap(typed, step), min, hi);
        if (val === lo) return;
        onChangeMin(val <= min ? null : val);
    };
    const commitMax = (typed) => {
        const val = clamp(snap(typed, step), lo, max);
        if (val === hi) return;
        onChangeMax(val >= max ? null : val);
    };

    const range = max - min || 1;
    const loPercent = ((lo - min) / range) * 100;
    const hiPercent = ((hi - min) / range) * 100;

    return h("div", { class: "range-selector" },
        // Single row: label left, current values right (saves vertical space)
        h("div", { class: "facet-header" },
            h("span", { class: "facet-label" }, label),
            h("span", { class: "range-values" },
                h(ValueBox, { value: lo, min, max, step, label: `${label} minimum`, onCommit: commitMin }),
                h("span", { class: "range-value-sep" }, "-"),
                h(ValueBox, { value: hi, min, max, step, label: `${label} maximum`, onCommit: commitMax }),
            ),
        ),
        // Slider track with two overlaid inputs
        h("div", { class: "range-track-container" },
            // Background track
            h("div", { class: "range-track" }),
            // Filled track between thumbs
            h("div", {
                class: "range-track-fill",
                style: `left:${loPercent}%;right:${100 - hiPercent}%`,
            }),
            // Min input — always on top when past midpoint so it stays grabbable
            h("input", {
                type: "range",
                min, max, step,
                value: lo,
                onInput: handleMin,
                "aria-label": `${label} minimum`,
                class: "range-input",
                style: `z-index:${loPercent > 50 ? 4 : 3}`,
            }),
            // Max input
            h("input", {
                type: "range",
                min, max, step,
                value: hi,
                onInput: handleMax,
                "aria-label": `${label} maximum`,
                class: "range-input",
                style: `z-index:${loPercent > 50 ? 3 : 4}`,
            }),
        ),
    );
}
