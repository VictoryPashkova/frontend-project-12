import React, {useEffect} from "react";
import NavbarHeader from "../../Nav/Nav";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getToken } from '../../../redux/reducers/user/registrationSlice';
import Button from "react-bootstrap/esm/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Nav, Navbar } from "react-bootstrap";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import NavbarSideBar from "../../Nav/NavSideBar";
import AddChannelModal from "../../Modals/AddChannelModal/addChannelModal";
import ChannelWindow from '../../ChannelWindow/ChannelWindow';

const ChatMainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getToken());
  }, [dispatch]);
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    if (!token) {
      navigate('/login');
   }
  }, [token, navigate]);
  return (
    <>
      <header>
        <NavbarHeader>
         <Button variant="primary" size="sm" type="button" onClick={() => navigate('/login', {replace: false})}>
           Выйти
        </Button>
        </NavbarHeader>
      </header>
      <main>
        <body>
         <main>
            <>
            <AddChannelModal />
         <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper"> 
                    <NavbarSideBar />
                    </Col>
                    <Col  xs={10} id="page-content-wrapper">
                        <ChannelWindow />
                    </Col> 
                </Row>

            </Container>
        </>
         </main>
        </body>
      </main>
    </>
  );
}

export default ChatMainPage;