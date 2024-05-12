import React from "react";
import Card from 'react-bootstrap/Card';

const MassagesCard = ({ author, text}) => {
  return (
        <Card>
          <Card.Subtitle>{author}</Card.Subtitle>
          <Card.Body>{text}</Card.Body>
        </Card>
      );
}

export default MassagesCard;
