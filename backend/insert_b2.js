const db = require('./db');

const exam = {
  title: "امتحان B2",
  description: "English Placement Test B2 Level",
  questions_json: JSON.stringify([
    {
      "id": "q1",
      "text": "He denied ____ the documents.",
      "options": ["to steal", "stealing", "steal", "having steal"],
      "correctAnswer": 1
    },
    {
      "id": "q2",
      "text": "We need someone who can deal with problems in a ____ way.",
      "options": ["childish", "dramatic", "responsible", "careless"],
      "correctAnswer": 2
    },
    {
      "id": "q3",
      "text": "Had I known about the meeting, I ____ earlier.",
      "options": ["would come", "will come", "would have come", "came"],
      "correctAnswer": 2
    },
    {
      "id": "q4",
      "text": "The company is looking for ways to cut costs without ____ quality.",
      "options": ["sacrificing", "sacrificed", "sacrifice", "to sacrifice"],
      "correctAnswer": 0
    },
    {
      "id": "q5",
      "text": "It’s essential that every employee ____ the safety procedures.",
      "options": ["follows", "follow", "followed", "following"],
      "correctAnswer": 0
    },
    {
      "id": "q6",
      "text": "Hardly had he arrived ____ it started raining.",
      "options": ["when", "then", "than", "that"],
      "correctAnswer": 0
    },
    {
      "id": "q7",
      "text": "The results were disappointing; they were far ____ our expectations.",
      "options": ["above", "under", "behind", "below"],
      "correctAnswer": 3
    },
    {
      "id": "q8",
      "text": "He was accused ____ breaking the law.",
      "options": ["for", "of", "from", "by"],
      "correctAnswer": 1
    },
    {
      "id": "q9",
      "text": "She eventually succeeded ____ her own business.",
      "options": ["to start", "in starting", "start", "on starting"],
      "correctAnswer": 1
    },
    {
      "id": "q10",
      "text": "The more you practice, the ____ you will become.",
      "options": ["best", "better", "more good", "most good"],
      "correctAnswer": 1
    },
    {
      "id": "q11",
      "text": "The manager suggested that we ____ the plan again.",
      "options": ["review", "reviewed", "reviewing", "to review"],
      "correctAnswer": 0
    },
    {
      "id": "q12",
      "text": "You shouldn’t have spoken to him like that; it was totally ____.",
      "options": ["unnecessary", "unuseful", "unpositive", "uncareful"],
      "correctAnswer": 0
    },
    {
      "id": "q13",
      "text": "\"I regret to tell you\" يعني إنني آسف الآن لما سأقوله.",
      "options": ["True", "False"],
      "correctAnswer": 0
    },
    {
      "id": "q14",
      "text": "\"He is used to work late\" جملة صحيحة.",
      "options": ["True", "False"],
      "correctAnswer": 1
    },
    {
      "id": "q15",
      "text": "\"She can’t have forgotten the keys\" يدل على أنه من المستحيل تقريباً أنها نسيت المفاتيح.",
      "options": ["True", "False"],
      "correctAnswer": 0
    },
    {
      "id": "q16",
      "text": "\"No sooner had they left than the lights went out\" جملة صحيحة زمنياً ونحوياً.",
      "options": ["True", "False"],
      "correctAnswer": 0
    },
    {
      "id": "q17",
      "text": "They plan to launch the product once the design ____ approved.",
      "options": ["will be", "is", "was", "has"],
      "correctAnswer": 1
    },
    {
      "id": "q18",
      "text": "I would rather you ____ the matter yourself.",
      "options": ["handle", "handled", "handles", "handling"],
      "correctAnswer": 0
    },
    {
      "id": "q19",
      "text": "He didn’t study; ____ he failed the exam.",
      "options": ["although", "nevertheless", "consequently", "even if"],
      "correctAnswer": 2
    },
    {
      "id": "q20",
      "text": "We need to hire more staff to cope with the ____ demand.",
      "options": ["increased", "increasing", "increase", "overly increase"],
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
