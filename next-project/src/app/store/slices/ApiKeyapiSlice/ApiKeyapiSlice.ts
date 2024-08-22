import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../baseQuery';
import errorHandler from '@/app/Error/errorHandler';
import { toast } from 'react-toastify';
export interface ApiKey {
    api_key_id: number;
    user_id: string;
    api_key: string;
    created_at: string;
    expires_at?: string;
    updated_at: string;
    deleted_at?: string;
    is_deleted: boolean;
}

export interface CreateApiKeyDto {
    expiration_date?: string;
}

export interface UpdateApiKeyDto {
    expires_at?: string;
}

export const apiKeyApi = createApi({
    reducerPath: 'apiKeyApi',
    baseQuery: baseQuery({ url: '/apikey' }),
    tagTypes: ['ApiKey'],
    endpoints: (builder) => ({

        getApiKeys: builder.query<ApiKey[], void>({
            query: () => '/all',
            providesTags: ['ApiKey'],
            transformResponse: (response: any) => response.data
        }),

        getApiKeyById: builder.query<ApiKey, number>({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'ApiKey', id }],
        }),

        createApiKey: builder.mutation<ApiKey, CreateApiKeyDto>({
            query: (newApiKey) => ({
                url: '/',
                method: 'POST',
                body: newApiKey,
            }),
            transformResponse: (res: any) => {
                return res

            },
            invalidatesTags: ['ApiKey'],
        }),
        updateApiKey: builder.mutation<ApiKey, { id: number; data: UpdateApiKeyDto }>({
            query: ({ id, data }) => ({
                url: `/apikey/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'ApiKey', id }],
        }),

        deleteApiKey: builder.mutation<void, number>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ApiKey'],
        }),
    }),
});

export const {
    useGetApiKeysQuery,
    useGetApiKeyByIdQuery,
    useCreateApiKeyMutation,
    useUpdateApiKeyMutation,
    useDeleteApiKeyMutation,
} = apiKeyApi;
