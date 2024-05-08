import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setCredentials: (
        state,
        {
          payload: { user, token },
        },
      ) => {
  
        state.user = user;
        state.token = token;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
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

