import { apiSlice } from '../apiSlice';

export const cardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLastCards: builder.query({
      query: (username) => `/card?username=${username}`,
      providesTags: (result = [], error, arg) => [
        'Card',
        'miniList',
        ...result.map((id) => ({ type: 'Card', id })),
      ],
    }),
    getCardsDetails: builder.query({
      query: (cardId) => `/card/details?id=${cardId}`,
      providesTags: (result, error, arg) => [{ type: 'Card', id: arg }],
    }),
    addNewCard: builder.mutation({
      query: (card) => ({
        url: `/card/addcard`,
        method: 'POST',
        body: card,
      }),
      invalidatesTags: ['miniList'],
    }),
    updateCard: builder.mutation({
      query: (card) => ({
        url: `/card?cardId=${card.id}`,
        method: 'PATCH',
        body: card.number,
      }),
      invalidatesTags: ['miniList'],
    }),
    deletecard: builder.mutation({
      query: (cardId) => ({
        url: `/card/delete?cardId=${cardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['miniList'],
    }),
  }),
});

export const {
  useGetLastCardsQuery,
  useGetCardsDetailsQuery,
  useAddNewCardMutation,
  useUpdateCardMutation,
  useDeletecardMutation,
} = cardApiSlice;
