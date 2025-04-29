import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const settingsApi = createApi({
  reducerPath: 'settingsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://playhost-backend.onrender.com' }),
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => '/generalsettings',
      providesTags: ['Settings'],
    }),
    addSettings: builder.mutation({
      query: (formData) => ({
        url: '/ad/generalsettings/generalsettings',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Settings'],
    }),
    editSettings: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/ad/generalsettings/generalsettings/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Settings'],
    }),
    deleteSettings: builder.mutation({
      query: (id) => ({
        url: `/ad/generalsettings/generalsettings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Settings'],
    }),
  }),
});

export const {
  useGetSettingsQuery,
  useAddSettingsMutation,
  useEditSettingsMutation,
  useDeleteSettingsMutation,
} = settingsApi;