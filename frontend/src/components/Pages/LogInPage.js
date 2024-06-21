import React from 'react';
import MainModal from '../Modals/MainModal';
import Navbar from '../Nav/Nav';
import LogInModal from '../Modals/LogInModal';

const LogInPage = () => (
  <>
    <Navbar />
    <MainModal>
      <LogInModal />
    </MainModal>
  </>
);

export default LogInPage;
