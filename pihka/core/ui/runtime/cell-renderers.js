// @ts-check
import { useRegistry, guardedDefinition } from "./component-host.js";
export function getCellRenderer(id) { return guardedDefinition(useRegistry()?.get("cell", id))?.component; }
