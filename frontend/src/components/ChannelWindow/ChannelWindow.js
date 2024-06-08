import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socket from '../../socket';
import { useGetMassagesQuery, useAddMessageMutation, useRemoveMessageMutation } from '../../redux/reducers/app/massagesSlice';
import AddMessageForm from '../Forms/AddNewMessageForm';
import MessageList from '../MessageList/MessageList';

const ChannelWindow = () => {
  const { t } = useTranslation();
  const { data: massages, isLoading, isError } = useGetMassagesQuery();

  const [
    addMessage,
    { error: addMessageError, isLoading: isMessageUser },
  ] = useAddMessageMutation();

  const [
    removeMessage,
    { error: removeMessageError, isLoading: isRemovingMessage },
  ] = useRemoveMessageMutation();

  const removeUMessageHandler = (id) => removeMessage(id);
  const addMessageHandler = (message) => addMessage(message);
  const [messageList, setMessageList] = useState([]);
  const userName = useSelector((state) => state.user.user);
  const currentChannelId = useSelector((state) => state.chat.currentChannelId);
  const currentChannelName = useSelector((state) => state.chat.currentChannelName);
  const currentChannelMessages = messageList
    .filter((message) => message.channelId === currentChannelId);

  useEffect(() => {
    if (removeMessageError) {
      toast.error(t('interface.messageDeleteError'));
    }

    if (addMessageError) {
      toast.error(t('interface.messageSendError'));
    }

    if (massages) {
      setMessageList(massages);
    }

    socket.on('newMessage', (message) => {
      setMessageList((prevMessages) => [...prevMessages, message]);
    });

    socket.on('renameMessage', (updatedMessage) => {
      setMessageList((prevMessages) => prevMessages
        .map((message) => (message.id === updatedMessage.id ? updatedMessage : message)));
    });

    socket.on('removeMessage', ({ id }) => {
      setMessageList((prevMessages) => prevMessages.filter((message) => message.id !== id));
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
      socket.off('renameMessage');
      socket.off('removeMessage');
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
      socket.off('reconnect_attempt');
    };
  }, [massages, removeMessageError, addMessageError, t]);

  const sendMessage = async (newMessage) => {
    if (newMessage.trim()) {
      try {
        const response = await addMessageHandler({
          body: newMessage,
          username: userName,
          channelId: currentChannelId,
        });
        const { data } = response;
        socket.emit('sendMessage', data, (acknowledgment) => {
          if (acknowledgment.error) {
            toast.error(t('interface.messageSendError'));
          } else {
            toast.success(t('interface.messageSent'));
          }
        });
      } catch (error) {
        console.error('Error sending message:', error);
        toast.error(t('interface.messageSendError'));
      }
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await removeUMessageHandler(id);
      socket.emit('removeMessage', { id }, (acknowledgment) => {
        if (acknowledgment.error) {
          toast.error(t('interface.messageDeleteError'));
        } else {
          toast.success(t('interface.messageRemoved'));
        }
      });
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error(t('interface.messageDeleteError'));
    }
  };

  const numberTextMessage = () => {
    const numberMessage = currentChannelMessages.length;

    if (numberMessage === 1) {
      return t('interface.messages.one', { count: numberMessage });
    }

    if (numberMessage > 1 && numberMessage < 5) {
      return t('interface.messages.few', { count: numberMessage });
    }

    return t('interface.messages.many', { count: numberMessage });
  };

  return (
    <Container className="h-100 d-flex flex-column justify-content-between p-0">
      <ToastContainer />
      <Row className="justify-content-between h-100">
        <Col className="bg-light p-4">
          <h5>
            #
            {currentChannelName}
          </h5>
          <span className="text-muted">{numberTextMessage()}</span>
        </Col>
      </Row>
      <MessageList
        isLoading={isLoading}
        messages={currentChannelMessages}
        handleDeleteMessage={handleDeleteMessage}
      />
      <AddMessageForm
        disabled={isMessageUser || isRemovingMessage || isError}
        btnName={t('interface.buttons.send')}
        sendMessage={sendMessage}
      />
    </Container>
  );
};

export default ChannelWindow;
