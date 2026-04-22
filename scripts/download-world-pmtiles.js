/**
 * Download the latest Protomaps world basemap as a PMTiles file (maxzoom 9)
 *
 * Protomaps publishes daily OpenStreetMap-based vector tile builds at
 * https://maps.protomaps.com/builds/. Each build is a single .pmtiles
 * file (~130 GB at full zoom). This script extracts a lightweight subset
 * limited to zoom level 9, which is roughly city-level detail (~1.5 GB).
 *
 * PMTiles is a cloud-optimised single-file archive for map tiles that can
 * be served statically over HTTP using range requests — no tile server
 * needed. See: https://docs.protomaps.com/pmtiles/
 *
 * Requirements:
 *   - pmtiles CLI (Go binary): https://docs.protomaps.com/pmtiles/cli
 *     brew install protomaps/pm/pmtiles   (macOS)
 *
 * Run with: node scripts/download-world-pmtiles.js [--dry-run] [--maxzoom=N]
 */

import { existsSync, mkdirSync } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "pihka", "app", "assets", "tilesets");

const BUILDS_API = "https://build-metadata.protomaps.dev/builds.json";
const BUILD_BASE = "https://build.protomaps.com";
const DEFAULT_MAXZOOM = 4;

// ---------------------------------------------------------------------------
// Parse CLI flags
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const maxzoomFlag = args.find((a) => a.startsWith("--maxzoom="));
const maxzoom = maxzoomFlag ? Number(maxzoomFlag.split("=")[1]) : DEFAULT_MAXZOOM;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function fetchLatestBuild() {
  const res = await fetch(BUILDS_API);
  if (!res.ok) throw new Error(`Failed to fetch builds: ${res.status}`);

  const builds = await res.json();

  // Each entry has { key: "YYYYMMDD.pmtiles", size, uploaded, version, ... }
  // Sort descending by key (date string) to get the most recent first.
  builds.sort((a, b) => (a.key < b.key ? 1 : a.key > b.key ? -1 : 0));

  return builds[0];
}

function ensurePmtilesCli() {
  try {
    const version = execSync("pmtiles version", { encoding: "utf-8" }).trim();
    console.log(`  Using ${version}`);
  } catch {
    console.error(
      'Error: "pmtiles" CLI not found.\n' +
        "Install it with:  brew install protomaps/pm/pmtiles\n" +
        "Or see: https://docs.protomaps.com/pmtiles/cli"
    );
    process.exit(1);
  }
}

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  ensurePmtilesCli();
  ensureDataDir();

  console.log("\nFetching latest build info from Protomaps...");
  const latest = await fetchLatestBuild();
  const date = latest.key.replace(".pmtiles", "");
  const sourceUrl = `${BUILD_BASE}/${latest.key}`;
  const outName = `${date}-maxzoom${maxzoom}.pmtiles`;
  const outPath = join(DATA_DIR, outName);

  console.log(`  Latest build:  ${latest.key}`);
  console.log(`  Uploaded:      ${latest.uploaded}`);
  console.log(`  Version:       ${latest.version}`);
  console.log(`  Full size:     ${(latest.size / 1024 ** 3).toFixed(1)} GB`);
  console.log(`  Source:        ${sourceUrl}`);
  console.log(`  Output:        ${outPath}`);
  console.log(`  Max zoom:      ${maxzoom}`);

  if (!dryRun && existsSync(outPath)) {
    console.log(`\n  File already exists, skipping. Delete it to re-download.`);
    return;
  }

  const cmd = [
    "pmtiles",
    "extract",
    sourceUrl,
    outPath,
    `--maxzoom=${maxzoom}`,
    ...(dryRun ? ["--dry-run"] : []),
  ].join(" ");

  console.log(`\n  Running: ${cmd}\n`);

  execSync(cmd, { stdio: "inherit" });

  if (dryRun) {
    console.log("\nDry run complete — no file was written.");
  } else {
    console.log(`\nDone. Saved to ${outPath}`);
  }
}

main().catch((err) => {
  console.error("\nError:", err.message);
  process.exit(1);
});
