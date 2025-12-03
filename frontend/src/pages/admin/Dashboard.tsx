import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, FilePlus, Settings, LogOut, CheckCircle, Edit3, Bell, X, Trophy, TrendingUp, BookOpen, User } from 'lucide-react';
import { useStore } from '../../store';

const Dashboard = () => {
  const navigate = useNavigate();
  const { adminLogout } = useStore();

  const [notifications, setNotifications] = useState<any[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [stats, setStats] = useState({
    total_exams: 0,
    total_students: 0,
    average_percentage: 0
  });

  const handleLogout = () => {
    adminLogout();
    navigate('/');
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://localhost:3001/results/notifications/recent');
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchNotificationCount = async () => {
    try {
      const response = await fetch('http://localhost:3001/results/notifications/count');
      if (response.ok) {
        const data = await response.json();
        setNotificationCount(data.count);
      }
    } catch (error) {
      console.error('Error fetching notification count:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:3001/results/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchNotificationCount();
    fetchNotifications();
    fetchStats();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showNotifications && !(event.target as HTMLElement)?.closest('.notification-container')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications]);

  const menuItems = [
    {
      title: 'نتائج الطلاب',
      icon: <Users size={32} />,
      path: '/admin/results',
      color: 'bg-blue-500',
      desc: 'عرض وتحليل نتائج الطلاب'
    },
    {
      title: 'إضافة امتحان',
      icon: <FilePlus size={32} />,
      path: '/admin/create-exam',
      color: 'bg-green-500',
      desc: 'إنشاء اختبار جديد وإضافة أسئلة'
    },
    {
      title: 'إدارة الامتحانات',
      icon: <Edit3 size={32} />,
      path: '/admin/manage-exams',
      color: 'bg-orange-500',
      desc: 'تعديل وحذف الامتحانات الموجودة'
    },
    {
      title: 'الملف الشخصي',
      icon: <Settings size={32} />,
      path: '/admin/profile',
      color: 'bg-purple-500',
      desc: 'تغيير كلمة المرور والإعدادات'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Epic Navbar */}
      <nav className="backdrop-blur-md bg-white/80 border-b border-white/20 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                  نظام إدارة الامتحانات
                </h1>
                <p className="text-xs text-gray-500">لوحة التحكم الإدارية</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Stats Cards in Navbar */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm font-medium">الامتحانات: {stats.total_exams}</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">الطلاب: {stats.total_students}</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">النتائج: {stats.average_percentage}%</span>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="relative notification-container">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 p-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  title="الإشعارات"
                >
                  <Bell size={20} />
                  {notificationCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg"
                    >
                      {notificationCount > 99 ? '99+' : notificationCount}
                    </motion.span>
                  )}
                </motion.button>

                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-3 w-96 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 z-50 max-h-96 overflow-y-auto"
                  >
                    <div className="p-4 border-b border-gray-200/50 flex justify-between items-center">
                      <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                        الإشعارات
                      </h3>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="p-4">
                      {notifications.length > 0 ? (
                        <div className="space-y-3">
                          {notifications.map((notification, index) => (
                            <motion.div
                              key={notification.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100/50 shadow-sm hover:shadow-md transition-all duration-300"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <p className="font-semibold text-gray-800 mb-1">{notification.student_name}</p>
                                  <p className="text-sm text-indigo-600 mb-2">{notification.exam_title}</p>
                                  <div className="flex items-center space-x-2">
                                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-xs font-medium">
                                      النتيجة: {notification.score}/{notification.total_questions}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">
                                  {new Date(notification.submission_date).toLocaleString('ar-EG')}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500 font-medium">لا توجد إشعارات جديدة</p>
                          <p className="text-sm text-gray-400">ستظهر هنا إشعارات تسليم الامتحانات</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Logout Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
              >
                <LogOut size={18} />
                <span>تسجيل خروج</span>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 p-8 rounded-3xl shadow-2xl mb-8">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <CheckCircle size={40} className="text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              مرحباً بك في لوحة التحكم
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              إدارة شاملة للامتحانات والنتائج مع أدوات متقدمة لتحليل الأداء
            </p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-2xl shadow-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">إجمالي الامتحانات</p>
                <p className="text-3xl font-bold">{stats.total_exams}</p>
              </div>
              <BookOpen className="w-12 h-12 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-2xl shadow-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">الطلاب المسجلين</p>
                <p className="text-3xl font-bold">{stats.total_students}</p>
              </div>
              <User className="w-12 h-12 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-2xl shadow-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">متوسط النتائج</p>
                <p className="text-3xl font-bold">{stats.average_percentage}%</p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-200" />
            </div>
          </div>
        </motion.div>

        {/* Menu Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {menuItems.map((item, index) => (
            <Link to={item.path} key={index}>
              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="group bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer h-full border border-white/20 hover:border-white/40"
              >
                <div className={`${item.color} w-20 h-20 rounded-3xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {item.desc}
                </p>
                <div className="mt-6 flex items-center text-indigo-600 font-medium group-hover:text-indigo-700">
                  <span>الدخول</span>
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 py-8"
        >
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <p className="text-gray-600">
              نظام إدارة الامتحانات المتقدم © 2025 - جميع الحقوق محفوظة
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
