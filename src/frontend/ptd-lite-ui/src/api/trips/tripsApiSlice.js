import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../apiSlice';

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
        url: `/trip/add?cardId=${tripPayload.cardId}`,
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
      invalidatesTags: (result, error, arg) => [{ type: 'Trips', id: 'LIST' }],
    }),
    editTrip: builder.mutation({
      query: (tripPayload) => ({
        url: `/trip/update?tripId=${tripPayload.tripId}`,
        method: 'PATCH',
        body: tripPayload.updatedTrip,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Trips', id: arg.tripId },
      ],
    }),
    createTripsGroup: builder.mutation({
      query: (tripGroupPayload) => ({
        url: '/trip/addgroup',
        method: 'POST',
        body: tripGroupPayload,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Trips', id: 'LIST' }],
    }),
    addTripToExistingGroup: builder.mutation({
      query: (tripGroupPayload) => ({
        url: `/trip/addtogroup?groupId=${tripGroupPayload.groupId}`,
        method: 'PATCH',
        body: tripGroupPayload.tripIds,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Trips', id: 'LIST' }],
    }),
    removeTripFromGroup: builder.mutation({
      query: (tripGroupPayload) => ({
        url: `/trip/removefromgroup?groupId=${tripGroupPayload.groupId}`,
        method: 'PATCH',
        body: tripGroupPayload.tripIds,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Trips', id: 'LIST' }],
    }),
    deleteTripGroup: builder.mutation({
      query: (groupId) => ({
        url: `/trip/deletegroup?groupId=${groupId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Trips', id: 'LIST' }],
    }),
    updateTripGroupInformation: builder.mutation({
      query: (tripGroupPayload) => ({
        url: `/trip/updategroup?groupId=${tripGroupPayload.groupId}`,
        method: 'PATCH',
        body: tripGroupPayload.request,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Trips', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetTripsByCardIdQuery,
  useSaveTripsMutation,
  useDeleteTripsMutation,
  useEditTripMutation,
  useCreateTripsGroupMutation,
  useAddTripToExistingGroupMutation,
  useRemoveTripFromGroupMutation,
  useDeleteTripGroupMutation,
  useUpdateTripGroupInformationMutation,
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
