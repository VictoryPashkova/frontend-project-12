import React, { useEffect, useState, useRef } from 'react';
import {
  Container, Row, Col, Form, InputGroup, Button, Spinner,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import leo from 'leo-profanity';
import socket from '../../socket';
import { useGetMassagesQuery, useAddMessageMutation, useRemoveMessageMutation } from '../../redux/reducers/app/massagesSlice';
import MassagesCard from '../MassageCard/MassageCard';
import cleanBadWords from '../../utils/cleanBadWords';

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
  const [newMessage, setNewMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const userName = useSelector((state) => state.user.user);
  const currentChannelId = useSelector((state) => state.chat.currentChannelId);
  const currentChannelName = useSelector((state) => state.chat.currentChannelName);
  const currentChannelMessages = messageList
    .filter((message) => message.channelId === currentChannelId);
  const messagesEndRef = useRef(null);

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
    });

    socket.on('connect_error', () => {
    });

    socket.on('reconnect_attempt', () => {
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

  const sendMessage = async () => {
    const cleanMessage = cleanBadWords(newMessage);
    if (cleanMessage.trim()) {
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
        setNewMessage('');
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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentChannelMessages]);

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
      <Row>
        <Col className="bg-white p-4 overflow-scroll" style={{ minHeight: '60vh' }}>
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
              <Spinner animation="border" role="status" />
            </div>
          ) : (
            <>
              {currentChannelMessages.map((message) => (
                <Row key={message.id}>
                  <MassagesCard
                    key={message.id}
                    author={message.username}
                    text={leo.clean(message.body)}
                    onDelete={() => handleDeleteMessage(message.id)}
                  />
                </Row>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </Col>
      </Row>
      <Row className="mt-auto">
        <Col>
          <Form className="py-1">
            <InputGroup hasValidation>
              <Form.Control
                placeholder="Введите сообщение..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button variant="primary" onClick={sendMessage} disabled={isMessageUser || isRemovingMessage || isError}>{t('interface.buttons.send')}</Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChannelWindow;
