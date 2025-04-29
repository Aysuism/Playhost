import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reviewsApi = createApi({
  reducerPath: 'reviewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://playhost-backend.onrender.com' }),
  tagTypes: ['Review'],
  endpoints: (builder) => ({
    // Get all reviews
    getReviews: builder.query({
      query: () => '/customerreviews',
      providesTags: ['Review'],
    }),

    // Add new review
    addReview: builder.mutation({
      query: (formData) => ({
        url: '/ad/aboutuspage/customerreviews',
        method: 'POST',
        body: formData,
        // Add this if your backend needs it:

      }),
      invalidatesTags: ['Review'],
    }),

    // Edit existing review
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