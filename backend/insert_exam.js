const db = require('./db');

const exams = [
  {
    title: "امتحان A1",
    description: "English Placement Test A1 Level",
    questions_json: JSON.stringify([
      {
        "id": "q1",
        "text": "What is the correct greeting in the morning?",
        "options": ["Good night", "Good morning", "Goodbye", "See you"],
        "correctAnswer": 1
      },
      {
        "id": "q2",
        "text": "\"How are you?\" — What is a good answer?",
        "options": ["Blue", "Fine, thank you", "Up", "Banana"],
        "correctAnswer": 1
      },
      {
        "id": "q3",
        "text": "Which one is a fruit?",
        "options": ["Car", "Apple", "Chair", "Window"],
        "correctAnswer": 1
      },
      {
        "id": "q4",
        "text": "\"Where do you live?\" means:",
        "options": ["What is your name?", "How old are you?", "Where is your home?", "Do you like food?"],
        "correctAnswer": 2
      },
      {
        "id": "q5",
        "text": "Choose the correct form:\nShe ___ a teacher.",
        "options": ["am", "is", "are", "be"],
        "correctAnswer": 1
      },
      {
        "id": "q6",
        "text": "I ___ football every day.",
        "options": ["play", "plays", "playing", "played"],
        "correctAnswer": 0
      },
      {
        "id": "q7",
        "text": "What is the opposite of \"big\"?",
        "options": ["small", "tall", "long", "fat"],
        "correctAnswer": 0
      },
      {
        "id": "q8",
        "text": "Which one is a place?",
        "options": ["Book", "School", "Red", "Run"],
        "correctAnswer": 1
      },
      {
        "id": "q9",
        "text": "\"I like coffee.\" means:",
        "options": ["أنا أحب القهوة", "أنا أكره القهوة", "أنا أطبخ القهوة", "أنا أبحث عن القهوة"],
        "correctAnswer": 0
      },
      {
        "id": "q10",
        "text": "\"This is my mother.\" يعني:",
        "options": ["هذه أختي", "هذه أمي", "هذا أبي", "هذا أخي"],
        "correctAnswer": 1
      },
      {
        "id": "q11",
        "text": "\"Cat\" means قطة.",
        "options": ["True", "False"],
        "correctAnswer": 0
      },
      {
        "id": "q12",
        "text": "\"Goodbye\" means أهلاً.",
        "options": ["True", "False"],
        "correctAnswer": 1
      },
      {
        "id": "q13",
        "text": "Number 10 is \"ten\".",
        "options": ["True", "False"],
        "correctAnswer": 0
      },
      {
        "id": "q14",
        "text": "\"I am hungry\" يعني أنا جائع.",
        "options": ["True", "False"],
        "correctAnswer": 0
      },
      {
        "id": "q15",
        "text": "\"Blue\" is a color.",
        "options": ["True", "False"],
        "correctAnswer": 0
      },
      {
        "id": "q16",
        "text": "My name ___ Ahmed.",
        "options": ["am", "is", "are", "be"],
        "correctAnswer": 1
      },
      {
        "id": "q17",
        "text": "I ___ from Egypt.",
        "options": ["am", "is", "are", "be"],
        "correctAnswer": 0
      },
      {
        "id": "q18",
        "text": "This is a ___",
        "options": ["table", "eat", "run", "slow"],
        "correctAnswer": 0
      },
      {
        "id": "q19",
        "text": "I have ___ sister.",
        "options": ["a", "an", "the", "any"],
        "correctAnswer": 0
      },
      {
        "id": "q20",
        "text": "\"Thank ___.\"",
        "options": ["me", "you", "he", "they"],
        "correctAnswer": 1
      }
    ]),
    time_limit: 3600
  },
  {
    title: "امتحان A2",
    description: "English Placement Test A2 Level",
    questions_json: JSON.stringify([
      {
        "id": "q1",
        "text": "I usually wake up ____ 7 o’clock.",
        "options": ["in", "at", "on", "by"],
        "correctAnswer": 1
      },
      {
        "id": "q2",
        "text": "She didn’t go to work yesterday because she was ____",
        "options": ["tired", "hungry", "tall", "fast"],
        "correctAnswer": 0
      },
      {
        "id": "q3",
        "text": "“Could you please repeat that?” is used when:",
        "options": ["You agree", "You don’t hear something", "You are angry", "You want to leave"],
        "correctAnswer": 1
      },
      {
        "id": "q4",
        "text": "My brother is ____ than me.",
        "options": ["more tall", "tallest", "taller", "very tall"],
        "correctAnswer": 2
      },
      {
        "id": "q5",
        "text": "I have lived in this city ____ three years.",
        "options": ["since", "for", "during", "from"],
        "correctAnswer": 1
      },
      {
        "id": "q6",
        "text": "The opposite of “early” is:",
        "options": ["soon", "late", "slow", "fast"],
        "correctAnswer": 1
      },
      {
        "id": "q7",
        "text": "How ____ milk do we need?",
        "options": ["much", "many", "few", "a lot"],
        "correctAnswer": 0
      },
      {
        "id": "q8",
        "text": "I enjoy ____ football at the weekend.",
        "options": ["play", "to play", "playing", "played"],
        "correctAnswer": 2
      },
      {
        "id": "q9",
        "text": "“He is interested ____ music.”",
        "options": ["at", "of", "in", "by"],
        "correctAnswer": 2
      },
      {
        "id": "q10",
        "text": "We didn’t have ____ money to buy the ticket.",
        "options": ["many", "enough", "some", "few"],
        "correctAnswer": 1
      },
      {
        "id": "q11",
        "text": "“I have been here since 2010.” — “since” تُستخدم مع نقطة زمنية.",
        "options": ["True", "False"],
        "correctAnswer": 0
      },
      {
        "id": "q12",
        "text": "“Few” تُستخدم مع الأشياء غير المعدودة.",
        "options": ["True", "False"],
        "correctAnswer": 1
      },
      {
        "id": "q13",
        "text": "“He can’t speak English” يعني هو يتحدث الإنجليزية جيداً.",
        "options": ["True", "False"],
        "correctAnswer": 1
      },
      {
        "id": "q14",
        "text": "“I am looking for my keys” تعني أنا أبحث عن مفاتيحي.",
        "options": ["True", "False"],
        "correctAnswer": 0
      },
      {
        "id": "q15",
        "text": "“She always is late.” جملة صحيحة لغوياً.",
        "options": ["True", "False"],
        "correctAnswer": 1
      },
      {
        "id": "q16",
        "text": "If it ____ tomorrow, we won’t go out.",
        "options": ["rains", "raining", "rained", "rain"],
        "correctAnswer": 0
      },
      {
        "id": "q17",
        "text": "She ____ to the gym twice a week.",
        "options": ["go", "goes", "going", "went"],
        "correctAnswer": 1
      },
      {
        "id": "q18",
        "text": "I haven’t finished my homework ____.",
        "options": ["yet", "just", "already", "soon"],
        "correctAnswer": 0
      },
      {
        "id": "q19",
        "text": "This movie is ____ than the one we watched last week.",
        "options": ["good", "better", "best", "more good"],
        "correctAnswer": 1
      },
      {
        "id": "q20",
        "text": "We are going to travel next week, ____?",
        "options": ["don’t we", "aren’t we", "will we", "didn’t we"],
        "correctAnswer": 1
      }
    ]),
    time_limit: 3600
  },
  {
    title: "امتحان B1",
    description: "English Placement Test B1 Level",
    questions_json: JSON.stringify([
      {
        "id": "q1",
        "text": "If I had more time, I would ____ more books.",
        "options": ["read", "reading", "reads", "be read"],
        "correctAnswer": 0
      },
      {
        "id": "q2",
        "text": "He hasn’t decided ____ to apply for the job.",
        "options": ["what", "why", "when", "whether"],
        "correctAnswer": 3
      },
      {
        "id": "q3",
        "text": "She asked me ____ I could help her.",
        "options": ["if", "that", "which", "who"],
        "correctAnswer": 0
      },
      {
        "id": "q4",
        "text": "The film was interesting, but it was ____ long.",
        "options": ["too", "very", "enough", "much"],
        "correctAnswer": 0
      },
      {
        "id": "q5",
        "text": "I’m not used ____ up so early.",
        "options": ["get", "getting", "got", "to get"],
        "correctAnswer": 1
      },
      {
        "id": "q6",
        "text": "The company will hire new staff ____ the end of the year.",
        "options": ["on", "for", "by", "from"],
        "correctAnswer": 2
      },
      {
        "id": "q7",
        "text": "She saved money ____ she could buy a new laptop.",
        "options": ["because", "so that", "unless", "although"],
        "correctAnswer": 1
      },
      {
        "id": "q8",
        "text": "You should check the weather forecast ____ going out.",
        "options": ["before", "between", "across", "while"],
        "correctAnswer": 0
      },
      {
        "id": "q9",
        "text": "I have lived here ____ I was a child.",
        "options": ["for", "since", "during", "from"],
        "correctAnswer": 1
      },
      {
        "id": "q10",
        "text": "He apologized ____ being late.",
        "options": ["to", "for", "about", "on"],
        "correctAnswer": 1
      },
      {
        "id": "q11",
        "text": "“I managed to finish” means I succeeded in finishing.",
        "options": ["True", "False"],
        "correctAnswer": 0
      },
      {
        "id": "q12",
        "text": "“Despite of the rain” جملة صحيحة.",
        "options": ["True", "False"],
        "correctAnswer": 1
      },
      {
        "id": "q13",
        "text": "“He used to smoke” يعني هو كان يدخن في الماضي والآن توقف.",
        "options": ["True", "False"],
        "correctAnswer": 0
      },
      {
        "id": "q14",
        "text": "“She must be tired” يدل على احتمال قوي أنها متعبة.",
        "options": ["True", "False"],
        "correctAnswer": 0
      },
      {
        "id": "q15",
        "text": "“I look forward to meet you” جملة صحيحة.",
        "options": ["True", "False"],
        "correctAnswer": 1
      },
      {
        "id": "q16",
        "text": "By the time we arrived, the movie ____",
        "options": ["started", "starts", "had started", "starting"],
        "correctAnswer": 2
      },
      {
        "id": "q17",
        "text": "If you study harder, you ____ the exam.",
        "options": ["pass", "passes", "passed", "will pass"],
        "correctAnswer": 3
      },
      {
        "id": "q18",
        "text": "She prefers ____ at home rather than going out.",
        "options": ["stay", "staying", "stayed", "to stayed"],
        "correctAnswer": 1
      },
      {
        "id": "q19",
        "text": "They were tired because they ____ for hours.",
        "options": ["walk", "walked", "have walked", "had been walking"],
        "correctAnswer": 3
      },
      {
        "id": "q20",
        "text": "Let’s go to a café, ____?",
        "options": ["do we", "don’t we", "shall we", "will we"],
        "correctAnswer": 2
      }
    ]),
    time_limit: 3600
];

let insertedCount = 0;

function insertExam(exam) {
  const created_at = new Date().toISOString();
  const sql = `INSERT INTO exams (title, description, questions_json, time_limit, created_at) VALUES (?, ?, ?, ?, ?)`;
  const params = [exam.title, exam.description, exam.questions_json, exam.time_limit, created_at];

  db.run(sql, params, function(err) {
    if (err) {
      console.error('Error inserting exam:', err.message);
    } else {
      console.log(`Exam "${exam.title}" inserted successfully with ID:`, this.lastID);
    }
    insertedCount++;
    if (insertedCount === exams.length) {
      db.close();
    }
  });
}

exams.forEach(insertExam);


