/**
 * IIIF manifest viewer extension, based on TIFY (https://tify.rocks).
 *
 * Enable it like any component module, then mark the column holding
 * IIIF manifest URLs:
 *
 *   "components": ["extensions/iiif-viewer/iiif-viewer-component.js"],
 *   "tables": {
 *     "works": { "columns": { "manifest": { "type": "iiif" } } }
 *   }
 *
 * Cells of an "iiif" column render as a badge linking to the row's
 * detail page in the "iiif" view, where TIFY renders the manifest
 * full-size. TIFY itself is vendored under vendor/tify/ (see deps.json
 * and `npm run vendorize`).
 */

import { registerView } from "../../core/js/utilities-ui/view-registry.js";
import { registerCellRenderer } from "../../core/js/utilities-ui/cell-renderers.js";
import { ensureStylesheet } from "../../core/js/utilities-ui/stylesheets.js";
import { IiifDetailView } from "./js/iiif-detail-view.js";
import { IiifCell } from "./js/iiif-cell.js";

ensureStylesheet(new URL("./vendor/tify/dist/tify.css", import.meta.url).href);
ensureStylesheet(new URL("./css/iiif-viewer.css", import.meta.url).href);

registerCellRenderer("iiif", IiifCell);

registerView({
    id: "iiif",
    context: "detail",
    icon: "📖",
    availableFor: (columns) => columns.some(c => c.displayType === "iiif"),
    component: IiifDetailView,
});
