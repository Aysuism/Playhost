import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const counterApi = createApi({
  reducerPath: 'counterApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://playhost-backend.onrender.com' }),
  tagTypes: ['Counter'],
  endpoints: (builder) => ({
    getCounters: builder.query({
      query: () => '/counter',
      providesTags: ['Counter'],
    }),

    addCounter: builder.mutation({
      query: (counterData) => ({
        url: '/ad/aboutuspage/counter',
        method: 'POST',
        body: counterData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Counter'],
    }),

    editCounter: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/ad/aboutuspage/counter/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Counter'],
    }),

    deleteCounter: builder.mutation({
      query: (id) => ({
        url: `/ad/aboutuspage/counter/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Counter'],
    }),
  }),
});

export const {
  useGetCountersQuery,
  useAddCounterMutation,
  useEditCounterMutation,
  useDeleteCounterMutation,
} = counterApi;