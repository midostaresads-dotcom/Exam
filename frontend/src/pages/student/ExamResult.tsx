import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import confetti from 'canvas-confetti';
import { CheckCircle, XCircle, Clock, Award, Home, Printer } from 'lucide-react';
import { ExamResult } from '../../types';
import API_BASE_URL from '../../config/api';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExamResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result as ExamResult;
  const printRef = useRef<HTMLDivElement>(null);
  const [examDuration, setExamDuration] = React.useState<number | null>(null);

  useEffect(() => {
    if (!result) {
      navigate('/student/exams');
      return;
    }

    // Debug: Log the result object to check if examTitle is present
    console.log('Result object:', result);
    console.log('Exam Title:', result.examTitle);
    console.log('Exam ID:', result.examId);

    // Fetch exam duration
    const fetchExamDuration = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/exams/${result.examId}`);
        if (response.ok) {
          const examData = await response.json();
          setExamDuration(examData.time_limit || null);
        }
      } catch (error) {
        console.error("خطأ في جلب بيانات الامتحان:", error);
      }
    };

    fetchExamDuration();

    // Save result to backend automatically
    const saveResultToBackend = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/results`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            student_name: result.studentName,
            phone: result.studentPhone,
            governorate: result.studentGovernorate,
            score: result.score,
            total_questions: result.totalQuestions,
            correct_answers: result.score,
            wrong_answers: result.totalQuestions - result.score,
            time_taken: `${Math.floor(result.timeSpent / 60)}:${(result.timeSpent % 60).toString().padStart(2, '0')}:00`,
            answers_json: JSON.stringify(result.answers),
            exam_id: result.examId,
            exam_title: result.examTitle
          })
        });

        if (response.ok) {
          console.log("تم حفظ النتيجة تلقائيًا في قاعدة البيانات!");
        } else {
          console.error("فشل في حفظ النتيجة:", response.statusText);
        }
      } catch (error) {
        console.error("خطأ في حفظ النتيجة تلقائيًا:", error);
      }
    };

    saveResultToBackend();

    if (result.percentage >= 50) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);
    }
  }, [result, navigate]);

  if (!result) return null;

  const chartData = {
    labels: ['إجابات صحيحة', 'إجابات خاطئة'],
    datasets: [
      {
        data: [result.score, result.totalQuestions - result.score],
        backgroundColor: ['#22c55e', '#ef4444'],
        borderColor: ['#16a34a', '#dc2626'],
        borderWidth: 1,
      },
    ],
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center">
      <div className="max-w-4xl w-full space-y-6">
        {/* Screen display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden print:shadow-none print:hidden"
          ref={printRef}
        >
          <div className={`p-8 text-center text-white ${result.percentage >= 50 ? 'bg-gradient-to-br from-green-500 to-emerald-700' : 'bg-gradient-to-br from-red-500 to-rose-700'}`}>
            <h1 className="text-3xl font-bold mb-2">
              {result.percentage >= 50 ? 'مبارك! لقد اجتزت الاختبار' : 'للأسف، لم تجتز الاختبار'}
            </h1>
            <p className="opacity-90">نتيجة اختبار {result.studentName}</p>
            <p className="text-lg font-semibold mt-2">{result.examTitle}</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                      <Award size={24} />
                    </div>
                    <span className="text-gray-600 font-medium">الدرجة النهائية</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-800">{result.score} / {result.totalQuestions}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                      <Clock size={24} />
                    </div>
                    <span className="text-gray-600 font-medium">الوقت المستغرق</span>
                  </div>
                  <span className="text-xl font-bold text-gray-800">{result.timeSpent !== undefined && result.timeSpent !== null && !isNaN(result.timeSpent) ? `${Math.floor(result.timeSpent / 60)}:${(result.timeSpent % 60).toString().padStart(2, '0')}` : 'غير محدد'} دقيقة</span>
                </div>

                {examDuration && (
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                        <Clock size={24} />
                      </div>
                      <span className="text-gray-600 font-medium">مدة الامتحان</span>
                    </div>
                    <span className="text-xl font-bold text-gray-800">{Math.floor(examDuration / 60)}:{(examDuration % 60).toString().padStart(2, '0')} دقيقة</span>
                  </div>
                )}

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg text-green-600">
                      <CheckCircle size={24} />
                    </div>
                    <span className="text-gray-600 font-medium">النسبة المئوية</span>
                  </div>
                  <span className={`text-2xl font-bold ${result.percentage >= 50 ? 'text-green-600' : 'text-red-600'}`}>
                    {result.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="flex justify-center h-64">
                <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Print layout - single page */}
        <div className="hidden print:block print:m-0 print:p-8 print:text-black print:bg-white print:h-screen print:overflow-hidden">
          {result.percentage >= 50 ? (
            // Certificate for passed exams
            <div className="h-full flex flex-col justify-center items-center text-center border-4 border-green-500 rounded-lg p-8">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-green-600 mb-4">شهادة اجتياز</h1>
                <div className="w-32 h-1 bg-green-500 mx-auto mb-6"></div>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <p className="text-xl mb-4">يسرنا أن نهنئ</p>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{result.studentName}</h2>
                <p className="text-lg mb-4">لاجتيازه اختبار</p>
                <h3 className="text-2xl font-bold text-blue-600 mb-6">{result.examTitle}</h3>
                <p className="text-lg mb-8">بنجاح</p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{result.score}/{result.totalQuestions}</div>
                    <div className="text-sm text-gray-600">الدرجة</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{result.percentage.toFixed(1)}%</div>
                    <div className="text-sm text-gray-600">النسبة</div>
                  </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{result.timeSpent !== undefined && result.timeSpent !== null && !isNaN(result.timeSpent) ? `${Math.floor(result.timeSpent / 60)}:${(result.timeSpent % 60).toString().padStart(2, '0')}` : 'غير محدد'} دقيقة</div>
                      <div className="text-sm text-gray-600">الوقت</div>
                    </div>
                </div>

                <div className="text-sm text-gray-500">
                  تاريخ الاختبار: {new Date().toLocaleDateString('ar-EG')}
                </div>
              </div>
            </div>
          ) : (
            // Failure page for failed exams
            <div className="h-full flex flex-col justify-center items-center text-center border-4 border-red-500 rounded-lg p-8">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-red-600 mb-4">تقرير النتيجة</h1>
                <div className="w-32 h-1 bg-red-500 mx-auto mb-6"></div>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">{result.studentName}</h2>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                  <div className="text-2xl font-bold text-red-600 mb-4">لم يتم الاجتياز</div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-800">{result.score}/{result.totalQuestions}</div>
                      <div className="text-sm text-gray-600">الدرجة المحصلة</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-red-600">{result.percentage.toFixed(1)}%</div>
                      <div className="text-sm text-gray-600">النسبة المئوية</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-800">{result.timeSpent !== undefined && result.timeSpent !== null && !isNaN(result.timeSpent) ? `${Math.floor(result.timeSpent / 60)}:${(result.timeSpent % 60).toString().padStart(2, '0')}` : 'غير محدد'} دقيقة</div>
                      <div className="text-sm text-gray-600">الوقت المستغرق</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">نصائح للتحسين:</h3>
                  <ul className="text-right space-y-2 text-gray-700">
                    <li>• راجع المواد الدراسية بعناية أكبر</li>
                    <li>• حاول فهم الأسئلة قبل الإجابة</li>
                    <li>• إدارة الوقت بشكل أفضل أثناء الاختبار</li>
                    <li>• استشر معلمك للحصول على المساعدة الإضافية</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4">لا تيأس!</h3>
                  <p className="text-gray-700 leading-relaxed">
                    الفشل جزء من عملية التعلم. كل عالم كبير مر بهذه التجربة.
                    حاول مرة أخرى وستجد نفسك أقوى وأكثر تحضيراً.
                  </p>
                </div>

                <div className="text-sm text-gray-500 mt-8">
                  تاريخ الاختبار: {new Date().toLocaleDateString('ar-EG')}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4 justify-center print:hidden">
          <button
            onClick={() => navigate('/student/exams')}
            className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2"
          >
            <Home size={20} />
            <span>الرئيسية</span>
          </button>

          <button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2"
          >
            <Printer size={20} />
            <span>طباعة النتيجة</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamResultPage;
