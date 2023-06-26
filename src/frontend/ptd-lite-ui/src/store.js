import { configureStore } from '@reduxjs/toolkit';
import auht0Reducer from './features/auth/auth0Slice';
import updateCardReducer from './features/cards/updateCardSlice';
import tripUpdateReducer from './features/trips/tripUpdateSlice';
import fuelEditReducer from './features/fuel/fuelEditSlice';
import { apiSlice } from './api/apiSlice';
import modalReducer from './features/modal/modalSlice';

export const store = configureStore({
  reducer: {
    auth0: auht0Reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    updateCard: updateCardReducer,
    updateTrip: tripUpdateReducer,
    fuelEdit: fuelEditReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
