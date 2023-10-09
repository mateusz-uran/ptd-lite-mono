import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sender: {
    senderName: "",
    addressSender1: "",
    addressSender2: "",
    senderCountry: "",
  },
  receiver: {
    receiverName: "",
    addressReceiver1: "",
    addressReceiver2: "",
  },
  delivery: {
    addressDelivery: "",
  },
  placeLoading: {
    addressLoading: "",
  },
  cargoInfo: {
    info: "",
  },
  cargoInstructions: {
    instructions: "",
  },
  signature: {
    signatureName: "",
    addressSignature1: "",
    addressSignature2: "",
    signatureCountry: "",
  },
  carrier: {
    carrierName: "",
  },
};

const crmFormSlice = createSlice({
  name: "crmForm",
  initialState,
  reducers: {
    saveForm: (state, action) => {
      state.sender = action.payload.sender;
      state.receiver = action.payload.receiver;
      state.delivery = action.payload.delivery;
      state.placeLoading = action.payload.placeLoading;
      state.cargoInfo = action.payload.cargoInfo;
      state.cargoInstructions = action.payload.cargoInstructions;
      state.signature = action.payload.signature;
      state.carrier = action.payload.carrier;
    },
    resetForm: () => initialState,
  },
});

export const sender = (state) => state.crmForm.sender;
export const receiver = (state) => state.crmForm.receiver;
export const delivery = (state) => state.crmForm.delivery;
export const placeLoading = (state) => state.crmForm.placeLoading;
export const cargoInfo = (state) => state.crmForm.cargoInfo;
export const cargoInstructions = (state) => state.crmForm.cargoInstructions;
export const signature = (state) => state.crmForm.signature;
export const carrier = (state) => state.crmForm.carrier;

export const { saveForm, resetForm } = crmFormSlice.actions;

export default crmFormSlice.reducer;
