import { Children } from 'react';
import Modal from 'react-bootstrap/Modal';
import PrimaryButton from '../../../uikit/buttons/button';
import React from 'react';
import Form  from '../../Form/Form'

const RegistrationModal = ({children, isDisabled}) => {
  return (
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
}

export default RegistrationModal;