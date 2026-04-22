/**
 * Create sample SQLite database for Pihka demo
 *
 * Run with: node scripts/create-sample-db.js
 */

import initSqlJs from 'sql.js';
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function createSampleDatabase() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  // Create tables
  db.run(`
    CREATE TABLE authors (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      birth_year INTEGER,
      birthplace TEXT,
      latitude REAL,
      longitude REAL
    );

    CREATE TABLE categories (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL
    );

    CREATE TABLE works (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      author_id INTEGER REFERENCES authors(id),
      category_id INTEGER REFERENCES categories(id),
      year INTEGER,
      description TEXT,
      cover TEXT
    );

    # create a full-text search virtual table for works, simply to verify that FTS5 is available in the environment
    CREATE VIRTUAL TABLE docs USING fts5(title, body);
  `);

  // Insert authors with birthplace coordinates
  const authors = [
    [1, 'Virginia Woolf', 1882, 'London, England', 51.5074, -0.1278],
    [2, 'James Joyce', 1882, 'Dublin, Ireland', 53.3498, -6.2603],
    [3, 'Franz Kafka', 1883, 'Prague, Bohemia', 50.0755, 14.4378],
    [4, 'T.S. Eliot', 1888, 'St. Louis, Missouri', 38.6270, -90.1994],
    [5, 'Marcel Proust', 1871, 'Paris, France', 48.8566, 2.3522],
    [6, 'Ernest Hemingway', 1899, 'Oak Park, Illinois', 41.8850, -87.7845],
    [7, 'F. Scott Fitzgerald', 1896, 'St. Paul, Minnesota', 44.9537, -93.0900],
    [8, 'William Faulkner', 1897, 'New Albany, Mississippi', 34.4943, -89.0078],
    [9, 'Gertrude Stein', 1874, 'Allegheny, Pennsylvania', 40.4774, -80.0125],
    [10, 'Ezra Pound', 1885, 'Hailey, Idaho', 43.5196, -114.3153]
  ];

  for (const [id, name, birthYear, birthplace, lat, lng] of authors) {
    db.run('INSERT INTO authors VALUES (?, ?, ?, ?, ?, ?)', [id, name, birthYear, birthplace, lat, lng]);
  }

  // Insert categories
  const categories = [
    [1, 'Novel'],
    [2, 'Essay'],
    [3, 'Poetry'],
    [4, 'Short Story'],
    [5, 'Drama']
  ];

  for (const [id, name] of categories) {
    db.run('INSERT INTO categories VALUES (?, ?)', [id, name]);
  }

  // Insert works
  const works = [
    [1, 'Mrs Dalloway', 1, 1, 1925, 'A day in the life of Clarissa Dalloway as she prepares for a party, exploring themes of mental illness, time, and post-war society.', 'covers/1.jpg'],
    [2, 'To the Lighthouse', 1, 1, 1927, 'A philosophical exploration of family dynamics, memory, and the passage of time centered around visits to a summer home in the Hebrides.', 'covers/2.jpg'],
    [3, 'Orlando', 1, 1, 1928, 'A fantastical biography spanning four centuries, following a poet who changes sex from man to woman.', 'covers/3.jpg'],
    [4, 'A Room of One\'s Own', 1, 2, 1929, 'An extended essay on women and fiction, arguing that a woman must have money and a room of her own to write.', 'covers/4.jpg'],
    [5, 'The Waves', 1, 1, 1931, 'An experimental novel following six characters from childhood to old age through interior monologues.', 'covers/5.jpg'],

    [6, 'Ulysses', 2, 1, 1922, 'A modernist retelling of Homer\'s Odyssey set in Dublin, following Leopold Bloom through a single day.', 'covers/6.jpg'],
    [7, 'A Portrait of the Artist as a Young Man', 2, 1, 1916, 'A semi-autobiographical novel depicting the intellectual and artistic development of Stephen Dedalus.', 'covers/7.jpg'],
    [8, 'Dubliners', 2, 4, 1914, 'A collection of fifteen short stories depicting Irish middle class life in Dublin in the early 20th century.', 'covers/8.jpg'],

    [9, 'The Metamorphosis', 3, 4, 1915, 'The story of Gregor Samsa who wakes one morning to find himself transformed into a giant insect.', 'covers/9.jpg'],
    [10, 'The Trial', 3, 1, 1925, 'A nightmarish tale of a man arrested and prosecuted by a remote, inaccessible authority, with the nature of his crime revealed neither to him nor to the reader.', 'covers/10.jpg'],
    [11, 'The Castle', 3, 1, 1926, 'A land surveyor struggles to gain access to the mysterious authorities of a castle who govern the village.', 'covers/11.jpg'],

    [12, 'The Waste Land', 4, 3, 1922, 'A long modernist poem depicting the disillusionment and despair of the post-World War I generation.', 'covers/12.jpg'],
    [13, 'The Love Song of J. Alfred Prufrock', 4, 3, 1915, 'A dramatic monologue presenting the thoughts of a middle-aged man paralyzed by indecision.', 'covers/13.jpg'],
    [14, 'Four Quartets', 4, 3, 1943, 'Four interlinked meditations exploring time, perspective, humanity, and salvation.', 'covers/14.jpg'],

    [15, 'In Search of Lost Time', 5, 1, 1913, 'A seven-volume novel exploring themes of memory, time, and consciousness through the narrator\'s recollections.', 'covers/15.jpg'],

    [16, 'The Sun Also Rises', 6, 1, 1926, 'A novel about a group of American and British expatriates traveling from Paris to Pamplona for the running of the bulls.', 'covers/16.jpg'],
    [17, 'A Farewell to Arms', 6, 1, 1929, 'A novel about an American ambulance driver in the Italian army during World War I and his love affair with a nurse.', 'covers/17.jpg'],
    [18, 'The Old Man and the Sea', 6, 4, 1952, 'The story of an aging Cuban fisherman who struggles with a giant marlin in the Gulf Stream.', 'covers/18.jpg'],

    [19, 'The Great Gatsby', 7, 1, 1925, 'A portrait of the Jazz Age and its excesses, following mysterious millionaire Jay Gatsby and his obsession with Daisy Buchanan.', 'covers/19.jpg'],
    [20, 'Tender Is the Night', 7, 1, 1934, 'A novel about the rise and fall of Dick Diver, a promising young psychiatrist and his wife Nicole.', 'covers/20.jpg'],

    [21, 'The Sound and the Fury', 8, 1, 1929, 'A novel told from four different perspectives, chronicling the decline of the Compson family.', 'covers/21.jpg'],
    [22, 'As I Lay Dying', 8, 1, 1930, 'A novel narrated by 15 different characters as they transport a body for burial.', 'covers/22.jpg'],

    [23, 'Three Lives', 9, 4, 1909, 'Three stories exploring the inner lives of three working-class women.', 'covers/23.jpg'],
    [24, 'The Autobiography of Alice B. Toklas', 9, 2, 1933, 'An autobiography of Gertrude Stein written as though by her partner Alice B. Toklas.', 'covers/24.jpg'],

    [25, 'The Cantos', 10, 3, 1917, 'An epic, unfinished long poem incorporating classical mythology, economics, and history.', 'covers/25.jpg']
  ];

  for (const [id, title, authorId, categoryId, year, description, cover] of works) {
    db.run('INSERT INTO works VALUES (?, ?, ?, ?, ?, ?, ?)', [id, title, authorId, categoryId, year, description, cover]);
  }

  // Export to file
  const data = db.export();
  const buffer = Buffer.from(data);
  const outputPath = join(__dirname, '..', 'pihka', 'app', 'database', 'sample.sqlite');
  writeFileSync(outputPath, buffer);

  console.log(`Created sample database at ${outputPath}`);
  console.log(`  Authors: ${authors.length}`);
  console.log(`  Categories: ${categories.length}`);
  console.log(`  Works: ${works.length}`);

  db.close();
}

createSampleDatabase().catch(console.error);
