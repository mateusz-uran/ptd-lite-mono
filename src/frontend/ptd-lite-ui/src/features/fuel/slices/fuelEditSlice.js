import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  fuelName: '',
  fuelObject: null,
};

const fuelEditSlice = createSlice({
  name: 'fuelEdit',
  initialState,
  reducers: {
    startEditingFuel: (state, action) => {
      state.isOpen = true;
      state.fuelName = action.payload.name;
      state.fuelObject = action.payload.object;
    },
    stopEditingFuel: () => initialState,
  },
});

export const isModalOpen = (state) => state.fuelEdit.isOpen;
export const editType = (state) => state.fuelEdit.fuelName;
export const fuelToEdit = (state) => state.fuelEdit.fuelObject;

export const { startEditingFuel, stopEditingFuel } = fuelEditSlice.actions;

export default fuelEditSlice.reducer;
