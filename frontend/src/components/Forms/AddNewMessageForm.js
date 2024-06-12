import React, { useState } from 'react';
import {
  Button, Col, Form, InputGroup, Row,
} from 'react-bootstrap';
import cleanBadWords from '../../utils/cleanBadWords';

const AddMessageForm = ({ sendMessage, disabled, btnName }) => {
  const [newMessage, setNewMessage] = useState('');

  const sendMessageHandler = () => {
    sendMessage(cleanBadWords(newMessage));
    setNewMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Чтобы избежать переноса строки в поле ввода
      sendMessageHandler();
    }
  };

  return (
    <Row className="mt-auto">
      <Col>
        <Form className="py-1">
          <InputGroup hasValidation controlId="formBasicNewMessage">
            <Form.Label className="form-label visually-hidden">Новое сообщение</Form.Label>
            <Form.Control
              type="text"
              name="newMessage"
              placeholder="Введите сообщение..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button variant="primary" type="submit" name="sendNewMessage" onClick={sendMessageHandler} disabled={disabled}>{btnName}</Button>
          </InputGroup>
        </Form>
      </Col>
    </Row>
  );
};

export default AddMessageForm;
