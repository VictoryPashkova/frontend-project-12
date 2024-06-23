import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider as ReduxProvider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import AuthProvider from './context/AuthContext';
import { SocketProvider } from './context/socketContext';
import { BadWordsProvider } from './context/BadWordsContext';
import { sendChannel } from './redux/reducers/channelsSlice';
import { addMessage } from './redux/reducers/messagesSlice';
import initializeApp from './initializeApp';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_MY_TOKEN,
  payload: {
    environment: 'production',
  },
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const runApp = async () => {
  const { i18next, socket } = await initializeApp(store, sendChannel, addMessage);

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18next}>
          <AuthProvider>
            <ReduxProvider store={store}>
              <React.StrictMode>
                <SocketProvider socket={socket}>
                  <BadWordsProvider>
                    <App />
                  </BadWordsProvider>
                </SocketProvider>
              </React.StrictMode>
            </ReduxProvider>
          </AuthProvider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>,
  );

  reportWebVitals();
};

runApp();
