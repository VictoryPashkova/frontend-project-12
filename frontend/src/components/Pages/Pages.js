import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import LogInPage from './LogInPage';
import RegistrationPage from './RegistrationPage';
import NotFoundPage from './NotFoundPage';
import { useAuth } from '../../context/AuthContext';
import Home from './HomePage';

const AppRouter = () => {
  const { token } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="login" element={<LogInPage />} />
        <Route path="signup" element={<RegistrationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
