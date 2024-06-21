import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const massagesApi = createApi({
  reducerPath: 'massagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getMassages: builder.query({
      query: () => '',
      providesTags: ['Message'],
    }),
    sendMessage: builder.mutation({
      query: (newMessage) => ({
        method: 'POST',
        body: newMessage,
      }),
      providesTags: ['Message'],
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
        providesTags: ['Message'],
      }),
    }),
  }),
});

export const {
  useGetMassagesQuery,
  useSendMessageMutation,
  useRemoveMessageMutation,
} = massagesApi;
