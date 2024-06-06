import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import {
  Button, Alert, Spinner, Form,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import { setEditChannelModal } from '../../../redux/reducers/app/modalsSlice';
import { useEditChannelMutation, useGetChannelsQuery } from '../../../redux/reducers/app/channelsSlice';
import 'react-toastify/dist/ReactToastify.css';
import cleanBadWords from '../../../utils/cleanBadWords';

const EditChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modals.editChannelModal);
  const currentChannelId = useSelector((state) => state.chat.onEditChannelId);
  const [
    editChannel,
    { error: editingChannelError, isLoading: isEditingChannel },
  ] = useEditChannelMutation();
  const {
    data: channels,
    isLoading: isChannelsLoading, isError: isChannelsError,
  } = useGetChannelsQuery();

  const onSubmit = async (values) => {
    const cleanChannelName = cleanBadWords(values.channelName);
    const newChannel = { name: cleanChannelName };
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
    if (isChannelsLoading) {
      toast.info(t('interface.loading'));
    }
    if (editingChannelError) {
      toast.error(t('interface.renameChannelError'));
    }
    if (isChannelsError) {
      toast.error(t('interface.getChannelsError'));
    }
  }, [isEditingChannel, isChannelsLoading, editingChannelError, isChannelsError, t]);

  return (
    <>
      <ToastContainer />
      <Modal
        show={modalState}
        size="lg"
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
                initialValues={{ channelName: '' }}
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
                        className="form-control-sm"
                      />
                      <Form.Control.Feedback type="invalid">{errors.channelName}</Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-grid gap-2">
                      <Button variant="danger" size="sm" type="submit" disabled={isSubmitting}>
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
          <Button variant="secondary" onClick={() => dispatch(setEditChannelModal({ state: false }))}>
            {t('interface.buttons.cancel')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditChannelModal;
