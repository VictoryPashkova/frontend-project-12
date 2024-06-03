import Modal from 'react-bootstrap/Modal';
import PrimaryButton from '../../../uikit/buttons/button';
import React from 'react';
import LogInForm from '../../Form/LogInForm';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LogInModal = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
            <p style={{ display: 'inline-block' }}>{t('interface.noAccount')}</p>
          </PrimaryButton>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default LogInModal;