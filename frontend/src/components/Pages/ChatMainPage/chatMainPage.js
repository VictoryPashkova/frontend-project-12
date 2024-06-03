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
import RemoveChannelModal from "../../Modals/removeChannelModal";
import EditChannelModal from "../../Modals/editChannelModal.js";
import { useTranslation } from 'react-i18next';

const ChatMainPage = () => {
  const { t } = useTranslation();
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
    <NavbarHeader>
<Button variant="primary" size="sm" type="button" onClick={() => navigate('/login', {replace: false})}>
{t('interface.buttons.logout')}
</Button>
</NavbarHeader>
    <div className={"container h-100 my-4 overflow-scroll rounded shadow"}>
      <div className="row h-100 bg-white flex-md-row p-3">
         <AddChannelModal />
            <RemoveChannelModal />
            <EditChannelModal />
                <Row>
                    <Col xs={3} id="sidebar-wrapper" сlassName="bg-light border-end col-md"> 
                    <NavbarSideBar />
                    </Col>
                    <Col  xs={9} id="page-content-wrapper" сlassName="bg-light border-end col-md">
                        <ChannelWindow />
                    </Col>
                </Row>

            </div>
    </div>
    </>
  );
}

export default ChatMainPage;