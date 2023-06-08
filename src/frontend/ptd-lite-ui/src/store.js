import { configureStore } from '@reduxjs/toolkit';
import auht0Reducer from './features/auth/auth0Slice';
import { apiSlice } from './api/apiSlice';
import updateCardSlice from './features/card/updateCardSlice';

export const store = configureStore({
  reducer: {
    auth0: auht0Reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    updateCard: updateCardSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
