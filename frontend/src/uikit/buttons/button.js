import Button from 'react-bootstrap/esm/Button';
import React from 'react';

const PrimaryButton = ({ text, onClick, children }) => (
  <div style={{
    textAlign: 'center', display: 'flex', alignSelf: 'center', justifyContent: 'center', alignItems: 'center',
  }}
  >
    {children}
    <Button variant="link" onClick={onClick}>{text}</Button>
  </div>
);

export default PrimaryButton;
