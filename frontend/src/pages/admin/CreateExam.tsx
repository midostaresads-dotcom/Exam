import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2, Save, ArrowRight, Check } from 'lucide-react';
import { useStore } from '../../store';
import { Question } from '../../types';
import { toast } from 'react-toastify';

const CreateExam = () => {
  const navigate = useNavigate();
  const addExam = useStore((state) => state.addExam);

  const [examData, setExamData] = useState({
    title: '',
    description: '',
    duration: 30
  });

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: uuidv4(),
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: uuidv4(),
        text: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      }
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    if (questions.length > 1) {
      const newQuestions = [...questions];
      newQuestions.splice(index, 1);
      setQuestions(newQuestions);
    }
  };

  const handleQuestionChange = (index: number, field: keyof Question, value: any) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSave = () => {
    if (!examData.title || questions.some(q => !q.text || q.options.some(o => !o))) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const newExam = {
      id: uuidv4(),
      ...examData,
      questions,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    addExam(newExam);
    toast.success('تم إنشاء الامتحان بنجاح');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/admin/dashboard')} className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all">
            <ArrowRight size={24} className="text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">إضافة امتحان جديد</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 space-y-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2">عنوان الامتحان</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="مثال: اختبار اللغة الإنجليزية - المستوى الأول"
              value={examData.title}
              onChange={(e) => setExamData({...examData, title: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">وصف الامتحان</label>
            <textarea
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-24"
              placeholder="وصف قصير لمحتوى الاختبار..."
              value={examData.description}
              onChange={(e) => setExamData({...examData, description: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">مدة الامتحان (بالدقائق)</label>
            <input
              type="number"
              min="1"
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              value={examData.duration}
              onChange={(e) => setExamData({...examData, duration: parseInt(e.target.value)})}
            />
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((question, qIndex) => (
            <div key={question.id} className="bg-white rounded-2xl shadow-sm p-6 relative group">
              <div className="absolute left-6 top-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleRemoveQuestion(qIndex)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                  title="حذف السؤال"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-4">السؤال {qIndex + 1}</h3>
              
              <div className="mb-6">
                <input
                  type="text"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                  placeholder="نص السؤال..."
                  value={question.text}
                  onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="relative">
                    <input
                      type="text"
                      className={`w-full p-3 pr-12 border rounded-xl outline-none transition-colors ${
                        question.correctAnswer === oIndex 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 focus:border-blue-500'
                      }`}
                      placeholder={`الاختيار ${oIndex + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    />
                    <button
                      onClick={() => handleQuestionChange(qIndex, 'correctAnswer', oIndex)}
                      className={`absolute right-3 top-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        question.correctAnswer === oIndex
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-gray-300 text-transparent hover:border-green-400'
                      }`}
                      title="تحديد كإجابة صحيحة"
                    >
                      <Check size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleAddQuestion}
            className="bg-blue-50 text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-100 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            <span>إضافة سؤال جديد</span>
          </button>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 left-8 z-50">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full shadow-2xl font-bold text-lg flex items-center gap-3 transition-transform hover:scale-105"
          >
            <Save size={24} />
            <span>حفظ الامتحان</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
