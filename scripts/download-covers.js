/**
 * Download book cover images for all works in sample.sqlite.
 * Covers are fetched from Open Library Covers API and saved to
 * pihka/app/assets/covers/{work_id}.jpg
 * The works table gains a `cover` TEXT column with the relative path.
 *
 * Run with: node scripts/download-covers.js
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const coversDir = join(__dirname, '..', 'pihka', 'app', 'assets', 'covers');
const dbPath    = join(__dirname, '..', 'pihka', 'app', 'database', 'sample.sqlite');

const works = [
  { id:  1, title: 'Mrs Dalloway',                           author: 'Virginia Woolf' },
  { id:  2, title: 'To the Lighthouse',                      author: 'Virginia Woolf' },
  { id:  3, title: 'Orlando',                                author: 'Virginia Woolf' },
  { id:  4, title: 'A Room of One\'s Own',                   author: 'Virginia Woolf' },
  { id:  5, title: 'The Waves',                              author: 'Virginia Woolf' },
  { id:  6, title: 'Ulysses',                                author: 'James Joyce' },
  { id:  7, title: 'A Portrait of the Artist as a Young Man',author: 'James Joyce' },
  { id:  8, title: 'Dubliners',                              author: 'James Joyce' },
  { id:  9, title: 'The Metamorphosis',                      author: 'Franz Kafka' },
  { id: 10, title: 'The Trial',                              author: 'Franz Kafka' },
  { id: 11, title: 'The Castle',                             author: 'Franz Kafka' },
  { id: 12, title: 'The Waste Land',                         author: 'T.S. Eliot' },
  { id: 13, title: 'The Love Song of J. Alfred Prufrock',    author: 'T.S. Eliot' },
  { id: 14, title: 'Four Quartets',                          author: 'T.S. Eliot' },
  { id: 15, title: 'In Search of Lost Time',                 author: 'Marcel Proust' },
  { id: 16, title: 'The Sun Also Rises',                     author: 'Ernest Hemingway' },
  { id: 17, title: 'A Farewell to Arms',                     author: 'Ernest Hemingway' },
  { id: 18, title: 'The Old Man and the Sea',                author: 'Ernest Hemingway' },
  { id: 19, title: 'The Great Gatsby',                       author: 'F. Scott Fitzgerald' },
  { id: 20, title: 'Tender Is the Night',                    author: 'F. Scott Fitzgerald' },
  { id: 21, title: 'The Sound and the Fury',                 author: 'William Faulkner' },
  { id: 22, title: 'As I Lay Dying',                         author: 'William Faulkner' },
  { id: 23, title: 'Three Lives',                            author: 'Gertrude Stein' },
  { id: 24, title: 'The Autobiography of Alice B. Toklas',   author: 'Gertrude Stein' },
  { id: 25, title: 'The Cantos',                             author: 'Ezra Pound' },
];

mkdirSync(coversDir, { recursive: true });

// Add cover column if it doesn't exist yet
try {
  execSync(`sqlite3 "${dbPath}" "ALTER TABLE works ADD COLUMN cover TEXT"`);
  console.log('Added cover column to works table.');
} catch {
  // Column already exists — fine
}

let downloaded = 0;
let missing = 0;

for (const work of works) {
  const searchUrl =
    `https://openlibrary.org/search.json` +
    `?title=${encodeURIComponent(work.title)}` +
    `&author=${encodeURIComponent(work.author)}` +
    `&limit=1&fields=cover_i,title`;

  let coverId;
  try {
    const res  = await fetch(searchUrl);
    const data = await res.json();
    coverId = data.docs?.[0]?.cover_i;
  } catch (err) {
    console.error(`Search failed for "${work.title}": ${err.message}`);
    missing++;
    continue;
  }

  if (!coverId) {
    console.warn(`No cover found for: ${work.title}`);
    missing++;
    continue;
  }

  const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
  let buffer;
  try {
    const res = await fetch(coverUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    buffer = Buffer.from(await res.arrayBuffer());
  } catch (err) {
    console.error(`Cover download failed for "${work.title}": ${err.message}`);
    missing++;
    continue;
  }

  const filename     = `${work.id}.jpg`;
  const relativePath = `covers/${filename}`;
  writeFileSync(join(coversDir, filename), buffer);

  execSync(`sqlite3 "${dbPath}" "UPDATE works SET cover='${relativePath}' WHERE id=${work.id}"`);
  console.log(`✓  ${work.title}`);
  downloaded++;
}

console.log(`\nDone. ${downloaded} covers downloaded, ${missing} not found.`);
