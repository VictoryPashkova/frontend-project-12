import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/user/registrationSlice';
import channelsReducer from './reducers/app/channelsSlice';

const rootReducer = combineReducers({
  user: authReducer,
  channels: channelsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
