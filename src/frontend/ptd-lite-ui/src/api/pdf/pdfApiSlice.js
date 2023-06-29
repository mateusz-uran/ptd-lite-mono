import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

const initialState = {
  isLoading: false,
};

export const generatePdf = createAsyncThunk(
  '/pdf/generate-doc',
  async (arg, { getState }) => {
    const accessToken = getState().auth0.accessToken;
    try {
      const response = await axios.post(
        `${API_URL}/pdf/generate-doc`,
        arg.additionalInfo,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            username: arg.username,
            cardId: arg.cardId,
            page: arg.page,
          },
          responseType: 'blob',
        }
      );

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const objectURL = URL.createObjectURL(blob);

      window.open(objectURL, '_blank');

      URL.revokeObjectURL(objectURL);
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF');
    }
  }
);

const pdfApiSlice = createSlice({
  name: 'pdfApi',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(generatePdf.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(generatePdf.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(generatePdf.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const selectIsLoading = (state) => state.pdfApi.isLoading;

export default pdfApiSlice.reducer;
