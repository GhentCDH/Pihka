// @ts-check
const quote = (value) => `"${value.replace(/"/g, '""')}"`;
const scalar = (value) =>
    typeof value === "string" || (typeof value === "number" && Number.isFinite(value));
function selected(filter) {
    if (!Array.isArray(filter.selected) || !filter.selected.every(scalar)) {
        throw new TypeError("Filter selected must be an array of strings or finite numbers");
    }
    return filter.selected;
}
export function registerBuiltins(register) {
    register("search", {});
    register("range", {
        buildSql(key, filter) {
            const conditions = [],
                params = [];
            for (const [bound, operator] of [
                ["min", ">="],
                ["max", "<="],
            ]) {
                const value = filter[bound];
                if (value == null) continue;
                if (typeof value !== "number" || !Number.isFinite(value))
                    throw new TypeError("Range bounds must be finite numbers");
                conditions.push(`${quote(key)} ${operator} ?`);
                params.push(value);
            }
            return { conditions, params };
        },
    });
    register("multi", {
        buildSql(key, filter) {
            const values = selected(filter);
            return values.length
                ? {
                      conditions: [`${quote(key)} IN (${values.map(() => "?").join(", ")})`],
                      params: values,
                  }
                : null;
        },
    });
    register("m2m", {
        buildSql(key, filter) {
            const values = selected(filter);
            for (const name of ["table", "refColumn", "viaColumn", "junction", "targetColumn"]) {
                if (typeof filter[name] !== "string" || !filter[name])
                    throw new TypeError(`Missing m2m ${name}`);
            }
            return values.length
                ? {
                      conditions: [
                          `${quote(filter.table)}.${quote(filter.refColumn)} IN (SELECT ${quote(filter.viaColumn)} FROM ${quote(filter.junction)} WHERE ${quote(filter.targetColumn)} IN (${values.map(() => "?").join(", ")}))`,
                      ],
                      params: values,
                  }
                : null;
        },
    });
}
