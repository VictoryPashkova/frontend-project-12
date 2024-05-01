import { replace } from 'formik';
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
      <>
        <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', margin: 0, padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', color: '#333' }}>404</h1>
      <p style={{ fontSize: '1.2rem', color: '#555' }}>Извините, страница не найдена.</p>
      <p>
        <button
          onClick={() => navigate('/login', {replace: false})}
          style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', padding: '8px 16px', fontSize: '1.2rem', cursor: 'pointer' }}
        >
          Вернуться на главную страницу
        </button>
        </p>
    </div>
  </div>
      </>
    );
  }
  
  export default NotFoundPage;