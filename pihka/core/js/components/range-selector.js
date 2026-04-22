import { h } from "preact";

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

    const range = max - min || 1;
    const loPercent = ((lo - min) / range) * 100;
    const hiPercent = ((hi - min) / range) * 100;

    return h("div", { class: "range-selector" },
        // Label row with values in boxes (Cinema Belgica style)
        h("div", { class: "range-header" },
            h("span", { class: "range-label" }, label),
        ),
        h("div", { class: "range-values" },
            h("span", { class: "range-value-box" }, lo),
            h("span", { class: "range-value-box" }, hi),
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
