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
import { setCurrentChannel } from '../../redux/reducers/app/chatSlice';
import { useGetChannelsQuery } from '../../redux/reducers/app/channelsSlice';

const AddChannaleForm = () => {
  const dispatch = useDispatch();
  const [
    addChannel,
    { error: addChannelError, isLoading: isAddingChannel },
  ] = useAddChannelMutation();
  const { data: channels, isLoading, isError, refetch } = useGetChannelsQuery();

  const onSubmit = async (values) => {
    const newChannel = { name: values.channelName };
    try {
      const result = await addChannel(newChannel).unwrap();
      if (result && result.id) {
        dispatch(setCurrentChannel({ id: result.id, name: result.name }));
        refetch();
        dispatch(setAddChannelModal({ state: false }));
      }
    } catch (error) {
      console.error('Failed to add new channel:', error);
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
        } else if (channels && channels.find((channel) => channel.name === values.channelName)) {
          errors.channelName = 'Такой канал уже существует';
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
  