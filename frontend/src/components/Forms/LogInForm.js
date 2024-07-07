import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import routes from '../../routes';

const LogInForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [error, setError] = useState('');
  const {
    saveAuthData,
    clearAuthData,
  } = useAuth();
  const authNetworkErrCode = 401;

  const handleExit = useCallback(() => {
    localStorage.clear();
    navigate(routes.login(), { replace: false });
    clearAuthData();
  }, [navigate, clearAuthData]);

  const onSubmit = async ({ name, password }) => {
    setError('');
    try {
      await axios
        .post(routes.loginApi(), { username: name, password })
        .then((response) => {
          const { token, username } = response.data;
          if (token) {
            saveAuthData(token, username);
          }
        })
        .then(() => {
          const localToken = localStorage.getItem('token');
          if (localToken) {
            navigate(routes.home(), { replace: false });
          }
        });
    } catch (e) {
      setError(t('interface.invalidCredentials'));
      if (e.response && e.response.status === authNetworkErrCode) {
        handleExit();
      }
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
              aria-label={t('interface.nicknameLabel')}
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
              aria-label={t('interface.password')}
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
