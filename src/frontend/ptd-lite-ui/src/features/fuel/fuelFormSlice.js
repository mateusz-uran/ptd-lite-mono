import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFuelFormOpen: false,
  componentToDisplay: '',
  isEditing: false,
  petrolId: 0,
  blueId: 0,
};

const fuelFormSlice = createSlice({
  name: 'fuelForm',
  initialState,
  reducers: {
    openFuelForm: (state, action) => {
      state.isFuelFormOpen = true;
      state.componentToDisplay = action.payload.component;
      state.isEditing = action.payload.edit;
      state.petrolId = action.payload.petrolId;
      state.blueId = action.payload.blueId;
    },
    closeFuelForm: (state) => {
      state.isFuelFormOpen = false;
      state.componentToDisplay = '';
      state.isEditing = false;
      if (state.petrolId != 0) {
        state.petrolId = 0;
      }
      if (state.blueId != 0) {
        state.blueId = 0;
      }
    },
  },
});

export const isFormOpen = (state) => state.fuelForm.isFuelFormOpen;
export const componentName = (state) => state.fuelForm.componentToDisplay;
export const isEditingFuel = (state) => state.fuelForm.isEditing;
export const petrolIdToEdit = (state) => state.fuelForm.petrolId;
export const blueIdToEdit = (state) => state.fuelForm.blueId;

export const { openFuelForm, closeFuelForm } = fuelFormSlice.actions;

export default fuelFormSlice.reducer;
