import { apiSlice } from '../../api/apiSlice';

export const tripApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTripsByCardId: builder.query({
      query: (cardId) => `/trip?cardId=${cardId}`,
      providesTags: (result = [], error, arg) => [
        'Trips',
        ...result.map((id) => ({ type: 'Trips', id })),
      ],
    }),
    saveTrips: builder.mutation({
      query: (tripPayload) => ({
        url: `/trip?cardId=${tripPayload.cardId}`,
        method: 'POST',
        body: tripPayload.trips,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Trips', id: arg.cardId },
      ],
    }),
  }),
});

export const { useGetTripsByCardIdQuery, useSaveTripsMutation } = tripApiSlice;
