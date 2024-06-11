import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import LogInPage from './LogInPage/LogIn';
import RegistrationPage from './RegistrationPage/RegistrationPage';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import ChatPage from './ChatPage/ChatPage';
import { useAuth } from '../../context/AuthContext';

const AppRouter = () => {
  const { token } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="login" element={<LogInPage />} />
        <Route path="signup" element={<RegistrationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
