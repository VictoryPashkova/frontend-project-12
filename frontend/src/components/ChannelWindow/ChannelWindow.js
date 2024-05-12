import React from 'react';
import { Navbar, Nav, Button, Container, Row, Col, ListGroup, Card, Form, InputGroup, FormControl } from 'react-bootstrap';
import MassagesCard from '../MassageCard/MassageCard';
import { useGetMassagesQuery } from '../../redux/reducers/app/massagesSlice';

const ChannelWindow = () => {
  const { data: massages, isLoading, isError } = useGetMassagesQuery();
  console.log(massages);
    
    return (
      <Container className='h-100 d-flex flex-column justify-content-between p-0'>
        <Row className="justify-content-between">
          <Col className="bg-light p-4">
            <h5># general</h5>
            <span className="text-muted">0 сообщений</span>
          </Col>
        </Row>
        <Row>
          <Col className="bg-white p-4 overflow-auto" style={{ minHeight: '60vh' }}>
            {massages && massages.map((massage) => (
              <Row key={massage.id}><MassagesCard key={massage.id} author={massage.author} text={massage.text} /></Row>
            ))}
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