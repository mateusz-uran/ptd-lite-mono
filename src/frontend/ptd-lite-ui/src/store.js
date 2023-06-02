import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './features/card/cardMiniListSlice';
import auht0Reducer from './features/auth/auth0Slice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    auth0: auht0Reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    card: cardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
