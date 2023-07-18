import { apiSlice } from '../apiSlice';

export const cardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLastCards: builder.query({
      query: (username) => `/card?username=${username}`,
      providesTags: (result = [], error, arg) => [
        'Card',
        'cardsMiniList',
        ...result.map((id) => ({ type: 'Card', id })),
      ],
    }),
    getCardsDetails: builder.query({
      query: (cardId) => `/card/details?id=${cardId}`,
      providesTags: (result, error, arg) => [{ type: 'Card', id: arg }],
    }),
    getCardsFromArchive: builder.query({
      query: (payload) =>
        `/card/archive?username=${payload.username}&firstDate=${payload.firstDate}&secondDate=${payload.secondDate}`,
      providesTags: (result = [], error, arg) => [
        'Card',
        'cardsBigList',
        ...result.map((id) => ({ type: 'Card', id })),
      ],
    }),
    addNewCard: builder.mutation({
      query: (card) => ({
        url: `/card/addcard`,
        method: 'POST',
        body: card,
      }),
      invalidatesTags: ['Card'],
    }),
    updateCard: builder.mutation({
      query: (card) => ({
        url: `/card?cardId=${card.id}`,
        method: 'PATCH',
        body: card.number,
      }),
      invalidatesTags: ['cardsMiniList', 'cardsBigList'],
    }),
    deletecard: builder.mutation({
      query: (cardId) => ({
        url: `/card/delete?cardId=${cardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Card', id: arg.cardId },
      ],
    }),
    retrieveUserRates: builder.query({
      query: (username) => `/card/rates?username=${username}`,
    }),
  }),
});

export const {
  useGetLastCardsQuery,
  useGetCardsDetailsQuery,
  useGetCardsFromArchiveQuery,
  useAddNewCardMutation,
  useUpdateCardMutation,
  useDeletecardMutation,
  useRetrieveUserRatesQuery,
} = cardApiSlice;
