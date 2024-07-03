import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import LogInPage from './LogInPage';
import RegistrationPage from './RegistrationPage';
import NotFoundPage from './NotFoundPage';
import { useAuth } from '../../context/AuthContext';
import Home from './HomePage';
import routes from '../../routes';

const AppRouter = () => {
  const { token } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path={routes.home()} element={token ? <Home /> : <Navigate to={routes.login()} />} />
        <Route path={routes.login()} element={<LogInPage />} />
        <Route path={routes.signup()} element={<RegistrationPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
