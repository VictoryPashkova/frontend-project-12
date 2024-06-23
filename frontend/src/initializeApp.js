import createI18n from './i18n';
import initSocket from './socket';

const initializeApp = async (store, sendChannel, addMessage) => {
  const i18next = await createI18n();
  const socket = initSocket(store, sendChannel, addMessage);

  return { i18next, socket };
};

export default initializeApp;
