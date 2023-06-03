import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth0.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLastCards: builder.query({
      query: (username) => `/card/last?username=${username}`,
    }),
    getSelectedCard: builder.query({
      query: (cardId) => `/card/details?id=${cardId}`,
    }),
  }),
});

export const { useGetLastCardsQuery, useGetSelectedCardQuery } = apiSlice;
