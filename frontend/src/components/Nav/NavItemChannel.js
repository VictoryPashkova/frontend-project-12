import React from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setRemoveChannelModal, setEditChannelModal } from '../../redux/reducers/app/modalsSlice';
import { setOnEditChannel, setCurrentChannel } from '../../redux/reducers/app/channelsSlice';

const NavItemChannel = ({ channel, currentChannelId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const removeClickHandler = () => {
    dispatch(setRemoveChannelModal({ state: true }));
    dispatch(setOnEditChannel({ id: channel.id, name: channel.name }));
  };

  const editClickHandler = () => {
    dispatch(setEditChannelModal({ state: true }));
    dispatch(setOnEditChannel({ id: channel.id, name: channel.name }));
  };

  const isActive = Number(currentChannelId) === Number(channel.id);

  return (
    <li key={channel.id}>
      <Dropdown as={ButtonGroup} className="d-flex justify-content-between align-items-center w-100">
        <button
          type="button"
          id={channel.id}
          className={`w-100 rounded-0 text-start text-truncate btn ${isActive ? 'btn-secondary' : ''}`}
          onClick={() => dispatch(setCurrentChannel({ id: channel.id, name: channel.name }))}
        >
          <span className="me-1">#</span>
          {channel.name}
        </button>
        {channel.removable && (
          <>
            <Dropdown.Toggle split variant="link" className={`dropdown dropdown-toggle dropdown-toggle-split show ${isActive ? 'btn btn-secondary text-light' : ''}`} aria-expanded="false">
              <i className="bi bi-chevron-down cursor-pointer" />
              <span className="visually-hidden">{t('interface.channelManagement')}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-dark dropdown-menu-sm-auto">
              <Dropdown.Item onClick={removeClickHandler}>{t('interface.buttons.delete')}</Dropdown.Item>
              <Dropdown.Item onClick={editClickHandler}>{t('interface.buttons.rename')}</Dropdown.Item>
            </Dropdown.Menu>
          </>
        )}
      </Dropdown>
    </li>
  );
};

export default NavItemChannel;
