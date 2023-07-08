import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 0,
  number: '',
  isEditing: false,
};

const updateCardSlice = createSlice({
  name: 'updateCard',
  initialState,
  reducers: {
    updateCardStatus: (state, action) => {
      const cardToEdit = action.payload;
      state.id = cardToEdit.selectedCard;
      state.number = cardToEdit.cardNumber;
      state.isEditing = true;
    },
    stopEditing: (state, action) => {
      return initialState;
    },
  },
});

export const isCardEditing = (state) => state.updateCard.isEditing;
export const cardIdToUpdate = (state) => state.updateCard.id;
export const cardNumberToUpdate = (state) => state.updateCard.number;

export const { updateCardStatus, stopEditing } = updateCardSlice.actions;

export default updateCardSlice.reducer;
