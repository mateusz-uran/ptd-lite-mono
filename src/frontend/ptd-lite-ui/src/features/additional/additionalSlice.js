import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fuelInitialState: '',
  fuelEndState: '',
  aggregateInitialState: '',
  aggregateAmount: '',
  aggregateEndState: '',
  tripStageKm: '',
  avgPetrol: '',
  totalPetrol: '',
  avgSpeed: '',
  idingConsump: '',
  uneconoConcump: '',
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

export const { saveAdditionalData, clearAdditionalData } =
  additionalInfoSlice.actions;

export default additionalInfoSlice.reducer;
