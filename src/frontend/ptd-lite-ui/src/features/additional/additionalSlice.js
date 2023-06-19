import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fuelInitialState: '',
  fuelEndState: '',
  aggregateInitialState: '',
  aggregateAdBlue: '',
  aggregateEndState: '',
  avgFuelConsumption: '',
  totalFuelConsumption: '',
  avgSpeed: '',
  fuelConsumptionIdle: '',
  fuelConsumptionUneconomical: '',
};

const additionalInfoSlice = createSlice({
  name: 'additionalInfo',
  initialState,
  reducers: {
    saveAdditionalData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearAdditionalData: () => initialState,
  },
});

export const getAdditionalInfo = (state) => state.additionalInfo;
export const getPetrolSum = (state) => state.fuelPetrolSum;
export const getTripSum = (state) => state.tripSum;

export const {
  saveAdditionalData,
  clearAdditionalData,
  updatePetrolSum,
  updateTripSum,
} = additionalInfoSlice.actions;

export default additionalInfoSlice.reducer;
