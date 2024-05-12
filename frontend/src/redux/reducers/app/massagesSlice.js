import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const massagesApi = createApi({
  reducerPath: 'massagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMassages: builder.query({
      query: () => '',
    }),
  }),
});

export const {
    useGetMassagesQuery,
  } = massagesApi;
