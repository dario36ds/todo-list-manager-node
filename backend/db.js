const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "../database/app.sqlite");

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS "List" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "Title" TEXT NOT NULL,
      "Description" TEXT
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS "Element" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "Text" TEXT NOT NULL,
      "Status" INTEGER,
      "List_id" INTEGER,
      FOREIGN KEY("List_id") REFERENCES "List"("id")
    );
  `);
});

module.exports = db;
