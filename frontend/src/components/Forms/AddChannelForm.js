import React, { useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAddChannelMutation, useGetChannelsQuery } from '../../redux/reducers/channelsApiSlice';
import { setCurrentChannel } from '../../redux/reducers/channelsSlice';
import { resetModalState } from '../../redux/reducers/modalsSlice';
import { useBadWordsContext } from '../../context/BadWordsContext';
import { useSocket } from '../../context/socketContext';

const AddChannaleForm = ({ handleScroll }) => {
  const socket = useSocket();
  const { cleanBadWords } = useBadWordsContext();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const minChannelNameLength = 3;
  const maxChannelNameLength = 20;
  const timeInterval = 500;
  const [
    addChannel,
    { error: addChannelError },
  ] = useAddChannelMutation();
  const {
    data: channels, refetch,
  } = useGetChannelsQuery();

  const onSubmit = async (values) => {
    const cleanChannelName = cleanBadWords(values.channelName.trim());

    const newChannel = { name: cleanChannelName };
    try {
      const result = await addChannel(newChannel).unwrap();
      if (result && result.id) {
        setTimeout(() => {
          handleScroll();
        }, timeInterval);
        dispatch(setCurrentChannel({ id: result.id, name: result.name }));
        toast.success(t('interface.channelCreated'));
        refetch();
        dispatch(resetModalState());
        socket.emit('newChannel', result);
      }
    } catch (error) {
      console.error('Failed to add new channel:', error);
      toast.error(t('interface.addingChannelError'));
    }
  };

  useEffect(() => {
    if (addChannelError) {
      toast.error(t('interface.addingChannelError'));
    }
  }, [addChannelError, t]);

  return (
    <Formik
      initialValues={{ channelName: '' }}
      validateOnBlur={false}
      validateOnChange={false}
      validate={(values) => {
        const errors = {};
        if (values.channelName.length < minChannelNameLength
          || values.channelName.length > maxChannelNameLength) {
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
              className="form-control-sm"
              autoFocus
              ref={inputRef}
              placeholder={t('interface.channelNameLabel')}
              aria-label={t('interface.channelNameLabel')}
            />
            <Form.Control.Feedback type="invalid">{errors.channelName}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button variant="secondary" type="button" onClick={() => dispatch(resetModalState())}>
              {t('interface.buttons.cancel')}
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {t('interface.buttons.send')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddChannaleForm;
