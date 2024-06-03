import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';
import { I18nextProvider } from 'react-i18next';
import i18next from './i18n';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

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
        <ReduxProvider store={store}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ReduxProvider>
      </I18nextProvider>
    </ErrorBoundary>
  </RollbarProvider>
);

reportWebVitals();
