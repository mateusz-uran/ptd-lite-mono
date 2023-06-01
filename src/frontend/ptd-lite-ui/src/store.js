import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './features/card/cardMiniListSlice';
import authReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    card: cardReducer,
  },
});
