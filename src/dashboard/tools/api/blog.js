import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../app';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery,
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => '/newspage',
      providesTags: ['Blog'],
    }),

    addBlog: builder.mutation({
      query: (formData) => ({
        url: '/ad/newspage/blogpage',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Blog'],
    }),

    editBlog: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/ad/newspage/blogpage/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Blog'],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/ad/newspage/blogpage/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useAddBlogMutation,
  useEditBlogMutation,
  useDeleteBlogMutation,
} = blogApi;