import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTripBody: [],
};

const tripSelectedSlice = createSlice({
  name: 'tripSelected',
  initialState,
  reducers: {
    storeSelectedTrips: (state, action) => {
      state.selectedTripBody.push(action.payload);
    },
    removeSelectedTrip: (state, action) => {
      const tripToRemove = action.payload;
      const index = state.selectedTripBody.findIndex(
        (trip) => trip.id === tripToRemove.id
      );
      if (index !== -1) {
        state.selectedTripBody.splice(index, 1);
      }
    },
    clearSelectedTrips: (state) => {
      state.selectedTripBody = [];
    },
  },
});

export const selectedTripArray = (state) => state.tripSelected.selectedTripBody;

export const { storeSelectedTrips, removeSelectedTrip, clearSelectedTrips } =
  tripSelectedSlice.actions;

export default tripSelectedSlice.reducer;
