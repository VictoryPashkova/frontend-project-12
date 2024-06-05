import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/user/registrationSlice';
import { channelsApi } from './reducers/app/channelsSlice';
import modalsReducer from './reducers/app/modalsSlice';
import { massagesApi } from './reducers/app/massagesSlice';
import chatReducer from './reducers/app/chatSlice';

const rootReducer = combineReducers({
  user: authReducer,
  [channelsApi.reducerPath]: channelsApi.reducer,
  modals: modalsReducer,
  [massagesApi.reducerPath]: massagesApi.reducer,
  chat: chatReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware, massagesApi.middleware),
});

export default store;
