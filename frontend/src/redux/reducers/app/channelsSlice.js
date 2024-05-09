import {
    createSlice,
    createEntityAdapter,
    createAsyncThunk
  } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChannels = createAsyncThunk(
    'channels/fetchChannels',
    async (_, { getState }) => {
      try {
        const { token } = getState().user;
        console.log(token);
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
    initialState: channelsAdapter.getInitialState({ loadingStatus: 'idle', error: null }),
    reducers: {
      addChannel: channelsAdapter.addOne,
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchChannels.fulfilled, (state, action) => {
          state.error = null;
          channelsAdapter.setAll(state, action.payload);
        });
    },
  });


export const { addChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
