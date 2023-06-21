import { createSlice } from '@reduxjs/toolkit';

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
  },
});
export const getAccessToken = (state) => state.auth0.accessToken;

export const { setAuthContext } = auth0Slice.actions;

export default auth0Slice.reducer;
