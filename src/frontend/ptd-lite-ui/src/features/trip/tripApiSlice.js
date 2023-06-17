import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../api/apiSlice';

const tripApiAdapter = createEntityAdapter();

const initialState = tripApiAdapter.getInitialState();

export const tripApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTripsByCardId: builder.query({
      query: (cardId) => `/trip?cardId=${cardId}`,
      transformResponse: (responseData) => {
        return tripApiAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (!error) {
          return [
            { type: 'Trips', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Trips', id })),
          ];
        } else {
          return [{ type: 'Trips', id: 'LIST' }];
        }
      },
    }),
    saveTrips: builder.mutation({
      query: (tripPayload) => ({
        url: `/trip?cardId=${tripPayload.cardId}`,
        method: 'POST',
        body: tripPayload.trips,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Trips', id: 'LIST' }],
    }),
    deleteTrips: builder.mutation({
      query: (trips) => ({
        url: '/trip',
        method: 'DELETE',
        body: trips,
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: 'Trips', id: 'LIST' }];
      },
    }),
  }),
});

export const {
  useGetTripsByCardIdQuery,
  useSaveTripsMutation,
  useDeleteTripsMutation,
} = tripApiSlice;

export const getTripSelectors = (query) => {
  const selectTripsResult =
    tripApiSlice.endpoints.getTripsByCardId.select(query);

  const selectTripsData = createSelector(selectTripsResult, (result) =>
    tripApiAdapter.getSelectors(() => result?.data ?? initialState)
  );

  return {
    selectAll: createSelector(selectTripsData, (s) => s.selectAll(undefined)),
    selectEntities: createSelector(selectTripsData, (s) =>
      s.selectEntities(undefined)
    ),
  };
};
