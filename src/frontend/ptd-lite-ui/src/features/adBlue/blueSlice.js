import { apiSlice } from '../../api/apiSlice';

export const blueApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlueByCardId: builder.query({
      query: (cardId) => `/fuel/blue?cardId=${cardId}`,
      providesTags: (result = [], error, arg) => [
        'AdBlue',
        ...result.map((id) => ({ type: 'AdBlue', id })),
      ],
    }),
    saveAdBlue: builder.mutation({
      query: (adBluePayload) => ({
        url: `/fuel/blue/add?cardId=${adBluePayload.cardId}`,
        method: 'POST',
        body: adBluePayload.blue,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'AdBlue', id: arg.cardId },
      ],
    }),
  }),
});

export const { useGetBlueByCardIdQuery, useSaveAdBlueMutation } = blueApiSlice;
