const db = require('./db');

const exam = {
  title: "English C1 Exam",
  description: "English Placement Test C1 Level",
  questions_json: JSON.stringify([
    {
      "id": "q1",
      "text": "Had I known about the traffic, I ____ earlier.",
      "options": ["will leave", "would leave", "would have left", "left"],
      "correctAnswer": 2
    },
    {
      "id": "q2",
      "text": "She insisted that he ____ on time for the meeting.",
      "options": ["arrives", "arrive", "arrived", "arriving"],
      "correctAnswer": 1
    },
    {
      "id": "q3",
      "text": "He is looking forward ____ his new office next month.",
      "options": ["to move", "moving", "to moving", "move"],
      "correctAnswer": 2
    },
    {
      "id": "q4",
      "text": "It’s high time you ____ your mistakes.",
      "options": ["admit", "admitted", "admitting", "admits"],
      "correctAnswer": 1
    },
    {
      "id": "q5",
      "text": "Despite ____ the instructions, he failed the test.",
      "options": ["of following", "following", "having followed", "follows"],
      "correctAnswer": 2
    },
    {
      "id": "q6",
      "text": "The more you practice, the ____ you will become.",
      "options": ["best", "better", "more good", "most good"],
      "correctAnswer": 1
    },
    {
      "id": "q7",
      "text": "He would rather you ____ the matter yourself.",
      "options": ["handle", "handled", "handles", "handling"],
      "correctAnswer": 0
    },
    {
      "id": "q8",
      "text": "By the time we arrived, the film ____ already ____ .",
      "options": ["has / started", "had / started", "had / start", "have / started"],
      "correctAnswer": 1
    },
    {
      "id": "q9",
      "text": "His speech was very ____; everyone was convinced by his argument.",
      "options": ["persuasive", "preserved", "pervasive", "preventive"],
      "correctAnswer": 0
    },
    {
      "id": "q10",
      "text": "The documentary provides a deep ____ into the lives of rural communities.",
      "options": ["insight", "overview", "outlook", "review"],
      "correctAnswer": 0
    },
    {
      "id": "q11",
      "text": "The company's profits ____ significantly last year.",
      "options": ["rose", "raise", "risen", "rised"],
      "correctAnswer": 0
    },
    {
      "id": "q12",
      "text": "The politician was accused ____ corruption.",
      "options": ["for", "of", "by", "from"],
      "correctAnswer": 1
    },
    {
      "id": "q13",
      "text": "He remained calm, even under extreme ____ .",
      "options": ["pressure", "press", "pressing", "depress"],
      "correctAnswer": 0
    },
    {
      "id": "q14",
      "text": "The teacher emphasized the importance of a ____ approach to problem-solving.",
      "options": ["strategic", "strategy", "strategical", "strategist"],
      "correctAnswer": 0
    },
    {
      "id": "q15",
      "text": "Choose the sentence closest in meaning to: “She barely arrived on time.”",
      "options": ["She arrived early.", "She almost missed the time.", "She was late by a few minutes.", "She arrived much earlier."],
      "correctAnswer": 1
    },
    {
      "id": "q16",
      "text": "“No sooner had they started the meeting than the phone rang.” The meaning is:",
      "options": ["The meeting started late.", "The phone rang immediately after the meeting started.", "They ignored the phone.", "The phone rang before the meeting."],
      "correctAnswer": 1
    },
    {
      "id": "q17",
      "text": "Which word fits best? “He is a man of great ____ ; everyone trusts his judgment.”",
      "options": ["honesty", "honor", "honest", "honestly"],
      "correctAnswer": 0
    },
    {
      "id": "q18",
      "text": "Rewrite: “It is unnecessary for you to attend the meeting.”",
      "options": ["You must attend the meeting.", "You don’t have to attend the meeting.", "You should attend the meeting.", "You need attend the meeting."],
      "correctAnswer": 1
    },
    {
      "id": "q19",
      "text": "Rewrite: “I regret not telling you the truth.”",
      "options": ["I wish I had told you the truth.", "I am glad I didn’t tell you the truth.", "I hope I told you the truth.", "I am sorry I tell you the truth."],
      "correctAnswer": 0
    },
    {
      "id": "q20",
      "text": "Rewrite: “She completed the task quickly although it was difficult.”",
      "options": ["Despite being difficult, she completed the task quickly.", "She quickly completed the difficult task despite.", "Although difficult, the task completed quickly.", "She completed quickly despite the task difficulty."],
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
