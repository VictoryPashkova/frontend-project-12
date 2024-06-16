import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Alert, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../../redux/reducers/app/channelsApiSlice';
import { setRemoveChannelModal } from '../../../redux/reducers/app/modalsSlice';
import { setCurrentChannel } from '../../../redux/reducers/app/channelsSlice';
import { useGetMassagesQuery, useRemoveMessageMutation } from '../../../redux/reducers/app/massagesApiSlice';
import 'react-toastify/dist/ReactToastify.css';

const RemoveChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modals.removeChannelModal);
  const currentChannelId = useSelector((state) => state.channels.onEditChannelId);
  const [
    removeChannel,
    { error: removeChannelError, isLoading: isRemovingChannel },
  ] = useRemoveChannelMutation();

  const { data: massages } = useGetMassagesQuery();

  const [
    removeMessage,
  ] = useRemoveMessageMutation();

  const removeChannelMessages = async (channelId) => {
    const currentChannelMessages = massages.filter(
      (message) => message.channelId === channelId,
    );

    currentChannelMessages.forEach(async (message) => {
      try {
        await removeMessage(message.id).unwrap();
      } catch (error) {
        console.error('Failed to remove message:', error);
      }
    });
  };

  const removeChannelHandler = async (id) => {
    try {
      await removeChannel(id).unwrap();
      await removeChannelMessages(id);
      dispatch(setRemoveChannelModal({ state: false }));
      dispatch(setCurrentChannel({ id: 1, name: 'general' }));
      toast.success(t('interface.channelDeleted'));
    } catch (error) {
      console.error('Failed to remove channel:', error);
      toast.error(t('interface.deleteChannelError'));
    }
  };

  useEffect(() => {
    if (removeChannelError) {
      toast.error(t('interface.deleteChannelError'));
    }
  }, [removeChannelError, t]);

  return (
    <Modal
      show={modalState}
      size="lg"
      centered
      onHide={() => dispatch(setRemoveChannelModal({ state: false }))}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('interface.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isRemovingChannel ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">{t('interface.deleting')}</span>
            </Spinner>
          </div>
        ) : (
          <>
            {removeChannelError && (
              <Alert variant="danger">
                {t('interface.deleteChannelError')}
              </Alert>
            )}
            <p>{t('interface.areYouSure')}</p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => removeChannelHandler(Number(currentChannelId))} disabled={isRemovingChannel}>
          {t('interface.buttons.delete')}
        </Button>
        <Button variant="secondary" onClick={() => dispatch(setRemoveChannelModal({ state: false }))} disabled={isRemovingChannel}>
          {t('interface.buttons.cancel')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
