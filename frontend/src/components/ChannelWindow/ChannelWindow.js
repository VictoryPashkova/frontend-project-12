import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Spinner } from 'react-bootstrap';
import MassagesCard from '../MassageCard/MassageCard';
import { useGetMassagesQuery, useAddMessageMutation, useRemoveMessageMutation } from '../../redux/reducers/app/massagesSlice';
import socket from '../../socket';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import leo from 'leo-profanity';


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
  const [socketError, setSocketError] = useState('');
  const userName = useSelector((state) => state.user.user);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const currentChannelId = useSelector((state) => state.chat.currentChannelId);
  const currentChannelName = useSelector((state) => state.chat.currentChannelName);
  const currentChannelMessages = messageList.filter((message) => message.channelId === currentChannelId);
  const messagesEndRef = useRef(null);

  useEffect(() => {

    if (massages) {
      setMessageList(massages);
    }

    socket.on('newMessage', (message) => {
      setMessageList((prevMessages) => [...prevMessages, message]);
      toast.success(t('interface.messageSent'));
    });

    socket.on('renameMessage', (updatedMessage) => {
      setMessageList((prevMessages) =>
        prevMessages.map((message) =>
          message.id === updatedMessage.id ? updatedMessage : message
        )
      );
      toast.info(t('interface.messageEdited'));
    });

    socket.on('removeMessage', ({ id }) => {
      setMessageList((prevMessages) =>
        prevMessages.filter((message) => message.id !== id)
      );
      toast.warning(t('interface.messageRemoved'));
    });

    socket.on('connect', () => {
      setConnectionStatus('connected');
      toast.success(t('interface.connected'));
    });

    socket.on('disconnect', (reason) => {
      setConnectionStatus('disconnected');
      toast.error(t('interface.unableToConnect'));
    });

    socket.on('connect_error', (error) => {
      setConnectionStatus('error');
      toast.error(t('interface.connectionError'));
    });

    socket.on('reconnect_attempt', () => {
      setConnectionStatus('reconnecting');
      toast.info(t('interface.reconnecting'));
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
  }, [massages]);

  const sendMessage = async () => {
    leo.loadDictionary('ru');
    const cleanRuMessage = leo.clean(newMessage);
    leo.loadDictionary('en');
    const cleanMessage = leo.clean(cleanRuMessage);
    if (cleanMessage.trim()) {
      try {
        const response = await addMessageHandler({
          body: newMessage,
          username: userName,
          channelId: currentChannelId,
        });
        const data = response.data;
        socket.emit('sendMessage', data, (acknowledgment) => {
          if (acknowledgment.error) {
            setSocketError(t('interface.messageSendError'));
            toast.error(t('interface.messageSendError'));
          } else {
            toast.success(t('interface.messageSent'));
          }
        });
        setNewMessage('');
        setSocketError('');
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
          setSocketError(t('interface.messageDeleteError'));
          toast.error(t('interface.messageDeleteError'));
        } else {
          toast.success(t('interface.messageRemoved'));
        }
      });
      setSocketError('');
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
    <Container className='h-100 d-flex flex-column justify-content-between p-0'>
      <ToastContainer />
      <Row className="justify-content-between h-100">
        <Col className="bg-light p-4">
          <h5># {currentChannelName}</h5>
          <span className="text-muted">{numberTextMessage()}</span>
        </Col>
      </Row>
      {connectionStatus === 'disconnected' && (
        <Row>
          <Col>
            <Alert variant="danger">{t('interface.connectionLost')}</Alert>
          </Col>
        </Row>
      )}
      {connectionStatus === 'error' && (
        <Row>
          <Col>
            <Alert variant="danger">{t('interface.unableToConnect')}</Alert>
          </Col>
        </Row>
      )}
      {connectionStatus === 'reconnecting' && (
        <Row>
          <Col>
            <Alert variant="warning">{t('interface.reconnecting')}</Alert>
          </Col>
        </Row>
      )}
      <Row>
        <Col className="bg-white p-4 overflow-scroll" style={{ minHeight: '60vh' }}>
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
              <Spinner animation="border" role="status">
                <span className="sr-only">{t('interface.loading')}</span>
              </Spinner>
            </div>
          ) : (
            socketError || removeMessageError || addMessageError ? <div>{socketError || removeMessageError || addMessageError || isError}</div> : (
              <>
                {currentChannelMessages.map((message) => (
                  <Row key={message.id}>
                    <MassagesCard key={message.id} author={message.username} text={leo.clean(message.body)} onDelete={() => handleDeleteMessage(message.id)} />
                  </Row>
                ))}
                <div ref={messagesEndRef} />
              </>
            )
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