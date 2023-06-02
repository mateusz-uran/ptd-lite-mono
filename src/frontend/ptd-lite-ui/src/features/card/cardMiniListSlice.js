import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cardMiniListItems: [],
  isLoading: false,
};

const cardMiniListSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {},
});

export const getThreeCards = (state) => state.card.cardMiniListItems;
export const getThreeCardsStatus = (state) => state.card.isLoading;

export default cardMiniListSlice.reducer;
