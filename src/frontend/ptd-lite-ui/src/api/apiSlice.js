import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_API_URL,
  }),
  tagTypes: ["Card", "Petrol", "Trips", "AdBlue"],
  endpoints: (builder) => ({}),
});
