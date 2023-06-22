import { configureStore } from '@reduxjs/toolkit';
import auht0Reducer from './features/auth/auth0Slice';
import updateCardReducer from './features/cards/updateCardSlice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    auth0: auht0Reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    updateCard: updateCardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
