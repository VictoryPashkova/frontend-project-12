import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './LogInPage/LogIn';
import RegistrationPage from './RegistrationPage/RegistrationPage';
import NotFoundPage from './NotFoundPage/NotFoundPage';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LogInPage />} />
      <Route path="login" element={<LogInPage />} />
      <Route path="registration" element={<RegistrationPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default AppRouter;