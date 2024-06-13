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
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export const { setCredentials, setToken } = authSlice.actions;

export default authSlice.reducer;
