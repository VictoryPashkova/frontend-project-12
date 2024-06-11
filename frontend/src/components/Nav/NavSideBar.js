import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetChannelsQuery } from '../../redux/reducers/app/channelsSlice';
import { setAddChannelModal } from '../../redux/reducers/app/modalsSlice';
import { setCurrentChannel } from '../../redux/reducers/app/chatSlice';
import NavItemChannel from './NavItemChannel';

const NavbarSideBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: channels, isError, error } = useGetChannelsQuery();
  const currentChannelId = useSelector((state) => state.chat.currentChannelId);
  const refScrollTop = useRef(null);
  const [prevNumChannels, setPrevNumChannels] = useState(channels ? channels.length : 0);

  useEffect(() => {
    if (refScrollTop.current && channels) {
      if (prevNumChannels > channels.length) {
        refScrollTop.current.scrollIntoView({ behavior: 'smooth' });
      }
      setPrevNumChannels(channels.length);
    }
  }, [channels, prevNumChannels]);

  useEffect(() => {
    dispatch(setCurrentChannel({ id: 1, name: 'general' }));
    if (isError) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  }, [dispatch, t, navigate, isError, error]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary flex-column h-100 text-overflow-ellipsis d-block">
      <div ref={refScrollTop}>
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
          <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 h-100 d-block">
            {channels && channels.map((channel) => (
              <NavItemChannel
                key={channel.id}
                channel={channel}
                currentChannelId={currentChannelId}
              />
            ))}
          </ul>
        </Container>
      </div>
    </Navbar>
  );
};

export default NavbarSideBar;
