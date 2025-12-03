import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Save, User, Lock } from 'lucide-react';
import { toast } from 'react-toastify';

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: 'admin',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('كلمة المرور الجديدة غير متطابقة');
      return;
    }
    
    // In a real app, we would verify current password and update backend
    toast.success('تم تحديث البيانات بنجاح');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/admin/dashboard')} className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all">
            <ArrowRight size={24} className="text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">الملف الشخصي</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2">اسم المستخدم</label>
              <div className="relative">
                <User className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                  value={formData.username}
                  readOnly
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">تغيير كلمة المرور</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">كلمة المرور الحالية</label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 text-gray-400" size={20} />
                    <input
                      type="password"
                      className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">كلمة المرور الجديدة</label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 text-gray-400" size={20} />
                    <input
                      type="password"
                      className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">تأكيد كلمة المرور الجديدة</label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 text-gray-400" size={20} />
                    <input
                      type="password"
                      className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-8"
            >
              <Save size={20} />
              <span>حفظ التغييرات</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
