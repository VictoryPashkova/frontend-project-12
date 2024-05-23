import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Spinner } from 'react-bootstrap';
import MassagesCard from '../MassageCard/MassageCard';
import { useGetMassagesQuery, useAddMessageMutation, useRemoveMessageMutation } from '../../redux/reducers/app/massagesSlice';
import socket from '../../socket';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

const ChannelWindow = () => {
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
    });

    socket.on('renameMessage', (updatedMessage) => {
      setMessageList((prevMessages) =>
        prevMessages.map((message) =>
          message.id === updatedMessage.id ? updatedMessage : message
        )
      );
    });

    socket.on('removeMessage', ({ id }) => {
      setMessageList((prevMessages) =>
        prevMessages.filter((message) => message.id !== id)
      );
    });

    socket.on('connect', () => {
      setConnectionStatus('connected');
    });

    socket.on('disconnect', (reason) => {
      setConnectionStatus('disconnected');
    });

    socket.on('connect_error', (error) => {
      setConnectionStatus('error');
    });

    socket.on('reconnect_attempt', () => {
      setConnectionStatus('reconnecting');
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
    if (newMessage.trim()) {
      try {
        const response = await addMessageHandler({
          body: newMessage,
          username: userName,
          channelId: currentChannelId,
        });
        const data = response.data;
        socket.emit('sendMessage', data, (acknowledgment) => {
          if (acknowledgment.error) {
            setSocketError("Ошибка отправки сообщения");
          }
        });
        setNewMessage('');
        setSocketError('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await removeUMessageHandler(id);
      socket.emit('removeMessage', { id }, (acknowledgment) => {
        if (acknowledgment.error) {
          setSocketError("Ошибка удаления сообщения");
        }
      });
      setSocketError('');
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentChannelMessages]);

  return (
    <Container className='h-100 d-flex flex-column justify-content-between p-0'>
      <Row className="justify-content-between h-100">
        <Col className="bg-light p-4">
          <h5># {currentChannelName}</h5>
          <span className="text-muted">{currentChannelMessages.length || 0} сообщений</span>
        </Col>
      </Row>
      {connectionStatus === 'disconnected' && (
        <Row>
          <Col>
            <Alert variant="danger">Connection lost. Trying to reconnect...</Alert>
          </Col>
        </Row>
      )}
      {connectionStatus === 'error' && (
        <Row>
          <Col>
            <Alert variant="danger">Unable to connect to the server.</Alert>
          </Col>
        </Row>
      )}
      {connectionStatus === 'reconnecting' && (
        <Row>
          <Col>
            <Alert variant="warning">Reconnecting to the server...</Alert>
          </Col>
        </Row>
      )}
      <Row>
        <Col className="bg-white p-4 overflow-scroll" style={{ minHeight: '60vh' }}>
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            socketError || removeMessageError || addMessageError ? <div>{socketError || removeMessageError || addMessageError || isError}</div> : (
              <>
                {currentChannelMessages.map((message) => (
                  <Row key={message.id}>
                    <MassagesCard key={message.id} author={message.username} text={message.body} onDelete={() => handleDeleteMessage(message.id)} />
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
              <Button variant="primary" onClick={sendMessage} disabled={isMessageUser || isRemovingMessage || isError}>Отправить</Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChannelWindow;