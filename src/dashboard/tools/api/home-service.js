import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const homeServiceApi = createApi({
  reducerPath: 'homeServiceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://playhost-backend.onrender.com' }),
  endpoints: (builder) => ({
    getService: builder.query({
      query: () => '/heroservice',
      providesTags: ['Service'],
    }),

    addService: builder.mutation({
      query: (formData) => ({
        url: '/ad/homepage/heroservice',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Service'],
    }),

    editService: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/ad/homepage/heroservice/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Service'],
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `/ad/homepage/heroservice/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Service'],
    }),
  }),
});

export const {
  useGetServiceQuery,
  useAddServiceMutation,
  useEditServiceMutation,
  useDeleteServiceMutation,
} = homeServiceApi;