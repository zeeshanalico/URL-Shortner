import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../baseQuery";
import { ApiResponseData } from "@/app/types/user";
import { Url } from "./urlClickSlice";

export const urlClickApiSlice = createApi({
    reducerPath: 'urlClickApi',
    baseQuery: baseQuery({ url: '/url-clicks/' }),
    tagTypes: ['URLClicks'],
    endpoints: (builder) => ({

        getClicks: builder.query<Url[], void>({
            query: () => 'url-statistics',
            transformResponse: (response: ApiResponseData<Url[]>) => response.data,
            providesTags: ['URLClicks'],
        })
    })
})

export const { useGetClicksQuery } = urlClickApiSlice;

