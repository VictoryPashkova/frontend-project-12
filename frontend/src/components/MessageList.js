import { Row, Col } from 'react-bootstrap';
import React, { useRef, useEffect } from 'react';
import { useBadWordsContext } from '../context/BadWordsContext';
import AppSpinner from '../uikit/spinner/Spinner';

const MessageList = ({ isLoading, messages }) => {
  const { cleanBadWords } = useBadWordsContext();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (isLoading) {
    return (
      <Row>
        <Col className="bg-white p-4 overflow-auto" style={{ minHeight: '60vh' }}>
          <AppSpinner />
        </Col>
      </Row>
    );
  }
  return (
    <Row className="h-100 py-3 w-100" style={{ maxWidth: '75vw', overflowX: 'hidden' }}>
      <Col className="bg-white p-4" style={{ minHeight: '60vh', overflowWrap: 'break-word' }}>
        <>
          {messages.map((message) => (
            <Row key={message.id}>
              <p style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                <b>
                  {`${message.username}: `}
                </b>
                {cleanBadWords(message.body)}
              </p>
            </Row>
          ))}
          <div ref={messagesEndRef} />
        </>
      </Col>
    </Row>
  );
};

export default MessageList;
