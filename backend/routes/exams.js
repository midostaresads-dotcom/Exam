const express = require('express');
const db = require('../db');
const router = express.Router();

// POST /exams - Create new exam
router.post('/', (req, res) => {
  const { title, description, questions_json, time_limit } = req.body;

  // Basic validation
  if (!title || !description || !questions_json) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const created_at = new Date().toISOString();

  const sql = `INSERT INTO exams (title, description, questions_json, time_limit, created_at) VALUES (?, ?, ?, ?, ?)`;
  const params = [title, description, questions_json, time_limit || 3600, created_at];

  db.run(sql, params, function(err) {
    if (err) {
      console.error('Error creating exam:', err.message);
      return res.status(500).json({ error: 'Failed to create exam' });
    }
    res.json({ success: true, id: this.lastID });
  });
});

// GET /exams - Get all exams
router.get('/', (req, res) => {
  const sql = `SELECT * FROM exams ORDER BY created_at DESC`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching exams:', err.message);
      return res.status(500).json({ error: 'Failed to fetch exams' });
    }
    res.json(rows);
  });
});

// GET /exams/:id - Get a specific exam
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM exams WHERE id = ?`;

  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error('Error fetching exam:', err.message);
      return res.status(500).json({ error: 'Failed to fetch exam' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.json(row);
  });
});

// PUT /exams/:id - Update an exam
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, questions_json, time_limit } = req.body;

  // Basic validation
  if (!title || !description || !questions_json) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = `UPDATE exams SET title = ?, description = ?, questions_json = ?, time_limit = ? WHERE id = ?`;
  const params = [title, description, questions_json, time_limit || 3600, id];

  db.run(sql, params, function(err) {
    if (err) {
      console.error('Error updating exam:', err.message);
      return res.status(500).json({ error: 'Failed to update exam' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.json({ success: true });
  });
});

// DELETE /exams/:id - Delete an exam
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM exams WHERE id = ?`;

  db.run(sql, [id], function(err) {
    if (err) {
      console.error('Error deleting exam:', err.message);
      return res.status(500).json({ error: 'Failed to delete exam' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.json({ success: true });
  });
});

module.exports = router;
