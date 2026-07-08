/**
 * Text-annotations extension, based on @ghentcdh/annotated-text
 * (https://github.com/GhentCDH/annotated-text): stand-off annotations —
 * spans addressed by character start/end offsets — highlighted on top of
 * a text column.
 *
 * Enable it like any component module, then mark the column holding the
 * text:
 *
 *   "components": ["extensions/text-annotations/text-annotations-component.js"],
 *   "tables": {
 *     "text_pages": { "columns": { "body": { "type": "annotated-text" } } }
 *   }
 *
 * Cells of an "annotated-text" column render as a badge linking to the
 * row's detail page in the "annotated-text" view. The annotations
 * themselves are auto-detected from schema metadata, no config: the first
 * table referencing this row's table whose schema also has non-PK integer
 * "start" and "end" columns (offsets into the text, relative to its first
 * character). An optional "type" column color-codes the annotations; an
 * optional "label" column captions them. The library is vendored under
 * vendor/@ghentcdh/annotated-text/ (see deps.json and `npm run vendorize`).
 */

import { registerView } from "../../core/js/utilities-ui/view-registry.js";
import { registerCellRenderer } from "../../core/js/utilities-ui/cell-renderers.js";
import { ensureStylesheet } from "../../core/js/utilities-ui/stylesheets.js";
import { AnnotatedTextDetailView } from "./js/annotated-text-detail-view.js";
import { AnnotatedTextCell } from "./js/annotated-text-cell.js";

ensureStylesheet(new URL("./vendor/@ghentcdh/annotated-text/index.css", import.meta.url).href);
ensureStylesheet(new URL("./css/text-annotations.css", import.meta.url).href);

registerCellRenderer("annotated-text", AnnotatedTextCell);

registerView({
    id: "annotated-text",
    context: "detail",
    icon: "🖍",
    availableFor: (columns) => columns.some(c => c.displayType === "annotated-text"),
    component: AnnotatedTextDetailView,
});
