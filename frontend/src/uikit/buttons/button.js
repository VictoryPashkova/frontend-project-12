import Button from "react-bootstrap/esm/Button";
import React from 'react';

const PrimaryButton = ({ text }) => {
    return (
      <div style={{ textAlign: 'center', display: 'flex' , alignSelf: 'center'}}>
        <p style={{ display: 'inline-block' }}>
          Нет аккаунта?
          <Button variant="link">{text}</Button>
        </p>
      </div>
    );
  }

export default PrimaryButton;
