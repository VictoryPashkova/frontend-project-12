import io from 'socket.io-client';

const initSocket = (store, sendChannel, addMessage) => {
  const socket = io();
  const { dispatch } = store;

  socket.on('connect', () => {
  });

  socket.on('disconnect', () => {
    socket.connect();
  });

  socket.on('connect_error', () => {
    socket.connect();
  });

  socket.on('reconnect_attempt', () => {
    socket.connect();
  });

  socket.on('newChannel', (newChannel) => {
    dispatch(sendChannel(newChannel));
  });

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });

  return socket;
};

export default initSocket;
