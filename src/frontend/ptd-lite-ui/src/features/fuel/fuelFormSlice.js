import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFuelFormOpen: false,
  componentToDisplay: '',
};

const fuelFormSlice = createSlice({
  name: 'fuelForm',
  initialState,
  reducers: {
    openFuelForm: (state, action) => {
      state.isFuelFormOpen = true;
      state.componentToDisplay = action.payload;
    },
    closeFuelForm: (state) => {
      state.isFuelFormOpen = false;
      state.componentToDisplay = '';
    },
  },
});

export const isFormOpen = (state) => state.fuelForm.isFuelFormOpen;
export const componentName = (state) => state.fuelForm.componentToDisplay;

export const { openFuelForm, closeFuelForm } = fuelFormSlice.actions;

export default fuelFormSlice.reducer;
