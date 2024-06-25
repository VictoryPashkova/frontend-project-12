import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { resetModalState } from '../../redux/reducers/modalsSlice';
import AddChannaleForm from '../Forms/AddChannelForm';

const AddChannelModal = ({ handleScroll }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isMatchModalType = useSelector((state) => state.modals.type) === 'addChannel';
  const isModalVisible = useSelector((state) => state.modals.isVisible);
  const modalState = isMatchModalType && isModalVisible;

  return (
    <Modal
      show={modalState}
      size="md"
      centered
      onHide={() => dispatch(resetModalState())}
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
