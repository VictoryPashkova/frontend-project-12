import './App.css';
import React from 'react';
import './components/Form/Form';
import AppRouter from './components/Pages/Pages';
import HomePage from './components/Pages/Home/homaPage';

const App = () => {
  return (
    <>
    
      <AppRouter>
        <HomePage />
      </AppRouter>
    </>
  );
};

export default App;
