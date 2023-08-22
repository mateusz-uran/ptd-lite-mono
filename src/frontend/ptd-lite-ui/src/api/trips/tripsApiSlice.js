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
      query: ({ cardId, trips }) => ({
        url: `/trip/add?cardId=${cardId}`,
        method: 'POST',
        body: trips,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Trips', id: 'LIST' }],
    }),
    deleteTrips: builder.mutation({
      query: ({ selectedTripIds, nickname }) => ({
        url: `/trip?username=${nickname}`,
        method: 'DELETE',
        body: selectedTripIds,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Trips', id: 'LIST' }],
    }),
    editTrip: builder.mutation({
      query: ({ tripId, updatedTrip, username }) => ({
        url: `/trip/update?username=${username}&tripId=${tripId}`,
        method: 'PATCH',
        body: updatedTrip,
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
      query: ({ tripIds, groupId }) => ({
        url: `/trip/addtogroup?groupId=${groupId}`,
        method: 'PATCH',
        body: tripIds,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Trips', id: 'LIST' }],
    }),
    removeTripFromGroup: builder.mutation({
      query: ({ tripIds, groupId }) => ({
        url: `/trip/removefromgroup?groupId=${groupId}`,
        method: 'PATCH',
        body: tripIds,
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
      query: ({ groupId, group }) => ({
        url: `/trip/updategroup?groupId=${groupId}`,
        method: 'PATCH',
        body: group,
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
