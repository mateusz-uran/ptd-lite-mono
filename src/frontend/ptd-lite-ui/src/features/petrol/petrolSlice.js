import { apiSlice } from '../../api/apiSlice';

export const petrolApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPetrolByCardId: builder.query({
      query: (cardId) => `/fuel/petrol?cardId=${cardId}`,
      providesTags: (result = [], error, arg) => [
        'Petrol',
        ...result.map((id) => ({ type: 'Petrol', id })),
      ],
    }),
    savePetrol: builder.mutation({
      query: (adPetrolPayload) => ({
        url: `/fuel/petrol/add?cardId=${adPetrolPayload.cardId}`,
        method: 'POST',
        body: adPetrolPayload.petrol,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Petrol', id: arg.cardId },
      ],
    }),
  }),
});

export const { useGetPetrolByCardIdQuery, useSavePetrolMutation } =
  petrolApiSlice;
