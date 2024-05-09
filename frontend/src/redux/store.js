import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/user/registrationSlice';
import { channelsApi } from './reducers/app/channelsSlice';

const rootReducer = combineReducers({
  user: authReducer,
  [channelsApi.reducerPath]: channelsApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(channelsApi.middleware),
});

export default store;
