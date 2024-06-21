import React, { useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import {
  Button, Alert, Spinner, Form,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { setEditChannelModal } from '../../redux/reducers/modalsSlice';
import { useEditChannelMutation, useGetChannelsQuery } from '../../redux/reducers/channelsApiSlice';
import 'react-toastify/dist/ReactToastify.css';
import cleanBadWords from '../../utils/cleanBadWords';

const EditChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modals.editChannelModal);
  const currentChannelId = useSelector((state) => state.modals.onEditChannelId);
  const { name } = useSelector((state) => state.channels.channels
    .find((channel) => channel.id === currentChannelId)) || {};
  const inputRef = useRef(null);
  const [
    editChannel,
    { error: editingChannelError, isLoading: isEditingChannel },
  ] = useEditChannelMutation();
  const { data: channels } = useGetChannelsQuery();

  const onSubmit = async (values) => {
    const cleanChannelName = cleanBadWords(values.channelName);
    const newChannel = { name: cleanChannelName };
    try {
      await editChannel({ id: currentChannelId, ...newChannel });
      dispatch(setEditChannelModal({ state: false }));
      toast.success(t('interface.channelRenamed'));
    } catch (error) {
      console.error('Failed to edit channel:', error);
    }
  };

  useEffect(() => {
    if (modalState) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 0);
    }
  }, [modalState]);

  useEffect(() => {
    if (editingChannelError) {
      toast.error(t('interface.renameChannelError'));
    }
  }, [editingChannelError, t]);

  return (
    <Modal
      show={modalState}
      size="md"
      centered
      onHide={() => dispatch(setEditChannelModal({ state: false }))}
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
                {t('interface.renameChannelError')}
                {' '}
                {editingChannelError.data.message || editingChannelError.message}
              </Alert>
            )}
            <Formik
              initialValues={{ channelName: name || '' }}
              validateOnChange={false}
              validateOnBlur={false}
              validate={(values) => {
                const errors = {};
                if (!values.channelName) {
                  errors.channelName = t('interface.requiredField');
                } else if (values.channelName.length < 3 || values.channelName.length > 20) {
                  errors.channelName = t('interface.usernameLength');
                } else if (channels && channels
                  .find((channel) => channel.name === values.channelName)) {
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
                isValid,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3 form-control-sm" controlId="formBasicChannelName">
                    <Form.Label className="form-label visually-hidden">Имя канала</Form.Label>
                    <Form.Control
                      type="text"
                      name="channelName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!isValid}
                      placeholder="Название канала"
                      className="form-control-sm"
                      ref={inputRef}
                      autoFocus
                      value={values.channelName}
                      aria-label="Название канала"
                    />
                    <Form.Control.Feedback type="invalid">{errors.channelName}</Form.Control.Feedback>
                    <div className="d-flex justify-content-end gap-2 mt-3">
                      <Button variant="secondary" type="button" onClick={() => dispatch(setEditChannelModal({ state: false }))}>
                        {t('interface.buttons.cancel')}
                      </Button>
                      <Button variant="primary" type="submit" disabled={isSubmitting}>
                        {t('interface.buttons.send')}
                      </Button>
                    </div>
                  </Form.Group>
                </Form>
              )}
            </Formik>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditChannelModal;
