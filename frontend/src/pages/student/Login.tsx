import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, ArrowLeft, Eye, EyeOff, Phone } from 'lucide-react';
import { useStore } from '../../store';
import { toast } from 'react-toastify';
import { Student } from '../../types';

const StudentLogin = () => {
  const navigate = useNavigate();
  const registerStudent = useStore((state) => state.registerStudent);

  const [credentials, setCredentials] = useState({
    fullName: '',
    phone: ''
  });

  const [showPhone, setShowPhone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Get registered students from localStorage
    const registeredStudents = JSON.parse(localStorage.getItem('registeredStudents') || '[]');

    const student = registeredStudents.find((s: Student) =>
      s.fullName === credentials.fullName && s.phone === credentials.phone
    );

    if (student) {
      registerStudent(student);
      toast.success('تم تسجيل الدخول بنجاح');
      navigate('/student/exams');
    } else {
      toast.error('بيانات الدخول غير صحيحة أو لم يتم التسجيل بعد');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden relative"
      >
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg z-10"
          title="العودة للصفحة الرئيسية"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center">
          <div className="mb-4">
            <User size={48} className="mx-auto text-white/90" />
          </div>
          <h2 className="text-2xl font-bold mb-2">دخول الطلاب</h2>
          <p className="text-blue-100 text-sm">يرجى تسجيل الدخول لبدء الاختبارات</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium mb-1">الاسم الرباعي</label>
            <div className="relative">
              <User className="absolute right-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                required
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="أدخل اسمك بالكامل"
                value={credentials.fullName}
                onChange={(e) => setCredentials({...credentials, fullName: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium mb-1">رقم الهاتف</label>
            <div className="relative">
              <Phone className="absolute right-3 top-3 text-gray-400" size={20} />
              <input
                type={showPhone ? "text" : "password"}
                required
                pattern="[0-9]{11}"
                className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="01xxxxxxxxx"
                value={credentials.phone}
                onChange={(e) => setCredentials({...credentials, phone: e.target.value})}
              />
              <button
                type="button"
                onClick={() => setShowPhone(!showPhone)}
                className="absolute left-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                title={showPhone ? "إخفاء رقم الهاتف" : "إظهار رقم الهاتف"}
              >
                {showPhone ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <span>دخول</span>
            <ArrowLeft size={20} />
          </button>

          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">ليس لديك حساب؟</p>
            <button
              type="button"
              onClick={() => navigate('/student/register')}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm underline"
            >
              سجل الآن
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default StudentLogin;
