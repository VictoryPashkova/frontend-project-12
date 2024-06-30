import React, { useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import {
  Button, Alert, Spinner, Form,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { resetModalState } from '../../redux/reducers/modalsSlice';
import { useEditChannelMutation, useGetChannelsQuery } from '../../redux/reducers/channelsApiSlice';
import { useBadWordsContext } from '../../context/BadWordsContext';
import { useSocket } from '../../context/socketContext';

const EditChannelModal = () => {
  const socket = useSocket();
  const { t } = useTranslation();
  const { cleanBadWords } = useBadWordsContext();
  const dispatch = useDispatch();
  const isMatchModalType = useSelector((state) => state.modals.type) === 'editChannel';
  const isModalVisible = useSelector((state) => state.modals.isVisible);
  const modalState = isMatchModalType && isModalVisible;
  const currentChannelId = useSelector((state) => state.modals.extraData.currentModalChannelId);
  const minChannelNameLength = 3;
  const maxChannelNameLength = 20;
  const { name } = useSelector((state) => state.channels.channels
    .find((channel) => channel.id === currentChannelId)) || {};
  const inputRef = useRef(null);
  const [
    editChannel,
    { error: editingChannelError, isLoading: isEditingChannel },
  ] = useEditChannelMutation();
  const { data: channels, refetch } = useGetChannelsQuery();

  const onSubmit = async (values) => {
    const cleanChannelName = cleanBadWords(values.channelName.trim());
    try {
      await editChannel({ id: currentChannelId, name: cleanChannelName });
      dispatch(resetModalState());
      refetch();
      toast.success(t('interface.channelRenamed'));
      socket.emit('renameChannel', { id: currentChannelId, name: cleanChannelName });
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
      onHide={() => dispatch(resetModalState())}
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
                } else if (values.channelName.length < minChannelNameLength
                  || values.channelName.length > maxChannelNameLength) {
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
                    <Form.Label className="form-label visually-hidden">{t('interface.channelName')}</Form.Label>
                    <Form.Control
                      type="text"
                      name="channelName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!isValid}
                      placeholder={t('interface.channelNameLabel')}
                      className="form-control-sm"
                      ref={inputRef}
                      autoFocus
                      value={values.channelName}
                      aria-label={t('interface.channelNameLabel')}
                    />
                    <Form.Control.Feedback type="invalid">{errors.channelName}</Form.Control.Feedback>
                    <div className="d-flex justify-content-end gap-2 mt-3">
                      <Button variant="secondary" type="button" onClick={() => dispatch(resetModalState())}>
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
