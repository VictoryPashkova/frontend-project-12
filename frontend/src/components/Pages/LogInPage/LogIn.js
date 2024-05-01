import React from "react";
import MainModal from "../../Modals/Modal/MainModal";'../../Modals/Modal/MainModal';
import Navbar from "../../Nav/Nav";
import LogInModal from "../../Modals/LohInModal/LogInModal";

const LogInPage = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <body>
        <MainModal>
           <LogInModal />
          </MainModal>
        </body>
      </main>
    </>
  );
}

export default LogInPage;
