import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import socket from '../../socket';
import { useGetChannelsQuery } from '../../redux/reducers/app/channelsApiSlice';
import { setAddChannelModal } from '../../redux/reducers/app/modalsSlice';
import { setCurrentChannel, sendChannel } from '../../redux/reducers/app/channelsSlice';
import NavItemChannel from './NavItemChannel';
import AddChannelModal from '../Modals/AddChannelModal/addChannelModal';
import EditChannelModal from '../Modals/EditChannelModal/EditChannelModal';
import RemoveChannelModal from '../Modals/RemoveChannelModal/RemoveChannelModal';

const NavbarSideBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, error } = useGetChannelsQuery();
  const channels = useSelector((state) => state.channels.channels);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const refScroll = useRef(null);

  const handleScrollToTop = () => {
    refScroll.current?.firstElementChild?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToBottom = () => {
    console.log(refScroll.current?.lastElementChild);
    refScroll.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    dispatch(setCurrentChannel({ id: 1, name: 'general' }));
    if (isError) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  }, [dispatch, t, navigate, isError, error]);

  useEffect(() => {
    socket.on('newChannel', (newChannel) => {
      dispatch(sendChannel(newChannel));
    });

    return () => {
      socket.off('newChannel');
    };
  }, [dispatch]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary flex-column h-100 text-overflow-ellipsis d-block">
      <div className="overflow-auto" style={{ maxHeight: '80vh', minHeight: '80vh' }}>
        <Container className="flex-column align-items-start">
          <div className="d-flex justify-content-between w-100 mb-3">
            <div>
              <p className="m-0 fw-bold">{t('interface.channels')}</p>
            </div>
            <div>
              <Button
                variant="outline-primary"
                size="sm"
                type="button"
                onClick={() => dispatch(setAddChannelModal({ state: true }))}
              >
                +
              </Button>
            </div>
          </div>
          <ul ref={refScroll} id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 h-100 d-block">
            {channels && channels.map((channel) => (
              <NavItemChannel
                key={channel.id}
                channel={channel}
                currentChannelId={currentChannelId}
              />
            ))}
          </ul>
          <AddChannelModal handleScroll={handleScrollToBottom} />
          <RemoveChannelModal handleScroll={handleScrollToTop} />
          <EditChannelModal />
        </Container>
      </div>
    </Navbar>
  );
};

export default NavbarSideBar;
