import Button from "react-bootstrap/esm/Button";
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';


const PrimaryButton = ({ text }) => {
  const navigate = useNavigate();
  const navigateToRegistration = () => {
    navigate('/registration', {replace: false});
  }

    return (
      <div style={{ textAlign: 'center', display: 'flex' , alignSelf: 'center'}}>
        <p style={{ display: 'inline-block' }}>
          Нет аккаунта?
          <Button variant="link" onClick={navigateToRegistration}>{text}</Button>
        </p>
      </div>
    );
  }

export default PrimaryButton;
