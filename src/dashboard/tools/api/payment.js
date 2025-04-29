import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const homePaymentApi = createApi({
  reducerPath: 'homePaymentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://playhost-backend.onrender.com' }),
  tagTypes: ['PaymentMethod'],
  endpoints: (builder) => ({
    getPayment: builder.query({
      query: () => '/paymentmethod',
      providesTags: ['PaymentMethod'],
    }),

    addPayment: builder.mutation({
      query: (body) => ({
        url: '/ad/homepage/paymentmethod',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['PaymentMethod'],
    }),

    editPayment: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/ad/homepage/paymentmethod/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['PaymentMethod'],
    }),

    deletePayment: builder.mutation({
      query: (id) => ({
        url: `/ad/homepage/paymentmethod/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PaymentMethod'],
    }),
  }),
});

export const {
  useGetPaymentQuery,
  useAddPaymentMutation,
  useEditPaymentMutation,
  useDeletePaymentMutation,
} = homePaymentApi;