const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Use environment variable for database path, fallback to local file
const dbPath = process.env.DATABASE_URL || path.join(__dirname, 'data.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create tables if they don't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_name TEXT,
      phone TEXT,
      governorate TEXT,
      score INTEGER,
      total_questions INTEGER,
      correct_answers INTEGER,
      wrong_answers INTEGER,
      time_taken TEXT,
      answers_json TEXT,
      submission_date TEXT,
      exam_id TEXT,
      exam_title TEXT
    )
  `);

  // Check if exam_id and exam_title columns exist, if not add them
  db.all("PRAGMA table_info(results)", [], (err, columns) => {
    if (err) {
      console.error('Error checking table info:', err);
      return;
    }
    const hasExamId = columns.some(col => col.name === 'exam_id');
    const hasExamTitle = columns.some(col => col.name === 'exam_title');
    if (!hasExamId) {
      db.run("ALTER TABLE results ADD COLUMN exam_id TEXT", (err) => {
        if (err) {
          console.error('Error adding exam_id column:', err);
        } else {
          console.log('Added exam_id column to results table');
        }
      });
    }
    if (!hasExamTitle) {
      db.run("ALTER TABLE results ADD COLUMN exam_title TEXT", (err) => {
        if (err) {
          console.error('Error adding exam_title column:', err);
        } else {
          console.log('Added exam_title column to results table');
        }
      });
    }
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phone TEXT UNIQUE,
      governorate TEXT,
      registration_date TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS exams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      questions_json TEXT,
      time_limit INTEGER,
      created_at TEXT
    )
  `);

  // Check if time_limit column exists, if not add it
  db.all("PRAGMA table_info(exams)", [], (err, columns) => {
    if (err) {
      console.error('Error checking table info:', err);
      return;
    }
    const hasTimeLimit = columns.some(col => col.name === 'time_limit');
    if (!hasTimeLimit) {
      db.run("ALTER TABLE exams ADD COLUMN time_limit INTEGER DEFAULT 3600", (err) => {
        if (err) {
          console.error('Error adding time_limit column:', err);
        } else {
          console.log('Added time_limit column to exams table');
        }
      });
    }
  });
});

module.exports = db;
