import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../apiSlice';

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
      query: ({ cardId, blue }) => ({
        url: `/fuel/blue/addmultiple?cardId=${cardId}`,
        method: 'POST',
        body: blue,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'AdBlue', id: 'LIST' }],
    }),
    updateAdBlue: builder.mutation({
      query: ({ blueId, blue }) => ({
        url: `/fuel/blue/update?blueId=${blueId}`,
        method: 'PATCH',
        body: blue,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'AdBlue', id: arg.blueId },
      ],
    }),
    deleteAdBlue: builder.mutation({
      query: (blueId) => ({
        url: `/fuel/blue/delete?blueId=${blueId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'AdBlue', id: arg.blueId },
      ],
    }),
  }),
});

export const {
  useGetBlueByCardIdQuery,
  useSaveAdBlueMutation,
  useUpdateAdBlueMutation,
  useDeleteAdBlueMutation,
} = blueApiSlice;

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
    selectById: (blueId) =>
      createSelector(selectBlueData, (s) => s.selectById(s, blueId)),
  };
};
