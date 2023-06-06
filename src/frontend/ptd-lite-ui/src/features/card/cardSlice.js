import { apiSlice } from '../../api/apiSlice';

export const cardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLastCards: builder.query({
      query: (username) => `/card?username=${username}`,
      providesTags: (result = [], error, arg) => [
        'Card',
        'newCard',
        ...result.map((id) => ({ type: 'Card', id })),
      ],
    }),
    getCardsDetails: builder.query({
      query: (cardId) => `/card/details?id=${cardId}`,
      providesTags: (result, error, arg) => [{ type: 'Card', id: arg }],
    }),
    addNewCard: builder.mutation({
      query: (card) => ({
        url: `/card/add`,
        method: 'POST',
        body: card,
      }),
      invalidatesTags: ['newCard'],
    }),
  }),
});

export const {
  useGetLastCardsQuery,
  useGetCardsDetailsQuery,
  useAddNewCardMutation,
} = cardApiSlice;
