import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';
import NavbarSideBar from '../../Nav/NavSideBar.js';
import ChannelWindow from '../../ChannelWindow/ChannelWindow.js';
import { setCredentials, setToken } from '../../../redux/reducers/user/registrationSlice.js';
import NavbarHeader from '../../Nav/Nav.js';
import { useAuth } from '../../../context/AuthContext.js';
import { useGetChannelsQuery } from '../../../redux/reducers/app/channelsApiSlice.js';
import { useGetMassagesQuery } from '../../../redux/reducers/app/massagesApiSlice.js';
import { setChannels } from '../../../redux/reducers/app/channelsSlice.js';
import { setMessages } from '../../../redux/reducers/app/messagesSlice.js';
import AppSpinner from '../../../uikit/spinner/Spinner.js';

const ChatPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clearAuthData } = useAuth();

  const handleExit = useCallback(() => {
    localStorage.clear();
    navigate('/login', { replace: false });
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
        (isErrorMessagesStatus === 401) || (isErrorChannelsStatus === 401)
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
