import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import routes from '../../routes';

const RegistrationForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const minNameLength = 3;
  const maxNameLength = 20;
  const minPasswordLength = 5;
  const {
    saveAuthData,
    clearAuthData,
  } = useAuth();
  const authNetworkErrCode = 401;

  const [error, setError] = useState('');

  const handleExit = useCallback(() => {
    localStorage.clear();
    navigate(routes.login(), { replace: false });
    clearAuthData();
  }, [navigate, clearAuthData]);

  const onSubmit = async ({ name, password }) => {
    setError('');
    try {
      await axios
        .post(routes.signupApi(), { username: name, password })
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
      console.error('Error signing up:', e);
      setError(t('interface.userExists'));
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
      initialValues={{ name: '', password: '', confirmPassword: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = t('interface.requiredField');
        } else if (values.name.length < minNameLength || values.name.length > maxNameLength) {
          errors.name = t('interface.usernameLength');
        } if (!values.password) {
          errors.password = t('interface.requiredField');
        } else if (values.password.length < minPasswordLength) {
          errors.password = t('interface.passwordLength');
        } if (!values.confirmPassword) {
          errors.confirmPassword = t('interface.requiredField');
        } else if (values.password !== values.confirmPassword) {
          errors.confirmPassword = t('interface.passwordsMustMatch');
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          <h1 style={{ textAlign: 'center' }}>{t('interface.registration')}</h1>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>{t('interface.username')}</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              isInvalid={!!errors.name && touched.name}
              ref={inputRef}
              aria-label={t('interface.name')}
              autoFocus
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>{t('interface.password')}</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              isInvalid={!!errors.password && touched.password}
              aria-label={t('interface.password')}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>{t('interface.confirmPassword')}</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              isInvalid={!!errors.confirmPassword && touched.confirmPassword && touched.password}
              aria-label={t('interface.confirmPasswordLabel')}
            />
            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
          </Form.Group>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" type="submit" disabled={isSubmitting} name="general" role="button">
              {t('interface.buttons.register')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
