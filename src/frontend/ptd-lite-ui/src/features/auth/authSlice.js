import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  username: '',
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeAuthInformation: (state, action) => {
      state.token = action.payload;
      state.isLoading = false;
    },
  },
});
export const { storeAuthInformation } = authSlice.actions;

export const getToken = (state) => state.auth.token;
export const getUsername = (state) => state.auth.username;
export const getTokenStatus = (state) => state.auth.isLoading;

export default authSlice.reducer;
