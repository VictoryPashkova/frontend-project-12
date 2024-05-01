import { Children } from 'react';
import Modal from 'react-bootstrap/Modal';
import PrimaryButton from '../../../uikit/buttons/button';
import React from 'react';
import LogInForm from '../../Form/LogInForm';

const LogInModal = ({children}) => {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Body>
          <LogInForm />
        </Modal.Body>
        <Modal.Footer>
          <PrimaryButton text={"Регистрация"} />
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default LogInModal;