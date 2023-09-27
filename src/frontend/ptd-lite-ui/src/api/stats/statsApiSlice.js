import { apiSlice } from '../apiSlice';

export const statisticsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStatisticsFromYearByUsername: builder.query({
      query: ({ year, username }) => `/card/stat/${year}/${username}`,
      providesTags: (result = [], error, arg) => [
        'Statistics',
        ...result.map((id) => ({ type: 'Statistics', id })),
      ],
    }),
  }),
});

export const { useGetStatisticsFromYearByUsernameQuery } = statisticsApiSlice;
