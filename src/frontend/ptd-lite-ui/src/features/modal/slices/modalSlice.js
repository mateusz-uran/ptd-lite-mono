import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  modalMessage: "",
  objectIdToDelete: 0,
  deleteMethod: "",
  showToastNotification: false,
  toastNotificationType: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalMessage = action.payload.message;
      state.objectIdToDelete = action.payload.objectId;
      state.deleteMethod = action.payload.method;
    },
    closeModal: (state, action) => {
      return {
        ...initialState,
        showToastNotification: true,
        toastNotificationType: action.payload,
      };
    },
    closeToastNotification: () => {
      return initialState;
    },
  },
});

export const isModalOpen = (state) => state.modal.isOpen;
export const modalMessage = (state) => state.modal.modalMessage;
export const objectId = (state) => state.modal.objectIdToDelete;
export const method = (state) => state.modal.deleteMethod;
export const isNotificationShown = (state) => state.modal.showToastNotification;
export const notificationType = (state) => state.modal.toastNotificationType;

export const { openModal, closeModal, closeToastNotification } =
  modalSlice.actions;

export default modalSlice.reducer;
