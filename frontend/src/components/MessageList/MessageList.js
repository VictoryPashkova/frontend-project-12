import { Row, Col } from 'react-bootstrap';
import React, { useRef, useEffect } from 'react';
import cleanBadWords from '../../utils/cleanBadWords';
import AppSpinner from '../../uikit/spinner/Spinner';
import MassagesCard from '../MassageCard/MassageCard';

const MessageList = ({ isLoading, messages, handleDeleteMessage }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (isLoading) {
    return (
      <Row>
        <Col className="bg-white p-4 overflow-scroll" style={{ minHeight: '60vh' }}>
          <AppSpinner />
        </Col>
      </Row>
    );
  }
  return (
    <Row>
      <Col className="bg-white p-4 overflow-scroll" style={{ minHeight: '60vh' }}>
        <>
          {messages.map((message) => (
            <Row key={message.id}>
              <MassagesCard
                key={message.id}
                author={message.username}
                text={cleanBadWords(message.body)}
                onDelete={() => handleDeleteMessage(message.id)}
              />
            </Row>
          ))}
          <div ref={messagesEndRef} />
        </>
      </Col>
    </Row>
  );
};

export default MessageList;
