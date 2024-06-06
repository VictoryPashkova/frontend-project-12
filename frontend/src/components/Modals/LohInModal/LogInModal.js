import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LogInForm from '../../Forms/LogInForm';
import PrimaryButton from '../../../uikit/buttons/button';

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
          <PrimaryButton text="Регистрация" onClick={() => navigate('/signup', { replace: false })}>
            <p style={{ display: 'inline-block' }}>{t('interface.noAccount')}</p>
          </PrimaryButton>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default LogInModal;
