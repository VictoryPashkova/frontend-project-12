import { Children } from 'react';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { Button, Alert, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useRemoveChannelMutation } from '../../redux/reducers/app/channelsSlice';
import { setRemoveChannelModal } from '../../redux/reducers/app/modalsSlice';
import { setCurrentChannel } from '../../redux/reducers/app/chatSlice';
import { useGetMassagesQuery } from '../../redux/reducers/app/massagesSlice';
import { useRemoveMessageMutation } from '../../redux/reducers/app/massagesSlice';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modals.removeChannelModal);
  const currentChannelId = useSelector((state) => state.chat.onEditChannelId);
  console.log(currentChannelId);
  const [
    removeChannel,
    { error: removeChannelError, isLoading: isRemovingChannel },
  ] = useRemoveChannelMutation();

  const { data: massages, isLoading, isError } = useGetMassagesQuery();

  const [
    removeMessage,
    { error: removeMessageError, isLoading: isRemovingMessage },
  ] = useRemoveMessageMutation();

  const removeChannelMessages = async (channelId) => {
    const currentChannelMessages = massages.filter(
      (message) => message.channelId === channelId
    );
  
    for (const message of currentChannelMessages) {
      try {
        await removeMessage(message.id).unwrap();
      } catch (error) {
        console.error('Failed to remove message:', error);
      }
    }
  };

  const removeChannelHandler = async (id) => {
    try {
      await removeChannel(id).unwrap();
      await removeChannelMessages(id);
      dispatch(setRemoveChannelModal({ state: false }));
      dispatch(setCurrentChannel({ id: 1, name: 'general' }));
    } catch (error) {
      console.error('Failed to remove channel:', error);
    }
  };

  return (
    <Modal
      show={modalState}
      size="lg"
      centered
      onHide={() => dispatch(setRemoveChannelModal({state: false}))}
    >
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {isRemovingChannel ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Удаление...</span>
            </Spinner>
          </div>
        ) : (
          <>
            {removeChannelError && (
              <Alert variant="danger">
                Ошибка удаления канала
              </Alert>
            )}
            <p>Уверены?</p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={() => dispatch(setRemoveChannelModal({state: false}))} disabled={isRemovingChannel}>
          Отменить
        </Button>
        <Button variant="danger" onClick={() => removeChannelHandler(Number(currentChannelId))} disabled={isRemovingChannel}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;