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
import { setCredentials, setToken } from '../../redux/reducers/authSlice.js';
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
    dispatch(setCredentials({ username: '', token: null }));
  }, [navigate, clearAuthData, dispatch]);

  const token = localStorage.getItem('token');

  const {
    data: massages,
    isLoading: isLoadingMessages,
    isError: isErrorMessages, error: errorMessages, refetch: refetchMessages,
  } = useGetMassagesQuery();

  const {
    data: channles,
    isLoading: isLoadingChannels,
    isError: isErrorChannels, error: errorChannels, refetch: refetchChannels,
  } = useGetChannelsQuery();

  useEffect(() => {
    if (token) {
      dispatch(setToken(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (channles) {
      dispatch(setChannels(channles));
    } else {
      refetchChannels();
    }
  }, [channles, dispatch, refetchChannels]);

  useEffect(() => {
    if (massages) {
      dispatch(setMessages(massages));
    } else {
      refetchMessages();
    }
  }, [massages, dispatch, refetchMessages]);

  useEffect(() => {
    if (isErrorMessages || isErrorChannels) {
      const isErrorMessagesStatus = errorMessages?.status;
      const isErrorChannelsStatus = errorChannels?.status;
      if (
        (isErrorMessagesStatus === authNetworkErrCode)
        || (isErrorChannelsStatus === authNetworkErrCode)
      ) {
        handleExit();
      }
    }
  }, [
    isErrorMessages, isErrorChannels, errorMessages, errorChannels, handleExit,
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
    <>
      <NavbarHeader>
        <Button variant="primary" size="sm" type="button" onClick={handleExit}>
          {t('interface.buttons.logout')}
        </Button>
      </NavbarHeader>
      <div className="container h-100 my-4 overflow-scroll rounded shadow">
        <ToastContainer />
        <div className="row h-100 bg-white flex-md-row p-3">
          <Row>
            <Col xs={2} id="sidebar-wrapper" className="bg-light border-end col-xs">
              <NavbarSideBar />
            </Col>
            <Col xs={8} id="page-content-wrapper" className="border-end col-md">
              <ChannelWindow />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
