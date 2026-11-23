import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../app';

export const gameCommentApi = createApi({
  reducerPath: 'gameCommentApi',
  baseQuery,
  tagTypes: ['Comment'],
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => '/gamecustomerreviews',
      providesTags: ['Comment'],
    }),

    // ---------- public site (logged-in users, JSON) ----------
    addComment: builder.mutation({
      query: (body) => ({
        url: '/gamecustomerreviews',          // NO /ad/gamespage here
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Comment'],
    }),
    editComment: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/gamecustomerreviews/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Comment'],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/gamecustomerreviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comment'],
    }),

    // ---------- dashboard (admin, FormData) ----------
    adminAddComment: builder.mutation({
      query: (formData) => ({
        url: '/ad/gamespage/gamecustomerreviews',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Comment'],
    }),
    adminEditComment: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/ad/gamespage/gamecustomerreviews/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Comment'],
    }),
    adminDeleteComment: builder.mutation({
      query: (id) => ({
        url: `/ad/gamespage/gamecustomerreviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
  useAdminAddCommentMutation,
  useAdminEditCommentMutation,
  useAdminDeleteCommentMutation,
} = gameCommentApi;