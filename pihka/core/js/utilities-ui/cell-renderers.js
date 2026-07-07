/**
 * Registry of custom cell renderers, keyed by column `type` — the
 * column-level counterpart of the view registry. Component modules
 * (extensions, app) register a Preact component for a type name; columns
 * configured with that type then render through it in every builtin view
 * (table cells, card fields, detail rows).
 *
 * Registering a builtin type name ("url", "asset", ...) overrides the
 * builtin rendering, mirroring registerView's override semantics. FK and
 * linkTo columns are structural link concerns and always win over
 * registered renderers.
 *
 * A renderer component receives:
 *   col           - annotated column metadata (displayType, format, ...)
 *   value         - raw cell value (never null/"" — empty cells short-circuit)
 *   row           - full row object (null when unavailable)
 *   columns       - the row's column schema array (null when unavailable)
 *   fkResolved    - FK display maps for the row's table
 *   lang          - current language code
 *   perspectiveId - perspective the row is shown under (null when unavailable)
 *   imageHeight   - CSS max-height hint for media rendering
 */

import { registerDisplayType } from "../utilities-data/table-config.js";
import { withErrorBoundary } from "./error-boundary.js";

const renderers = new Map();

/**
 * Register a cell renderer for a column `type`. Also registers the type
 * name so applyTableConfig() accepts it in column config.
 *
 * @param {string} type - column type name as used in config
 * @param {import("preact").ComponentType<any>} component
 */
export function registerCellRenderer(type, component) {
    if (typeof type !== "string" || !type) {
        throw new Error(`registerCellRenderer: invalid type "${type}"`);
    }
    if (typeof component !== "function") {
        throw new Error(`registerCellRenderer: "${type}" needs a component function`);
    }
    registerDisplayType(type);
    // Crashing cell renderers fall back to the raw value — a table full of
    // "failed to render" chips would be noisier than the plain data.
    renderers.set(type, withErrorBoundary(component, `cell renderer "${type}"`,
        (props) => String(props?.value ?? "")));
}

/**
 * @param {string|undefined} type
 * @returns {import("preact").ComponentType<any>|undefined}
 */
export function getCellRenderer(type) {
    return renderers.get(type);
}
