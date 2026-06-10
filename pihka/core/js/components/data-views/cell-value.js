import { h } from "preact";
import { isImagePath } from "./render-helpers.js";
import { buildPath, assetUrl } from "../../utilities/router.js";
import { formatValue } from "../../utilities/table-config.js";

/**
 * Render a single value according to its column metadata. The one shared
 * implementation behind table cells, card fields, and detail rows.
 *
 * Priority:
 *   1. FK columns: resolved display name + 🔍 link to the referenced row
 *      (link suppressed when the referenced table is hidden)
 *   2. Configured display type: url → external link, asset → image,
 *      number/date → Intl-formatted text
 *   3. Image-extension heuristic (for unconfigured apps)
 *   4. Plain text
 *
 * Props:
 *   col         - column metadata (references, displayType, format, ...)
 *   value       - raw cell value
 *   fkResolved  - FK display maps for the row's table
 *   lang        - current language (Intl locale + not used for FK links,
 *                 which ride the legacy redirect)
 *   imageHeight - CSS max-height for image rendering (context-dependent)
 */
export default function CellValue({ col, value, fkResolved, lang, imageHeight = "4rem" }) {
    const raw = value ?? "";

    // Foreign key → resolved display name + link to referenced entity
    if (col.references && fkResolved && fkResolved[col.name]) {
        const fk = fkResolved[col.name];
        const displayName = fk.displayMap[raw] ?? String(raw);
        if (fk.referencedTableHidden) return h("span", null, displayName);
        return h("span", null,
            displayName,
            " ",
            h("a", {
                href: buildPath(`/${fk.referencedTable}/${raw}`),
                title: `View ${displayName}`,
                style: "opacity:.5;text-decoration:none",
            }, "🔍"),
        );
    }

    if (raw === "") return "";

    if (col.displayType === "url") {
        return h("a", { href: String(raw), target: "_blank", rel: "noopener noreferrer" }, String(raw));
    }

    if (col.displayType === "asset") {
        return h("img", {
            src: assetUrl(`app/assets/${raw}`),
            alt: String(raw),
            style: `max-height:${imageHeight};border-radius:3px`,
        });
    }

    if (col.displayType === "number" || col.displayType === "date") {
        return formatValue(col, raw, lang);
    }

    // Heuristic for unconfigured apps: image-looking paths render as images.
    if (isImagePath(String(raw))) {
        return h("img", {
            src: assetUrl(`app/assets/${raw}`),
            alt: String(raw),
            style: `max-height:${imageHeight};border-radius:3px`,
        });
    }

    return String(raw);
}
