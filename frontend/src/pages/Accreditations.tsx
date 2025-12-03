import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, FileText } from 'lucide-react';

const Accreditations = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts for screenshots
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'PrintScreen' ||
        (e.ctrlKey && e.key === 'p') ||
        (e.ctrlKey && e.shiftKey && e.key === 's') ||
        (e.altKey && e.key === 'PrintScreen')
      ) {
        e.preventDefault();
        alert('التقاط الشاشة غير مسموح به في هذه الصفحة');
        return false;
      }
    };

    // Disable drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('selectstart', handleSelectStart);

    // Prevent copy
    document.addEventListener('copy', (e) => e.preventDefault());

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('copy', (e) => e.preventDefault());
    };
  }, []);

  const accreditations = [
    { name: 'قرار الاعتماد', image: '/images/Accreditation Decision.jpg' },
    { name: 'قرار الاعتماد 1', image: '/images/Accreditation Decision1.jpg' },
    { name: 'شهادة الصلاحية', image: '/images/Certificate of Validity.jpg' },
    { name: 'شهادة الصلاحية 1', image: '/images/Certificate of Validity1.jpg' },
    { name: 'الشهادة', image: '/images/Certificate.jpg' },
    { name: 'الشهادة 1', image: '/images/Certificate1.jpg' },
    { name: 'ICDL', image: '/images/ICDL.jpg' },
    { name: 'CTP', image: '/images/CTP.jpg' },
    { name: 'الترخيص 1', image: '/images/License1.jpg' },
    { name: 'ICDL 1', image: '/images/ICDL1.jpg' },
    { name: 'الترخيص', image: '/images/License.jpg' },
    { name: 'وثيقة الإثبات', image: '/images/Proof Document.jpg' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-12 h-12 text-blue-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              الاعتمادات والتوثيق
            </h1>
            <Award className="w-12 h-12 text-blue-600 ml-4" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            شهادات الاعتماد والتراخيص الرسمية للمركز الدولي للغات والكمبيوتر
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4 rtl:space-x-reverse">
            <FileText className="w-6 h-6 text-blue-600" />
            <span className="text-sm text-gray-500">جميع الوثائق محمية وغير قابلة للتنزيل</span>
          </div>
        </motion.div>

        {/* Warning Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-red-600 mr-2" />
            <span className="text-lg font-semibold text-red-800">تحذير أمني</span>
          </div>
          <p className="text-red-700">
            هذه الصفحة محمية بأعلى مستويات الأمان. التقاط الشاشة، التسجيل، أو محاولة تنزيل الصور غير مسموح بها.
            جميع المحتويات محمية بحقوق الطبع والنشر.
          </p>
        </motion.div>

        {/* Accreditations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accreditations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200"
            >
              <div className="relative cursor-pointer" onClick={() => setSelectedImage(item.image)}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  style={{
                    userSelect: 'none',
                    pointerEvents: 'none',
                    WebkitUserSelect: 'none',
                    WebkitTouchCallout: 'none',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg text-center">
                    {item.name}
                  </h3>
                </div>
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span className="text-white font-medium opacity-0 hover:opacity-100 transition-opacity">
                    انقر للمعاينة
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-7xl h-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="معاينة الوثيقة"
                className="w-full h-full object-contain rounded-lg shadow-2xl"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                style={{
                  userSelect: 'none',
                  pointerEvents: 'none',
                  WebkitUserSelect: 'none',
                  WebkitTouchCallout: 'none',
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600">
            جميع الوثائق والشهادات المعروضة هي نسخ أصلية محمية قانونياً
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Accreditations;
