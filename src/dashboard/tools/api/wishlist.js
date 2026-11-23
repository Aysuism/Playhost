import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../app';

export const wishlistApi = createApi({
  reducerPath: 'wishlistApi',
  baseQuery,
  tagTypes: ['Wishlist'],
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => '/wishlist',
      providesTags: ['Wishlist'],
    }),
    addToWishlist: builder.mutation({
      query: (gameId) => ({ url: `/wishlist/${gameId}`, method: 'POST' }),
      invalidatesTags: ['Wishlist'],
    }),
    removeFromWishlist: builder.mutation({
      query: (gameId) => ({ url: `/wishlist/${gameId}`, method: 'DELETE' }),
      invalidatesTags: ['Wishlist'],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;