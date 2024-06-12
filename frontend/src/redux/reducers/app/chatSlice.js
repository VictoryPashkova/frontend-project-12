import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelId: 1,
  currentChannelName: '',
  onEditChannelId: 0,
  onEditChannelName: '',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload.id;
      state.currentChannelName = action.payload.name;
    },
    setOnEditChannel: (state, action) => {
      state.onEditChannelId = action.payload.id;
      state.onEditChannelName = action.payload.name;
    },
  },
});

export const { setCurrentChannel, setOnEditChannel } = chatSlice.actions;

export default chatSlice.reducer;
