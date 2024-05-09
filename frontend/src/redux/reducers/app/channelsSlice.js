import {
    createSlice,
    createEntityAdapter,
    createAsyncThunk
  } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChannels = createAsyncThunk(
    'channels/fetchChannels',
    async ({ getState }) => {
      try {
        const { token } = getState().user;
        const response = await axios.get('/api/v1/channels', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        const channels = response.data;
        return channels;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  );

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
    name: 'channels',
    initialState: channelsAdapter.getInitialState(),
    reducers: {
      addChannel: channelsAdapter.addOne,
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchChannels.fulfilled, (state, action) => {
          channelsAdapter.setAll(state, action.payload);
        });
    },
  });


export const { addChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
