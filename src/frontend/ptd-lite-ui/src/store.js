import { configureStore } from '@reduxjs/toolkit';
import auht0Reducer from './features/auth/auth0Slice';
import updateCardReducer from './features/cards/updateCardSlice';
import tripUpdateReducer from './features/trips/tripUpdateSlice';
import fuelEditReducer from './features/fuel/fuelEditSlice';
import additionalInfoReducer from './features/additionalInfo/additionalInfoSlice';
import { apiSlice } from './api/apiSlice';
import modalReducer from './features/modal/modalSlice';
import pdfApiReducer from './api/pdf/pdfApiSlice';

export const store = configureStore({
  reducer: {
    auth0: auht0Reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    updateCard: updateCardReducer,
    updateTrip: tripUpdateReducer,
    fuelEdit: fuelEditReducer,
    modal: modalReducer,
    additionalInfo: additionalInfoReducer,
    pdfApi: pdfApiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
