import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../redux/reducers/user/registrationSlice';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAddChannelMutation } from '../../redux/reducers/app/channelsSlice';
import { setAddChannelModal } from '../../redux/reducers/app/modalsSlice';

const AddChannaleForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [
    addChannel,
    { error: addChannelError, isLoading: isAddingChannel },
  ] = useAddChannelMutation();

  const onSubmit = async (values) => {
    const newChannel = { name: values.channelName };
    try {
      await addChannel(newChannel);
      dispatch(setAddChannelModal({ state: false }));
      сonsole.log(newChannel, useSelector((state => state.channels)));
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <Formik
      initialValues={{ channelName: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.channelName) {
          errors.channelName = 'Обязательное поле';
        } else if (values.channelName.length < 3 || values.channelName.length > 20) {
          errors.channelName = 'От 3 до 20 символов';
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
          <Form.Group className="mb-3 form-control-sm" controlId="formBasicChannelName">
            <Form.Control
              type="text"
              name="channelName"
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.channelName && touched.channelName}
              placeholder="Название канала"
              className='form-control-sm'
            />
            <Form.Control.Feedback type="invalid">{errors.channelName}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" size="sm" type="submit" disabled={isSubmitting}>
              Добавить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddChannaleForm;
  