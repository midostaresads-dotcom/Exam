import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../../store';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const adminLogin = useStore((state) => state.adminLogin);
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'demo123') {
      adminLogin();
      toast.success('تم تسجيل الدخول بنجاح');
      navigate('/admin/dashboard');
    } else {
      toast.error('بيانات الدخول غير صحيحة');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden relative"
      >
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg z-10"
          title="العودة للصفحة الرئيسية"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white text-center">
          <div className="mb-4">
            <Lock size={48} className="mx-auto text-white/90" />
          </div>
          <h2 className="text-2xl font-bold mb-2">لوحة تحكم المشرف</h2>
          <p className="text-gray-300 text-sm">يرجى تسجيل الدخول للمتابعة</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium mb-1">اسم المستخدم</label>
            <div className="relative">
              <User className="absolute right-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                required
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition-all"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium mb-1">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-3 top-3 text-gray-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full pr-12 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition-all"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                title={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <span>دخول</span>
            <ArrowLeft size={20} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
