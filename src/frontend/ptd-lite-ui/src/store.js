import { configureStore } from "@reduxjs/toolkit";
import updateCardReducer from "./features/cards/slices/updateCardSlice";
import tripUpdateReducer from "./features/trips/slices/tripUpdateSlice";
import fuelEditReducer from "./features/fuel/slices/fuelEditSlice";
import additionalInfoReducer from "./features/additionalInfo/additionalInfoSlice";
import { apiSlice } from "./api/apiSlice";
import modalReducer from "./features/modal/slices/modalSlice";
import pdfApiReducer from "./api/pdf/pdfApiSlice";
import datesRangeReducer from "./features/archive/datesRangeSlice";
import tripSelectedReducer from "./features/trips/slices/tripSelectedSlice";
import tripCargoUpdateReducer from "./features/trips/slices/tripCargoUpdateSlice";
import currencyApiReducer from "./api/currency/currencyApiSlice";
import petrolContentToggleReducer from "./features/fuel/slices/petrolContentToggleSlice";
import adBlueContentToggleReducer from "./features/fuel/slices/adBlueContentToggleSlice";
import crmFormReducer from "./features/crm/slices/crmFormSlice";
import updateInfoReducer from "./features/updates/slices/updateInfoSlice";

export const store = configureStore({
  reducer: {
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
    currency: currencyApiReducer,
    petrolContentToggle: petrolContentToggleReducer,
    adBlueContentToggle: adBlueContentToggleReducer,
    crmForm: crmFormReducer,
    updateInfo: updateInfoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
