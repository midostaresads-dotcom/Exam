const db = require('./db');

const exam = {
  title: "امتحان تحديد مستوى قبل ICDL",
  description: "ICDL Level Determination Exam",
  questions_json: JSON.stringify([
    {
      "id": "q1",
      "text": "ما هو نظام التشغيل؟",
      "options": ["برنامج لتشغيل الألعاب", "برنامج ينظم تشغيل الكمبيوتر", "برنامج مضاد للفيروسات", "لوحة تحكم الشاشة"],
      "correctAnswer": 1
    },
    {
      "id": "q2",
      "text": "أي مما يلي يعتبر جهاز إدخال؟",
      "options": ["شاشة", "سماعات", "لوحة المفاتيح", "طابعة"],
      "correctAnswer": 2
    },
    {
      "id": "q3",
      "text": "وحدة قياس سرعة المعالج هي:",
      "options": ["GB", "GHz", "MB", "DPI"],
      "correctAnswer": 1
    },
    {
      "id": "q4",
      "text": "أي ملف من دول هو ملف صورة؟",
      "options": [".docx", ".jpg", ".xlsx", ".ppt"],
      "correctAnswer": 1
    },
    {
      "id": "q5",
      "text": "ما فائدة USB؟",
      "options": ["توصيل الإنترنت", "تخزين ونقل الملفات", "تسريع الجهاز", "تشغيل الصوت"],
      "correctAnswer": 1
    },
    {
      "id": "q6",
      "text": "لإعادة تسمية ملف نضغط:",
      "options": ["Delete", "F2", "Ctrl + R", "Shift + Enter"],
      "correctAnswer": 1
    },
    {
      "id": "q7",
      "text": "\"Recycle Bin\" وظيفته:",
      "options": ["حذف الملفات نهائيًا", "تخزين الملفات مؤقتًا", "تشغيل البرامج", "ضبط النظام"],
      "correctAnswer": 1
    },
    {
      "id": "q8",
      "text": "لنسخ ملف نضغط:",
      "options": ["Ctrl + X", "Ctrl + C", "Ctrl + V", "Ctrl + S"],
      "correctAnswer": 1
    },
    {
      "id": "q9",
      "text": "أي امتداد من هذه خاص ببرنامج Word؟",
      "options": [".exe", ".mp4", ".docx", ".mp3"],
      "correctAnswer": 2
    },
    {
      "id": "q10",
      "text": "لعمل مجلد جديد نضغط:",
      "options": ["Ctrl + Shift + N", "Ctrl + Alt + N", "Shift + N", "Alt + N"],
      "correctAnswer": 0
    },
    {
      "id": "q11",
      "text": "المتصفح هو:",
      "options": ["برنامج لفتح الصور", "برنامج لتصفح الإنترنت", "برنامج لصيانة الجهاز", "برنامج للكتابة"],
      "correctAnswer": 1
    },
    {
      "id": "q12",
      "text": "https:// هو:",
      "options": ["بروتوكول حماية المواقع", "نوع ملف", "محرك بحث", "نظام تشغيل"],
      "correctAnswer": 0
    },
    {
      "id": "q13",
      "text": "أي من التالي هو محرك بحث؟",
      "options": ["Facebook", "Chrome", "Google", "WhatsApp"],
      "correctAnswer": 2
    },
    {
      "id": "q14",
      "text": "لتنزيل ملف من الإنترنت نضغط:",
      "options": ["Upload", "Install", "Download", "Remove"],
      "correctAnswer": 2
    },
    {
      "id": "q15",
      "text": "للتأكد أن موقع آمن نرى:",
      "options": ["علامة 🔒", "علامة ❌", "علامة ⚠️", "علامة 🔔"],
      "correctAnswer": 0
    },
    {
      "id": "q16",
      "text": "لعمل بولد (خط عريض) نضغط:",
      "options": ["Ctrl + U", "Ctrl + B", "Ctrl + I", "Ctrl + O"],
      "correctAnswer": 1
    },
    {
      "id": "q17",
      "text": "أي من التالي يعتبر برنامجًا للجداول؟",
      "options": ["Word", "Excel", "PowerPoint", "Paint"],
      "correctAnswer": 1
    },
    {
      "id": "q18",
      "text": "في Excel، الخلية A1 تعني:",
      "options": ["العمود A والصف 1", "الصف A والعمود 1", "خلية في الصفحة الثانية", "خلية مرفقة بصورة"],
      "correctAnswer": 0
    },
    {
      "id": "q19",
      "text": "في Word، لمحاذاة النص إلى اليمين نضغط:",
      "options": ["Ctrl + L", "Ctrl + E", "Ctrl + R", "Ctrl + Shift"],
      "correctAnswer": 2
    },
    {
      "id": "q20",
      "text": "ما وظيفة حفظ الملف؟",
      "options": ["إغلاقه", "فتحه", "نسخ محتواه", "حفظ التعديلات"],
      "correctAnswer": 3
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
