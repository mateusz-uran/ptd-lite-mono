import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../api/apiSlice';

const cardAdapter = createEntityAdapter({});

const initialState = cardAdapter.getInitialState();

export const cardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLastCards: builder.query({
      query: (username) => `/card/last?username=${username}`,
      transformResponse: (responseData) => {
        return cardAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: 'Card', id: 'LIST' },
        ...result.ids.map((id) => ({ type: 'Card', id })),
      ],
    }),
  }),
});

export const { useGetLastCardsQuery } = cardApiSlice;

export const selectCardsResult = cardApiSlice.endpoints.getLastCards.select();

const selectCardsData = createSelector(
  selectCardsResult,
  (cardsResult) => cardsResult.data
);

export const { selectAll: selectAllCards, selectIds: selectCardsIds } =
  cardAdapter.getSelectors((state) => selectCardsData(state) ?? initialState);
