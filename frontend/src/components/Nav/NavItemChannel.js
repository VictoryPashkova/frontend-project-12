import React from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setModalVisibility } from '../../redux/reducers/modalsSlice';
import { setCurrentChannel } from '../../redux/reducers/channelsSlice';

const NavItemChannel = ({ channel, currentChannelId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const removeClickHandler = () => {
    dispatch(setModalVisibility({ isVisible: true, type: 'removeChannel', extraData: { onEditChannelId: channel.id } }));
  };

  const editClickHandler = () => {
    dispatch(setModalVisibility({ isVisible: true, type: 'editChannel', extraData: { onEditChannelId: channel.id } }));
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
          <span className="me-1">{t('interface.channelsSign')}</span>
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
