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
  accessToken: '26b7ee2bf3c342f2a426874912ba9c7c',
  environment: 'testenv',
};

function TestError() {
  const a = null
  return a.hello()
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
    <TestError />
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
