import React from 'react';
import ChatPage from '../ChatPage/ChatPage';

const HomePage = () => (
  <>
    <header />
    <body>
      <main className="h-100 bg-light">
        <div className="h-100">
          <div className="h-100" id="chat">
            <ChatPage />
          </div>
        </div>
      </main>
    </body>
  </>
);

export default HomePage;
