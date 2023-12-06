import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fuelInitialState: "",
  fuelEndState: "",
  aggregateInitialState: "",
  aggregateAdBlue: "",
  aggregateEndState: "",
  avgFuelConsumption: "",
  totalFuelConsumption: "",
  avgSpeed: "",
  fuelConsumptionIdle: "",
  fuelConsumptionUneconomical: "",
  selectedCardId: 0,
};

const additionalInfoSlice = createSlice({
  name: "additionalInfo",
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
export const getStoredCardIdAdditionalInfo = (state) =>
  state.additionalInfo.selectedCardId;

export const { saveAdditionalData, clearAdditionalData } =
  additionalInfoSlice.actions;

export default additionalInfoSlice.reducer;
