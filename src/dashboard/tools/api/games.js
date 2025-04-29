import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const gamesApi = createApi({
  reducerPath: 'gamesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://playhost-backend.onrender.com' }),
  tagTypes: ['Game'],
  endpoints: (builder) => ({
    getGames: builder.query({
      query: () => '/games',
      providesTags: ['Game'],
    }),
    addGame: builder.mutation({
      query: (formData) => ({
        url: '/ad/gamespage/games',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Game'],
    }),

    editGame: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/ad/gamespage/games/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Game'],
    }),
    
    deleteGame: builder.mutation({
      query: (id) => ({
        url: `/ad/gamespage/games/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Game'],
    }),
  }),
});

export const {
  useGetGamesQuery,
  useAddGameMutation,
  useEditGameMutation,
  useDeleteGameMutation,
} = gamesApi;