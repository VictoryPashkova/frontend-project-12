import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const MassagesCard = ({ author, text, onDelete, onEdit }) => {
  return (
    <Card style={{ maxWidth: '50rem', margin: '10px', border: 'none' }}>
      <Card.Header style={{ backgroundColor: '#007bff', color: 'white' }}>
        {author}
      </Card.Header>
      <Card.Body style={{ backgroundColor: '#f8f9fa' }}>
        <Card.Text>{text}</Card.Text>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outline-danger" size="sm" onClick={onDelete}>Удалить</Button>
          <Button variant="outline-secondary" size="sm">Редактировать</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default MassagesCard;
