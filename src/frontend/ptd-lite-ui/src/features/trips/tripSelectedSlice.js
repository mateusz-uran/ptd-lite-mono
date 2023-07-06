import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTripisBody: [],
};

const tripSelectedSlice = createSlice({
  name: 'tripSelected',
  initialState,
  reducers: {
    storeSelectedTrips: (state, action) => {
      state.selectedTripisBody.push(action.payload);
    },
    removeSelectedTrip: (state, action) => {
      const tripToRemove = action.payload;
      const index = state.selectedTripisBody.findIndex(
        (trip) => trip.id === tripToRemove.id
      );
      if (index !== -1) {
        state.selectedTripisBody.splice(index, 1);
      }
    },
    clearSelectedTrips: (state) => {
      state.selectedTripisBody = [];
    },
  },
});

export const selectedTripArray = (state) =>
  state.tripSelected.selectedTripisBody;

export const { storeSelectedTrips, removeSelectedTrip, clearSelectedTrips } =
  tripSelectedSlice.actions;

export default tripSelectedSlice.reducer;
