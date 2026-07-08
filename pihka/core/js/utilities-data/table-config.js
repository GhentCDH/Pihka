/**
 * Per-table display configuration, from the `tables` section of
 * app/config.json:
 *
 *   "tables": {
 *     "works": {
 *       "label": { "en": "Works", "nl": "Werken" },
 *       "columns": {
 *         "title":   { "label": { "en": "Title" } },
 *         "cover":   { "type": "asset" },
 *         "homepage":{ "type": "url" },
 *         "year":    { "type": "number", "format": { "useGrouping": false } },
 *         "internal_notes": { "hidden": true }
 *       }
 *     },
 *     "audit_log": { "hidden": true }
 *   }
 *
 * applyTableConfig() annotates the schema metadata with this display
 * information once at startup, so every downstream consumer (data layer
 * and components alike) reads plain JSON off the table/column objects and
 * never touches the config itself.
 */

const DISPLAY_TYPES = new Set(["text", "number", "date", "url", "asset", "list"]);

/**
 * Accept an additional column `type` value in config. Component modules
 * (extensions, app) call this — usually indirectly via registerCellRenderer —
 * before applyTableConfig() runs, so configured columns of that type get
 * their displayType annotated instead of warned about.
 *
 * @param {string} name
 */
export function registerDisplayType(name) {
    DISPLAY_TYPES.add(name);
}

/**
 * Annotate schema metadata in place with display configuration.
 * Tables gain `hidden` and `label`; columns gain `hidden`, `label`,
 * `displayType`, and `format`.
 *
 * Note: hiding is a display concern, not access control — the data stays
 * in the published .sqlite file.
 *
 * @param {{ tables: Object }} meta - from DataSource#metadata()
 * @param {Object} config - parsed app/config.json
 */
export function applyTableConfig(meta, config) {
    const tablesCfg = config?.tables;
    if (!tablesCfg || typeof tablesCfg !== "object") return;

    for (const [tableName, tableMeta] of Object.entries(meta.tables)) {
        const cfg = tablesCfg[tableName];
        if (!cfg) continue;

        tableMeta.hidden = cfg.hidden === true;
        tableMeta.label = cfg.label ?? null;

        const columnsCfg = cfg.columns;
        if (!columnsCfg || typeof columnsCfg !== "object") continue;

        for (const col of tableMeta.columns) {
            const c = columnsCfg[col.name];
            if (!c) continue;

            col.hidden = c.hidden === true;
            col.label = c.label ?? null;
            col.format = c.format ?? null;
            // Opt this column out of the FTS index (kept in the DB, just not
            // searchable). Distinct from the global `enrichment.fts` config,
            // which selects the tokenizer for the whole database.
            col.noFts = c.fts === false;
            // "list" columns: separator the values were aggregated with
            // (e.g. GROUP_CONCAT(x, '|')) and how many to show collapsed.
            col.separator = typeof c.separator === "string" ? c.separator : null;
            col.limit = typeof c.limit === "number" ? c.limit : null;
            // Render values as links into another perspective's detail pages
            // (used for view columns, which have no FK metadata).
            col.linkTo = typeof c.linkTo === "string" ? c.linkTo : null;
            if (c.type != null) {
                if (DISPLAY_TYPES.has(c.type)) {
                    col.displayType = c.type;
                } else {
                    console.warn(
                        `[table-config] ${tableName}.${col.name}: unknown type "${c.type}" ignored`
                        + ` (expected one of ${[...DISPLAY_TYPES].join(", ")})`,
                    );
                }
            }
        }
    }
}

/**
 * Resolve a possibly-multilingual label to a display string.
 * Strings pass through; objects pick the current language, then English,
 * then the first available language; anything missing yields the fallback.
 *
 * @param {string|Object|null|undefined} label
 * @param {string|null} lang - current language code
 * @param {string} fallback - usually the raw column/table name
 * @returns {string}
 */
export function localize(label, lang, fallback) {
    if (!label) return fallback;
    if (typeof label === "string") return label;
    return label[lang] || label.en || Object.values(label)[0] || fallback;
}

/**
 * The columns a view should display (hidden ones filtered out).
 *
 * @param {Array} columns
 * @returns {Array}
 */
export function visibleColumns(columns) {
    return columns.filter(c => !c.hidden);
}

/**
 * Format a value according to a column's configured display type.
 * Only "number" and "date" reach here (url/asset need markup, handled by
 * the cell renderer). Falls back to the raw string for unparseable input.
 *
 * @param {Object} col - column metadata (displayType, format)
 * @param {*} value
 * @param {string|null} lang - locale for Intl formatting
 * @returns {string}
 */
export function formatValue(col, value, lang) {
    if (value == null || value === "") return "";

    if (col.displayType === "number") {
        const n = Number(value);
        if (!Number.isFinite(n)) return String(value);
        return new Intl.NumberFormat(lang || undefined, col.format || {}).format(n);
    }

    if (col.displayType === "date") {
        // Accepts ISO-ish strings and millisecond epochs via new Date().
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) return String(value);
        return new Intl.DateTimeFormat(lang || undefined, col.format || {}).format(d);
    }

    return String(value);
}
