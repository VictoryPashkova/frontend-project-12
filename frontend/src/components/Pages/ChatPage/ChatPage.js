import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';
import NavbarSideBar from '../../Nav/NavSideBar.js';
import AddChannelModal from '../../Modals/AddChannelModal/addChannelModal.js';
import ChannelWindow from '../../ChannelWindow/ChannelWindow.js';
import RemoveChannelModal from '../../Modals/RemoveChannelModal/RemoveChannelModal.js';
import EditChannelModal from '../../Modals/EditChannelModal/EditChannelModal.js';
import { setCredentials } from '../../../redux/reducers/user/registrationSlice.js';
import NavbarHeader from '../../Nav/Nav.js';
import { useAuth } from '../../../context/AuthContext.js';

const ChatPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clearAuthData } = useAuth();

  const handleExit = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: false });
    clearAuthData();
    dispatch(setCredentials({ username: '', token: null }));
  };

  return (
    <>
      <NavbarHeader>
        <Button variant="primary" size="sm" type="button" onClick={handleExit}>
          {t('interface.buttons.logout')}
        </Button>
      </NavbarHeader>
      <div className="container h-100 my-4 overflow-scroll rounded shadow">
        <div className="row h-100 bg-white flex-md-row p-3">
          <AddChannelModal />
          <RemoveChannelModal />
          <EditChannelModal />
          <Row>
            <Col xs={3} id="sidebar-wrapper" сlassName="bg-light border-end col-md">
              <NavbarSideBar />
            </Col>
            <Col xs={9} id="page-content-wrapper" сlassName="bg-light border-end col-md">
              <ChannelWindow />
            </Col>
          </Row>

        </div>
      </div>
    </>
  );
};

export default ChatPage;
