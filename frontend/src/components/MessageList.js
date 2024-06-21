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
              <p>
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
