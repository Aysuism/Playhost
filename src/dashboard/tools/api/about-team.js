import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const teamApi = createApi({
  reducerPath: 'teamApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://playhost-backend.onrender.com' }),
  tagTypes: ['Team'],
  endpoints: (builder) => ({
    // Get all team members
    getTeamMembers: builder.query({
      query: () => '/team',
      providesTags: ['Team'],
    }),

    // Add new team member
    addTeamMember: builder.mutation({
      query: (formData) => ({
        url: '/ad/aboutuspage/team',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Team'],
    }),

    // Edit existing team member
    editTeamMember: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/ad/aboutuspage/team/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Team', id }],
    }),

    // Delete team member
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