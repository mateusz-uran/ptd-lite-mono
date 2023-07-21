import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const NBP_EURO_API_URL = '/api/serverless/nbp/';

const initialState = {
  currency: [],
  status: 'idle',
  error: null,
};

export const retrieveEuroRate = createAsyncThunk(
  'nbp/currency',
  async (date) => {
    const response = await axios.get(NBP_EURO_API_URL + date);
    return response.data;
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    refetchCurrency: (state, action) => {
      state.status = 'idle';
    },
  },
  extraReducers(builder) {
    builder.addCase(retrieveEuroRate.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(retrieveEuroRate.fulfilled, (state, action) => {
      state.status = 'success';
      state.currency = action.payload;
    });
    builder.addCase(retrieveEuroRate.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    });
  },
});

export const checkCurrency = (state) => state.currency.currency;
export const checkCurrencyStatus = (state) => state.currency.status;
export const checkCurrencyError = (state) => state.currency.error;

export const { refetchCurrency } = currencySlice.actions;

export default currencySlice.reducer;
