/**
 * Download a handful of public-domain book cover images from the Open Library
 * Covers API and save them to pihka/app/assets/covers/{work_id}.jpg.
 *
 * This is a DEMO helper, not a completeness pass: it stops after MAX_COVERS
 * successful downloads. Only those works end up with a cover file on disk;
 * create-sample-db.js then sets the `cover` column of a work iff its
 * covers/{id}.jpg file exists (see that script), so the database only ever
 * claims a cover it can actually serve.
 *
 * Reads scripts/data/works.json + authors.json (author name resolved via
 * author_id) — the same JSON pipeline create-sample-db.js consumes. Writes
 * NO database and does not touch works.json; it only produces image files.
 *
 * Run with:
 *
 *   node scripts/download-covers.js
 *
 * Re-running is cheap and resumable — works whose cover already exists are
 * skipped (and count toward the cap so re-runs stay bounded).
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, 'data');
const COVERS_DIR = join(__dirname, '..', 'pihka', 'app', 'assets', 'covers');

const MAX_COVERS = 50;                 // demo ceiling — leave the rest empty
const THROTTLE_MS = 500;               // pause AFTER a download (polite to openlibrary.org)
const USER_AGENT =
  'Pihka-sample-dataset/0.1 (+https://github.com/GhentCDH/pihka; ghentcdh@ugent.be)';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchJson(url) {
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function main() {
  const authors = JSON.parse(readFileSync(join(DATA_DIR, 'authors.json'), 'utf8'));
  const works = JSON.parse(readFileSync(join(DATA_DIR, 'works.json'), 'utf8'));
  const authorName = Object.fromEntries(authors.map((a) => [a.id, a.name]));

  mkdirSync(COVERS_DIR, { recursive: true });

  let saved = 0;
  let skippedExisting = 0;
  let missing = 0;

  for (const work of works) {
    if (saved >= MAX_COVERS) {
      console.log(`\nReached ${MAX_COVERS}-cover cap — stopping.`);
      break;
    }

    const outPath = join(COVERS_DIR, `${work.id}.jpg`);
    if (existsSync(outPath)) {
      skippedExisting++;
      saved++; // counts toward the cap so re-runs stay bounded
      continue;
    }

    const author = authorName[work.author_id] || '';

    let coverId;
    try {
      const searchUrl =
        `https://openlibrary.org/search.json` +
        `?title=${encodeURIComponent(work.title)}` +
        `&author=${encodeURIComponent(author)}` +
        `&limit=1&fields=cover_i`;
      const data = await fetchJson(searchUrl);
      coverId = data.docs?.[0]?.cover_i;
    } catch (err) {
      console.warn(`  search failed for "${work.title}": ${err.message}`);
      missing++;
      continue;
    }

    if (!coverId) {
      console.log(`  no cover: ${author} — ${work.title}`);
      missing++;
      continue;
    }

    let buffer;
    try {
      const res = await fetch(`https://covers.openlibrary.org/b/id/${coverId}-M.jpg`, {
        headers: { 'User-Agent': USER_AGENT },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      buffer = Buffer.from(await res.arrayBuffer());
    } catch (err) {
      console.warn(`  cover download failed for "${work.title}": ${err.message}`);
      missing++;
      continue;
    }

    // Open Library serves a tiny 1x1 (or a few bytes) placeholder when the
    // cover id has no real image — skip those so we don't store blanks.
    if (buffer.length < 1024) {
      console.log(`  placeholder cover, skipping: ${author} — ${work.title}`);
      missing++;
      continue;
    }

    writeFileSync(outPath, buffer);
    saved++;
    console.log(`✓  ${author} — ${work.title}  (cover ${coverId}, ${buffer.length} bytes)`);
    await sleep(THROTTLE_MS);
  }

  console.log(
    `\nDone. ${saved} covers available (${skippedExisting} already on disk, ${missing} not found).`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
