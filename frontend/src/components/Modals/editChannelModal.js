import { Children, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { Button, Alert, Spinner, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEditChannelMutation } from '../../redux/reducers/app/channelsSlice';
import { setEditChannelModal } from '../../redux/reducers/app/modalsSlice';
import { useGetChannelsQuery } from '../../redux/reducers/app/channelsSlice';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditChannelModal = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modals.editChannelModal);
  const currentChannelId = useSelector((state) => state.chat.onEditChannelId);
  const [
    editChannel,
    { error: editingChannelError, isLoading: isEditingChannel },
  ] = useEditChannelMutation();
  const { data: channels, isLoading: isChannelsLoading, isError: isChannelsError } = useGetChannelsQuery();

  const onSubmit = async (values) => {
    const newChannel = { name: values.channelName };
    try {
      await editChannel({ id: currentChannelId, ...newChannel });
      dispatch(setEditChannelModal({ state: false }));
    } catch (error) {
      console.error('Failed to edit channel:', error);
    }
  };

  useEffect(() => {
    if (isEditingChannel) {
      toast.info(t('interface.renaming'));
    }
  }, [isEditingChannel]);

  useEffect(() => {
    if (isChannelsLoading) {
      toast.info(t('interface.loading'));
    }
  }, [isChannelsLoading]);

  useEffect(() => {
    if (editingChannelError) {
      toast.error(t('interface.renameChannelError'));
    }
  }, [editingChannelError]);

  useEffect(() => {
    if (isChannelsError) {
      toast.error(t('interface.getChannelsError'));
    }
  }, [isChannelsError]);


  return (
    <><ToastContainer />
    <Modal
      show={modalState}
      size="lg"
      centered
      onHide={() => dispatch(setEditChannelModal({state: false}))}
    >
      
      <Modal.Header closeButton>
        <Modal.Title>{t('interface.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {isEditingChannel ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">{t('interface.renaming')}</span>
            </Spinner>
          </div>
        ) : (
          <>
            {editingChannelError && (
              <Alert variant="danger">
                {t('interface.renameChannelError')} {editingChannelError.data.message || editingChannelError.message}
              </Alert>
            )}
            <Formik
      initialValues={{ channelName: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.channelName) {
          errors.channelName = t('interface.requiredField');
        } else if (values.channelName.length < 3 || values.channelName.length > 20) {
          errors.channelName = t('interface.usernameLength');
        } else if (channels && channels.find((channel) => channel.name === values.channelName)) {
          errors.channelName = t('interface.channelExists');
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
            <Button variant="danger" size="sm" type="submit" disabled={isSubmitting} >
              {t('interface.buttons.change')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={() => dispatch(setEditChannelModal({state: false}))}>
      {t('interface.buttons.cancel')}
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default EditChannelModal;
