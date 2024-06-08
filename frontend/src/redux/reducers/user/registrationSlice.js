import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: '',
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { username, token } = action.payload;
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
      state.userName = username;
      state.token = token;
    },
    getToken: (state) => {
      state.token = localStorage.getItem('token');
    },
  },
});

export const { setCredentials, getToken } = authSlice.actions;

export default authSlice.reducer;
