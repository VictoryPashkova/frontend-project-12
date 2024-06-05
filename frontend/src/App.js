import './App.css';
import React from 'react';
import './components/Forms/RegisterForm';
import AppRouter from './components/Pages/Pages';
import HomePage from './components/Pages/Home/HomePage';

const App = () => (
  <AppRouter>
    <HomePage />
  </AppRouter>
);

export default App;
