import io from 'socket.io-client';

const initSocket = (store, sendChannel, addMessage) => {
  const socket = io();
  const { dispatch } = store;

  socket.on('connect', () => {
    console.log('Socket connected');
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
    socket.connect();
  });

  socket.on('connect_error', () => {
    console.error('Socket connection error');
    socket.connect();
  });

  socket.on('reconnect_attempt', () => {
    console.log('Attempting to reconnect socket...');
    socket.connect();
  });

  socket.on('newChannel', (newChannel) => {
    console.log('Новый канал получен:', newChannel);
    dispatch(sendChannel(newChannel));
  });

  socket.on('newMessage', (message) => {
    console.log('Новое сообщение получено:', message);
    dispatch(addMessage(message));
  });

  return socket;
};

export default initSocket;
