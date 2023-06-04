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

export const getSelectors = (username) => {
  const selectCardsResult =
    cardApiSlice.endpoints.getLastCards.select(username);

  const adapterSelectors = createSelector(selectCardsResult, (result) =>
    cardAdapter.getSelectors(() => result?.data ?? initialState)
  );

  return {
    selectAll: createSelector(adapterSelectors, (s) => s.selectAll(undefined)),
    selectIds: createSelector(adapterSelectors, (s) => s.selectIds(undefined)),
    selectEntities: createSelector(adapterSelectors, (s) =>
      s.selectEntities(undefined)
    ),
  };
};
