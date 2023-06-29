import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  modalMessage: '',
  cardIdToDelete: 0,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalMessage = action.payload.message;
      state.cardIdToDelete = action.payload.cardId;
    },
    closeModal: (state, action) => {
      return initialState;
    },
  },
});

export const isModalOpen = (state) => state.modal.isOpen;
export const modalMessage = (state) => state.modal.modalMessage;
export const cardIdToDelete = (state) => state.modal.cardIdToDelete;

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
