import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import { useAddChannelMutation, useGetChannelsQuery } from '../../redux/reducers/app/channelsSlice';
import { setAddChannelModal } from '../../redux/reducers/app/modalsSlice';
import { setCurrentChannel } from '../../redux/reducers/app/chatSlice';
import 'react-toastify/dist/ReactToastify.css';
import cleanBadWords from '../../utils/cleanBadWords';

const AddChannaleForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [
    addChannel,
    { error: addChannelError, isLoading: isAddingChannel },
  ] = useAddChannelMutation();
  const {
    data: channels, isLoading: isChannelsLoading, isError: isChannelsError, refetch,
  } = useGetChannelsQuery();

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
      }
    } catch (error) {
      console.error('Failed to add new channel:', error);
      toast.error(t('interface.addingChannelError'));
    }
  };

  useEffect(() => {
    if (isAddingChannel) {
      toast.info(t('interface.addingChannel'));
    }

    if (isChannelsLoading) {
      toast.info(t('interface.loading'));
    }
    if (isChannelsError) {
      toast.error(t('interface.getChannelsError'));
    }
    if (addChannelError) {
      toast.error(t('interface.addingChannelError'));
    }
  }, [isAddingChannel, isChannelsLoading, isChannelsError, addChannelError, t]);

  return (
    <>
      <ToastContainer />
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
              <Button variant="primary" size="sm" type="submit" disabled={isSubmitting}>
                {t('interface.buttons.add')}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddChannaleForm;