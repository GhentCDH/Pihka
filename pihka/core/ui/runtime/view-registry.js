// @ts-check
import { useRegistry, guardedDefinition } from "./component-host.js";
export function getView(context, id) { return guardedDefinition(useRegistry()?.get("view", id, context)); }
export function listViews(context) { return (useRegistry()?.list("view", context) || []).map(guardedDefinition); }
export function isValidViewId(id, registry) { return !!(registry?.get("view", id, "list") || registry?.get("view", id, "detail")); }
