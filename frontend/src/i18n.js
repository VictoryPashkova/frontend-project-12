import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './locales/index.js';

i18next
  .use(initReactI18next)
  .init({
    resources: translations,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
