import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addChannelModal: false,
  removeChannelModal: false,
  editChannelModal: false,
  onEditChannelId: 0,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setAddChannelModal: (state, action) => ({
      ...state,
      addChannelModal: action.payload.state,
    }),
    setRemoveChannelModal: (state, action) => ({
      ...state,
      removeChannelModal: action.payload.state,
    }),
    setEditChannelModal: (state, action) => ({
      ...state,
      editChannelModal: action.payload.state,
    }),
    setOnEditChannel: (state, action) => ({
      ...state,
      onEditChannelId: action.payload.id,
    }),
  },
});

export const {
  setOnEditChannel,
  setAddChannelModal,
  setRemoveChannelModal,
  setEditChannelModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
