import { apiSlice } from '../../api/apiSlice';

export const cardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLastCards: builder.query({
      query: (username) => `/card/last?username=${username}`,
      providesTags: (result = [], error, arg) => [
        'Card',
        ...result.map((id) => ({ type: 'Card', id })),
      ],
    }),
    getCardsDetails: builder.query({
      query: (cardId) => `/card/details?id=${cardId}`,
      providesTags: (result, error, arg) => [{ type: 'Card', id: arg }],
    }),
  }),
});

export const { useGetLastCardsQuery, useGetCardsDetailsQuery } = cardApiSlice;
