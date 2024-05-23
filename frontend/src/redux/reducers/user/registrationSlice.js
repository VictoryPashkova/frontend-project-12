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
          payload: { username, token },
        },
      ) => {
        
        state.user = username;
        state.token = token;

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

