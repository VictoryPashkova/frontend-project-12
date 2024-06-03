import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import { I18nextProvider } from 'react-i18next';
import i18next from './i18n';
import { Provider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: '65a2845baa094776a7c4902509608ccc',
  environment: 'testenv',
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider config={rollbarConfig}>
      <ErrorBoundary>
  <I18nextProvider i18n={i18next}>
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
  </I18nextProvider>
  </ErrorBoundary>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
