
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { useStore } from '../../store';
import { Question } from '../../types';
import { toast } from 'react-toastify';

const ExamPaper = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { exams, currentStudent } = useStore();

  const exam = exams.find(e => e.id === examId);
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: number}>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(true);

  // Initialize exam
  useEffect(() => {
    if (!exam || !currentStudent) {
      navigate('/student/exams');
      return;
    }

    // Randomize questions and options
    const shuffledQuestions = [...exam.questions]
      .sort(() => Math.random() - 0.5)
      .map(q => ({
        ...q,
        // Note: In a real app, we'd need to track the correct answer index change
        // For simplicity here, we're keeping options order but shuffling questions
      }));

    setQuestions(shuffledQuestions);
    setTimeLeft(exam.duration * 60);

    // Enter fullscreen
    document.documentElement.requestFullscreen().catch(() => {
      toast.warning("يرجى تفعيل وضع ملء الشاشة لأداء الاختبار");
    });

    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
      if (!document.fullscreenElement) {
        setAttempts(prev => prev + 1);
        toast.error("تحذير: الخروج من وضع ملء الشاشة قد يؤدي لإلغاء الاختبار!");
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    
    // Prevent context menu
    const preventRightClick = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', preventRightClick);

    // Prevent copy/paste
    const preventCopy = (e: ClipboardEvent) => e.preventDefault();
    document.addEventListener('copy', preventCopy);
    document.addEventListener('paste', preventCopy);
    document.addEventListener('cut', preventCopy);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('contextmenu', preventRightClick);
      document.removeEventListener('copy', preventCopy);
      document.removeEventListener('paste', preventCopy);
      document.removeEventListener('cut', preventCopy);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, [exam, currentStudent, navigate]);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0 && questions.length > 0 && !isSubmitting) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, questions.length, isSubmitting]);

  // Blur detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setAttempts(prev => prev + 1);
        toast.error("تحذير: محاولة الخروج من صفحة الاختبار!");
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const handleAnswer = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: optionIndex
    }));
  };

  const handleSubmit = useCallback(() => {
    if (isSubmitting || !exam || !currentStudent) return;
    setIsSubmitting(true);

    const score = questions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correctAnswer ? 1 : 0);
    }, 0);

    const result = {
      id: crypto.randomUUID(),
      examId: exam.id,
      examTitle: exam.title,
      studentId: currentStudent.id,
      studentName: currentStudent.fullName,
      studentPhone: currentStudent.phone,
      studentGovernorate: currentStudent.governorate,
      score,
      totalQuestions: questions.length,
      percentage: (score / questions.length) * 100,
      answers: Object.entries(answers).map(([qId, opt]) => ({
        questionId: qId,
        selectedOption: opt,
        isCorrect: questions.find(q => q.id === qId)?.correctAnswer === opt
      })),
      timeSpent: (exam.duration * 60) - timeLeft,
      completedAt: new Date().toISOString(),
      attempts
    };

    navigate('/student/result', { state: { result } });
  }, [answers, questions, exam, currentStudent, timeLeft, attempts, navigate, isSubmitting]);

  if (!exam || questions.length === 0) return <div>Loading...</div>;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative select-none">
      {/* Watermark */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-5 flex flex-wrap content-center justify-center gap-20 rotate-12">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="text-4xl font-bold text-gray-900 whitespace-nowrap">
            {currentStudent?.fullName} - +20{currentStudent?.phone}
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm p-4 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-lg ${timeLeft < 300 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
              <Clock size={20} />
              <span>{formatTime(timeLeft)}</span>
            </div>
            <div className="text-gray-500 text-sm hidden md:block">
              السؤال {currentQuestionIndex + 1} من {questions.length}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {attempts > 0 && (
              <div className="flex items-center gap-1 text-red-500 bg-red-50 px-3 py-1 rounded-full text-sm font-medium">
                <AlertTriangle size={14} />
                <span>{attempts} تحذير</span>
              </div>
            )}
            <button 
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold transition-colors"
            >
              إنهاء الاختبار
            </button>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 bg-gray-200 w-full">
        <div 
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-8 flex flex-col justify-center z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 leading-relaxed">
              {questions[currentQuestionIndex].text}
            </h2>

            <div className="space-y-4">
              {questions[currentQuestionIndex].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full text-right p-4 rounded-xl border-2 transition-all text-lg flex items-center justify-between group ${
                    answers[questions[currentQuestionIndex].id] === idx
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-medium">{option}</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    answers[questions[currentQuestionIndex].id] === idx
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-300 group-hover:border-blue-400'
                  }`}>
                    {answers[questions[currentQuestionIndex].id] === idx && <CheckCircle size={14} />}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 rounded-xl font-medium text-gray-600 bg-white shadow-sm disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            السابق
          </button>
          
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
              className="px-6 py-3 rounded-xl font-bold text-white bg-blue-600 shadow-lg hover:bg-blue-700 transition-colors"
            >
              التالي
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-3 rounded-xl font-bold text-white bg-green-600 shadow-lg hover:bg-green-700 transition-colors"
            >
              تسليم الإجابة
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExamPaper;

