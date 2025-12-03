const db = require('./db');

const exam = {
  title: "امتحان ICDL النهائي",
  description: "Final ICDL Exam",
  questions_json: JSON.stringify([
    {
      "id": "q1",
      "text": "أي مما يلي جهاز إدخال؟",
      "options": ["الشاشة", "الطابعة", "لوحة المفاتيح", "السماعات"],
      "correctAnswer": 2
    },
    {
      "id": "q2",
      "text": "أفضل طريقة لحماية الكمبيوتر:",
      "options": ["كلمة مرور قوية", "تغيير الخلفية", "حذف الملفات الكبيرة", "تشغيل الجهاز يوميًا"],
      "correctAnswer": 0
    },
    {
      "id": "q3",
      "text": "RAM وظيفتها:",
      "options": ["تخزين دائم", "تخزين مؤقت", "تشغيل الإنترنت", "تشغيل الفيديو"],
      "correctAnswer": 1
    },
    {
      "id": "q4",
      "text": "أي من البرامج التالي يعتبر نظام تشغيل؟",
      "options": ["Word", "Windows", "Chrome", "VLC"],
      "correctAnswer": 1
    },
    {
      "id": "q5",
      "text": "Virus هو:",
      "options": ["برنامج حماية", "برنامج ضار", "ملف نصي", "برنامج تصوير"],
      "correctAnswer": 1
    },
    {
      "id": "q6",
      "text": "فائدة USB:",
      "options": ["طباعة الملفات", "تخزين ونقل الملفات", "تشغيل الإنترنت", "زيادة الرام"],
      "correctAnswer": 1
    },
    {
      "id": "q7",
      "text": "لإعادة تسمية ملف:",
      "options": ["F1", "F2", "Ctrl + R", "Shift + N"],
      "correctAnswer": 1
    },
    {
      "id": "q8",
      "text": "وظيفة Recycle Bin:",
      "options": ["حذف الملفات نهائيًا", "تخزين الملفات مؤقتًا", "تشغيل البرامج", "ضبط النظام"],
      "correctAnswer": 1
    },
    {
      "id": "q9",
      "text": "لنسخ ملف:",
      "options": ["Ctrl + X", "Ctrl + C", "Ctrl + V", "Ctrl + S"],
      "correctAnswer": 1
    },
    {
      "id": "q10",
      "text": "لإنشاء مجلد جديد:",
      "options": ["Ctrl + Shift + N", "Ctrl + Alt + N", "Shift + N", "Alt + N"],
      "correctAnswer": 0
    },
    {
      "id": "q11",
      "text": "لفتح Task Manager:",
      "options": ["Ctrl + Shift + Enter", "Ctrl + Alt + Del", "Alt + Tab", "Win + R"],
      "correctAnswer": 1
    },
    {
      "id": "q12",
      "text": "Disk Cleanup وظيفة:",
      "options": ["حذف الفيروسات", "تنظيف الملفات المؤقتة", "زيادة الرام", "تسريع الإنترنت"],
      "correctAnswer": 1
    },
    {
      "id": "q13",
      "text": "لتنسيق عنوان رئيسي:",
      "options": ["تكبير الخط يدويًا", "استخدام Heading 1", "تغيير اللون فقط", "Bold"],
      "correctAnswer": 1
    },
    {
      "id": "q14",
      "text": "لإضافة ترقيم الصفحات:",
      "options": ["Insert → Page Number", "Layout → Margins", "Home → Styles", "View → Zoom"],
      "correctAnswer": 0
    },
    {
      "id": "q15",
      "text": "لعمل جدول:",
      "options": ["Insert → Table", "Home → Table", "Data → Insert", "View → Table"],
      "correctAnswer": 0
    },
    {
      "id": "q16",
      "text": "لحفظ Word مع حماية من التعديل:",
      "options": [".docx", ".pdf", ".txt", ".rtf"],
      "correctAnswer": 1
    },
    {
      "id": "q17",
      "text": "Track Changes وظيفة:",
      "options": ["حذف الكلمات", "متابعة التعديلات", "إصلاح الأخطاء", "إنشاء روابط"],
      "correctAnswer": 1
    },
    {
      "id": "q18",
      "text": "لإدراج صورة في المستند:",
      "options": ["Insert → Picture", "Home → Picture", "Layout → Picture", "Review → Insert"],
      "correctAnswer": 0
    },
    {
      "id": "q19",
      "text": "دالة جمع الأرقام هي:",
      "options": ["=TOTAL", "=SUM", "=ADD", "=PLUS"],
      "correctAnswer": 1
    },
    {
      "id": "q20",
      "text": "ضرب 10 × 5 في Excel:",
      "options": ["=10×5", "105", "=105", "105*"],
      "correctAnswer": 2
    },
    {
      "id": "q21",
      "text": "لفرز البيانات:",
      "options": ["Home → Sort & Filter", "Insert → Sort", "Data → Charts", "View → Sort"],
      "correctAnswer": 0
    },
    {
      "id": "q22",
      "text": "خلية مدمجة تسمى:",
      "options": ["Merged Cell", "Locked Cell", "Disabled Cell", "Formatted Cell"],
      "correctAnswer": 0
    },
    {
      "id": "q23",
      "text": "###### في الخلية يعني:",
      "options": ["خطأ صيغة", "العمود ضيق", "الجهاز بطيء", "الملف تالف"],
      "correctAnswer": 1
    },
    {
      "id": "q24",
      "text": "لإدراج رسم بياني:",
      "options": ["Home → Insert", "Insert → Chart", "Layout → Graph", "Data → Graph"],
      "correctAnswer": 1
    },
    {
      "id": "q25",
      "text": "لإضافة شريحة جديدة:",
      "options": ["Home → New Slide", "Insert → Slide", "Layout → New", "Design → Slide"],
      "correctAnswer": 0
    },
    {
      "id": "q26",
      "text": "لإضافة انتقال بين الشرائح:",
      "options": ["Insert → Transition", "Design → Transition", "Transitions → Apply to All", "Home → Transition"],
      "correctAnswer": 2
    },
    {
      "id": "q27",
      "text": "لإضافة نص داخل شريحة:",
      "options": ["Insert → Text Box", "Layout → Text", "Design → Text", "Home → Insert"],
      "correctAnswer": 0
    },
    {
      "id": "q28",
      "text": "لتغيير خلفية الشريحة:",
      "options": ["Home → Background", "Design → Format Background", "Layout → Background", "Insert → Background"],
      "correctAnswer": 1
    },
    {
      "id": "q29",
      "text": "لعرض الشرائح Presentation Mode:",
      "options": ["View → Slide", "F5", "Esc", "Ctrl + P"],
      "correctAnswer": 1
    },
    {
      "id": "q30",
      "text": "المتصفح هو:",
      "options": ["برنامج لتصفح الإنترنت", "برنامج للكتابة", "برنامج للصور", "برنامج للألعاب"],
      "correctAnswer": 0
    },
    {
      "id": "q31",
      "text": "HTTPS:// يعني:",
      "options": ["موقع غير آمن", "موقع آمن", "نوع ملف", "محرك بحث"],
      "correctAnswer": 1
    },
    {
      "id": "q32",
      "text": "أي من التالي محرك بحث؟",
      "options": ["Chrome", "Google", "Facebook", "WhatsApp"],
      "correctAnswer": 1
    },
    {
      "id": "q33",
      "text": "لتنزيل ملف:",
      "options": ["Upload", "Install", "Download", "Remove"],
      "correctAnswer": 2
    },
    {
      "id": "q34",
      "text": "علامة 🔒 بجانب رابط الموقع تعني:",
      "options": ["الموقع آمن", "الموقع غير آمن", "الموقع محظور", "الموقع مجاني"],
      "correctAnswer": 0
    },
    {
      "id": "q35",
      "text": "لإرسال ملف عبر البريد الإلكتروني، يجب أولًا:",
      "options": ["نسخ الملف إلى القرص الصلب", "إرفاق الملف Attach", "فتح الملف فقط", "حذف الملف"],
      "correctAnswer": 1
    },
    {
      "id": "q36",
      "text": "عند عمل نسخة احتياطية Backup، الهدف هو:",
      "options": ["تحسين الأداء", "حماية البيانات", "حذف الملفات", "تسريع الإنترنت"],
      "correctAnswer": 1
    },
    {
      "id": "q37",
      "text": "أفضل تنسيق لمشاركة ملف Word:",
      "options": [".docx", ".pdf", ".txt", ".rtf"],
      "correctAnswer": 1
    },
    {
      "id": "q38",
      "text": "لإضافة صورة في Excel:",
      "options": ["Insert → Picture", "Layout → Picture", "Home → Insert", "Data → Graph"],
      "correctAnswer": 0
    },
    {
      "id": "q39",
      "text": "لدمج خلايا في Excel:",
      "options": ["Merge & Center", "Merge Only", "Center Only", "Merge Cell"],
      "correctAnswer": 0
    },
    {
      "id": "q40",
      "text": "لفتح نافذة الطباعة في أي برنامج Office:",
      "options": ["Ctrl + P", "Ctrl + S", "Ctrl + O", "Ctrl + Z"],
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
