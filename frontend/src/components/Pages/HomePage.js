import React from 'react';
import ChatPage from './ChatPage';

const HomePage = () => (
  <>
    <header />
    <div className="h-100 bg-light">
      <div className="h-100">
        <div className="h-100" id="chat">
          <ChatPage />
        </div>
      </div>
    </div>
  </>
);

export default HomePage;
