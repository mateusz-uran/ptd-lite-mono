import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../apiSlice';

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
      query: ({ cardId, petrol }) => ({
        url: `/fuel/petrol/addmultiple?cardId=${cardId}`,
        method: 'POST',
        body: petrol,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Petrol', id: 'LIST' }],
    }),
    updatePetrol: builder.mutation({
      query: ({ fuelId, petrol }) => ({
        url: `/fuel/petrol/update?fuelId=${fuelId}`,
        method: 'PATCH',
        body: petrol,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Petrol', id: arg.fuelId },
      ],
    }),
    deletePetrol: builder.mutation({
      query: (fuelId) => ({
        url: `/fuel/petrol/delete?fuelId=${fuelId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Petrol', id: arg.fuelId },
      ],
    }),
  }),
});

export const {
  useGetPetrolByCardIdQuery,
  useSavePetrolMutation,
  useUpdatePetrolMutation,
  useDeletePetrolMutation,
} = petrolApiSlice;

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
    selectById: (petrolId) =>
      createSelector(selectPetrolData, (s) => s.selectById(s, petrolId)),
  };
};
