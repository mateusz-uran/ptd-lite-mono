import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";

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
            { type: "Trips", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Trips", id })),
          ];
        } else {
          return [{ type: "Trips", id: "LIST" }];
        }
      },
    }),
    getLastTripByCardId: builder.query({
      query: (cardId) => `/trip/last?cardId=${cardId}`,
      transformResponse: (responseData) => {
        const lastTripAsArray = [responseData];
        return lastTripAsArray;
      },
      providesTags: ["LastTrip"],
    }),
    saveTrips: builder.mutation({
      query: ({ cardId, trips }) => ({
        url: `/trip/add?cardId=${cardId}`,
        method: "POST",
        body: trips,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Trips", id: "LIST" },
        "LastTrip",
      ],
    }),
    deleteTrips: builder.mutation({
      query: ({ selectedTripIds, nickname }) => ({
        url: `/trip?username=${nickname}`,
        method: "DELETE",
        body: selectedTripIds,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Trips", id: "LIST" },
        "LastTrip",
      ],
    }),
    editTrip: builder.mutation({
      query: ({ tripId, updatedTrip, username }) => ({
        url: `/trip/update?username=${username}&tripId=${tripId}`,
        method: "PATCH",
        body: updatedTrip,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Trips", id: arg.tripId },
        "LastTrip",
      ],
    }),
    createTripsGroup: builder.mutation({
      query: (tripGroupPayload) => ({
        url: "/trip/addgroup",
        method: "POST",
        body: tripGroupPayload,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Trips", id: "LIST" },
        "LastTrip",
      ],
    }),
    addTripToExistingGroup: builder.mutation({
      query: ({ tripIds, groupId }) => ({
        url: `/trip/addtogroup?groupId=${groupId}`,
        method: "PATCH",
        body: tripIds,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Trips", id: "LIST" },
        "LastTrip",
      ],
    }),
    removeTripFromGroup: builder.mutation({
      query: ({ tripIds, groupId }) => ({
        url: `/trip/removefromgroup?groupId=${groupId}`,
        method: "PATCH",
        body: tripIds,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Trips", id: "LIST" },
        "LastTrip",
      ],
    }),
    deleteTripGroup: builder.mutation({
      query: (groupId) => ({
        url: `/trip/deletegroup?groupId=${groupId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Trips", id: "LIST" },
        "LastTrip",
      ],
    }),
    updateTripGroupInformation: builder.mutation({
      query: ({ groupId, group }) => ({
        url: `/trip/updategroup?groupId=${groupId}`,
        method: "PATCH",
        body: group,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Trips", id: "LIST" },
        "LastTrip",
      ],
    }),
  }),
});

export const {
  useGetTripsByCardIdQuery,
  useGetLastTripByCardIdQuery,
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
