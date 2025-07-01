const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath);

// Crear tabla de usuarios si no existe
db.prepare(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    username TEXT NOT NULL,
    telefono TEXT NOT NULL,
    departamento TEXT NOT NULL,
    direccion TEXT NOT NULL,
    municipio TEXT NOT NULL,
    password TEXT NOT NULL
  )
`).run();

// Agregar columnas lat y lng si no existen
try {
  db.prepare('ALTER TABLE usuarios ADD COLUMN lat REAL').run();
  console.log('Columna lat agregada');
} catch (e) {
  console.log('La columna lat ya existe o hubo un error:', e.message);
}

try {
  db.prepare('ALTER TABLE usuarios ADD COLUMN lng REAL').run();
  console.log('Columna lng agregada');
} catch (e) {
  console.log('La columna lng ya existe o hubo un error:', e.message);
}

module.exports = db;
