import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { username, token },
      },
    ) => {
      state.user = username;
      state.token = token;
      localStorage.setItem('token', token);
    },
    getToken: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        state.token = token;
      }
    },
  },
});

export const { setCredentials, getToken } = authSlice.actions;

export default authSlice.reducer;
