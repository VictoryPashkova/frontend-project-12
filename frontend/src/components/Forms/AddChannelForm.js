import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import socket from '../../socket';
import { useAddChannelMutation, useGetChannelsQuery } from '../../redux/reducers/app/channelsApiSlice';
import { setAddChannelModal } from '../../redux/reducers/app/modalsSlice';
import { setCurrentChannel } from '../../redux/reducers/app/channelsSlice';
import 'react-toastify/dist/ReactToastify.css';
import cleanBadWords from '../../utils/cleanBadWords';

const AddChannaleForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [
    addChannel,
    { error: addChannelError },
  ] = useAddChannelMutation();
  const {
    data: channels, refetch,
  } = useGetChannelsQuery();
  const [channelList, updateChannelList] = useState([]);

  const onSubmit = async (values) => {
    const cleanChannelName = cleanBadWords(values.channelName);

    const newChannel = { name: cleanChannelName };
    try {
      const result = await addChannel(newChannel).unwrap();
      if (result && result.id) {
        dispatch(setCurrentChannel({ id: result.id, name: result.name }));
        toast.success(t('interface.channelCreated'));
        refetch();
        dispatch(setAddChannelModal({ state: false }));
        socket.emit('newChannel', result);
      }
    } catch (error) {
      console.error('Failed to add new channel:', error);
      toast.error(t('interface.addingChannelError'));
    }
  };

  useEffect(() => {
    if (channels) {
      updateChannelList(channels);
    }
    socket.on('newChannel', (newChannel) => {
      updateChannelList((prevChannels) => [...prevChannels, newChannel]);
    });

    socket.on('connect', () => {
    });

    socket.on('disconnect', () => {
      socket.connect();
    });

    socket.on('connect_error', () => {
      socket.connect();
    });

    socket.on('reconnect_attempt', () => {
      socket.connect();
    });

    return () => {
      socket.off('newMessage');
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
      socket.off('reconnect_attempt');
    };
  }, [channels, channelList]);

  useEffect(() => {
    if (addChannelError) {
      toast.error(t('interface.addingChannelError'));
    }
  }, [addChannelError, t]);

  return (
    <Formik
      initialValues={{ channelName: '' }}
      validate={(values) => {
        const errors = {};
        if (values.channelName.length < 3 || values.channelName.length > 20) {
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
            <Form.Label className="form-label visually-hidden">Имя канала</Form.Label>
            <Form.Control
              type="text"
              name="channelName"
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!isValid}
              className="form-control-sm"
              autoFocus
            />
            <Form.Control.Feedback type="invalid">{errors.channelName}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" size="sm" type="submit" disabled={isSubmitting}>
              {t('interface.buttons.send')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddChannaleForm;
