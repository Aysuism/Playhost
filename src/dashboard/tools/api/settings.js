import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../app';

export const settingsApi = createApi({
  reducerPath: 'settingsApi',
  baseQuery,
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => '/generalsettings',
      providesTags: ['Settings'],
    }),
    editSettings: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/ad/generalsettings/generalsettings/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Settings'],
    }),
  }),
});

export const {
  useGetSettingsQuery,
  useEditSettingsMutation,
} = settingsApi;