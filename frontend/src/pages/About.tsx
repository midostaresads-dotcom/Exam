import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Languages, Computer, Award, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config/api';

const About = () => {
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/test`)
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center px-4 max-w-6xl"
      >
        <div className="mb-8 flex justify-center">
          <div className="bg-white p-4 rounded-full shadow-2xl">
            <GraduationCap size={64} className="text-blue-900" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          المركز الدولي للغات والكمبيوتر
        </h1>
        <p className="text-xl md:text-2xl text-blue-200 mb-12 font-light">
          الوحيد بكفر الشيخ المرخص لتعليم اللغات في التربية والتعليم
        </p>

        {/* Main Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Languages Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white"
          >
            <div className="flex items-center justify-center mb-6">
              <Languages size={48} className="text-blue-300" />
            </div>
            <h3 className="text-3xl font-bold mb-6">قسم اللغات</h3>
            <div className="space-y-4 text-right">
              <p className="text-blue-100 leading-relaxed">
                دورات لغة إنجليزية متخصصة لطلبة كليات الآداب والتجارة والكليات الطبية والهندسية
              </p>
              <p className="text-blue-100 leading-relaxed">
                إنجليزي - فرنسي - لغات أخرى
              </p>
              <p className="text-blue-100 leading-relaxed">
                ترجمة دولية معتمدة لجميع لغات العالم وبالسفارات
              </p>
              <p className="text-blue-100 leading-relaxed">
                دورات محادثة لجميع الأعمار وشركات القطاع الخاص
              </p>
              <p className="text-blue-100 leading-relaxed">
                الشهادات معتمدة من التربية والتعليم وتوثق من الخارجية
              </p>
            </div>
          </motion.div>

          {/* Computer Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white"
          >
            <div className="flex items-center justify-center mb-6">
              <Computer size={48} className="text-blue-300" />
            </div>
            <h3 className="text-3xl font-bold mb-6">قسم الكمبيوتر</h3>
            <div className="space-y-4 text-right">
              <p className="text-blue-100 leading-relaxed">
                دورات وشهادات دولية ICDL
              </p>
              <p className="text-blue-100 leading-relaxed">
                المركز مرخص لاختبارات ICDL
              </p>
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white"
          >
            <Award size={32} className="text-blue-300 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">شهادات معتمدة</h4>
            <p className="text-blue-100">معتمدة من التربية والتعليم وتوثق من الخارجية</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white"
          >
            <Globe size={32} className="text-blue-300 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">ترجمة دولية</h4>
            <p className="text-blue-100">معتمدة لجميع لغات العالم وبالسفارات</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white"
          >
            <Users size={32} className="text-blue-300 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">لجميع الأعمار</h4>
            <p className="text-blue-100">دورات محادثة لجميع الأعمار وشركات القطاع الخاص</p>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              العودة للصفحة الرئيسية
            </motion.button>
          </Link>

          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-800/50 backdrop-blur-sm border border-blue-400/30 text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-blue-800/70 transition-all"
            >
              تواصل معنا
            </motion.button>
          </Link>
        </div>
      </motion.div>


    </div>
  );
};

export default About;
