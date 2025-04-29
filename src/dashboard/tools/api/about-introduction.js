import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const introductionApi = createApi({
  reducerPath: 'introductionApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://playhost-backend.onrender.com' }),
  tagTypes: ['Introduction'],
  endpoints: (builder) => ({
    getIntroduction: builder.query({
      query: () => '/introduction',
      providesTags: ['Introduction'],
    }),

    addIntroduction: builder.mutation({
      query: (formData) => ({
        url: '/ad/aboutuspage/introduction',
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Introduction'],
    }),


    // Edit existing introduction
    editIntroduction: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/ad/aboutuspage/introduction/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Introduction', id }],
    }),

    // Delete introduction
    deleteIntroduction: builder.mutation({
      query: (id) => ({
        url: `/ad/aboutuspage/introduction/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Introduction'],
    }),
  }),
});

export const {
  useGetIntroductionQuery,
  useAddIntroductionMutation,
  useEditIntroductionMutation,
  useDeleteIntroductionMutation,
} = introductionApi;