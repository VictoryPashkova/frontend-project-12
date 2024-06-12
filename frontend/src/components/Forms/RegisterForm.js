import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { setCredentials } from '../../redux/reducers/user/registrationSlice';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/AuthContext';

const RegistrationForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { saveAuthData } = useAuth();
  const [error, setError] = useState('');
  const onSubmit = async ({ name, password }) => {
    try {
      const response = await axios.post('/api/v1/signup', { username: name, password });
      const { token } = response.data;
      const { username } = response.data;
      if (username) {
        dispatch(setCredentials({ username, token }));
        saveAuthData(token, username);
        navigate('/');
      }
    } catch (err) {
      console.error('Error signing up:', err);
      toast.error(t('interface.userExists'));
      setError(t('interface.userExists'));
    }
  };

  return (
    <Formik
      initialValues={{ name: '', password: '', confirmPassword: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = t('interface.requiredField');
        } else if (values.name.length < 3 || values.name.length > 20) {
          errors.name = t('interface.usernameLength');
        } if (!values.password) {
          errors.password = t('interface.requiredField');
        } else if (values.password.length < 5) {
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
              value={values.email}
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
              value={values.password}
              isInvalid={!!errors.password && touched.password}
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
              isInvalid={!!errors.confirmPassword && touched.confirmPassword}
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
