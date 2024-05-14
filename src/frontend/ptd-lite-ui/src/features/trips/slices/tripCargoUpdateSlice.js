import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cargoInfo: null,
  showEditForm: false,
};

const tripCargoUpdateSlice = createSlice({
  name: "tripCargoUpdate",
  initialState,
  reducers: {
    startEditingCargo: (state, action) => {
      state.cargoInfo = action.payload;
      state.showEditForm = true;
    },
    stopEditingCargo: () => initialState,
  },
});

export const cargoToEdit = (state) => state.tripCargoUpdate.cargoInfo;
export const editCargoFormStatus = (state) =>
  state.tripCargoUpdate.showEditForm;

export const { startEditingCargo, stopEditingCargo } =
  tripCargoUpdateSlice.actions;

export default tripCargoUpdateSlice.reducer;
