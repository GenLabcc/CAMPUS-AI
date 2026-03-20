import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import StudentLogin from './pages/StudentLogin';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import AttendancePage from './pages/AttendancePage';
import FeeReminder from './pages/FeeReminder';
import Chatbot from './pages/Chatbot';
import Contact from './pages/Contact';
import GlobalBackground from './components/GlobalBackground';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, isAdmin } = useAuth();
  const token = localStorage.getItem('access_token');

  if (!user || !token) {
    return <Navigate to="/student-login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <GlobalBackground />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/contact" element={<Contact />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
            <Route path="/attendance" element={<ProtectedRoute><AttendancePage /></ProtectedRoute>} />
            <Route path="/fees" element={<ProtectedRoute><FeeReminder /></ProtectedRoute>} />
            <Route path="/chatbot" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
