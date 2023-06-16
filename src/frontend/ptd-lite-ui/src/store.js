import { configureStore } from '@reduxjs/toolkit';
import auht0Reducer from './features/auth/auth0Slice';
import { apiSlice } from './api/apiSlice';
import updateCardReducer from './features/card/updateCardSlice';
import fuelFormReducer from './features/fuel/fuelFormSlice';

export const store = configureStore({
  reducer: {
    auth0: auht0Reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    updateCard: updateCardReducer,
    fuelForm: fuelFormReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});