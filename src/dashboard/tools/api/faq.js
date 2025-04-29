import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const faqApi = createApi({
  reducerPath: 'faqApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://playhost-backend.onrender.com' }),
  endpoints: (builder) => ({
    getFaqs: builder.query({
      query: () => '/faqdown',
      providesTags: ['Faq'],
    }),
    addFaq: builder.mutation({
      query: (formData) => ({
        url: '/ad/faqpage/faqdown',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Faq'],
    }),
    editFaq: builder.mutation({
      query: ({ id, ...updatedFaq }) => ({
        url: `/ad/faqpage/faqdown/${id}`,
        method: 'PUT',
        body: updatedFaq,
      }),
      invalidatesTags: ['Faq'],
    }),
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/ad/faqpage/faqdown/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Faq'],
    }),
  }),
});

export const {
  useGetFaqsQuery,
  useAddFaqMutation,
  useEditFaqMutation,
  useDeleteFaqMutation,
} = faqApi;