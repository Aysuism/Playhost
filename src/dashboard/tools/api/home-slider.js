import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const homeSliderApi = createApi({
  reducerPath: 'homeSliderApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://playhost-backend.onrender.com',
  }),
  endpoints: (builder) => ({
    getSliders: builder.query({
      query: () => '/slider',
      providesTags: ['Slider'],
    }),

    addSlider: builder.mutation({
      query: (formData) => ({
        url: '/ad/homepage/slider',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Slider'],
    }),

    editSlider: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/ad/homepage/slider/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Slider'],
    }),

    deleteSlider: builder.mutation({
      query: (id) => ({
        url: `/ad/homepage/slider/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Slider'],
    }),
  }),
});

export const {
  useGetSlidersQuery,
  useAddSliderMutation,
  useEditSliderMutation,
  useDeleteSliderMutation,
} = homeSliderApi;