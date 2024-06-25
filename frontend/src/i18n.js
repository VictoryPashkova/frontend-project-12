import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './locales/index.js';

const createI18n = async () => {
  const i18nInstance = i18next.createInstance();

  await i18nInstance
    .use(initReactI18next)
    .init({
      resources: translations,
      lng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });
  return i18nInstance;
};

export default createI18n;
