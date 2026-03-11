const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "../database/app.sqlite");

const db = new sqlite3.Database(dbPath);

// db.serialize(() => {
//   db.run(`

//  CREATE TABLE "List" (
// 	"id"	INTEGER,
// 	"Title"	TEXT NOT NULL,
// 	"Description"	TEXT,
// 	PRIMARY KEY("id" AUTOINCREMENT)
// );

// CREATE TABLE "Element" (
// 	"id"	INTEGER,
// 	"Text"	TEXT NOT NULL,
// 	"Status"	INTEGER,
// 	"List_id"	INTEGER,
// 	PRIMARY KEY("id" AUTOINCREMENT),
// 	FOREIGN KEY("List_id") REFERENCES "List"("id")
// );`
// );
// });

module.exports = db;
