import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const gameCommentApi = createApi({
  reducerPath: 'gameCommentApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://playhost-backend.onrender.com',
    prepareHeaders: (headers) => {
      headers.set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSXNsYW0iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDQzNzYyMTZ9.IOXM_l3GyD0pp3RAXKrURsJyCHXrSrBpzPCAHR5BqSw');
      return headers;
    }
  }),
  tagTypes: ['Comment'],
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => '/gamecustomerreviews',
      providesTags: ['Comment'],
    }),
    addComment: builder.mutation({
      query: (formData) => ({
        url: '/ad/gamespage/gamecustomerreviews',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Comment'],
    }),
    editComment: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/ad/gamespage/gamecustomerreviews/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Comment'],
    }),
    deleteComment: builder.mutation({
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
} = gameCommentApi;