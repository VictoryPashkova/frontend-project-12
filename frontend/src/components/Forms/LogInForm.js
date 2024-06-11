import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import { setCredentials } from '../../redux/reducers/user/registrationSlice';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/AuthContext';

const LogInForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { saveAuthData } = useAuth();
  const onSubmit = async ({ name, password }) => {
    setError('');
    try {
      const response = await axios.post('/api/v1/login', { username: name, password });
      const { token } = response.data;
      const { username } = response.data;
      if (username) {
        dispatch(setCredentials({ username, token }));
        saveAuthData(token, username);
        navigate('/');
      }
    } catch (e) {
      setError(t('interface.invalidCredentials'), e);
      toast.error(t('interface.invalidCredentials'));
    }
  };

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={{ name: '', password: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = t('interface.requiredField');
          } else if (values.name.length < 3 || values.name.length > 20) {
            errors.name = t('interface.usernameLength');
          } if (!values.password) {
            errors.password = t('interface.requiredFiel');
          } else if (values.password.length < 5) {
            errors.password = t('interface.passwordLength');
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
            <h1 style={{ textAlign: 'center' }}>{t('interface.login')}</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{t('interface.nickname')}</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name || ''}
                isInvalid={!!errors.name && touched.name}
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
                value={values.password || ''}
                isInvalid={!!errors.password && touched.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
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
    </>
  );
};

export default LogInForm;
