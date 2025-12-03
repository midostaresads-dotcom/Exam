const db = require('./db');

const exam = {
  title: "امتحان مستوى E1",
  description: "English Placement Test E1 Level",
  questions_json: JSON.stringify([
    {
      "id": "q1",
      "text": "The new policy aims to ensure that all employees are treated ____.",
      "options": ["equally", "equal", "equality", "equivalent"],
      "correctAnswer": 0
    },
    {
      "id": "q2",
      "text": "She didn’t accept the offer at first, but she eventually ____ to the idea.",
      "options": ["adapted", "adopted", "admitted", "addressed"],
      "correctAnswer": 0
    },
    {
      "id": "q3",
      "text": "The manager requested that every report ____ submitted before Friday.",
      "options": ["is", "will be", "be", "was"],
      "correctAnswer": 2
    },
    {
      "id": "q4",
      "text": "His explanation was so vague that nobody could ____ what he meant.",
      "options": ["interpret", "interrupt", "intersect", "insert"],
      "correctAnswer": 0
    },
    {
      "id": "q5",
      "text": "The documentary provides a deep ____ into the lives of rural communities.",
      "options": ["overview", "insight", "outlook", "review"],
      "correctAnswer": 1
    },
    {
      "id": "q6",
      "text": "I wouldn't classify the film as boring, but it was certainly ____.",
      "options": ["underdeveloped", "overwhelming", "mediocre", "thrilling"],
      "correctAnswer": 2
    },
    {
      "id": "q7",
      "text": "She tried to convince them, but her arguments weren’t ____.",
      "options": ["persuasive", "preserved", "pervasive", "preventive"],
      "correctAnswer": 0
    },
    {
      "id": "q8",
      "text": "The company is struggling to remain competitive due to the rapidly ____ market.",
      "options": ["expanding", "expanded", "expands", "expansion"],
      "correctAnswer": 0
    },
    {
      "id": "q9",
      "text": "We need a more ____ approach if we want the project to succeed.",
      "options": ["strategic", "strategy", "strategical", "strategist"],
      "correctAnswer": 0
    },
    {
      "id": "q10",
      "text": "Despite his confidence, he was not entirely ____ about the outcome.",
      "options": ["assured", "convinced", "satisfied", "predictable"],
      "correctAnswer": 1
    },
    {
      "id": "q11",
      "text": "The team reached a decision after hours of ____ discussion.",
      "options": ["intensive", "intense", "intensify", "intensity"],
      "correctAnswer": 0
    },
    {
      "id": "q12",
      "text": "The issue is more complex than it ____ at first sight.",
      "options": ["looks", "looked", "is looking", "has looked"],
      "correctAnswer": 0
    },
    {
      "id": "q13",
      "text": "“He is bound to succeed” means success is very likely.",
      "options": ["True", "False"],
      "correctAnswer": 0
    },
    {
      "id": "q14",
      "text": "“Hardly… when” is used to talk about two events happening one after the other.",
      "options": ["True", "False"],
      "correctAnswer": 0
    },
    {
      "id": "q15",
      "text": "“Would rather he goes” is grammatically correct.",
      "options": ["True", "False"],
      "correctAnswer": 1
    },
    {
      "id": "q16",
      "text": "“It is crucial that he arrives early” يجب أن تأتي بصيغة present simple.",
      "options": ["True", "False"],
      "correctAnswer": 1
    },
    {
      "id": "q17",
      "text": "We need to analyze the results before we ____ any conclusions.",
      "options": ["jump to", "jump in", "jump over", "jump out"],
      "correctAnswer": 0
    },
    {
      "id": "q18",
      "text": "The plan won’t work unless everyone ____ together.",
      "options": ["cooperate", "cooperates", "cooperating", "cooperation"],
      "correctAnswer": 0
    },
    {
      "id": "q19",
      "text": "She has the ability to remain calm, even under extreme ____.",
      "options": ["pressure", "press", "pressing", "depress"],
      "correctAnswer": 0
    },
    {
      "id": "q20",
      "text": "The professor encouraged students to think more ____ about the topic.",
      "options": ["critical", "critic", "critically", "critique"],
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
