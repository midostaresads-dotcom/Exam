const db = require('./db');

const exam = {
  title: "Front-End Development Exam",
  description: "Front-End Development Exam",
  questions_json: JSON.stringify([
    {
      "id": "q1",
      "text": "Which HTML element is used to create a hyperlink?",
      "options": ["<link>", "<a>", "<href>", "<url>"],
      "correctAnswer": 1
    },
    {
      "id": "q2",
      "text": "What does the <meta charset=\"UTF-8\"> tag do?",
      "options": ["Links to an external CSS file", "Defines character encoding", "Adds JavaScript to the page", "Sets the page title"],
      "correctAnswer": 1
    },
    {
      "id": "q3",
      "text": "Which attribute is used to specify an image URL in <img>?",
      "options": ["src", "href", "link", "url"],
      "correctAnswer": 0
    },
    {
      "id": "q4",
      "text": "What is the correct way to create an ordered list in HTML?",
      "options": ["<ul>", "<ol>", "<list>", "<li>"],
      "correctAnswer": 1
    },
    {
      "id": "q5",
      "text": "Which HTML tag is used to define the main heading of a page?",
      "options": ["<head>", "<h1>", "<header>", "<title>"],
      "correctAnswer": 1
    },
    {
      "id": "q6",
      "text": "How do you select an element with the class “container” in CSS?",
      "options": ["#container", ".container", "container", "*container"],
      "correctAnswer": 1
    },
    {
      "id": "q7",
      "text": "Which property changes the text color of an element?",
      "options": ["font-color", "color", "text-color", "font-style"],
      "correctAnswer": 1
    },
    {
      "id": "q8",
      "text": "How do you make text bold using CSS?",
      "options": ["font-weight: bold;", "font-style: bold;", "text-style: bold;", "text-weight: bold;"],
      "correctAnswer": 0
    },
    {
      "id": "q9",
      "text": "Which property controls the spacing between letters?",
      "options": ["letter-space", "letter-spacing", "word-spacing", "text-spacing"],
      "correctAnswer": 1
    },
    {
      "id": "q10",
      "text": "How do you apply a CSS rule to all <p> elements inside a <div>?",
      "options": ["div > p", "div p", "div.p", "p div"],
      "correctAnswer": 1
    },
    {
      "id": "q11",
      "text": "Which of the following declares a variable in modern JavaScript?",
      "options": ["var name;", "variable name;", "let name;", "Both A and C"],
      "correctAnswer": 3
    },
    {
      "id": "q12",
      "text": "What will console.log(typeof []) output?",
      "options": ["object", "array", "list", "undefined"],
      "correctAnswer": 0
    },
    {
      "id": "q13",
      "text": "How do you add a comment in JavaScript?",
      "options": ["<!-- comment -->", "// comment", "/* comment */", "Both B and C"],
      "correctAnswer": 3
    },
    {
      "id": "q14",
      "text": "Which method is used to find an element by ID in JavaScript?",
      "options": ["document.getElementByClassName()", "document.getElementById()", "document.querySelectorAll()", "document.find()"],
      "correctAnswer": 1
    },
    {
      "id": "q15",
      "text": "What does === do in JavaScript?",
      "options": ["Assigns value", "Compares value only", "Compares value and type", "Checks inequality"],
      "correctAnswer": 2
    },
    {
      "id": "q16",
      "text": "How do you attach a click event listener to a button with ID “submitBtn”?",
      "options": ["document.getElementById(\"submitBtn\").onclick = myFunction;", "document.querySelector(\"#submitBtn\").click(myFunction);", "button.click = myFunction;", "document.getElementById(\"submitBtn\").addEvent();"],
      "correctAnswer": 0
    },
    {
      "id": "q17",
      "text": "Which method removes a child element from the DOM?",
      "options": ["element.removeChild()", "element.deleteChild()", "element.remove()", "element.delete()"],
      "correctAnswer": 0
    },
    {
      "id": "q18",
      "text": "How do you select all elements with class “item” using DOM methods?",
      "options": ["document.getElementsByClassName(\"item\")", "document.getElementById(\"item\")", "document.querySelector(\"#item\")", "document.querySelector(\"item\")"],
      "correctAnswer": 0
    },
    {
      "id": "q19",
      "text": "Which of the following is a JavaScript library for building user interfaces?",
      "options": ["Angular", "React", "Django", "Flask"],
      "correctAnswer": 1
    },
    {
      "id": "q20",
      "text": "Which tool is used for version control in front-end projects?",
      "options": ["NPM", "Git", "Webpack", "Node.js"],
      "correctAnswer": 1
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
