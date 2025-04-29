const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/mensagens.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS mensagens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      conteudo TEXT NOT NULL
    )
  `);
});

module.exports = db;
