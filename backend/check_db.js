const db = require('./db');

console.log('Checking database content...');

db.all('SELECT id, exam_id, exam_title, student_name FROM results ORDER BY id DESC LIMIT 10', [], (err, rows) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Recent results:');
    rows.forEach(row => {
      console.log(`ID: ${row.id}, Exam ID: ${row.exam_id}, Exam Title: ${row.exam_title}, Student: ${row.student_name}`);
    });
  }

  db.all('SELECT id, title FROM exams', [], (err, examRows) => {
    if (err) {
      console.error('Error fetching exams:', err);
    } else {
      console.log('\nExams in database:');
      examRows.forEach(row => {
        console.log(`ID: ${row.id}, Title: ${row.title}`);
      });
    }
    db.close();
  });
});
