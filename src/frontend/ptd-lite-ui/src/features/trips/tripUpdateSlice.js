import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectTripToEdit: null,
  showEditForm: false,
};

const updateTripSlice = createSlice({
  name: 'updateTrip',
  initialState,
  reducers: {
    startEditing: (state, action) => {
      state.selectTripToEdit = action.payload;
      state.showEditForm = true;
    },
    stopEditing: () => initialState,
  },
});

export const tripToEdit = (state) => state.updateTrip.selectTripToEdit;
export const editFormStatus = (state) => state.updateTrip.showEditForm;

export const { startEditing, stopEditing } = updateTripSlice.actions;

export default updateTripSlice.reducer;
