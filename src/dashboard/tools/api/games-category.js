import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const gameCategoryApi = createApi({
    reducerPath: 'gameCategoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://playhost-backend.onrender.com' }),
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => '/category',
            providesTags: ['Category'],
        }),

        addCategory: builder.mutation({
            query: (formData) => ({
                url: '/ad/gamecategory/category/',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Category'],
        }),

        editCategory: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/ad/gamecategory/category/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Category'],
        }),

        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/ad/gamecategory/category/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],
        }),
    }),
});

export const {
    useGetCategoryQuery,
    useAddCategoryMutation,
    useEditCategoryMutation,
    useDeleteCategoryMutation,
} = gameCategoryApi;