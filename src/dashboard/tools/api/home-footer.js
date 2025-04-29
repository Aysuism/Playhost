import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const homeFooterApi = createApi({
  reducerPath: 'homeFooterApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://playhost-backend.onrender.com' }),
  endpoints: (builder) => ({
    getHomeFooter: builder.query({
      query: () => '/homefooter',
      providesTags: ['HomeFooter'],
    }),

    addHomeFooter: builder.mutation({
      query: (formData) => ({
        url: '/ad/homepage/homefooter',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['HomeFooter'],
    }),

    editHomeFooter: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/ad/homepage/homefooter/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['HomeFooter'],
    }),

    deleteHomeFooter: builder.mutation({
      query: (id) => ({
        url: `/ad/homepage/homefooter/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['HomeFooter'],
    }),
  }),
});

export const {
  useGetHomeFooterQuery,
  useAddHomeFooterMutation,
  useEditHomeFooterMutation,
  useDeleteHomeFooterMutation,
} = homeFooterApi;