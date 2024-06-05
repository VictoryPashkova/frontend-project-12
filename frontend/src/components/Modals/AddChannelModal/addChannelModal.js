import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AddChannaleForm from '../../Forms/AddChannelForm';
import { setAddChannelModal } from '../../../redux/reducers/app/modalsSlice';

const AddChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modals.addChannelModal);

  return (
    <Modal
      show={modalState}
      size="lg"
      centered
      onHide={() => dispatch(setAddChannelModal({ state: false }))}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('interface.enterChannelName')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddChannaleForm />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(setAddChannelModal({ state: false }))}>
          {t('interface.buttons.close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddChannelModal;
