import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNewUpdate: false,
  isUpdateRead: true,
  updates: [],
};

const updateInfoSlice = createSlice({
  name: "updateInfo",
  initialState,
  reducers: {
    toggleNewUpdate: (state) => {
      state.isNewUpdate = true;
      state.isUpdateRead = false;
    },
    fillUpdatesArray: (state, action) => {
      state.updates = action.payload;
    },
    readUpdates: (state, action) => {
      localStorage.setItem("user_updates", action.payload);
      state.isNewUpdate = false;
      state.isUpdateRead = true;
    },
  },
});

export const isNewUpdate = (state) => state.updateInfo.isNewUpdate;
export const isUpdateRead = (state) => state.updateInfo.isUpdateRead;
export const updatesArray = (state) => state.updateInfo.updates;

export const { toggleNewUpdate, fillUpdatesArray, readUpdates } =
  updateInfoSlice.actions;

export default updateInfoSlice.reducer;
