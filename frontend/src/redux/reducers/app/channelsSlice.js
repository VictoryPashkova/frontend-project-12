import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/channels',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
    }),
  }),
});

export const {
    useGetChannelsQuery,
    useAddChannelMutation,
  } = channelsApi;
