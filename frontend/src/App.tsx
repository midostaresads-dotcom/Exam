import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Developers from './pages/Developers';
import StudentLogin from './pages/student/Login';
import StudentRegister from './pages/student/Register';
import ExamList from './pages/student/ExamList';
import ExamPaper from './pages/student/ExamPaper';
import ExamResult from './pages/student/ExamResult';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminResults from './pages/admin/Results';
import AdminCreateExam from './pages/admin/CreateExam';
import AdminEditExam from './pages/admin/EditExam';
import AdminManageExams from './pages/admin/ManageExams';
import AdminProfile from './pages/admin/Profile';
import Accreditations from './pages/Accreditations';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navbar />
      <div className="min-h-screen bg-gray-50 font-sans text-right pt-16" dir="rtl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/accreditations" element={<Accreditations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/developers" element={<Developers />} />

          {/* Student Routes */}
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/register" element={<StudentRegister />} />
          <Route path="/student/exams" element={<ProtectedRoute role="student"><ExamList /></ProtectedRoute>} />
          <Route path="/student/exam/:examId" element={<ProtectedRoute role="student"><ExamPaper /></ProtectedRoute>} />
          <Route path="/student/result" element={<ProtectedRoute role="student"><ExamResult /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/results" element={<ProtectedRoute role="admin"><AdminResults /></ProtectedRoute>} />
          <Route path="/admin/create-exam" element={<ProtectedRoute role="admin"><AdminCreateExam /></ProtectedRoute>} />
          <Route path="/admin/manage-exams" element={<ProtectedRoute role="admin"><AdminManageExams /></ProtectedRoute>} />
          <Route path="/admin/edit-exam/:examId" element={<ProtectedRoute role="admin"><AdminEditExam /></ProtectedRoute>} />
          <Route path="/admin/profile" element={<ProtectedRoute role="admin"><AdminProfile /></ProtectedRoute>} />
        </Routes>
        <ToastContainer position="top-left" rtl />
      </div>
    </Router>
  );
}

export default App;
