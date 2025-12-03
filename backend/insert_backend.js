const db = require('./db');

const exam = {
  title: "Back-End Development Exam",
  description: "Back-End Development Exam",
  questions_json: JSON.stringify([
    {
      "id": "q1",
      "text": "Which command initializes a Node.js project with a package.json file?",
      "options": ["node init", "npm init", "npm install", "node start"],
      "correctAnswer": 1
    },
    {
      "id": "q2",
      "text": "Express.js is primarily used for:",
      "options": ["Front-end styling", "Back-end web server", "Database management", "Running JavaScript in the browser"],
      "correctAnswer": 1
    },
    {
      "id": "q3",
      "text": "How do you define a GET route in Express?",
      "options": ["app.get('/route', callback)", "app.post('/route', callback)", "app.route('/route', callback)", "app.listen('/route', callback)"],
      "correctAnswer": 0
    },
    {
      "id": "q4",
      "text": "Which method sends JSON data as a response in Express?",
      "options": ["res.sendFile()", "res.json()", "res.render()", "res.sendData()"],
      "correctAnswer": 1
    },
    {
      "id": "q5",
      "text": "Middleware in Express is used to:",
      "options": ["Render HTML", "Handle requests and responses", "Query databases only", "Start the server"],
      "correctAnswer": 1
    },
    {
      "id": "q6",
      "text": "Which of the following is a NoSQL database?",
      "options": ["MySQL", "MongoDB", "PostgreSQL", "SQLite"],
      "correctAnswer": 1
    },
    {
      "id": "q7",
      "text": "In SQL, which statement retrieves all records from a table named users?",
      "options": ["GET * FROM users;", "SELECT * FROM users;", "FIND ALL FROM users;", "FETCH * FROM users;"],
      "correctAnswer": 1
    },
    {
      "id": "q8",
      "text": "In MongoDB, a document is stored in:",
      "options": ["Table", "Collection", "Database only", "Array"],
      "correctAnswer": 1
    },
    {
      "id": "q9",
      "text": "Which keyword is used to prevent SQL injection?",
      "options": ["Raw queries", "Parameterized queries", "Direct input", "Join"],
      "correctAnswer": 1
    },
    {
      "id": "q10",
      "text": "In relational databases, what is a primary key?",
      "options": ["A column that can have duplicate values", "A unique identifier for each record", "A foreign key in another table", "A default value column"],
      "correctAnswer": 1
    },
    {
      "id": "q11",
      "text": "REST stands for:",
      "options": ["Representational State Transfer", "Rapid System Transfer", "Remote Server Task", "Repeated State Test"],
      "correctAnswer": 0
    },
    {
      "id": "q12",
      "text": "Which HTTP method is used to update a resource partially?",
      "options": ["GET", "POST", "PUT", "PATCH"],
      "correctAnswer": 3
    },
    {
      "id": "q13",
      "text": "The correct URL structure for a RESTful API to fetch all users is:",
      "options": ["/api/getUsers", "/users", "/fetchUsers", "/api/users/all"],
      "correctAnswer": 1
    },
    {
      "id": "q14",
      "text": "Which of the following is commonly used for user authentication?",
      "options": ["JWT", "HTML", "CSS", "SQL Injection"],
      "correctAnswer": 0
    },
    {
      "id": "q15",
      "text": "Hashing a password ensures:",
      "options": ["It can be decrypted easily", "It is stored securely", "It is converted to plain text", "It is visible in database"],
      "correctAnswer": 1
    },
    {
      "id": "q16",
      "text": "What is CORS used for?",
      "options": ["Styling web pages", "Restricting resources from being accessed by different origins", "Encrypting passwords", "Logging requests"],
      "correctAnswer": 1
    },
    {
      "id": "q17",
      "text": "HTTPS is important because:",
      "options": ["It loads pages faster", "It encrypts data between client and server", "It compresses data", "It prevents server crashes"],
      "correctAnswer": 1
    },
    {
      "id": "q18",
      "text": "What is environment variable commonly used for?",
      "options": ["Storing secret keys", "Styling pages", "Writing HTML", "Running frontend scripts"],
      "correctAnswer": 0
    },
    {
      "id": "q19",
      "text": "In Node.js, which module is used to interact with the file system?",
      "options": ["fs", "http", "path", "url"],
      "correctAnswer": 0
    },
    {
      "id": "q20",
      "text": "Which of the following is an advantage of asynchronous programming in Node.js?",
      "options": ["Slower performance", "Blocks the event loop", "Handles multiple requests without blocking", "Requires more server"],
      "correctAnswer": 2
    }
  ]),
  time_limit: 3600
};

const created_at = new Date().toISOString();
const sql = `INSERT INTO exams (title, description, questions_json, time_limit, created_at) VALUES (?, ?, ?, ?, ?)`;
const params = [exam.title, exam.description, exam.questions_json, exam.time_limit, created_at];

db.run(sql, params, function(err) {
  if (err) {
    console.error('Error inserting exam:', err.message);
  } else {
    console.log(`Exam "${exam.title}" inserted successfully with ID:`, this.lastID);
  }
  db.close();
});
