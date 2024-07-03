import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Col, Form, InputGroup, Row,
} from 'react-bootstrap';
import { useBadWordsContext } from '../../context/BadWordsContext';

const AddMessageForm = ({
  sendMessage,
  disabled,
  btnName,
  inputRef,
}) => {
  const { t } = useTranslation();
  const [newMessage, setNewMessage] = useState('');
  const { cleanBadWords } = useBadWordsContext();

  const sendMessageHandler = () => {
    sendMessage(cleanBadWords(newMessage));
    setNewMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessageHandler();
    }
  };

  return (
    <Row className="mt-auto">
      <Col>
        <Form className="py-1">
          <InputGroup hasValidation controlId="formBasicNewMessage">
            <Form.Label className="form-label visually-hidden">{t('interface.newMessage')}</Form.Label>
            <Form.Control
              type="text"
              name="newMessage"
              placeholder={t('interface.newMessagePlaceholder')}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label={t('interface.newMessage')}
              ref={inputRef}
            />
            <Button variant="primary" type="submit" name="sendNewMessage" onClick={sendMessageHandler} disabled={disabled}>{btnName}</Button>
          </InputGroup>
        </Form>
      </Col>
    </Row>
  );
};

export default AddMessageForm;
