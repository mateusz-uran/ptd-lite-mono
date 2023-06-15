import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../api/apiSlice';

const petrolApiAdatper = createEntityAdapter();

const initialState = petrolApiAdatper.getInitialState();

export const petrolApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPetrolByCardId: builder.query({
      query: (cardId) => `/fuel/petrol?cardId=${cardId}`,
      transformResponse: (responseData) => {
        return petrolApiAdatper.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (!error) {
          return [
            { type: 'Petrol', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Petrol', id })),
          ];
        } else {
          return [{ type: 'Petrol', id: 'LIST' }];
        }
      },
    }),
    savePetrol: builder.mutation({
      query: (fuelPayload) => ({
        url: `/fuel/petrol/add?cardId=${fuelPayload.cardId}`,
        method: 'POST',
        body: fuelPayload.petrol,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Petrol', id: 'LIST' }],
    }),
  }),
});

export const { useGetPetrolByCardIdQuery, useSavePetrolMutation } =
  petrolApiSlice;

export const getPetrolSelectors = (query) => {
  const selectPetrolResult =
    petrolApiSlice.endpoints.getPetrolByCardId.select(query);

  const selectPetrolData = createSelector(selectPetrolResult, (result) =>
    petrolApiAdatper.getSelectors(() => result?.data ?? initialState)
  );

  return {
    selectAll: createSelector(selectPetrolData, (s) => s.selectAll(undefined)),
    selectEntities: createSelector(selectPetrolData, (s) =>
      s.selectEntities(undefined)
    ),
  };
};
