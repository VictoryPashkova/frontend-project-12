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
import { useAddChannelMutation } from '../../../redux/reducers/app/channelsSlice';
import { useTranslation } from 'react-i18next';

const AddChannelModal = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modals.addChannelModal);
  
  return (
    <Modal
      show={modalState}
      size="lg"
      centered
      onHide={() => dispatch(setAddChannelModal({state: false}))}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('interface.enterChannelName')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddChannaleForm />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(setAddChannelModal({state: false}))}>
          {t('interface.buttons.close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddChannelModal;