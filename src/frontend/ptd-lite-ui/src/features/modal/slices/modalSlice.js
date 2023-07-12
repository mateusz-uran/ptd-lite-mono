import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  modalMessage: '',
  objectIdToDelete: 0,
  deleteMethod: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalMessage = action.payload.message;
      state.objectIdToDelete = action.payload.objectId;
      state.deleteMethod = action.payload.method;
    },
    closeModal: (state, action) => {
      return initialState;
    },
  },
});

export const isModalOpen = (state) => state.modal.isOpen;
export const modalMessage = (state) => state.modal.modalMessage;
export const objectId = (state) => state.modal.objectIdToDelete;
export const method = (state) => state.modal.deleteMethod;

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
