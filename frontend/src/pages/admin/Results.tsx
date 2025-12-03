import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Eye, Printer, ArrowRight, Download, Trash2 } from 'lucide-react';
import { useStore } from '../../store';
import { ExamResult } from '../../types';
import API_BASE_URL from '../../config/api';

const Results = () => {
  const { exams } = useStore();
  const [results, setResults] = useState<ExamResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResult, setSelectedResult] = useState<ExamResult | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<ExamResult | null>(null);

  const fetchResults = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/results`);
      if (response.ok) {
        const rawResults = await response.json();
        const resultsData = rawResults.map((result: any) => {
          // Parse time_taken string (e.g., "5:30:00") to seconds
          // Format is always minutes:seconds:00
          let timeSpent = 0;
          if (result.time_taken && typeof result.time_taken === 'string') {
            const parts = result.time_taken.split(':').map(Number);
            if (parts.length >= 2) {
              const minutes = parts[0] || 0;
              const seconds = parts[1] || 0;
              timeSpent = (minutes * 60) + seconds;
            }
          } else if (typeof result.time_taken === 'number') {
            timeSpent = result.time_taken;
          }

          return {
            id: result.id.toString(),
            examId: result.exam_id || '',
            examTitle: result.exam_title || '',
            studentId: result.student_id || '',
            studentName: result.student_name,
            studentPhone: result.phone,
            studentGovernorate: result.governorate,
            score: result.correct_answers,
            totalQuestions: result.total_questions,
            percentage: (result.correct_answers / result.total_questions) * 100,
            answers: JSON.parse(result.answers_json || '[]'),
            timeSpent,
            completedAt: result.submission_date,
            attempts: 0 // Backend doesn't track attempts
          };
        }) as ExamResult[];
        setResults(resultsData);
      } else {
        console.error('Failed to fetch results from backend');
      }
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchResults();

    // Set up polling every 1 second for immediate real-time updates
    const interval = setInterval(fetchResults, 1000);

    return () => clearInterval(interval);
  }, []);

  const filteredResults = results.filter(r =>
    r.studentName.includes(searchTerm) ||
    r.studentPhone.includes(searchTerm)
  );

  const getExamTitle = (result: ExamResult) => {
    // First try to get from the stored exam_title in the result
    if (result.examTitle && result.examTitle.trim() !== '') {
      return result.examTitle;
    }
    // Fallback to finding in current exams (for backward compatibility)
    return exams.find(e => e.id === result.examId)?.title || 'امتحان محذوف';
  };

  const handlePrint = () => {
    window.print();
  };

  const exportToCSV = () => {
    const headers = ['الاسم', 'الهاتف', 'المحافظة', 'الامتحان', 'الدرجة', 'النسبة', 'الوقت المستغرق'];
    const csvContent = [
      headers.join(','),
      ...filteredResults.map(r => [
        r.studentName,
        r.studentPhone,
        r.studentGovernorate,
        getExamTitle(r),
        r.score,
        `${r.percentage.toFixed(1)}%`,
        `${r.timeSpent !== undefined && r.timeSpent !== null && !isNaN(r.timeSpent) ? `${Math.floor(r.timeSpent / 60)}:${(r.timeSpent % 60).toString().padStart(2, '0')}` : 'غير محدد'} دقيقة`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'exam_results.csv';
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل النتائج...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8 print:hidden">
          <Link to="/admin/dashboard" className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all">
            <ArrowRight size={24} className="text-gray-600" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">نتائج الطلاب</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 print:hidden">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute right-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="بحث بالاسم أو رقم الهاتف..."
                className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <button 
                onClick={exportToCSV}
                className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-green-700 transition-colors"
              >
                <Download size={18} />
                <span>تصدير Excel</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden print:shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-4 font-bold text-gray-600">الطالب</th>
                  <th className="p-4 font-bold text-gray-600">المحافظة</th>
                  <th className="p-4 font-bold text-gray-600">الامتحان</th>
                  <th className="p-4 font-bold text-gray-600">الدرجة</th>
                  <th className="p-4 font-bold text-gray-600">النسبة</th>
                  <th className="p-4 font-bold text-gray-600">الوقت المستغرق</th>
                  <th className="p-4 font-bold text-gray-600 print:hidden">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredResults.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-gray-800">{result.studentName}</div>
                      <div className="text-sm text-gray-500">{result.studentPhone}</div>
                    </td>
                    <td className="p-4 text-gray-600">{result.studentGovernorate}</td>
                    <td className="p-4 text-gray-600">{getExamTitle(result)}</td>
                    <td className="p-4 font-bold text-gray-800">{result.score} / {result.totalQuestions}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        result.percentage >= 50 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {result.percentage.toFixed(1)}%
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">
                      {result.timeSpent !== undefined && result.timeSpent !== null && !isNaN(result.timeSpent) && result.timeSpent > 0 ? `${Math.floor(result.timeSpent / 60)}:${(result.timeSpent % 60).toString().padStart(2, '0')}` : 'غير محدد'} دقيقة
                    </td>
                    <td className="p-4 print:hidden">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedResult(result)}
                          className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                          title="عرض التفاصيل"
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(result)}
                          className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                          title="حذف النتيجة"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 print:static print:bg-white print:p-0"
            onClick={() => setSelectedResult(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-8 print:shadow-none print:max-h-none print:w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-8 print:hidden">
                <h2 className="text-2xl font-bold text-gray-800">تفاصيل النتيجة</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={handlePrint}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                  >
                    <Printer size={18} />
                    <span>طباعة</span>
                  </button>
                  <button 
                    onClick={() => setSelectedResult(null)}
                    className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200"
                  >
                    إغلاق
                  </button>
                </div>
              </div>

              {/* Certificate Content */}
              <div className="certificate-container print:p-8 print:bg-white print:text-black">
                {/* Certificate Border */}
                <div className="border-8 border-double border-blue-600 p-8 bg-gradient-to-br from-blue-50 to-white print:border-blue-800 print:shadow-none">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center print:w-16 print:h-16">
                      <span className="text-white text-2xl font-bold">B</span>
                    </div>
                    <h1 className="text-4xl font-bold text-blue-800 mb-2 print:text-3xl">المركز الدولي للغات والكمبيوتر</h1>
                    <p className="text-lg text-gray-600 print:text-base">British Institute</p>
                    <div className="w-32 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
                  </div>

                  {/* Certificate Title */}
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2 print:text-2xl">شهادة تقدير</h2>
                    <p className="text-lg text-gray-600 print:text-base">Certificate of Achievement</p>
                  </div>

                  {/* Student Info */}
                  <div className="text-center mb-8">
                    <p className="text-lg text-gray-700 mb-2 print:text-base">يسر المركز الدولي للغات والكمبيوتر أن يمنح هذه الشهادة للطالب</p>
                    <p className="text-lg text-gray-700 mb-4 print:text-base">The British Institute is pleased to award this certificate to the student</p>
                    <h3 className="text-3xl font-bold text-blue-800 mb-2 print:text-2xl">{selectedResult.studentName}</h3>
                    <p className="text-lg text-gray-600 print:text-base">رقم الهاتف: {selectedResult.studentPhone}</p>
                  </div>

                  {/* Exam Info */}
                  <div className="text-center mb-8">
                    <p className="text-lg text-gray-700 mb-2 print:text-base">لقد أكمل بنجاح امتحان</p>
                    <p className="text-lg text-gray-700 mb-4 print:text-base">For successfully completing the exam</p>
                    <h4 className="text-2xl font-bold text-gray-800 mb-2 print:text-xl">{selectedResult.examTitle || getExamTitle(selectedResult)}</h4>
                    <p className="text-base text-gray-600 print:text-sm">بتاريخ: {new Date(selectedResult.completedAt).toLocaleDateString('ar-EG')}</p>
                  </div>

                  {/* Results */}
                  <div className="flex justify-center gap-8 mb-8 print:gap-6">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center print:w-16 print:h-16">
                        <span className="text-2xl font-bold text-blue-800 print:text-xl">{selectedResult.score}</span>
                      </div>
                      <p className="text-sm font-bold text-gray-700 print:text-xs">الدرجة المحصلة</p>
                      <p className="text-xs text-gray-600 print:text-xs">Score Obtained</p>
                    </div>
                    <div className="text-center">
                      <div className={`w-20 h-20 mx-auto mb-2 rounded-full flex items-center justify-center print:w-16 print:h-16 ${
                        selectedResult.percentage >= 50 ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        <span className={`text-2xl font-bold print:text-xl ${
                          selectedResult.percentage >= 50 ? 'text-green-800' : 'text-red-800'
                        }`}>
                          {selectedResult.percentage.toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-sm font-bold text-gray-700 print:text-xs">النسبة المئوية</p>
                      <p className="text-xs text-gray-600 print:text-xs">Percentage</p>
                    </div>
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-2 bg-purple-100 rounded-full flex items-center justify-center print:w-16 print:h-16">
                        <span className="text-2xl font-bold text-purple-800 print:text-xl">{selectedResult.timeSpent !== undefined && selectedResult.timeSpent !== null && !isNaN(selectedResult.timeSpent) ? `${Math.floor(selectedResult.timeSpent / 60)}:${(selectedResult.timeSpent % 60).toString().padStart(2, '0')}` : 'غير محدد'}</span>
                      </div>
                      <p className="text-sm font-bold text-gray-700 print:text-xs">الوقت المستغرق</p>
                      <p className="text-xs text-gray-600 print:text-xs">Time Spent (min)</p>
                    </div>
                  </div>

                  {/* Performance Status */}
                  <div className="text-center mb-8">
                    <div className={`inline-block px-6 py-2 rounded-full text-lg font-bold print:text-base ${
                      selectedResult.percentage >= 50
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedResult.percentage >= 50 ? 'ناجح' : 'يحتاج إلى تحسين'}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="text-center mt-12">
                    <div className="border-t border-gray-300 pt-6">
                      <p className="text-sm text-gray-600 mb-2 print:text-xs">تاريخ الإصدار: {new Date().toLocaleDateString('ar-EG')}</p>
                      <p className="text-sm text-gray-600 print:text-xs">المركز الدولي للغات والكمبيوتر - جميع الحقوق محفوظة</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">تأكيد الحذف</h3>
                <p className="text-gray-600 mb-6">
                  هل أنت متأكد من حذف نتيجة الطالب <strong>{deleteConfirm.studentName}</strong>؟
                  <br />
                  هذا الإجراء لا يمكن التراجع عنه.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const response = await fetch(`http://localhost:3001/results/${deleteConfirm.id}`, {
                          method: 'DELETE',
                        });
                        if (response.ok) {
                          setResults(results.filter(r => r.id !== deleteConfirm.id));
                          setDeleteConfirm(null);
                        } else {
                          console.error('Failed to delete result');
                          alert('فشل في حذف النتيجة');
                        }
                      } catch (error) {
                        console.error('Error deleting result:', error);
                        alert('خطأ في حذف النتيجة');
                      }
                    }}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Results;
