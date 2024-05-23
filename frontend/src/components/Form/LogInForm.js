import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../redux/reducers/user/registrationSlice';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const LogInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const onSubmit = async ({ name, password }) => {
    setError('');
    try {
      const response = await axios.post('/api/v1/login', { username: name, password });
      const token = response.data.token;
      const username = response.data.username;
      if (username) {
        dispatch(setCredentials({ username, token }));
        navigate('/');
      }
    } catch (error) {
      setError('Неверное имя пользователя или пароль');
    }
  };

    return (
      <Formik
        initialValues={{ name: '', password: '', confirmPassword: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Обязательное поле';
          } else if (values.name.length < 3 || values.name.length > 20) {
            errors.name = 'От 3 до 20 символов';
          } if (!values.password) {
            errors.password = 'Обязательное поле';
          } else if (values.password.length < 5) {
            errors.password = 'Не менее 6 символов';
          } if (!values.confirmPassword) {
          } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Пароли должны совпадать';
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
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit}>
            <h1 style={{ textAlign: 'center' }}>Войти</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ваш ник</Form.Label>
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
              <Form.Label>Пароль</Form.Label>
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg" type="submit" disabled={isSubmitting}>
                Войти
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    );
  };
  
  export default LogInForm;
  