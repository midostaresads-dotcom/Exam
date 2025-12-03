const express = require('express');
const db = require('../db');
const router = express.Router();

// POST /students - Register a new student
router.post('/', (req, res) => {
  const { name, phone, governorate } = req.body;

  // Basic validation
  if (!name || !phone || !governorate) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const registration_date = new Date().toISOString();

  const sql = `INSERT INTO students (name, phone, governorate, registration_date) VALUES (?, ?, ?, ?)`;
  const params = [name, phone, governorate, registration_date];

  db.run(sql, params, function(err) {
    if (err) {
      console.error('Error registering student:', err.message);
      return res.status(500).json({ error: 'Failed to register student' });
    }
    res.json({ success: true, id: this.lastID });
  });
});

// GET /students - Get all registered students
router.get('/', (req, res) => {
  const sql = `SELECT * FROM students ORDER BY registration_date DESC`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching students:', err.message);
      return res.status(500).json({ error: 'Failed to fetch students' });
    }
    res.json(rows);
  });
});

// GET /students/count - Get count of registered students
router.get('/count', (req, res) => {
  const sql = `SELECT COUNT(*) as count FROM students`;

  db.get(sql, [], (err, row) => {
    if (err) {
      console.error('Error counting students:', err.message);
      return res.status(500).json({ error: 'Failed to count students' });
    }
    res.json({ count: row.count });
  });
});

module.exports = router;
