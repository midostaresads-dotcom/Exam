const db = require('./db');

const exam = {
  title: "English C2 Exam",
  description: "English Placement Test C2 Level",
  questions_json: JSON.stringify([
    {
      "id": "q1",
      "text": "Had he been aware of the consequences, he ____ taken such a risk.",
      "options": ["will have", "would have", "would", "has"],
      "correctAnswer": 1
    },
    {
      "id": "q2",
      "text": "Hardly ____ the meeting started when the power went out.",
      "options": ["had", "has", "had", "have"],
      "correctAnswer": 2
    },
    {
      "id": "q3",
      "text": "She demanded that her assistant ____ the report immediately.",
      "options": ["submit", "submits", "submitted", "submitting"],
      "correctAnswer": 0
    },
    {
      "id": "q4",
      "text": "No sooner ____ she entered the room than everyone fell silent.",
      "options": ["did", "had", "has", "will"],
      "correctAnswer": 1
    },
    {
      "id": "q5",
      "text": "It’s imperative that all candidates ____ their applications before the deadline.",
      "options": ["submit", "submits", "submitted", "submitting"],
      "correctAnswer": 0
    },
    {
      "id": "q6",
      "text": "Were I to have realized the complexity of the task, I ____ agreed.",
      "options": ["will not", "would not", "shall not", "do not"],
      "correctAnswer": 1
    },
    {
      "id": "q7",
      "text": "The CEO’s address was ____; it left no room for doubt about the company’s direction.",
      "options": ["ambiguous", "unequivocal", "vague", "obscure"],
      "correctAnswer": 1
    },
    {
      "id": "q8",
      "text": "The scientist’s theory was so ____ that it challenged established paradigms.",
      "options": ["conventional", "radical", "ordinary", "typical"],
      "correctAnswer": 1
    },
    {
      "id": "q9",
      "text": "The journalist’s approach was highly ____; she questioned every statement critically.",
      "options": ["investigative", "superficial", "passive", "biased"],
      "correctAnswer": 0
    },
    {
      "id": "q10",
      "text": "The author’s prose is characterized by its ____ elegance and subtlety.",
      "options": ["pedestrian", "literary", "crude", "clumsy"],
      "correctAnswer": 1
    },
    {
      "id": "q11",
      "text": "His argument was ____; it persuaded even the skeptics.",
      "options": ["compelling", "weak", "unconvincing", "trivial"],
      "correctAnswer": 0
    },
    {
      "id": "q12",
      "text": "“Despite the adverse conditions, the expedition reached the summit.” Which statement is implied?",
      "options": ["The expedition failed.", "The expedition succeeded despite difficulties", "The weather was perfect.", "The summit was easy to reach."],
      "correctAnswer": 1
    },
    {
      "id": "q13",
      "text": "“The politician’s speech was peppered with platitudes.” The word “platitudes” most likely means:",
      "options": ["clichés", "promises", "threats", "jokes"],
      "correctAnswer": 0
    },
    {
      "id": "q14",
      "text": "Choose the statement closest in meaning: “He scarcely recognized the city he had left years ago.”",
      "options": ["He did not recognize the city at all.", "He hardly recognized the city", "He fully recognized the city.", "He ignored the city."],
      "correctAnswer": 1
    },
    {
      "id": "q15",
      "text": "Rewrite: “Although the task was difficult, she completed it efficiently.”",
      "options": ["She completed the difficult task efficiently despite the challenge.", "The task was completed efficiently although difficult.", "Despite the difficult task, efficiently she completed it.", "She efficiently despite the task completed it."],
      "correctAnswer": 0
    },
    {
      "id": "q16",
      "text": "Rewrite: “I regret not having attended the conference.”",
      "options": ["I wish I had attended the conference.", "I am glad I did not attend.", "I hope I had attended.", "I am happy I missed it."],
      "correctAnswer": 0
    },
    {
      "id": "q17",
      "text": "Rewrite: “It’s unnecessary for you to submit the report now.”",
      "options": ["You must submit the report now.", "You don’t have to submit the report now.", "You should submit the report now.", "You need submit the report."],
      "correctAnswer": 1
    },
    {
      "id": "q18",
      "text": "Choose the correct meaning: “To throw someone in at the deep end.”",
      "options": ["To help someone gradually", "To put someone in a difficult situation without preparation", "To take a risk together", "To celebrate success"],
      "correctAnswer": 1
    },
    {
      "id": "q19",
      "text": "Which is the correct collocation?",
      "options": ["Make a mistake", "Do a mistake", "Take a mistake", "Commit a mistake"],
      "correctAnswer": 0
    },
    {
      "id": "q20",
      "text": "Fill in the blank: “She is known for her ____ wit and sharp observations.”",
      "options": ["cutting", "blunt", "dull", "clumsy"],
      "correctAnswer": 0
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
