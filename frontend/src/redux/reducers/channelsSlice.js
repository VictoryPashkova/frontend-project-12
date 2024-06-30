import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: 1,
};

const channelsSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChannels: (state, action) => ({
      ...state,
      channels: action.payload,
    }),
    sendChannel: (state, action) => ({
      ...state,
      channels: [...state.channels, action.payload],
    }),
    deleteChannel: (state, action) => ({
      ...state,
      channels: state.channels.filter((channel) => channel.id !== action.payload.id),
    }),
    setEditChannel: (state, action) => ({
      ...state,
      channels:
        state.channels
          .map((channel) => (
            channel.id === action.payload.id ? { ...channel, ...action.payload } : channel)),
    }),
    setCurrentChannelId: (state, action) => ({
      ...state,
      currentChannelId: action.payload.id,
    }),
  },
});

export const {
  setChannels,
  sendChannel,
  deleteChannel,
  setEditChannel,
  setCurrentChannelId,
} = channelsSlice.actions;

export default channelsSlice.reducer;
