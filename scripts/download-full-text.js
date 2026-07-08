/**
 * Download full public-domain novel texts from Project Gutenberg for the
 * sample works, and save them as JSON under scripts/data/full_text/.
 *
 * Texts are matched via the Gutendex API (https://gutendex.com), a JSON
 * front end to the Project Gutenberg catalogue. Only confirmed matches are
 * kept: the Gutendex result must be English and its author surname + a
 * significant title word must match the work, so we never store the wrong
 * book. Most of the dataset is modern (in copyright) and will not match —
 * those works simply get no full text.
 *
 * This script writes JSON files only; create-sample-db.js reads them into
 * the `full_text` column when it (re)builds sample.db. Run:
 *
 *   node scripts/download-full-text.js
 *
 * Re-running is cheap and resumable — works whose file already exists are
 * skipped. Stops after MAX_TEXTS successful downloads to bound repo size.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, 'data');
const OUT_DIR = join(DATA_DIR, 'full_text');

const MAX_TEXTS = 150;               // repo-size ceiling (rarely reached)
const THROTTLE_MS = 1000;            // pause AFTER a text download (polite to gutenberg.org)
// Works published on/after this year are almost certainly still in
// copyright, so they won't be on Project Gutenberg — skip the lookup
// entirely rather than spend a metadata round-trip finding nothing.
const PUBLIC_DOMAIN_BEFORE = 1930;
const USER_AGENT =
  'Pihka-sample-dataset/0.1 (+https://github.com/GhentCDH/pihka; ghentcdh@ugent.be)';

const STOPWORDS = new Set(['the', 'a', 'an', 'of', 'and', 'to', 'in', 'is', 'on']);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** ASCII slug: strip diacritics, lowercase, non-alphanumerics → hyphens. */
function slug(s) {
  return String(s)
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Normalize to a set of comparable tokens (diacritic/punct/case-insensitive). */
function tokens(s) {
  return slug(s).split('-').filter(Boolean);
}

/** A title token worth matching on (avoids "the"/"of" false positives). */
function significant(tok) {
  return tok.length >= 4 || !STOPWORDS.has(tok);
}

/**
 * Does a Gutendex result confirm this work? English, author surname
 * present, and at least one significant title word shared.
 */
function isConfirmedMatch(result, authorName, title) {
  if (!result.languages?.includes('en')) return false;

  const surname = tokens(authorName).at(-1);
  if (!surname) return false;
  const resultAuthorTokens = new Set(
    (result.authors || []).flatMap((a) => tokens(a.name)),
  );
  if (!resultAuthorTokens.has(surname)) return false;

  const resultTitleTokens = new Set(tokens(result.title));
  const wanted = tokens(title).filter(significant);
  return wanted.some((t) => resultTitleTokens.has(t));
}

/** Prefer utf-8 plain text, then any plain text; null if none. */
function plainTextUrl(formats) {
  const keys = Object.keys(formats || {});
  // Some entries point at auxiliary files (a -readme.txt, or a .zip served
  // under a text/plain key) rather than the ebook itself — reject those.
  const isRealText = (k) =>
    /^text\/plain/i.test(k) && !/-readme\.txt$|\.zip$/i.test(formats[k]);
  const utf8 = keys.find((k) => isRealText(k) && /utf-8/i.test(k));
  const anyPlain = keys.find(isRealText);
  const key = utf8 || anyPlain;
  return key ? formats[key] : null;
}

/**
 * Remove the Project Gutenberg license header/footer, keeping the body
 * between the START and END markers. Falls back to the whole text.
 */
function stripBoilerplate(text) {
  const start = text.match(/^\*\*\* *START OF (?:THE|THIS) PROJECT GUTENBERG EBOOK.*\*\*\* *$/im);
  const end = text.match(/^\*\*\* *END OF (?:THE|THIS) PROJECT GUTENBERG EBOOK.*\*\*\* *$/im);
  let body = text;
  if (start) body = body.slice(start.index + start[0].length);
  if (end) {
    const endIdx = body.search(/^\*\*\* *END OF (?:THE|THIS) PROJECT GUTENBERG EBOOK.*\*\*\* *$/im);
    if (endIdx !== -1) body = body.slice(0, endIdx);
  }
  return body.trim();
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT }, redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

async function main() {
  const authors = JSON.parse(readFileSync(join(DATA_DIR, 'authors.json'), 'utf8'));
  const works = JSON.parse(readFileSync(join(DATA_DIR, 'works.json'), 'utf8'));
  const authorName = Object.fromEntries(authors.map((a) => [a.id, a.name]));

  mkdirSync(OUT_DIR, { recursive: true });

  let saved = 0;
  let skippedExisting = 0;

  for (const work of works) {
    if (saved >= MAX_TEXTS) {
      console.log(`\nReached ${MAX_TEXTS}-text cap — stopping.`);
      break;
    }

    const author = authorName[work.author_id] || '';
    if (!author) continue;

    // Cheap pre-filter: skip modern works before any network call. Most of
    // the dataset is post-1930 and can't be on Gutenberg.
    if (work.year && work.year >= PUBLIC_DOMAIN_BEFORE) continue;

    const filename = `${slug(author)}-${slug(work.title)}.json`;
    const outPath = join(OUT_DIR, filename);
    if (existsSync(outPath)) {
      skippedExisting++;
      saved++; // counts toward the cap so re-runs stay bounded
      continue;
    }

    let matches;
    try {
      const query = encodeURIComponent(`${author} ${work.title}`);
      const data = await fetchJson(`https://gutendex.com/books/?search=${query}`);
      matches = (data.results || []).filter((r) => isConfirmedMatch(r, author, work.title));
    } catch (err) {
      console.warn(`  search failed for "${work.title}": ${err.message}`);
      continue;
    }

    if (matches.length === 0) {
      console.log(`  no PD match: ${author} — ${work.title}`);
      continue;
    }

    // Take the first confirmed edition that actually offers plain text —
    // the top hit sometimes exposes only a readme/zip under text/plain.
    const result = matches.find((r) => plainTextUrl(r.formats));
    if (!result) {
      console.log(`  no plain-text format: ${author} — ${work.title}`);
      continue;
    }
    const url = plainTextUrl(result.formats);

    let text;
    try {
      text = stripBoilerplate(await fetchText(url));
    } catch (err) {
      console.warn(`  text download failed for "${work.title}": ${err.message}`);
      continue;
    }

    writeFileSync(
      outPath,
      JSON.stringify(
        {
          work_id: work.id,
          gutenberg_id: result.id,
          source_url: url,
          title: work.title,
          author,
          year: work.year,
          text,
        },
        null,
        0,
      ),
    );
    saved++;
    console.log(`✓  ${author} — ${work.title}  (gutenberg ${result.id}, ${text.length} chars)`);
    await sleep(THROTTLE_MS);
  }

  console.log(
    `\nDone. ${saved} texts available (${skippedExisting} already on disk).`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
