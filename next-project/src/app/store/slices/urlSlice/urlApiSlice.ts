import { createApi } from '@reduxjs/toolkit/query/react';
import { Url } from '@/app/types/url';
import { baseQuery } from '@/app/store/baseQuery';
type URLTYPE = 'store' | 'product' | 'misc'
import { GenerateUrlFormState as FormState } from '@/app/types/url';
export const urlApiSlice = createApi({
  reducerPath: 'urlApi',
  tagTypes: ['Urls'],// <---- declare tagTypes before use them
  baseQuery: baseQuery({ url: '/url/' }),
  endpoints: (builder) => ({
    getUrls: builder.query<{ limit: number; pageNumber: number; offset: any; totalRecords: any; urls: Url[] }, { pregenerated?: boolean; pageNumber?: number; limit?: number }>({
      query: ({ pregenerated = false, pageNumber, limit = 5 }) => {
        console.log(pageNumber);

        const queryParam = pregenerated ? 'pregenerated=true' : '';
        const url = `/?${queryParam}&page=${pageNumber}&limit=${limit}`
        console.log(url);
        return {
          url,
          method: 'GET',
        };
      },
      transformResponse: (response: any) => {
        console.log(response.data);

        return response.data
      },
      providesTags: ['Urls'],
    }),

    getUrlTypes: builder.query<URLTYPE[], void>({
      query: () => 'urltypes',
      transformResponse: (response: any) => response.data,
      providesTags: ['Urls'],
    }),

    getUrlTags: builder.query<{ tag_id: number, tag_name: string }[], void>({
      query: () => 'tags',
      transformResponse: (response: any) => response.data,
      providesTags: ['Urls'],
    }),

    updateUrl: builder.mutation<void, { id: string; data: Partial<Url> }>({
      query: ({ id, data }) => ({
        url: `${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Urls'],
    }),

    shortenUrl: builder.mutation<void, Partial<Url>>({
      query: (data) => ({
        url: 'shorten',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Urls'],
    }),

    pregenrate: builder.mutation<void, { url_type: string }>({
      query: (data) => {
        console.log(data);

        return {
          url: `pregenerate`,
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['Urls'],
    }),

    deleteUrl: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Urls'],
    }),

    redirectUrl: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `${id}`,
        method: 'GET',
      }),
    }),

    updatePregeneratedUrl: builder.mutation<void, FormState>({
      query: (data) => {
        const { url_id, ...rest } = data;
        console.log(url_id, rest);
        return {
          url: `update-pregenerated/${url_id}`,
          method: 'PATCH',
          body: rest
        }
      },
      invalidatesTags: ['Urls'],
    })

  }),
});

export const {useUpdatePregeneratedUrlMutation, useGetUrlsQuery, useUpdateUrlMutation, useShortenUrlMutation, useDeleteUrlMutation, useGetUrlTypesQuery, useGetUrlTagsQuery, usePregenrateMutation } = urlApiSlice;
