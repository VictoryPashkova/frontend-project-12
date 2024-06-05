import React from 'react';
import ChatMainPage from '../ChatMainPage/ChatMainPage';

const HomePage = () => (
  <>
    <header />
    <body>
      <main className="h-100 bg-light">
        <div className="h-100">
          <div className="h-100" id="chat">
            <ChatMainPage />
          </div>
        </div>
      </main>
    </body>
  </>
);

export default HomePage;
