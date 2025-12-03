import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '../../store';
import { User, MapPin, Phone, ArrowLeft } from 'lucide-react';

const governorates = [
  "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "الشرقية", "المنوفية",
  "القليوبية", "البحيرة", "الغربية", "بور سعيد", "دمياط", "الإسماعيلية",
  "السويس", "كفر الشيخ", "الفيوم", "بني سويف", "المنيا", "أسيوط",
  "سوهاج", "قنا", "الأقصر", "أسوان", "البحر الأحمر", "الوادي الجديد",
  "مطروح", "شمال سيناء", "جنوب سيناء"
];

const Register = () => {
  const navigate = useNavigate();
  const registerStudent = useStore((state) => state.registerStudent);
  
  const [formData, setFormData] = useState({
    fullName: '',
    governorate: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.governorate && formData.phone) {
      const student = {
        id: uuidv4(),
        ...formData,
        registeredAt: new Date().toISOString()
      };
      registerStudent(student);
      navigate('/student/exams');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden relative"
      >
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg z-10"
          title="العودة للصفحة الرئيسية"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="bg-blue-900 p-6 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">تسجيل بيانات الطالب</h2>
          <p className="text-blue-200 text-sm">يرجى إدخال بياناتك بدقة لبدء الاختبار</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium mb-1">الاسم الرباعي</label>
            <div className="relative">
              <User className="absolute right-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                required
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="أدخل اسمك بالكامل"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium mb-1">المحافظة</label>
            <div className="relative">
              <MapPin className="absolute right-3 top-3 text-gray-400" size={20} />
              <select
                required
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                value={formData.governorate}
                onChange={(e) => setFormData({...formData, governorate: e.target.value})}
              >
                <option value="">اختر المحافظة</option>
                {governorates.map((gov) => (
                  <option key={gov} value={gov}>{gov}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium mb-1">رقم الهاتف</label>
            <div className="relative">
              <Phone className="absolute right-3 top-3 text-gray-400" size={20} />
              <input
                type="tel"
                required
                pattern="[0-9]{11}"
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="01xxxxxxxxx"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <span>تسجيل وبدء الاختبارات</span>
            <ArrowLeft size={20} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
