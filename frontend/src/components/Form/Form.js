import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik, Field, ErrorMessage } from 'formik';

const RegistrationForm = () => {
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
          } else if (values.password.length < 6) {
            errors.password = 'Не менее 6 символов';
          } if (!values.confirmPassword) {
          } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Пароли должны совпадать';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
            <h1 style={{ textAlign: 'center' }}>Регистрация</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Имя</Form.Label>
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
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Подтвердите пароль</Form.Label>
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
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg" type="submit" disabled={isSubmitting}>
                Зарегистрироваться
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    );
  };
  
  export default RegistrationForm;
