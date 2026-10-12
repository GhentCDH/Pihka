// @ts-check
import { boundsFilterType } from "./js/bounds-engine.js";

export function register({ registerFilterType }) {
    registerFilterType("bounds", boundsFilterType);
}
