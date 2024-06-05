import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import { useGetChannelsQuery } from '../../redux/reducers/app/channelsSlice';
import { setAddChannelModal } from '../../redux/reducers/app/modalsSlice';
import { setCurrentChannel } from '../../redux/reducers/app/chatSlice';
import NavItemChannel from './NavItemChannel';

const NavbarSideBar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    data: channels, isLoading, isError, refetch,
  } = useGetChannelsQuery();
  const currentChannelId = useSelector((state) => state.chat.currentChannelId);

  useEffect(() => {
    dispatch(setCurrentChannel({ id: 1, name: 'general' }));
    refetch();
    if (isError) {
      toast.error(t('interface.channelsError'));
    }

    if (isLoading) {
      toast.info(t('interface.loadingChannels'));
    }
  }, [dispatch, isError, isLoading, refetch, t]);

  return (
    <>
      <ToastContainer />
      <Navbar expand="lg" className="bg-body-tertiary flex-column h-100 text-overflow-ellipsis overflow-auto">
        <Container className="flex-column">
          <div className="d-flex align-items-center justify-content-between w-100 mb-3">
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
          <Nav className="flex-column w-100 align-items-start">
            {channels && channels.map((channel) => (
              <NavItemChannel
                key={channel.id}
                channel={channel}
                currentChannelId={currentChannelId}
                setCurrentChannel={setCurrentChannel}
              />
            ))}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarSideBar;
