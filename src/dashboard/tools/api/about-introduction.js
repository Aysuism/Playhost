import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../app';

export const introductionApi = createApi({
  reducerPath: 'introductionApi',
  baseQuery,
  tagTypes: ['Introduction'],
  endpoints: (builder) => ({
    getIntroduction: builder.query({
      query: () => '/introduction',
      providesTags: ['Introduction'],
    }),

    editIntroduction: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/ad/aboutuspage/introduction/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Introduction', id }],
    }),
  }),
});

export const {
  useGetIntroductionQuery,
  useEditIntroductionMutation,
} = introductionApi;