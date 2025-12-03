import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, UserCog, ArrowRight, Facebook, MessageCircle, Linkedin, Instagram, BookOpen, Target, Award, Users, TrendingUp, Star, CheckCircle, Clock, Shield, Zap, Globe, Heart, UserPlus } from 'lucide-react';
import { useStore } from '../store';

const Home = () => {
  const navigate = useNavigate();
  const { initializeExams } = useStore();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    initializeExams();
  }, [initializeExams]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const features = [
    {
      icon: Target,
      title: 'دقة عالية',
      description: 'نظام تقييم متقدم يضمن دقة النتائج بنسبة 100%'
    },
    {
      icon: Shield,
      title: 'أمان تام',
      description: 'تشفير متقدم ومراقبة مستمرة لضمان سلامة الاختبارات'
    },
    {
      icon: Zap,
      title: 'سرعة فائقة',
      description: 'نتائج فورية وتقارير مفصلة في دقائق معدودة'
    },
    {
      icon: Globe,
      title: 'متاح عالمياً',
      description: 'منصة متاحة 24/7 من أي مكان في العالم'
    }
  ];

  const stats = [
    { number: '5000+', label: 'طالب مسجل' },
    { number: '98%', label: 'رضا الطلاب' },
    { number: '24/7', label: 'دعم فني' },
    { number: '100%', label: 'دقة النتائج' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.section
        className="relative z-10 flex flex-col items-center justify-start px-4 pt-0 min-h-screen"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative">
            <div className="bg-white p-6 rounded-full shadow-2xl relative z-10">
              <GraduationCap size={80} className="text-blue-900" />
            </div>
            <motion.div
              className="absolute inset-0 bg-blue-400 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight text-center"
        >
          المركز الدولي للغات والكمبيوتر
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-3xl text-blue-200 mb-12 font-light text-center max-w-4xl"
        >
          منصة الاختبارات الإلكترونية الرسمية
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mb-8 max-w-4xl"
        >
          <p className="text-lg text-blue-100 leading-relaxed mb-4">
            مرحباً بكم في المركز الدولي للغات والكمبيوتر
          </p>
          <p className="text-lg text-blue-100 leading-relaxed">
            مركز بريطانيا الرائد في تعليم اللغة الإنجليزية. نحن نقدم اختبارات المركز الدولي للغات والكمبيوتر واختبار تحديد المستوى لمساعدتكم على تحقيق أهدافكم في تعليم اللغة الإنجليزية. هدفنا هو توفير تجربة تعليمية متميزة وموثوقة لجميع الطلاب.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <Link to="/student/register">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-900 px-12 py-5 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3 group"
            >
              <span>تسجيل طالب جديد</span>
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>

          <Link to="/admin/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-800/50 backdrop-blur-sm border-2 border-blue-400/30 text-white px-10 py-5 rounded-2xl font-medium text-lg hover:bg-blue-800/70 transition-all flex items-center gap-3"
            >
              <UserCog size={24} />
              <span>دخول المشرفين</span>
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="relative z-10 py-16 px-4 mt-16">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
          >
            مميزات المنصة
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center text-white border border-white/20 hover:bg-white/20 transition-all"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="mb-6 flex justify-center"
                  >
                    <Icon size={48} className="text-blue-300" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-blue-100 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Countries Covered Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
          >
            الدول المغطاة
          </motion.h2>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { name: 'مصر', flag: '🇪🇬' },
              { name: 'السعودية', flag: '🇸🇦' },
              { name: 'الإمارات', flag: '🇦🇪' },
              { name: 'الكويت', flag: '🇰🇼' },
              { name: 'قطر', flag: '🇶🇦' },
              { name: 'البحرين', flag: '🇧🇭' },
              { name: 'عمان', flag: '🇴🇲' },
              { name: 'الأردن', flag: '🇯🇴' },
              { name: 'لبنان', flag: '🇱🇧' },
              { name: 'العراق', flag: '🇮🇶' }
            ].map((country, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center text-white border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="text-4xl mb-4">{country.flag}</div>
                <h3 className="text-xl font-bold">{country.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
          >
            إحصائياتنا
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3, type: "spring" }}
                  className="text-5xl md:text-6xl font-bold text-blue-300 mb-4"
                >
                  {stat.number}
                </motion.div>
                <p className="text-xl text-white font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Types Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
          >
            أنواع الاختبارات
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-white border border-white/20"
            >
              <div className="flex items-center mb-6">
                <Target size={48} className="text-blue-300 mr-4" />
                <h3 className="text-3xl font-bold">اختبار تحديد المستوى</h3>
              </div>
              <p className="text-blue-100 leading-relaxed text-lg mb-6">
                اختبار تحديد المستوى هو أداة فعالة لقياس مستواك الحالي في اللغة الإنجليزية. يساعدك على معرفة نقاط القوة والضعف لتحسين تعليم اللغة الإنجليزية.
              </p>
              <div className="flex flex-wrap gap-3">
                {['قراءة', 'كتابة', 'استماع', 'محادثة'].map((skill, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    className="bg-blue-600/50 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-white border border-white/20"
            >
              <div className="flex items-center mb-6">
                <Award size={48} className="text-blue-300 mr-4" />
                <h3 className="text-3xl font-bold">اختبارات المركز الدولي للغات والكمبيوتر</h3>
              </div>
              <p className="text-blue-100 leading-relaxed text-lg mb-6">
                اختبارات المركز الدولي للغات والكمبيوتر مصممة لتقييم مهاراتك في اللغة الإنجليزية بشكل شامل. تشمل الاستماع، القراءة، الكتابة والمحادثة لضمان تقدمك في تعليم اللغة الإنجليزية.
              </p>
              <div className="flex flex-wrap gap-3">
                {['شهادة معترف بها', 'تقييم شامل', 'نتائج فورية'].map((feature, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    className="bg-green-600/50 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {feature}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
          >
            خطوات الاختبار
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', icon: UserPlus, title: 'التسجيل', desc: 'سجل حسابك الجديد في المركز الدولي للغات والكمبيوتر' },
              { step: '2', icon: BookOpen, title: 'الحجز', desc: 'اختر اختبارك واحجز موعداً مناسباً' },
              { step: '3', icon: CheckCircle, title: 'الاختبار', desc: 'أجرِ الاختبار عبر الإنترنت بأمان تام' }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="bg-blue-600/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-blue-400/30"
                  >
                    <Icon size={36} className="text-blue-300" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-blue-100 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
          >
            تجارب الطلاب
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                text: "بفضل اختبار تحديد المستوى في المركز الدولي للغات والكمبيوتر، تمكنت من تحديد نقاط ضعفي وتحسين مهاراتي في اللغة الإنجليزية بشكل كبير.",
                name: "أحمد محمد",
                role: "طالب في مركز بريطانيا",
                rating: 5
              },
              {
                text: "اختبارات المركز الدولي للغات والكمبيوتر ساعدتني في الحصول على شهادة معترف بها عالمياً في تعليم اللغة الإنجليزية.",
                name: "فاطمة علي",
                role: "خريجة مركز بريطانيا",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-white border border-white/20"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-blue-100 italic text-lg leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-bold text-white text-lg">{testimonial.name}</p>
                  <p className="text-blue-200">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-8"
          >
            ابدأ رحلتك التعليمية اليوم
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-blue-200 mb-12"
          >
            انضم إلى آلاف الطلاب الذين حققوا أهدافهم مع المركز الدولي للغات والكمبيوتر
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <Link to="/student/register">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
              >
                <span>ابدأ الآن</span>
                <ArrowRight size={24} />
              </motion.button>
            </Link>

            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-medium text-lg hover:bg-white/20 transition-all"
              >
                تعرف علينا أكثر
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900/50 backdrop-blur-lg border-t border-white/10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <GraduationCap size={32} className="text-blue-300 mr-3" />
                <span className="text-2xl font-bold text-white">المركز الدولي للغات والكمبيوتر</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                مركز بريطانيا الرائد في تعليم اللغة الإنجليزية وتقديم الاختبارات الإلكترونية الرسمية.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-6">روابط سريعة</h4>
              <div className="space-y-3">
                <Link to="/about" className="block text-gray-300 hover:text-blue-300 transition-colors">عن المركز</Link>
                <Link to="/contact" className="block text-gray-300 hover:text-blue-300 transition-colors">تواصل معنا</Link>
                <Link to="/student/register" className="block text-gray-300 hover:text-blue-300 transition-colors">تسجيل طالب</Link>
                <Link to="/admin/login" className="block text-gray-300 hover:text-blue-300 transition-colors">دخول المشرفين</Link>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-6">خدماتنا</h4>
              <div className="space-y-3">
                <p className="text-gray-300">اختبار تحديد المستوى</p>
                <p className="text-gray-300">اختبارات المركز الدولي للغات والكمبيوتر</p>
                <p className="text-gray-300">دورات تدريبية</p>
                <p className="text-gray-300">دعم فني 24/7</p>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-6">تواصل معنا</h4>
              <div className="space-y-3">
                <p className="text-gray-300">📧 Un.egy.ilc@gmail.com</p>
                <p className="text-gray-300">📱 01019769154</p>
                <p className="text-gray-300">📍 زورنا في مقرنا<br />كفر الشيخ : شارع سعيد نصار - المتفرع من النبوي</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 mt-12">
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                تم تطوير هذا النظام بالكامل باستخدام تقنيات حديثة لضمان السرعة والدقة وسهولة الاستخدام.
              </p>
            </div>
            <div className="text-center mt-8 pt-8 border-t border-white/10">
              <p className="text-gray-500 text-sm">
                Developed by: Mohamed Ibrahim Awad | Frontend & Fullstack Developer
              </p>
              <div className="flex justify-center gap-4 mt-3">
                <a href="https://wa.me/201020943238" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                  <MessageCircle size={20} />
                </a>
                <a href="https://www.facebook.com/MidoStares" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="https://www.instagram.com/mido_stares1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
              <p className="text-gray-500 text-xs mt-2">
                إذا كنت جهة تعليمية أو مؤسسة وعايز نظام مشابه، تواصل معايا لإنشاء منصة مخصصة.
              </p>
              <p className="text-gray-600 text-xs mt-4">
                &copy; {new Date().getFullYear()} British Council Institute. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
