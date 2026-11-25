// @ts-check
/**
 * Built-in UI strings (en/nl). Falls back to English for unknown languages.
 * Data-driven labels (tables, columns, menu) come from config, not here.
 */
const STRINGS = {
    en: {
        "home.title": "Explore the data",
        "home.search": "Search the whole database…",
        "home.views": "Views",
        "home.tables": "Tables",
        "search.placeholder": "Search…",
        "search.off": "Search is off for this view",
        "search.offHint": "Full-text search is not enabled for this view. Set \"fts\": true on the perspective in config.json.",
        "filters.title": "Filters",
        "filters.active": "{n} active",
        "filters.clearAll": "Clear all",
        "filters.clear": "Clear",
        "page.label": "Page",
        "page.of": "of {n}",
        "page.previous": "Previous page",
        "page.next": "Next page",
        "page.goto": "Go to page",
        "range.of": "of",
        "ui.theme.light": "Switch to light mode",
        "ui.theme.dark": "Switch to dark mode",
        "ui.fullscreen.enter": "Enter full screen",
        "ui.fullscreen.exit": "Exit full screen",
        "ui.controls": "Page controls",
        "ui.languages": "Language",
        "results.none": "No results",
        "results.count": "{n} results",
    },
    nl: {
        "home.title": "Verken de data",
        "home.search": "Doorzoek de hele database…",
        "home.views": "Weergaven",
        "home.tables": "Tabellen",
        "search.placeholder": "Zoeken…",
        "search.off": "Zoeken staat uit voor deze weergave",
        "search.offHint": "Zoeken in volledige tekst is niet ingeschakeld voor deze weergave. Zet \"fts\": true bij het perspectief in config.json.",
        "filters.title": "Filters",
        "filters.active": "{n} actief",
        "filters.clearAll": "Alles wissen",
        "filters.clear": "Wissen",
        "page.label": "Pagina",
        "page.of": "van {n}",
        "page.previous": "Vorige pagina",
        "page.next": "Volgende pagina",
        "page.goto": "Ga naar pagina",
        "range.of": "van",
        "ui.theme.light": "Schakel naar lichte modus",
        "ui.theme.dark": "Schakel naar donkere modus",
        "ui.fullscreen.enter": "Volledig scherm",
        "ui.fullscreen.exit": "Volledig scherm verlaten",
        "ui.controls": "Paginabediening",
        "ui.languages": "Taal",
        "results.none": "Geen resultaten",
        "results.count": "{n} resultaten",
    },
};

/**
 * @param {string} key
 * @param {string | null | undefined} lang
 * @param {Record<string, string | number>} [vars]
 */
export function t(key, lang, vars = {}) {
    const table = STRINGS[/** @type {"en"|"nl"} */ (lang)] || STRINGS.en;
    const text = table[key] ?? STRINGS.en[key] ?? key;
    return text.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}

/** "1–25 of 1,743" — compact range label shared by list and related views. */
export function rangeLabel(first, last, total, lang) {
    const fmt = new Intl.NumberFormat(lang || undefined);
    return `${fmt.format(first)}–${fmt.format(last)} ${t("range.of", lang)} ${fmt.format(total)}`;
}
