
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, Phone, Mail, MapPin, Globe, MessageCircle, Facebook, Instagram, Send, Clock, Users, Award, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';

const Contact = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  const contactMethods = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "الهاتف",
      value: "01019769154",
      description: "تواصل معنا مباشرة",
      color: "from-green-400 to-emerald-600",
      delay: 0.1
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "البريد الإلكتروني",
      value: "Un.egy.ilc@gmail.com",
      description: "أرسل لنا رسالة",
      color: "from-blue-400 to-cyan-600",
      delay: 0.2
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "العنوان",
      value: "كفر الشيخ : شارع سعيد نصار - المتفرع من النبوي",
      description: "زورنا في مقرنا",
      color: "from-purple-400 to-pink-600",
      delay: 0.3
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "الموقع الإلكتروني",
      value: "www.britishcouncil.eg",
      description: "تعرف على خدماتنا",
      color: "from-orange-400 to-red-600",
      delay: 0.4
    }
  ];

  const socialLinks = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      label: "WhatsApp",
      href: "https://wa.me/201019769154",
      color: "bg-green-600 hover:bg-green-700",
      delay: 0.5
    },
    {
      icon: <Facebook className="w-6 h-6" />,
      label: "Facebook",
      href: "https://www.facebook.com/joliaamansour",
      color: "bg-blue-600 hover:bg-blue-700",
      delay: 0.6
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      label: "Instagram",
      href: "#",
      color: "bg-pink-600 hover:bg-pink-700",
      delay: 0.7
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Mouse Follower */}
      <motion.div
        className="fixed w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20"
        style={{ y: backgroundY }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 text-center px-4 max-w-7xl w-full py-20"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="mb-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="mb-10 flex justify-center"
          >
            <div className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 p-8 rounded-full shadow-2xl border-4 border-white/20">
              <GraduationCap size={100} className="text-white" />
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent mb-8 tracking-tight"
          >
            تواصل معنا
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-2xl md:text-4xl text-purple-200 mb-16 font-light max-w-5xl mx-auto"
          >
            نحن هنا لنساعدك في رحلتك التعليمية ونحقق أحلامك معاً
          </motion.p>
        </motion.div>

        {/* Contact Methods Grid */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-white border border-white/20 hover:border-white/40 transition-all duration-500 shadow-2xl group"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className={`bg-gradient-to-r ${method.color} p-4 rounded-2xl mb-6 mx-auto w-fit shadow-xl group-hover:shadow-2xl transition-all duration-300`}>
                    {method.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {method.title}
                  </h3>
                  <p className="text-purple-200 text-sm mb-4 font-medium">
                    {method.description}
                  </p>
                  <p className="text-white text-lg leading-relaxed">
                    {method.value}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 text-white border border-white/20 mb-20"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            لماذا تختار التواصل معنا؟
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Clock className="w-12 h-12" />, title: "استجابة سريعة", desc: "نرد على استفساراتك في أسرع وقت ممكن" },
              { icon: <Users className="w-12 h-12" />, title: "فريق متخصص", desc: "خبراء في مجال التعليم والتطوير" },
              { icon: <Award className="w-12 h-12" />, title: "جودة مضمونة", desc: "نضمن لك أفضل الخدمات والحلول" },
              { icon: <Zap className="w-12 h-12" />, title: "حلول مبتكرة", desc: "نقدم حلولاً إبداعية لاحتياجاتك" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-cyan-400 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-purple-200">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social Media Section */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            تابعنا على وسائل التواصل
          </motion.h2>
          <p className="text-purple-200 mb-12 text-xl max-w-3xl mx-auto">
            كن جزءاً من مجتمعنا وتابع آخر الأخبار والفعاليات
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 px-8 py-6 rounded-2xl text-white font-bold text-lg transition-all shadow-xl ${social.color} hover:shadow-2xl`}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: social.delay }}
                viewport={{ once: true }}
              >
                {social.icon}
                {social.label}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            هل تحتاج مساعدة؟
          </motion.h2>
          <p className="text-purple-200 mb-12 text-xl max-w-4xl mx-auto">
            فريقنا جاهز لمساعدتك في أي وقت. لا تتردد في التواصل معنا لأي استفسار أو مساعدة تحتاجها.
          </p>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="https://wa.me/201019769154"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all"
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="w-6 h-6" />
              ابدأ المحادثة الآن
            </motion.a>
            <motion.a
              href="mailto:Un.egy.ilc@gmail.com"
              className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-10 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all"
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-6 h-6" />
              أرسل بريد إلكتروني
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Back to Home */}
        <motion.div variants={itemVariants}>
          <Link to="/">
            <motion.button
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all border-2 border-white/20"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              العودة للصفحة الرئيسية
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
