import { existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { downloadFile } from "./lib/atomic-files.js";

const DATABASES = [
    {
        name: "refs.db",
        url: "https://zenodo.org/records/17163932/files/refs.db?download=1",
        record: "https://zenodo.org/records/17163932",
        description: "SR4CS – Systematic Reviews in Computer Science (944 MB)",
    },
    {
        name: "REZI_enriched.db",
        url: "https://zenodo.org/records/11281918/files/REZI_enriched.db?download=1",
        record: "https://zenodo.org/records/11281918",
        description: "REZI – Wikidata enriched Slovenian geographical names (4 MB)",
    },
    {
        name: "wfo_plantlist_2025-12_2.db",
        url: "https://zenodo.org/records/18291490/files/wfo_plantlist_2025-12_2.db?download=1",
        record: "https://zenodo.org/records/18291490",
        description: "World Flora Online Plant List (1.1 GB)",
    },
    {
        name: "power plants database",
        url: "https://datasette.io/global-power-plants.db",
        record: "https://datasette.io/global-power-plants",
        description: "Global Power Plants Database (11 MB)",
    },
];

const DATA_DIR = fileURLToPath(new URL("../pihka/app/database/", import.meta.url));

function formatBytes(bytes) {
    if (bytes === 0) return "0 B";
    const units = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / 1024 ** i).toFixed(1)} ${units[i]}`;
}

async function download(db) {
    const dest = `${DATA_DIR}${db.name}`;

    if (existsSync(dest)) {
        console.log(`  ✓ ${db.name} already exists, skipping`);
        return;
    }

    console.log(`  ↓ Downloading ${db.name}...`);
    console.log(`    ${db.description}`);
    console.log(`    From: ${db.record}`);

    let lastPercent = -1;
    await downloadFile(db.url, dest, {
        redirect: "follow",
        onProgress(received, total) {
            if (!total) return;
            const percent = Math.floor((received / total) * 100);
            if (percent !== lastPercent && percent % 5 === 0) {
                process.stdout.write(
                    `\r    ${formatBytes(received)} / ${formatBytes(total)}  (${percent}%)`,
                );
                lastPercent = percent;
            }
        },
    });

    console.log(`\n    Done.`);
}

async function main() {
    mkdirSync(DATA_DIR, { recursive: true });

    console.log(`Downloading Zenodo databases to ${DATA_DIR}\n`);

    for (const db of DATABASES) {
        await download(db);
        console.log();
    }

    console.log("All downloads complete.");
}

main().catch((err) => {
    console.error("\nError:", err.message);
    process.exit(1);
});
