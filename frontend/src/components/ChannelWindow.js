import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddMessageForm from './Forms/AddNewMessageForm';
import MessageList from './MessageList';
import { useSendMessageMutation } from '../redux/reducers/massagesApiSlice';
import { useSocket } from '../context/socketContext';

const ChannelWindow = () => {
  const socket = useSocket();
  const { t } = useTranslation();
  const messages = useSelector((state) => state.messages.messages);

  const [
    sendMessage,
    { error: addMessageError, isLoading: isMessageUser },
  ] = useSendMessageMutation();

  const sendMessageHandler = (message) => sendMessage(message);
  const userName = localStorage.getItem('username');
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannelName = useSelector((state) => state.channels.currentChannelName);
  const currentChannelMessages = messages
    .filter((message) => message.channelId === currentChannelId);

  useEffect(() => {
    if (addMessageError) {
      toast.error(t('interface.messageSendError'));
    }
  }, [addMessageError, t]);

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
    <Container className="h-100 d-flex flex-column justify-content-between p-0" style={{ maxHeight: '80vh' }}>
      <Row className="justify-content-between">
        <Col className="bg-light p-4">
          <h5>
            #
            {currentChannelName}
          </h5>
          <span className="text-muted">{numberTextMessage()}</span>
        </Col>
      </Row>
      <Row className="flex-grow-1 overflow-auto">
        <MessageList
          messages={currentChannelMessages}
        />
      </Row>
      <AddMessageForm
        disabled={isMessageUser}
        btnName={t('interface.buttons.send')}
        sendMessage={handleSendMessage}
      />
    </Container>
  );
};

export default ChannelWindow;
