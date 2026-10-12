/** Extract a static world basemap (zoom 4 by default) with the pmtiles CLI.
 * node scripts/download-world-pmtiles.js [--dry-run] [--maxzoom=N]
 *                                      [--extension=point_map|geo-filter]
 */
import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { atomicOutput } from "./lib/atomic-files.js";

const extensionsRoot = fileURLToPath(new URL("../pihka/extensions/", import.meta.url));
const BUILDS_API = "https://build-metadata.protomaps.dev/builds.json";
const BUILD_BASE = "https://build.protomaps.com";

export function parseOptions(args) {
    const options = { dryRun: false, maxzoom: 4, extension: "point_map" };
    for (const arg of args) {
        if (arg === "--dry-run") options.dryRun = true;
        else if (/^--maxzoom=\d+$/.test(arg)) options.maxzoom = Number(arg.slice(10));
        else if (arg.startsWith("--extension=")) options.extension = arg.slice(12);
        else throw new Error(`Unknown or invalid option: ${arg}`);
    }
    if (!Number.isInteger(options.maxzoom) || options.maxzoom < 0 || options.maxzoom > 26) {
        throw new Error("maxzoom must be an integer between 0 and 26");
    }
    if (!["point_map", "geo-filter"].includes(options.extension)) {
        throw new Error("extension must be point_map or geo-filter");
    }
    return options;
}

export async function downloadWorldPmtiles(
    args = [],
    { root = extensionsRoot, fetchImpl = fetch, run = execFileSync } = {},
) {
    const { dryRun, maxzoom, extension } = parseOptions(args);
    const destination = join(root, extension, "assets", "world.pmtiles");
    if (!dryRun && existsSync(destination)) {
        console.log(`File already exists, skipping: ${destination}`);
        return;
    }
    try {
        console.log(`Using ${run("pmtiles", ["version"], { encoding: "utf8" }).trim()}`);
    } catch (error) {
        throw new Error("Install the pmtiles CLI: brew install protomaps/pm/pmtiles", {
            cause: error,
        });
    }
    const response = await fetchImpl(BUILDS_API);
    if (!response.ok) throw new Error(`Failed to fetch builds: HTTP ${response.status}`);
    const builds = await response.json();
    if (
        !Array.isArray(builds) ||
        !builds.length ||
        builds.some((b) => !/^\d{8}\.pmtiles$/.test(b?.key))
    ) {
        throw new Error("No valid PMTiles builds returned");
    }
    const latest = [...builds].sort((a, b) => b.key.localeCompare(a.key))[0];
    const source = `${BUILD_BASE}/${latest.key}`;
    const extract = (temporary) =>
        run(
            "pmtiles",
            [
                "extract",
                source,
                temporary,
                `--maxzoom=${maxzoom}`,
                ...(dryRun ? ["--dry-run"] : []),
            ],
            { stdio: "inherit" },
        );
    console.log(`Extracting ${source} to ${destination} at zoom ${maxzoom}`);
    if (dryRun) extract(destination);
    else await atomicOutput(destination, extract);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    downloadWorldPmtiles(process.argv.slice(2)).catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
}
