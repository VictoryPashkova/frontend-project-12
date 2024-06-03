import { replace } from 'formik';
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
    const navigate = useNavigate();

    return (
      <>
        <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', margin: 0, padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', color: '#333' }}>{t('interface.404')}</h1>
      <p style={{ fontSize: '1.2rem', color: '#555' }}>{t('interface.pageNotFound')}</p>
      <p>
        <button
          onClick={() => navigate('/login', {replace: false})}
          style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', padding: '8px 16px', fontSize: '1.2rem', cursor: 'pointer' }}
        >
          {t('interface.goToHomePage')}
        </button>
        </p>
    </div>
  </div>
      </>
    );
  }
  
  export default NotFoundPage;