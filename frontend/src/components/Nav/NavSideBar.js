import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetChannelsQuery } from '../../redux/reducers/app/channelsSlice';
import { setAddChannelModal } from '../../redux/reducers/app/modalsSlice';

const NavbarSideBar = ({children}) => {
    const dispatch = useDispatch();
    const { data: channels, isLoading, isError } = useGetChannelsQuery();
   
    return (
      <Navbar expand="lg" className="bg-body-tertiary flex-column">
        <Container className="flex-column">
          <div className="d-flex align-items-center justify-content-between w-100 mb-3">
            <div>
              <p className="m-0 fw-bold">Каналы</p>
            </div>
            <div>
              <Button variant="outline-primary" size="sm" type="button" onClick={() => dispatch(setAddChannelModal({state: true}))}>+</Button>
            </div>
          </div>
          <Nav className="flex-column w-100 align-items-start">
          {channels && channels.map((channel) => (
            <Nav.Item key={channel.id}>
              <Nav.Link href="/home">{`#${channel.name}`}</Nav.Link>
            </Nav.Item>
          ))}
          </Nav>
        </Container>
      </Navbar>
    );
  }

export default NavbarSideBar;