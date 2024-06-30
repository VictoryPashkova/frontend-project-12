import io from 'socket.io-client';

const initSocket = (store, sendChannel, addMessage, setEditChannel, deleteChannel) => {
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

  socket.on('renameChannel', (updatedChannel) => {
    dispatch(setEditChannel(updatedChannel));
  });

  socket.on('removeChannel', (id) => {
    dispatch(deleteChannel(id));
  });

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });

  return socket;
};

export default initSocket;
