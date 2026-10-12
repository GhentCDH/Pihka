// @ts-check
import { h } from "preact";
import { useEffect, useId } from "preact/hooks";
import { useQuery, QueryStatus } from "../../../core/ui/index.js";
import { navigate } from "../../../core/ui/index.js";
import { createAnnotatedText, createHighlightStyle } from "../vendor/@ghentcdh/annotated-text/index.js";

/**
 * Detail view rendering the row's first non-empty "annotated-text" column
 * with its annotations highlighted. Receives the standard DetailViewProps
 * (see core view-registry.js) and requests the annotation rows through the
 * store's JSON facade — no SQL, no knowledge of where the data comes from.
 *
 * The annotations relation is auto-detected from schema metadata alone:
 * the first table referencing this row's table whose schema also carries
 * non-PK integer "start" and "end" columns (character offsets relative to
 * the first character of the text). Optional columns polish the result: a
 * "type" TEXT column color-codes annotations (with a legend), a "label"
 * TEXT column captions them. Anything missing degrades softly, down to
 * rendering the plain text with no highlights at all.
 */

// Highlight palette assigned to distinct "type" values in sorted order —
// deterministic across sessions. Mid-saturation hues stay readable behind
// black text on Pico's light theme and white text on the dark one (the
// library blends them in at partial opacity).
const PALETTE = ["#4c9ee3", "#e3a24c", "#5cb85c", "#c678dd", "#e06c75", "#56b6c2"];

const isIntColumn = (col) => /INT/i.test(col.type ?? "") && !col.primaryKey;

/** First reverse-FK relation whose child table looks like an annotations table. */
async function detectAnnotationRelation(store, table, row) {
    if (!store || !table || !row) return null;
    for (const rel of await store.queryRelated(table, row)) {
        const cols = store.getSchema(rel.table)?.columns ?? [];
        if (cols.some(c => c.name === "start" && isIntColumn(c)) &&
            cols.some(c => c.name === "end" && isIntColumn(c))) {
            return { rel, cols };
        }
    }
    return null;
}

export function AnnotatedTextDetailView({ table, columns, row, store, lang }) {
    // createAnnotatedText() addresses its container by element id string,
    // so the mount point carries a unique DOM id instead of a ref.
    const containerId = "annotated-text-" + useId().replace(/[^a-zA-Z0-9_-]/g, "");

    const textCol = row
        ? columns.find(c => c.displayType === "annotated-text" && row[c.name] != null && row[c.name] !== "")
        : null;
    const text = textCol ? String(row[textCol.name]) : null;

    const detection = useQuery(
        () => detectAnnotationRelation(store, table, row),
        [store, table, row],
    );
    const detected = detection.data;

    // All annotation rows for this row's text, oldest offset first, mapped
    // to the library's {id, start, end, label} shape plus a type-by-id map
    // for styling. Everything is plain JSON in, plain JSON out.
    const annotationQuery = useQuery(async () => {
        if (!detected || !text) return { annotations: [], typeById: new Map(), types: [] };
        const { rel, cols } = detected;
        const pkName = cols.find(c => c.primaryKey)?.name ?? null;
        const textColOf = (name) => cols.find(c => c.name === name && !c.primaryKey && !c.references)?.name ?? null;
        const labelName = textColOf("label");
        const typeName = textColOf("type");

        const { rows } = await store.queryTable(rel.table, {
            filters: { [rel.column]: { type: "multi", selected: [rel.value] } },
            sort: { column: "start", direction: "asc" },
            pageSize: null,
        });

        const typeById = new Map();
        const annotations = rows.map((r, i) => {
            const id = String(pkName ? r[pkName] : i);
            if (typeName && r[typeName] != null) typeById.set(id, String(r[typeName]));
            const label = labelName && r[labelName] != null ? String(r[labelName]) : undefined;
            return { id, start: r.start, end: r.end, ...(label !== undefined && { label }) };
        });
        return { annotations, typeById, types: [...new Set(typeById.values())].sort() };
    }, [detected, text, store]);
    const { annotations, typeById, types } = annotationQuery.data ?? { annotations: [], typeById: new Map(), types: [] };

    useEffect(() => {
        if (!text || detection.loading || annotationQuery.loading || detection.error || annotationQuery.error) return;
        const styles = Object.fromEntries(types.map((t, i) =>
            [t, { default: createHighlightStyle(PALETTE[i % PALETTE.length]) }]));
        const annotated = createAnnotatedText(containerId)
            .setAnnotationAdapter({ create: false, edit: false })
            .registerStyles(styles)
            .setStyleParams({ styleFn: a => typeById.get(String(a.id)) ?? null })
            .setText(text)
            .setAnnotations(annotations)
            .on("click", ({ data }) => {
                const id = data?.annotation?.id;
                if (id != null && detected) {
                    navigate(`/${lang || "en"}/${detected.rel.table}/${id}/table`);
                }
            });
        return () => annotated.destroy();
    }, [text, annotations, typeById, containerId, lang, detection.loading, annotationQuery.loading]);

    if (!row) return h("p", null, "Row not found.");
    if (!text) return h("p", null, "No text for this row.");
    if (detection.loading || annotationQuery.loading || detection.error || annotationQuery.error) return h(QueryStatus, { error: detection.error || annotationQuery.error });

    return h("div", { class: "annotated-text-detail-view" },
        types.length > 0 && h("div", { class: "annotated-text-legend" },
            types.map((t, i) => h("span", {
                key: t,
                class: "annotated-text-legend-chip",
                style: `--annotated-text-chip: ${PALETTE[i % PALETTE.length]}`,
            }, t)),
        ),
        annotations.length === 0 && h("p", { class: "annotated-text-empty" },
            "No annotations found for this text.",
        ),
        h("div", { id: containerId, class: "annotated-text-container" }),
    );
}
