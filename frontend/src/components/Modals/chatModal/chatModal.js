import { Children } from 'react';
import Modal from 'react-bootstrap/Modal';
import PrimaryButton from '../../../uikit/buttons/button';
import React from 'react';
import LogInForm from '../../Form/LogInForm';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../SideBar/sideBar';
import ChannelWindow from '../../ChannelWindow/ChannelWindow';
import { Container, Row, Column } from 'react-bootstrap';


const ChatModal = () => {
  const navigate = useNavigate();
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Body>
          <Container>
          <Row>
          <SideBar />
          <ChannelWindow />
          </Row>
          </Container>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default ChatModal;