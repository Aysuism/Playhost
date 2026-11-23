import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../app';

export const homePaymentApi = createApi({
  reducerPath: 'homePaymentApi',
  baseQuery,
  tagTypes: ['PaymentMethod'],
  endpoints: (builder) => ({
    getPayment: builder.query({
      query: () => '/paymentmethod',
      providesTags: ['PaymentMethod'],
    }),

    editPayment: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/ad/homepage/paymentmethod/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['PaymentMethod'],
    }),
  }),
});

export const {
  useGetPaymentQuery,
  useEditPaymentMutation,
} = homePaymentApi;