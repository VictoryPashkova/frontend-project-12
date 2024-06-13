import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: 1,
  currentChannelName: '',
  onEditChannelId: 0,
  onEditChannelName: '',
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
    removeChannel: (state, action) => ({
      ...state,
      channels: state.channels.filter((channel) => channel.id !== action.payload),
    }),
    editChannel: (state, action) => ({
      ...state,
      channels:
        state.channels
          .map((channel) => (
            channel.id === action.payload.id ? { ...channel, ...action.payload } : channel)),
    }),
    setCurrentChannel: (state, action) => ({
      ...state,
      currentChannelId: action.payload.id,
      currentChannelName: action.payload.name,
    }),
    setOnEditChannel: (state, action) => ({
      ...state,
      onEditChannelId: action.payload.id,
      onEditChannelName: action.payload.name,
    }),
  },
});

export const {
  setChannels,
  sendChannel,
  removeChannel,
  editChannel,
  setCurrentChannel,
  setOnEditChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
