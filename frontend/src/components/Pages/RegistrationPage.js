import React from 'react';
import MainModal from '../Modals/MainModal';
import Navbar from '../Nav/Nav';
import RegistrationModal from '../Modals/RegistrationModal';

const RegistrationPage = () => (
  <>
    <Navbar />
    <MainModal>
      <RegistrationModal />
    </MainModal>
  </>
);

export default RegistrationPage;
