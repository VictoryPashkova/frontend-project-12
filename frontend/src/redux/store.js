import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { channelsApi } from './reducers/channelsApiSlice';
import modalsReducer from './reducers/modalsSlice';
import { massagesApi } from './reducers/massagesApiSlice';
import channelReducer from './reducers/channelsSlice';
import messageReducer from './reducers/messagesSlice';

const rootReducer = combineReducers({
  channels: channelReducer,
  messages: messageReducer,
  [channelsApi.reducerPath]: channelsApi.reducer,
  modals: modalsReducer,
  [massagesApi.reducerPath]: massagesApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware, massagesApi.middleware),
});

export default store;
