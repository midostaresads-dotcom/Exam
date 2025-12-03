import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: 'student' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { currentStudent, isAdminLoggedIn } = useStore();

  if (role === 'student' && !currentStudent) {
    return <Navigate to="/student/register" replace />;
  }

  if (role === 'admin' && !isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
