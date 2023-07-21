import { createSlice } from '@reduxjs/toolkit';
import { init } from 'i18next';

const initialState = {
  accessToken: null,
  permissions: '',
  nick: '',
};

const auth0Slice = createSlice({
  name: 'auth0',
  initialState: initialState,
  reducers: {
    setAuthAccessToken: (state, action) => {
      state.accessToken = action.payload.token;
    },
    setAuthUserInformation: (state, action) => {
      state.permissions = action.payload.permissions;
      state.nick = action.payload.username;
    },
    clearAuthContext: () => {
      return initialState;
    },
  },
});
export const getAccessToken = (state) => state.auth0.accessToken;
export const getPermissions = (state) => state.auth0.permissions;
export const getUsername = (state) => state.auth0.nick;

export const { setAuthAccessToken, setAuthUserInformation, clearAuthContext } =
  auth0Slice.actions;

export default auth0Slice.reducer;
