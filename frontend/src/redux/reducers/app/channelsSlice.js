import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: 1,
  currentChannelName: '',
  onEditChannelId: 0,
};

const channelsSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    addChannel: (state, action) => {
      state.channels = [...state.channels, action.payload];
    },
    removeChannel: (state, action) => {
      state.channels = state.channels.filter((channel) => channel.id !== action.payload);
    },
    editChannel: (state, action) => {
      state.channels = state.channels.map((channel) => {
        if (channel.id === action.payload.id) {
          return action.payload;
        }
        return channel;
      });
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload.id;
      state.currentChannelName = action.payload.name;
    },
    setOnEditChannelId: (state, action) => {
      state.onEditChannelId = action.payload.id;
    },
  },
});

export const {
  setChannels,
  addChannel,
  removeChannel,
  editChannel,
  setCurrentChannel,
  setOnEditChannelId,
} = channelsSlice.actions;

export default channelsSlice.reducer;
