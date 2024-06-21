import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setCredentials } from '../../redux/reducers/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/AuthContext';

const LogInForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [error, setError] = useState('');
  const { saveAuthData } = useAuth();
  const onSubmit = async ({ name, password }) => {
    setError('');
    try {
      const response = await axios.post('/api/v1/login', { username: name, password });
      const { token, username } = response.data;
      if (username) {
        dispatch(setCredentials({ username, token }));
        saveAuthData(token, username);
        navigate('/');
      }
    } catch (e) {
      setError(t('interface.invalidCredentials'));
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Formik
      initialValues={{ name: '', password: '' }}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          <h1 style={{ textAlign: 'center' }}>{t('interface.login')}</h1>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>{t('interface.nickname')}</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name || ''}
              isInvalid={error}
              aria-label="Никнейм"
              ref={inputRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>{t('interface.password')}</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password || ''}
              isInvalid={error}
              aria-label="Пароль"
            />
          </Form.Group>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" type="submit" disabled={isSubmitting} role="button" name="login">
              {t('interface.buttons.login')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LogInForm;
