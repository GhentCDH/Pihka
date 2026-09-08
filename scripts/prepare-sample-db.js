/**
 * Publish views and FTS indexes into the existing demo database for read-only VFS.
 * Requires Node >= 22.13 (node:sqlite); no source rows are regenerated.
 * Run npm run prepare-sample-db again after editing rows to refresh the indexes.
 */
import { readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';
import { readMetadata } from '../pihka/core/js/utilities-data/datasource.js';
import { applyTableConfig } from '../pihka/core/js/utilities-data/table-config.js';
import { createPerspectiveViews } from '../pihka/core/js/utilities-data/perspective-views.js';
import { fts5Plugin } from '../pihka/core/js/utilities-data/enrichment/fts5.js';
import { quoteIdentifier } from '../pihka/core/js/utilities-data/enrichment/sql-utils.js';

const samplePath = fileURLToPath(new URL('../pihka/app/database/sample.db', import.meta.url));
const configPath = fileURLToPath(new URL('../pihka/app/config.json', import.meta.url));

export async function prepareSampleDatabase(databasePath = samplePath, config = JSON.parse(readFileSync(configPath, 'utf8'))) {
  // DatabaseSync otherwise silently creates a new, empty database on a typo.
  if (!statSync(databasePath).isFile()) throw new Error(`Not a database file: ${databasePath}`);
  const db = new DatabaseSync(databasePath);
  const failures = [];
  const ds = {
    capabilities: { readOnly: false },
    exec(sql, { bind = [], callback } = {}) {
      try {
        const rows = db.prepare(sql).all(...bind);
        if (callback) rows.forEach(callback);
        return rows;
      } catch (error) {
        // Browser helpers fail softly; publishing must roll back on SQL errors.
        failures.push(error);
        throw error;
      }
    },
  };

  try {
    db.exec('BEGIN IMMEDIATE');
    try {
      await createPerspectiveViews(ds, config);
      if (failures.length) throw failures[0];
      const meta = await readMetadata(ds);
      applyTableConfig(meta, config);
      if (config.enrichment?.fts !== false) {
        await fts5Plugin(ds, meta, config);
        if (failures.length) throw failures[0];
        for (const table of Object.values(meta.tables)) {
          if (!table.fts) continue;
          const index = quoteIdentifier(table.fts.table);
          // Discovery reuses published indexes, but their postings may be stale.
          db.exec(`INSERT INTO ${index}(${index}) VALUES ('rebuild')`);
          db.exec(`INSERT INTO ${index}(${index}) VALUES ('optimize')`);
        }
      }
      db.exec('PRAGMA optimize');
      db.exec('COMMIT');
      return meta;
    } catch (error) {
      db.exec('ROLLBACK');
      throw error;
    }
  } finally {
    db.close();
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  prepareSampleDatabase().then(meta => {
    const indexes = Object.values(meta.tables).filter(table => table.fts).length;
    console.log(`Prepared ${samplePath} (${indexes} FTS indexes; existing rows preserved)`);
  }).catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
}
