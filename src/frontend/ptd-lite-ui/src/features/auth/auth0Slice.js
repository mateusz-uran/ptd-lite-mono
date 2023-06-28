import { createSlice } from '@reduxjs/toolkit';
import { init } from 'i18next';

const initialState = {
  accessToken: null,
};

const auth0Slice = createSlice({
  name: 'auth0',
  initialState: initialState,
  reducers: {
    setAuthContext: (state, action) => {
      state.accessToken = action.payload;
      return state;
    },
    clearAuthContext: () => {
      return initialState;
    },
  },
});
export const getAccessToken = (state) => state.auth0.accessToken;

export const { setAuthContext, clearAuthContext } = auth0Slice.actions;

export default auth0Slice.reducer;
