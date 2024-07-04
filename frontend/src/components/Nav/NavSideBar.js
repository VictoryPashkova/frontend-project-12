import Button from 'react-bootstrap/Button';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetChannelsQuery } from '../../redux/reducers/channelsApiSlice';
import { setModalVisibility } from '../../redux/reducers/modalsSlice';
import { setCurrentChannelId } from '../../redux/reducers/channelsSlice';
import NavItemChannel from './NavItemChannel';
import AddChannelModal from '../Modals/AddChannelModal';
import EditChannelModal from '../Modals/EditChannelModal';
import RemoveChannelModal from '../Modals/RemoveChannelModal';
import routes from '../../routes';

const NavbarSideBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, error } = useGetChannelsQuery();
  const channels = useSelector((state) => state.channels.channels);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const refScroll = useRef(null);

  const handleScrollToTop = () => {
    refScroll.current.scrollTop = 0;
  };

  const handleScrollToBottom = () => {
    refScroll.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    dispatch(setCurrentChannelId({ id: 1 }));
    if (isError) {
      if (error.response && error.response.status === 401) {
        navigate(routes.login(), { replace: false });
      }
    }
  }, [dispatch, t, navigate, isError, error]);

  return (
    <div className="d-block navbar navbar-expand-lg navbar-light bg-light h-100">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <div>
          <p className="m-0 fw-bold">{t('interface.channels')}</p>
        </div>
        <div>
          <Button
            variant="outline-primary btn-group-vertical"
            size="sm"
            type="button"
            onClick={() => dispatch(setModalVisibility({ isVisible: true, type: 'addChannel', extraData: {} }))}
          >
            +
          </Button>
        </div>
      </div>
      <ul ref={refScroll} id="channels-box" className="nav nav-pills flex-column nav-fill px-2 mb-3 d-block overflow-auto" style={{ maxHeight: 'calc(100vh - 220px)', minHeight: '60vh' }}>
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
    </div>
  );
};

export default NavbarSideBar;
