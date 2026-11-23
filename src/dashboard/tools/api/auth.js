import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, } from '../../../app';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/api/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    getProfile: builder.query({
      query: () => '/api/auth/me',
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
} = authApi;