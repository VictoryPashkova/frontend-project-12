import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 addChannelModal: false,
};

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
      setAddChannelModal: (state, action) => {
        state.addChannelModal = action.payload.state;
      },
    },
  });


export const { setAddChannelModal } = modalsSlice.actions;

export default modalsSlice.reducer;

