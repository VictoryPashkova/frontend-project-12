import React from 'react';
import { Spinner } from 'react-bootstrap';

const AppSpinner = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
    <Spinner animation="border" role="status" />
  </div>
);

export default AppSpinner;
