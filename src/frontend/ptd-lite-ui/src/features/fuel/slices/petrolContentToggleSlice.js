import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isToggled: false,
};

const petrolContentToggleSlice = createSlice({
  name: "petrolContentToggle",
  initialState,
  reducers: {
    showPetrolContent: (state, action) => {
      state.isToggled = true;
    },
    hidePetrolContent: () => initialState,
  },
});

export const isPetrolContentToggled = (state) =>
  state.petrolContentToggle.isToggled;

export const { showPetrolContent, hidePetrolContent } =
  petrolContentToggleSlice.actions;

export default petrolContentToggleSlice.reducer;
