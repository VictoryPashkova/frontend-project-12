import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';
import NavbarSideBar from '../Nav/NavSideBar.js';
import ChannelWindow from '../ChannelWindow.js';
import NavbarHeader from '../Nav/Nav.js';
import { useAuth } from '../../context/AuthContext.js';
import { useGetChannelsQuery } from '../../redux/reducers/channelsApiSlice.js';
import { useGetMassagesQuery } from '../../redux/reducers/massagesApiSlice.js';
import { setChannels } from '../../redux/reducers/channelsSlice.js';
import { setMessages } from '../../redux/reducers/messagesSlice.js';
import AppSpinner from '../../uikit/spinner/Spinner.js';
import routes from '../../routes.js';

const ChatPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clearAuthData } = useAuth();
  const authNetworkErrCode = 401;

  const handleExit = useCallback(() => {
    localStorage.clear();
    navigate(routes.login(), { replace: false });
    clearAuthData();
  }, [navigate, clearAuthData]);

  const {
    data: massages,
    isLoading: isLoadingMessages,
  } = useGetMassagesQuery();

  const {
    data: channels,
    isLoading: isLoadingChannels,
    isError: isErrorChannels,
    error: errorChannels,
  } = useGetChannelsQuery();

  useEffect(() => {
    if (channels) {
      dispatch(setChannels(channels));
    }
  }, [channels, dispatch]);

  useEffect(() => {
    if (massages) {
      dispatch(setMessages(massages));
    }
  }, [massages, dispatch]);

  useEffect(() => {
    if (isErrorChannels) {
      const errorChannelsStatus = errorChannels?.status;
      if (errorChannelsStatus === authNetworkErrCode) {
        handleExit();
      }
    }
  }, [
    isErrorChannels, errorChannels, handleExit, t,
  ]);

  if (isLoadingMessages || isLoadingChannels) {
    return (
      <>
        <NavbarHeader>
          <Button variant="primary" size="sm" type="button" onClick={handleExit}>
            {t('interface.buttons.logout')}
          </Button>
        </NavbarHeader>
        <div className="container h-100 my-4 overflow-scroll rounded shadow">
          <div className="row h-100 bg-white flex-md-row p-3">
            <AppSpinner />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="d-flex flex-column bg-light h-100">
      <NavbarHeader>
        <Button variant="primary" size="sm" type="button" onClick={handleExit}>
          {t('interface.buttons.logout')}
        </Button>
      </NavbarHeader>
      <div className="container my-4 overflow-hidden rounded shadow bg-light flex-nowrap" style={{ height: 'calc(100vh - 100px)' }}>
        <ToastContainer />
        <Row className="row h-100 bg-light flex-md-row flex-nowrap">
          <Col id="sidebar-wrapper" className="col-4 col-md-3 col-lg-2 px-0 flex-column d-flex h-100">
            <NavbarSideBar />
          </Col>
          <Col id="page-content-wrapper" className="col p-0 h-100 bg-white overflow-auto">
            <ChannelWindow />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ChatPage;
