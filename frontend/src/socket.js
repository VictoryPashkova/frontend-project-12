import { io } from "socket.io-client";

const socket = io();

socket.on('connect', () => {
  console.log('connected to server');
});

socket.on('disconnect', (reason) => {
    console.log('Disconnected from WebSocket server:', reason);
    if (reason === 'io server disconnect') {
      socket.connect();
    }
  });

  socket.on('connect_error', (error) => {
    console.log('Connection error:', error);
  });

  socket.on('reconnect_attempt', () => {
    console.log('Attempting to reconnect to WebSocket server');
  });

socket.on('newMessage', (message) => {
  console.log('new message:', message);
});

socket.on('renameMessage', (message) => {
  console.log('message renamed:', message);
});

socket.on('removeMessage', (messageId) => {
  console.log('message removed:', messageId);
});

export default socket;