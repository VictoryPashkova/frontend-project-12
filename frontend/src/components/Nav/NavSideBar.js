import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetChannelsQuery } from '../../redux/reducers/app/channelsSlice';

const NavbarSideBar = ({children}) => {
    const dispatch = useDispatch();
    const { data: channels, isLoading, isError } = useGetChannelsQuery();
    console.log(channels);

    return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <div className="d-flex align-items-center justify-content-between w-100 mb-3">
            <div>
              <p className="m-0 fw-bold">Каналы</p>
            </div>
            <div>
              <Button variant="outline-primary" size="sm">+</Button>
            </div>
          </div>
          <Nav className="flex-column">
            <Nav.Item>
               <Nav.Link href="/home">General</Nav.Link>
            </Nav.Item>
            <Nav.Item>
               <Nav.Link href="/home">Random</Nav.Link>
            </Nav.Item>
            <Nav.Item>
               <Nav.Link href="/home">Some</Nav.Link>
            </Nav.Item>
            <Nav.Item>
               <Nav.Link href="/home">More</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    );
  }

export default NavbarSideBar;