import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Trash2, Plus, ArrowRight, Eye, AlertTriangle } from 'lucide-react';
import { useStore } from '../../store';
import { toast } from 'react-toastify';

const ManageExams = () => {
  const navigate = useNavigate();
  const { exams, deleteExam } = useStore();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExams = exams.filter(exam =>
    exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteExam = (examId: string) => {
    deleteExam(examId);
    setDeleteConfirm(null);
    toast.success('تم حذف الامتحان بنجاح');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin/dashboard" className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all">
            <ArrowRight size={24} className="text-gray-600" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">إدارة الامتحانات</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="البحث في الامتحانات..."
                className="w-full pr-4 pl-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link
              to="/admin/create-exam"
              className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-700 transition-colors"
            >
              <Plus size={20} />
              <span>إضافة امتحان جديد</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{exam.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{exam.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>الأسئلة: {exam.questions.length}</span>
                    <span>المدة: {exam.duration} دقيقة</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    تم الإنشاء: {formatDate(exam.createdAt)}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => navigate(`/admin/edit-exam/${exam.id}`)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                >
                  <Edit size={16} />
                  <span>تعديل</span>
                </button>
                <button
                  onClick={() => setDeleteConfirm(exam.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={16} />
                  <span>حذف</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredExams.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Plus size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">لا توجد امتحانات</h3>
            <p className="text-gray-500 mb-6">ابدأ بإضافة امتحان جديد</p>
            <Link
              to="/admin/create-exam"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl inline-flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              <span>إضافة أول امتحان</span>
            </Link>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setDeleteConfirm(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6"
                onClick={e => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">تأكيد الحذف</h3>
                  <p className="text-gray-600 mb-6">
                    هل أنت متأكد من حذف هذا الامتحان؟<br />
                    سيتم حذف جميع النتائج المرتبطة بهذا الامتحان.
                    <br />
                    <strong>هذا الإجراء لا يمكن التراجع عنه.</strong>
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      إلغاء
                    </button>
                    <button
                      onClick={() => handleDeleteExam(deleteConfirm)}
                      className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      حذف الامتحان
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ManageExams;
