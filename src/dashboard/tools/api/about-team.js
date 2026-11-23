import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../app';

export const teamApi = createApi({
  reducerPath: 'teamApi',
  baseQuery,
  tagTypes: ['Team'],
  endpoints: (builder) => ({
    getTeamMembers: builder.query({
      query: () => '/team',
      providesTags: ['Team'],
    }),

    addTeamMember: builder.mutation({
      query: (formData) => ({
        url: '/ad/aboutuspage/team',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Team'],
    }),

    editTeamMember: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/ad/aboutuspage/team/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Team', id }],
    }),

    deleteTeamMember: builder.mutation({
      query: (id) => ({
        url: `/ad/aboutuspage/team/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Team'],
    }),
  }),
});

export const {
  useGetTeamMembersQuery,
  useAddTeamMemberMutation,
  useEditTeamMemberMutation,
  useDeleteTeamMemberMutation,
} = teamApi;