import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from '../../Forms/RegisterForm';

const RegistrationModal = () => (
  <div
    className="modal show disabled"
    style={{ display: 'block', position: 'initial' }}
  >
    <Modal.Dialog>
      <Modal.Body>
        <Form />
      </Modal.Body>
    </Modal.Dialog>
  </div>
);

export default RegistrationModal;
