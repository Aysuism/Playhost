import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../app';

export const homeFooterApi = createApi({
  reducerPath: 'homeFooterApi',
  baseQuery,
  tagTypes: ['HomeFooter'],
  endpoints: (builder) => ({
    getHomeFooter: builder.query({
      query: () => '/homefooter',
      providesTags: ['HomeFooter'],
    }),

    editHomeFooter: builder.mutation({
      query: (formData) => ({
        url: '/ad/homepage/homefooter',
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['HomeFooter'],
    }),
  }),
});

export const {
  useGetHomeFooterQuery,
  useEditHomeFooterMutation,
} = homeFooterApi;