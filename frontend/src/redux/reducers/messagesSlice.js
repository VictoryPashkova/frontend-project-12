import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages: (state, action) => ({
      ...state,
      messages: action.payload,
    }),
    addMessage: (state, action) => ({
      ...state,
      messages: [...state.messages, action.payload],
    }),
    removeMessage: (state, action) => ({
      ...state,
      messages: state.messages.filter((message) => message.id !== action.payload),
    }),
  },
});

export const { setMessages, addMessage, removeMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
