import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosConfig';

export const getLastThreeCards = createAsyncThunk('/last', async (payload) => {
  try {
    const response = await axiosInstance.get('/card/last', {
      headers: {
        Authorization: `Bearer ${payload.token}`,
      },
      params: { username: payload.username },
    });
    return response.data;
  } catch (error) {}
});

const initialState = {
  cardMiniListItems: [],
  isLoading: false,
};

const cardMiniListSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getLastThreeCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLastThreeCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cardMiniListItems = action.payload;
      })
      .addCase(getLastThreeCards.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const getThreeCards = (state) => state.card.cardMiniListItems;
export const getThreeCardsStatus = (state) => state.card.isLoading;

export default cardMiniListSlice.reducer;
