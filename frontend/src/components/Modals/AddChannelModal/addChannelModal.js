import { Children } from 'react';
import Modal from 'react-bootstrap/Modal';
import PrimaryButton from '../../../uikit/buttons/button';
import React, { useState } from 'react';
import AddChannaleForm from '../../Form/addChannelForm';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { setAddChannelModal } from '../../../redux/reducers/app/modalsSlice';
import { useDispatch } from 'react-redux';

const AddChannelModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modals.addChannelModal);
  
  return (
    <Modal
      show={modalState}
      size="lg"
      centered
      onHide={() => dispatch(setAddChannelModal({state: false}))} // Закрывает модальное окно при нажатии на кнопку "закрыть" (крестик)
    >
      <Modal.Header closeButton>
        <Modal.Title>Введите название канала</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddChannaleForm />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(setAddChannelModal({state: false}))}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddChannelModal;