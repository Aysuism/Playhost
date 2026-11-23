import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../app';

export const reviewsApi = createApi({
  reducerPath: 'reviewsApi',
  baseQuery,
  tagTypes: ['Review'],
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => '/customerreviews',
      providesTags: ['Review'],
    }),

    addReview: builder.mutation({
      query: (formData) => ({
        url: '/ad/aboutuspage/customerreviews',
        method: 'POST',
        body: formData,

      }),
      invalidatesTags: ['Review'],
    }),

    editReview: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/ad/aboutuspage/customerreviews/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Review', id }],
    }),

    // Delete review
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/ad/aboutuspage/customerreviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Review'],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useAddReviewMutation,
  useEditReviewMutation,
  useDeleteReviewMutation,
} = reviewsApi;