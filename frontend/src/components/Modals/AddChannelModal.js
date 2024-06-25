import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { setAddChannelModal } from '../../redux/reducers/modalsSlice';
import AddChannaleForm from '../Forms/AddChannelForm';

const AddChannelModal = ({ handleScroll }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const modalState = useSelector((state) => state.modals.addChannelModal);

  return (
    <Modal
      show={modalState}
      size="md"
      centered
      onHide={() => dispatch(setAddChannelModal({ state: false }))}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('interface.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddChannaleForm handleScroll={handleScroll} />
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
