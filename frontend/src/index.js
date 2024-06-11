import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider as ReduxProvider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import i18next from './i18n';
import AuthProvider from './context/AuthContext';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_MY_TOKEN,
  payload: {
    environment: 'production',
  },
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <I18nextProvider i18n={i18next}>
        <AuthProvider>
          <ReduxProvider store={store}>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </ReduxProvider>
        </AuthProvider>
      </I18nextProvider>
    </ErrorBoundary>
  </RollbarProvider>,
);

reportWebVitals();
