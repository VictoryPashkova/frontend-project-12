import React from 'react';
import MainModal from '../../Modals/MainModal/MainModal';
import Navbar from '../../Nav/Nav';
import RegistrationModal from '../../Modals/RegustrationModal/RegistrationModal';

const RegistrationPage = () => (
  <>
    <header>
      <Navbar />
    </header>
    <main>
      <body>
        <MainModal>
          <RegistrationModal />
        </MainModal>
      </body>
    </main>
  </>
);

export default RegistrationPage;
