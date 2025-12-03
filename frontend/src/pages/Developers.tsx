import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, MessageCircle, Facebook, Instagram, Mail, Phone, Code, Database, Palette, Zap, Award, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import SkillBar from '../components/SkillBar';
import ProjectCard from '../components/ProjectCard';
import Timeline from '../components/Timeline';

const Developers = () => {
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

  const projects = [
    {
      title: "Exam Management System",
      description: "A comprehensive platform for creating, managing, and taking exams with real-time results and analytics.",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      githubUrl: "https://github.com",
      liveUrl: "http://localhost:3000",
      stars: 45,
      delay: 0.1
    },
    {
      title: "E-Learning Dashboard",
      description: "Interactive learning management system with progress tracking and personalized recommendations.",
      technologies: ["Vue.js", "Express", "PostgreSQL", "Chart.js"],
      githubUrl: "https://github.com",
      liveUrl: "http://localhost:3000/about",
      stars: 32,
      delay: 0.2
    },
    {
      title: "Real-time Chat Application",
      description: "Scalable chat platform with file sharing, voice messages, and end-to-end encryption.",
      technologies: ["React", "WebSocket", "Redis", "AWS"],
      githubUrl: "https://github.com",
      liveUrl: "http://localhost:3000/developers",
      stars: 67,
      delay: 0.3
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Mouse Follower */}
      <motion.div
        className="fixed w-6 h-6 bg-blue-400 rounded-full pointer-events-none z-50 mix-blend-difference"
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
        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20"
        style={{ y: backgroundY }}
      />



      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 text-center px-4 max-w-7xl w-full"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="mb-8 flex justify-center"
          >
            <div className="bg-gradient-to-r from-blue-400 to-purple-600 p-6 rounded-full shadow-2xl">
              <GraduationCap size={80} className="text-white" />
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6 tracking-tight"
          >
            Our Developers
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-3xl text-blue-200 mb-16 font-light max-w-4xl mx-auto"
          >
            Meet the extraordinary team crafting digital experiences that redefine excellence
          </motion.p>
        </motion.div>

        {/* Developers Section */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Mohamed Awad Card */}
            <motion.div
              id="mohamed-awad"
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white border border-white/20 hover:border-white/40 transition-all duration-500 shadow-2xl"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              <motion.div
                className="text-center mb-6"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img
                  src="/images/mm.jpg"
                  alt="Mohamed Ibrahim Awad"
                  className="w-40 h-40 rounded-full mx-auto mb-6 object-cover border-4 border-blue-400 shadow-xl"
                />
                <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Mohamed Ibrahim Awad
                </h3>
                <p className="text-blue-300 text-lg font-semibold">Full Stack Developer</p>
              </motion.div>

              <p className="text-blue-100 leading-relaxed mb-8 text-center">
                Architect of scalable solutions, master of both frontend elegance and backend robustness.
                Crafting enterprise-level applications that set industry standards.
              </p>

              {/* Skills */}
              <div className="mb-8">
                <h4 className="text-xl font-bold mb-4 text-center">Technical Expertise</h4>
                <div className="space-y-3">
                  <SkillBar skill="React/Next.js" level={95} color="#61DAFB" delay={0.5} />
                  <SkillBar skill="Node.js/Express" level={92} color="#339933" delay={0.6} />
                  <SkillBar skill="Database Design" level={90} color="#4479A1" delay={0.7} />
                  <SkillBar skill="Cloud Architecture" level={88} color="#FF9900" delay={0.8} />
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mb-8">
                <h4 className="text-xl font-bold mb-4 text-center">Connect with Me</h4>
                <div className="flex justify-center gap-6">
                  <a href="https://wa.me/201020943238" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-colors">
                    <MessageCircle size={32} />
                  </a>
                  <a href="https://www.facebook.com/MidoStares" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                    <Facebook size={32} />
                  </a>
                  <a href="https://www.instagram.com/mido_stares1" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 transition-colors">
                    <Instagram size={32} />
                  </a>
                </div>
              </div>


            </motion.div>

            {/* Mohamed Abdel Aal Card */}
            <motion.div
              id="mohamed-abdelaal"
              whileHover={{
                scale: 1.05,
                rotateY: -5,
                rotateX: 5,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white border border-white/20 hover:border-white/40 transition-all duration-500 shadow-2xl"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              <motion.div
                className="text-center mb-6"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img
                  src="/images/mohamed2.jpg"
                  alt="Mohamed Ibrahim Abdel Aal"
                  className="w-40 h-40 rounded-full mx-auto mb-6 object-cover border-4 border-purple-400 shadow-xl"
                />
                <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Mohamed Ibrahim Abdel Aal
                </h3>
                <p className="text-purple-300 text-lg font-semibold">Frontend Developer</p>
              </motion.div>

              <p className="text-blue-100 leading-relaxed mb-8 text-center">
                Digital artist transforming complex interfaces into intuitive, breathtaking experiences.
                Where code meets creativity to create unforgettable user journeys.
              </p>

              {/* Skills */}
              <div className="mb-8">
                <h4 className="text-xl font-bold mb-4 text-center">Creative Expertise</h4>
                <div className="space-y-3">
                  <SkillBar skill="React/Vue.js" level={96} color="#61DAFB" delay={0.5} />
                  <SkillBar skill="UI/UX Design" level={93} color="#FF6B6B" delay={0.6} />
                  <SkillBar skill="Animation" level={91} color="#4ECDC4" delay={0.7} />
                  <SkillBar skill="Responsive Design" level={95} color="#45B7D1" delay={0.8} />
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mb-8">
                <h4 className="text-xl font-bold mb-4 text-center">Connect with Me</h4>
                <div className="flex justify-center gap-6">
                  <a href="https://wa.me/201505790261" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-colors">
                    <MessageCircle size={32} />
                  </a>
                  <a href="https://www.facebook.com/mohamed.abdelaal7" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                    <Facebook size={32} />
                  </a>
                  <a href="https://www.instagram.com/mohamedabd8584/" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 transition-colors">
                    <Instagram size={32} />
                  </a>
                </div>
              </div>


            </motion.div>
          </div>
        </motion.div>

        {/* Featured Projects Section */}
        <motion.div variants={itemVariants} className="mb-20">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </motion.div>

        {/* Developer Journey Timeline */}
        <motion.div variants={itemVariants} className="mb-20">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Developer Journey
          </motion.h2>
          <Timeline />
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-white border border-white/20 mb-16"
        >
          <motion.h3
            className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Why Choose Our Developers?
          </motion.h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Code className="w-12 h-12" />, title: "Innovation", desc: "Cutting-edge solutions that push boundaries" },
              { icon: <Zap className="w-12 h-12" />, title: "Performance", desc: "Lightning-fast, optimized applications" },
              { icon: <Award className="w-12 h-12" />, title: "Excellence", desc: "Industry-leading quality standards" },
              { icon: <Star className="w-12 h-12" />, title: "Creativity", desc: "Unique designs that captivate users" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-blue-400 mb-4 flex justify-center">{item.icon}</div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-blue-200">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>



        {/* Back to Home */}
        <motion.div variants={itemVariants}>
          <Link to="/">
            <motion.button
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all border-2 border-white/20"
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

export default Developers;
