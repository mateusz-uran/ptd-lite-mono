import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startDate: "",
  endDate: "",
  isFetching: false,
};

const datesRangeSlice = createSlice({
  name: "datesRange",
  initialState,
  reducers: {
    storeDatesRange: (state, action) => {
      state.startDate = action.payload.start;
      state.endDate = action.payload.end;
      state.isFetching = true;
    },

    updateDateRange: (state, action) => {
      state.endDate = action.payload;
    },
  },
});

export const startDateFromRange = (state) => state.datesRange.startDate;
export const endDateFromRange = (state) => state.datesRange.endDate;
export const isFetchingByDatesRange = (state) => state.datesRange.isFetching;

export const { storeDatesRange, updateDateRange } = datesRangeSlice.actions;

export default datesRangeSlice.reducer;
