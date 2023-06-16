import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFuelFormOpen: false,
  componentToDisplay: '',
  isEditing: false,
  petrolId: 0,
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
    },
    closeFuelForm: (state) => {
      state.isFuelFormOpen = false;
      state.componentToDisplay = '';
      state.isEditing = false;
      state.petrolId = 0;
    },
  },
});

export const isFormOpen = (state) => state.fuelForm.isFuelFormOpen;
export const componentName = (state) => state.fuelForm.componentToDisplay;
export const isEditingFuel = (state) => state.fuelForm.isEditing;
export const petrolIdToEdit = (state) => state.fuelForm.petrolId;

export const { openFuelForm, closeFuelForm } = fuelFormSlice.actions;

export default fuelFormSlice.reducer;
