import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socket from '../../socket';
import AddMessageForm from '../Forms/AddNewMessageForm';
import MessageList from '../MessageList/MessageList';
import { useSendMessageMutation } from '../../redux/reducers/app/massagesApiSlice';
import { addMessage } from '../../redux/reducers/app/messagesSlice';

const ChannelWindow = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const messages = useSelector((state) => state.messages.messages);

  const [
    sendMessage,
    { error: addMessageError, isLoading: isMessageUser },
  ] = useSendMessageMutation();

  const sendMessageHandler = (message) => sendMessage(message);
  const [messageList, setMessageList] = useState([]);
  const userName = useSelector((state) => state.user.userName);
  const currentChannelId = useSelector((state) => state.chat.currentChannelId);
  const currentChannelName = useSelector((state) => state.chat.currentChannelName);
  const currentChannelMessages = messageList
    .filter((message) => message.channelId === currentChannelId);

  useEffect(() => {
    if (addMessageError) {
      toast.error(t('interface.messageSendError'));
    }

    if (messages) {
      setMessageList(messages);
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
  }, [messages, addMessageError, t, navigate]);

  const handleSendMessage = async (newMessage) => {
    if (newMessage.trim()) {
      try {
        const response = await sendMessageHandler({
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
        dispatch(addMessage(data));
      } catch (err) {
        console.error('Error sending message:', err);
        toast.error(t('interface.messageSendError'));
      }
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
        messages={currentChannelMessages}
      />
      <AddMessageForm
        disabled={isMessageUser}
        btnName={t('interface.buttons.send')}
        sendMessage={handleSendMessage}
      />
    </Container>
  );
};

export default ChannelWindow;
