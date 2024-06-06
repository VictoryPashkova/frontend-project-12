import React from 'react';
import { useDispatch } from 'react-redux';
import { Nav, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setRemoveChannelModal, setEditChannelModal } from '../../redux/reducers/app/modalsSlice';
import { setOnEditChannelId } from '../../redux/reducers/app/chatSlice';

const NavItemChannel = ({ channel, currentChannelId, setCurrentChannel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const removeClickHandler = () => {
    dispatch(setRemoveChannelModal({ state: true }));
    dispatch(setOnEditChannelId({ id: channel.id }));
  };

  const editClickHandler = () => {
    dispatch(setEditChannelModal({ state: true }));
    dispatch(setOnEditChannelId({ id: channel.id }));
  };

  return (
    <Nav.Item key={channel.id}>
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="d-flex align-items-center w-100">
          <Nav.Link
            active={Number(currentChannelId) === Number(channel.id)}
            style={{ fontWeight: Number(currentChannelId) === Number(channel.id) ? 'bold' : 'normal' }}
            onClick={() => dispatch(setCurrentChannel({ id: channel.id, name: channel.name }))}
            className="text-truncate d-flex align-items-center w-100"
            as="div"
            role="button"
            name={channel.name}
          >
            {`#${channel.name}`}
          </Nav.Link>
          {channel.removable
        && (
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle split variant="link" className="shadow-none p-0 m-0 border-0">
            <i className="bi bi-chevron-down cursor-pointer" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu-dark dropdown-menu-sm-auto">
            <Dropdown.Item onClick={() => editClickHandler()}>{t('interface.buttons.edit')}</Dropdown.Item>
            <Dropdown.Item onClick={() => removeClickHandler()}>{t('interface.buttons.delete')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        )}
        </div>
      </div>
    </Nav.Item>
  );
};

export default NavItemChannel;
