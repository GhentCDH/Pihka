import { h } from "preact";
import RangeSelector from "./range-selector.js";
import MultiSelect from "./multi-select.js";

export default function FilterBar({
    rangeFilters, multiFilters, onRangeChange, onMultiChange,
}) {
    if (rangeFilters.length === 0 && multiFilters.length === 0) return null;

    return h("div", { style: "margin-bottom:1rem;padding:1rem;background:var(--bg-subtle);border-radius:6px" },
        h("div", { style: "display:flex;flex-wrap:wrap;gap:1rem;align-items:start" },
            ...multiFilters.map(mf =>
                h(MultiSelect, {
                    key: mf.colName,
                    label: mf.label,
                    options: mf.options,
                    selected: mf.selected,
                    onChange: (sel) => onMultiChange(mf.colName, sel),
                }),
            ),
            ...rangeFilters.map(rf =>
                h(RangeSelector, {
                    key: rf.colName,
                    label: rf.colName,
                    min: rf.min,
                    max: rf.max,
                    currentMin: rf.currentMin,
                    currentMax: rf.currentMax,
                    step: rf.step,
                    onChangeMin: (v) => onRangeChange(rf.colName, "min", v),
                    onChangeMax: (v) => onRangeChange(rf.colName, "max", v),
                }),
            ),
        ),
    );
}
