import React, { useEffect, useRef } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import AddMessageForm from './Forms/AddNewMessageForm';
import MessageList from './MessageList';
import { useSendMessageMutation } from '../redux/reducers/massagesApiSlice';
import { useSocket } from '../context/socketContext';
import { useAuth } from '../context/AuthContext';

const ChannelWindow = () => {
  const socket = useSocket();
  const { t } = useTranslation();
  const messages = useSelector((state) => state.messages.messages);
  const inputRef = useRef(null);
  const { userName } = useAuth();

  const [
    sendMessage,
    { error: addMessageError, isLoading: isMessageUser },
  ] = useSendMessageMutation();

  const sendMessageHandler = (message) => sendMessage(message);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const { name: channelName } = useSelector((state) => state.channels.channels
    .find((channel) => Number(channel.id) === Number(currentChannelId))) || {};

  const currentChannelMessages = messages
    .filter((message) => Number(message.channelId) === Number(currentChannelId));

  useEffect(() => {
    if (addMessageError) {
      toast.error(t('interface.messageSendError'));
    }
  }, [addMessageError, t]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentChannelId]);

  const handleSendMessage = async (newMessage) => {
    if (newMessage.trim()) {
      try {
        const response = await sendMessageHandler({
          body: newMessage,
          username: userName,
          channelId: currentChannelId,
        });
        const { data } = response;
        socket.emit('newMessage', data, (acknowledgment) => {
          if (acknowledgment.error) {
            toast.error(t('interface.messageSendError'));
          } else {
            toast.success(t('interface.messageSent'));
          }
        });
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
    <Container className="d-flex flex-column h-100">
      <Row className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {t('interface.channelsSign')}
            {channelName}
          </b>
        </p>
        <span className="text-muted">{numberTextMessage()}</span>
      </Row>
      <Row id="messages-box" className="chat-messages overflow-auto" style={{ maxHeight: '60vh', overflowWrap: 'break-word' }}>
        <MessageList
          messages={currentChannelMessages}
        />
      </Row>
      <Row className="p-4">
        <AddMessageForm
          disabled={isMessageUser}
          btnName={t('interface.buttons.send')}
          sendMessage={handleSendMessage}
          inputRef={inputRef}
        />
      </Row>
    </Container>
  );
};

export default ChannelWindow;
