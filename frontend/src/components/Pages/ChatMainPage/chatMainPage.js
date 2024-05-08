import React, {useEffect} from "react";
import MainModal from "../../Modals/Modal/MainModal";'../../Modals/Modal/MainModal';
import Navbar from "../../Nav/Nav";
import LogInModal from "../../Modals/LohInModal/LogInModal";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getToken } from '../../../redux/reducers/user/registrationSlice';


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
        <Navbar />
      </header>
      <main>
        <body>
         <main>
            <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', margin: 0, padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p style={{ fontSize: '4rem', color: '#333' }}>Hello world!</p>
            </div>
         </main>
        </body>
      </main>
    </>
  );
}

export default ChatMainPage;