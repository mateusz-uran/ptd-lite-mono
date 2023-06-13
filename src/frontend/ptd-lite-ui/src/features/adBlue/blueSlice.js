import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../api/apiSlice';

const adBlueApiAdapter = createEntityAdapter();

const initialState = adBlueApiAdapter.getInitialState();

export const blueApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlueByCardId: builder.query({
      query: (cardId) => `/fuel/blue?cardId=${cardId}`,
      transformResponse: (responseData) => {
        return adBlueApiAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (!error) {
          return [
            { type: 'AdBlue', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'AdBlue', id })),
          ];
        } else {
          return [{ type: 'AdBlue', id: 'LIST' }];
        }
      },
    }),
    saveAdBlue: builder.mutation({
      query: (adBluePayload) => ({
        url: `/fuel/blue/add?cardId=${adBluePayload.cardId}`,
        method: 'POST',
        body: adBluePayload.blue,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'AdBlue', id: 'LIST' }],
    }),
  }),
});

export const { useGetBlueByCardIdQuery, useSaveAdBlueMutation } = blueApiSlice;

export const getAdBlueSelectors = (query) => {
  const selectAdBlueResult =
    blueApiSlice.endpoints.getBlueByCardId.select(query);

  const selectBlueData = createSelector(selectAdBlueResult, (result) =>
    adBlueApiAdapter.getSelectors(() => result?.data ?? initialState)
  );

  return {
    selectAll: createSelector(selectBlueData, (s) => s.selectAll(undefined)),
    selectEntities: createSelector(selectBlueData, (s) =>
      s.selectEntities(undefined)
    ),
  };
};
