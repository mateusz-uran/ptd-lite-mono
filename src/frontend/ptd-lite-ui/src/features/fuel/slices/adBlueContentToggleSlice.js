import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isToggled: false,
};

const adBlueContentToggleSlice = createSlice({
  name: "adBlueContentToggle",
  initialState,
  reducers: {
    showAdBlueContent: (state, action) => {
      state.isToggled = true;
    },
    hideAdBlueContent: () => initialState,
  },
});

export const isAdBlueContentToggled = (state) =>
  state.adBlueContentToggle.isToggled;

export const { showAdBlueContent, hideAdBlueContent } =
  adBlueContentToggleSlice.actions;

export default adBlueContentToggleSlice.reducer;
