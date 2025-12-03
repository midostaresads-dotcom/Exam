const db = require('./db');

const exam = {
  title: "امتحان مستوى E2",
  description: "English Placement Test E2 Level",
  questions_json: JSON.stringify([
    {
      "id": "q1",
      "text": "The success of the project largely depends on how well the team can ____ unforeseen challenges.",
      "options": ["tackle", "trigger", "transmit", "translate"],
      "correctAnswer": 0
    },
    {
      "id": "q2",
      "text": "His argument was convincing, but it lacked solid evidence to fully ____.",
      "options": ["reinforce", "reassure", "reflect", "retain"],
      "correctAnswer": 0
    },
    {
      "id": "q3",
      "text": "The company is seeking innovative solutions to ____ the environmental impact of its operations.",
      "options": ["eliminate", "minimize", "overcome", "decline"],
      "correctAnswer": 1
    },
    {
      "id": "q4",
      "text": "She had to cancel her trip due to circumstances beyond her ____.",
      "options": ["influence", "control", "intention", "decision"],
      "correctAnswer": 1
    },
    {
      "id": "q5",
      "text": "The conference aims to address the challenges that ____ from rapid technological change.",
      "options": ["arise", "raise", "arouse", "rise"],
      "correctAnswer": 0
    },
    {
      "id": "q6",
      "text": "His comments were so vague that they added little ____ to the discussion.",
      "options": ["value", "volume", "vision", "validation"],
      "correctAnswer": 0
    },
    {
      "id": "q7",
      "text": "The manager emphasized the importance of maintaining a professional ____ at work.",
      "options": ["attitude", "altitude", "aptitude", "annotation"],
      "correctAnswer": 0
    },
    {
      "id": "q8",
      "text": "Although the plan seemed promising, several issues were ____ during implementation.",
      "options": ["evolved", "emerged", "enlarged", "ensured"],
      "correctAnswer": 1
    },
    {
      "id": "q9",
      "text": "The organization is committed to providing equal opportunities ____ all employees.",
      "options": ["with", "for", "on", "by"],
      "correctAnswer": 1
    },
    {
      "id": "q10",
      "text": "They postponed the meeting to allow more time for participants to ____ their opinions.",
      "options": ["compile", "convey", "convert", "convince"],
      "correctAnswer": 1
    },
    {
      "id": "q11",
      "text": "The report highlighted the need for a more ____ strategy to deal with the crisis.",
      "options": ["sustainable", "suspect", "subjective", "suspicious"],
      "correctAnswer": 0
    },
    {
      "id": "q12",
      "text": "The data was collected from a wide range of sources to ensure greater ____.",
      "options": ["reliability", "reliance", "realism", "regulation"],
      "correctAnswer": 0
    },
    {
      "id": "q13",
      "text": "\"He must have overlooked it\" suggests that we are almost certain he didn’t notice it.",
      "options": ["True", "False"],
      "correctAnswer": 0
    },
    {
      "id": "q14",
      "text": "\"Under no circumstances should you leave the door unlocked\" is an example of inversion.",
      "options": ["True", "False"],
      "correctAnswer": 0
    },
    {
      "id": "q15",
      "text": "\"If I knew the answer, I would have told you\" is a correct mixed conditional.",
      "options": ["True", "False"],
      "correctAnswer": 1
    },
    {
      "id": "q16",
      "text": "\"Despite of the rain\" is grammatically correct.",
      "options": ["True", "False"],
      "correctAnswer": 1
    },
    {
      "id": "q17",
      "text": "The proposal was rejected because it failed to address the issue in a ____ manner.",
      "options": ["comprehensive", "compressed", "compromising", "compulsory"],
      "correctAnswer": 0
    },
    {
      "id": "q18",
      "text": "We need to approach the problem from a completely different ____.",
      "options": ["prospect", "perspective", "prescription", "permission"],
      "correctAnswer": 1
    },
    {
      "id": "q19",
      "text": "The new policy will not be effective unless it is properly ____.",
      "options": ["implemented", "imported", "implied", "improved"],
      "correctAnswer": 0
    },
    {
      "id": "q20",
      "text": "The CEO expressed confidence that the company would ____ stronger after the crisis.",
      "options": ["emerge", "merge", "submerge", "enlarge"],
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
