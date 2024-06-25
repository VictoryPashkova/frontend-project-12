import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Alert, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../redux/reducers/channelsApiSlice';
import { setCurrentChannel } from '../../redux/reducers/channelsSlice';
import { resetModalState } from '../../redux/reducers/modalsSlice';
import { useGetMassagesQuery, useRemoveMessageMutation } from '../../redux/reducers/massagesApiSlice';
import 'react-toastify/dist/ReactToastify.css';

const RemoveChannelModal = ({ handleScroll }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMatchModalType = useSelector((state) => state.modals.type) === 'removeChannel';
  const isModalVisible = useSelector((state) => state.modals.isVisible);
  const modalState = isMatchModalType && isModalVisible;
  const currentChannelId = useSelector((state) => state.modals.extraData.onEditChannelId);
  const activeChannelId = useSelector((state) => state.channels.currentChannelId);
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
      dispatch(resetModalState());
      if (Number(currentChannelId) === Number(activeChannelId)) {
        dispatch(setCurrentChannel({ id: 1, name: 'general' }));
      }
      toast.success(t('interface.channelDeleted'));
      handleScroll();
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
      size="md"
      centered
      onHide={() => dispatch(resetModalState())}
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
        <Button variant="secondary" onClick={() => dispatch(resetModalState())} disabled={isRemovingChannel}>
          {t('interface.buttons.cancel')}
        </Button>
        <Button variant="danger" onClick={() => removeChannelHandler(Number(currentChannelId))} disabled={isRemovingChannel}>
          {t('interface.buttons.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
