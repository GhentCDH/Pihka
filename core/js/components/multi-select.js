import { h } from "preact";

export default function MultiSelect({ label, options, selected, onChange }) {
    const handleToggle = (value) => {
        const next = new Set(selected);
        if (next.has(value)) {
            next.delete(value);
        } else {
            next.add(value);
        }
        onChange(next);
    };

    return h("fieldset", { style: "border:none;padding:0" },
        h("legend", { style: "font-size:.85em;font-weight:600" }, label),
        h("div", { style: "display:flex;flex-wrap:wrap;gap:.25rem" },
            options.map(opt =>
                h("button", {
                    key: opt.value,
                    class: selected.has(opt.value) ? "" : "outline",
                    style: "padding:.25em .6em;font-size:.8em;margin:0",
                    onClick: () => handleToggle(opt.value),
                }, opt.display),
            ),
        ),
    );
}
