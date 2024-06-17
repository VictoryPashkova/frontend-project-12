import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './locales/index.js';

const createI18n = async () => {
  await i18next
    .use(initReactI18next)
    .init({
      resources: translations,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });
  return i18next;
};

export default createI18n;
