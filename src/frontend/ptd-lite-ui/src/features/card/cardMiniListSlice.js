import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosConfig';

const rawToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVlc2oxaVJObWFEcGZWb1E1UWJoViJ9.eyJpc3MiOiJodHRwczovL2Rldi10Nmo3MGM0NXNkMG1namFjLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NDYyMmI4MzI1M2E3NGQ0ZWU5MmY1YTciLCJhdWQiOlsiaHR0cHM6Ly9wdGQtbGl0ZS9hcGkiLCJodHRwczovL2Rldi10Nmo3MGM0NXNkMG1namFjLmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2ODU2MTg3ODAsImV4cCI6MTY4NTcwNTE4MCwiYXpwIjoiaWE2Z05RRmlVcTREdWdoTU1jTEQ2ajRPdmR4bkEzaFEiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.FFtAIcA2mL4Y-TJO2l_zEoCm-8ARBbCsbk0tosGbVPu4KcLOmcUwGuTwZcRI64bNsWO_q2ScmtHpxwxUxM8IbXb9krX3AWDLDnMfQT2sJcENu2Xq0ndNL30-QqLKtPLPsvi2O06FCBU5n8Dn-bst4lfW_ThZYgEnaUcieehBtohtWNiMnYrbAogMK-x9LD-VwowtMuPpmSZIiemumJXwMQv5zJ8N8RT0oCsIck_RpMvCxSqCZEtQZ1BtZzcCvVsP-LzfPSwupyWzo1p3e_8B4zS3gE5y4UX3Arl06-oN8IT3e16DmjVsnJ1iEvGeEdGEP4xv2RilR7b_yqzuOU1aTg';

export const getLastThreeCards = createAsyncThunk('/last', async (token) => {
  try {
    const response = await axiosInstance.get('/card/last', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { username: 'test123' },
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
