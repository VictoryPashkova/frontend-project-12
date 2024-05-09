import React from 'react';
import { Navbar, Nav, Button, Container, Row, Col, ListGroup, Card, Form, InputGroup, FormControl } from 'react-bootstrap';

const ChannelWindow = () => {
    return (
      <Container fluid>
        <Row>
          <Col className="bg-light p-4">
            <h5># general</h5>
            <span className="text-muted">0 сообщений</span>
          </Col>
        </Row>
        <Row>
          <Col className="bg-white p-4 overflow-auto" style={{ maxHeight: '500px' }}>
            {/* Сюда будут добавлены сообщения */}
          </Col>
        </Row>
        <Row className="mt-auto">
          <Col>
            <Form className="py-1 border rounded-2">
              <InputGroup hasValidation>
                <FormControl placeholder="Введите сообщение..." />
                <Button variant="primary">Отправить</Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };

  export default ChannelWindow;