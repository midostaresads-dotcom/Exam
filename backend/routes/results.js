const express = require('express');
const db = require('../db');
const router = express.Router();

// POST /results - Submit exam result
router.post('/', (req, res) => {
  const {
    student_name,
    phone,
    governorate,
    score,
    total_questions,
    correct_answers,
    wrong_answers,
    time_taken,
    answers_json,
    exam_id,
    exam_title
  } = req.body;

  // Basic validation
  if (!student_name || !phone || !governorate || score === undefined ||
      !total_questions || correct_answers === undefined || wrong_answers === undefined ||
      !time_taken || !answers_json || !exam_id || !exam_title) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const submission_date = new Date().toISOString();

  const sql = `INSERT INTO results (student_name, phone, governorate, score, total_questions, correct_answers, wrong_answers, time_taken, answers_json, submission_date, exam_id, exam_title) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [student_name, phone, governorate, score, total_questions, correct_answers, wrong_answers, time_taken, answers_json, submission_date, exam_id, exam_title];

  db.run(sql, params, function(err) {
    if (err) {
      console.error('Error saving result:', err.message);
      return res.status(500).json({ error: 'Failed to save result' });
    }
    res.json({ success: true, id: this.lastID });
  });
});

// GET /results/stats - Get dashboard statistics
router.get('/stats', (req, res) => {
  // Get total exams count
  const examsSql = `SELECT COUNT(*) as total_exams FROM exams`;

  // Get total registered students count
  const studentsSql = `SELECT COUNT(*) as total_students FROM students`;

  // Get average score percentage
  const averageSql = `SELECT AVG((score * 100.0) / total_questions) as average_percentage FROM results`;

  // Execute all queries
  db.get(examsSql, [], (err, examsRow) => {
    if (err) {
      console.error('Error fetching exams count:', err.message);
      return res.status(500).json({ error: 'Failed to fetch statistics' });
    }

    db.get(studentsSql, [], (err, studentsRow) => {
      if (err) {
        console.error('Error fetching students count:', err.message);
        return res.status(500).json({ error: 'Failed to fetch statistics' });
      }

      db.get(averageSql, [], (err, averageRow) => {
        if (err) {
          console.error('Error fetching average score:', err.message);
          return res.status(500).json({ error: 'Failed to fetch statistics' });
        }

        res.json({
          total_exams: examsRow.total_exams || 0,
          total_students: studentsRow.total_students || 0,
          average_percentage: Math.round(averageRow.average_percentage || 0)
        });
      });
    });
  });
});

// GET /results - Get all results
router.get('/', (req, res) => {
  const sql = `SELECT * FROM results ORDER BY submission_date DESC`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching results:', err.message);
      return res.status(500).json({ error: 'Failed to fetch results' });
    }
    res.json(rows);
  });
});

// GET /results/:id - Get a specific result with details
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM results WHERE id = ?`;

  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error('Error fetching result:', err.message);
      return res.status(500).json({ error: 'Failed to fetch result' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Result not found' });
    }
    res.json(row);
  });
});

// DELETE /results/:id - Delete a specific result
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM results WHERE id = ?`;

  db.run(sql, [id], function(err) {
    if (err) {
      console.error('Error deleting result:', err.message);
      return res.status(500).json({ error: 'Failed to delete result' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Result not found' });
    }
    res.json({ success: true, message: 'Result deleted successfully' });
  });
});

// GET /results/notifications - Get recent results for notifications
router.get('/notifications/recent', (req, res) => {
  // Get results from the last 24 hours
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const sql = `SELECT id, student_name, exam_title, submission_date, score, total_questions
               FROM results
               WHERE submission_date >= ?
               ORDER BY submission_date DESC
               LIMIT 10`;

  db.all(sql, [oneDayAgo], (err, rows) => {
    if (err) {
      console.error('Error fetching recent results:', err.message);
      return res.status(500).json({ error: 'Failed to fetch recent results' });
    }
    res.json(rows);
  });
});

// GET /results/notifications/count - Get count of unread notifications
router.get('/notifications/count', (req, res) => {
  // For simplicity, count results from today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayISOString = today.toISOString();

  const sql = `SELECT COUNT(*) as count FROM results WHERE submission_date >= ?`;

  db.get(sql, [todayISOString], (err, row) => {
    if (err) {
      console.error('Error counting recent results:', err.message);
      return res.status(500).json({ error: 'Failed to count recent results' });
    }
    res.json({ count: row.count });
  });
});

module.exports = router;
