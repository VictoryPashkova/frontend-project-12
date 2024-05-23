import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 currentChannelId: 1,
 currentChannelName: '',
 onEditChannelId: 0,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
      setCurrentChannel: (state, action) => {
        state.currentChannelId = action.payload.id;
        state.currentChannelName = action.payload.name;
      },
      setOnEditChannelId: (state, action) => {
        state.onEditChannelId = action.payload.id;
      },
    },
  });


export const { setCurrentChannel, setOnEditChannelId } = chatSlice.actions;

export default chatSlice.reducer;
