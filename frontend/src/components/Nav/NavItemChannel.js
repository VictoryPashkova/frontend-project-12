import React from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setModalVisibility } from '../../redux/reducers/modalsSlice';
import { setCurrentChannelId } from '../../redux/reducers/channelsSlice';

const NavItemChannel = ({ channel, currentChannelId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const removeClickHandler = () => {
    dispatch(setModalVisibility({ isVisible: true, type: 'removeChannel', extraData: { currentModalChannelId: channel.id } }));
  };

  const editClickHandler = () => {
    dispatch(setModalVisibility({ isVisible: true, type: 'editChannel', extraData: { currentModalChannelId: channel.id } }));
  };

  const isActive = Number(currentChannelId) === Number(channel.id);

  return (
    <li key={channel.id} className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button
          type="button"
          id={channel.id}
          className="w-100 rounded-0 text-start text-truncate"
          variant={`${isActive && 'secondary'}`}
          onClick={() => dispatch(setCurrentChannelId({ id: channel.id }))}
        >
          <span className="me-1">{t('interface.channelsSign')}</span>
          {channel.name}
        </Button>
        {channel.removable && (
          <>
            <Dropdown.Toggle
              data-bs-toggle="dropdown"
              split
              className="border-0"
              variant={`${isActive && 'secondary'}`}
              aria-expanded="false"
              id="react-aria9230295641-1"
              aria-haspopup="true"
            >
              <i className="bi bi-chevron-down cursor-pointer" />
              <span className="visually-hidden">{t('interface.channelManagement')}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu
              aria-labelledby="react-aria9230295641-1"
              className="dropdown-menu-dark dropdown-menu-sm"
            >
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
