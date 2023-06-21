import { configureStore } from '@reduxjs/toolkit';
import auht0Reducer from './features/auth/auth0Slice';

export const store = configureStore({
  reducer: {
    auth0: auht0Reducer,
  },
});
