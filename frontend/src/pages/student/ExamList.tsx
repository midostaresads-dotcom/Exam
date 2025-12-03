import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, FileText, ChevronLeft, LogOut } from 'lucide-react';
import { useStore } from '../../store';

const ExamList = () => {
  const navigate = useNavigate();
  const { exams, currentStudent, logoutStudent, initializeExams } = useStore();

  useEffect(() => {
    initializeExams();
  }, [initializeExams]);

  const handleStartExam = (examId: string) => {
    navigate(`/student/exam/${examId}`);
  };

  const handleLogout = () => {
    logoutStudent();
    navigate('/');
  };

  // Categorize exams
  const categorizeExam = (exam: any) => {
    const title = exam.title.toLowerCase();
    if (title.includes('frontend') || title.includes('backend') || title.includes('برمجة') || title.includes('programming') || title.includes('development')) {
      return 'Programming';
    } else if (title.includes('icdl')) {
      return 'ICDL';
    } else {
      return 'English'; // Default to English for placement tests
    }
  };

  const categorizedExams = {
    English: exams.filter(e => e.isActive && categorizeExam(e) === 'English'),
    ICDL: exams.filter(e => e.isActive && categorizeExam(e) === 'ICDL'),
    Programming: exams.filter(e => e.isActive && categorizeExam(e) === 'Programming')
  };

  const ExamSection = ({ title, exams, color }: { title: string; exams: any[]; color: string }) => (
    <div className="mb-12">
      <h2 className={`text-2xl font-bold mb-6 ${color}`}>{title}</h2>
      {exams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exams.map((exam, index) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                    <FileText size={24} />
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-sm">
                    <Clock size={14} />
                    <span>{exam.duration} دقيقة</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">{exam.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-2">{exam.description}</p>

                <button
                  onClick={() => handleStartExam(exam.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <span>بدء الاختبار</span>
                  <ChevronLeft size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500 bg-white rounded-xl">
          <p>لا توجد اختبارات متاحة في هذا القسم.</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">مرحباً، {currentStudent?.fullName}</h1>
            <p className="text-gray-500">اختر الاختبار الذي تريد البدء به</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <LogOut size={18} />
            <span>خروج</span>
          </button>
        </header>

        <ExamSection title="قسم اللغة الإنجليزية" exams={categorizedExams.English} color="text-blue-600" />
        <ExamSection title="قسم ICDL" exams={categorizedExams.ICDL} color="text-green-600" />
        <ExamSection title="قسم البرمجة" exams={categorizedExams.Programming} color="text-purple-600" />

        {exams.filter(e => e.isActive).length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p>لا توجد اختبارات متاحة حالياً.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamList;
