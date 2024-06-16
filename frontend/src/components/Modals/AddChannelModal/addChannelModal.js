import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { setAddChannelModal } from '../../../redux/reducers/app/modalsSlice';
import AddChannaleForm from '../../Forms/AddChannelForm';

const AddChannelModal = ({ handleScroll }) => {
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
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddChannaleForm handleScroll={handleScroll} />
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
