import { Children } from 'react';
import Modal from 'react-bootstrap/Modal';
import PrimaryButton from '../../../uikit/buttons/button';
import React from 'react';
import LogInForm from '../../Form/LogInForm';
import { useNavigate } from 'react-router-dom';

const LogInModal = () => {
  const navigate = useNavigate();
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
          <PrimaryButton text={"Регистрация"} onClick={() => navigate('/registration', { replace: false })} >
            <p style={{ display: 'inline-block' }}>Нет аккаунта?</p>
          </PrimaryButton>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default LogInModal;