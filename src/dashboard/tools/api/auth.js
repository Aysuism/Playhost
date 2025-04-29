import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://playhost-backend.onrender.com',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('x-auth-token', token); // Match backend header
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/auth/login', // Confirm exact endpoint
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/api/auth/register', // Confirm exact endpoint
        method: 'POST',
        body: userData,
      }),
    }),
    getProfile: builder.query({
      query: () => '/api/auth/me', // Confirm exact endpoint
    }),
  }),
});

export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useGetMeQuery 
} = authApi;