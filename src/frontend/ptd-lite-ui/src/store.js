import { configureStore } from '@reduxjs/toolkit';
import auht0Reducer from './features/auth/auth0Slice';
import updateCardReducer from './features/cards/slices/updateCardSlice';
import tripUpdateReducer from './features/trips/slices/tripUpdateSlice';
import fuelEditReducer from './features/fuel/slices/fuelEditSlice';
import additionalInfoReducer from './features/additionalInfo/additionalInfoSlice';
import { apiSlice } from './api/apiSlice';
import modalReducer from './features/modal/slices/modalSlice';
import pdfApiReducer from './api/pdf/pdfApiSlice';
import datesRangeReducer from './features/archive/datesRangeSlice';
import tripSelectedReducer from './features/trips/slices/tripSelectedSlice';
import tripCargoUpdateReducer from './features/trips/slices/tripCargoUpdateSlice';

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
    datesRange: datesRangeReducer,
    tripSelected: tripSelectedReducer,
    tripCargoUpdate: tripCargoUpdateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
