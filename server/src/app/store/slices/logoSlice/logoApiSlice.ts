import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryForFile } from "../../baseQuery";
import { ApiResponseData } from "../../../types/user";
import { toast } from "react-toastify";
// import { ApiResponseData } from "@/app/types/user";
// import { Url } from "./urlClickSlice";

export interface Logo {
  logo_id: number,
  user_id: string;
  logo_path: string;
  created_at: string;

}

export const logoApiSlice = createApi({
  reducerPath: 'logoApi',
  baseQuery: baseQueryForFile({ url: '/logo' }),
  tagTypes: ['logo'],
  endpoints: (builder) => ({
    getLogos: builder.query<Logo[], void>({
      query: () => '/',
      transformResponse: (response: ApiResponseData<Logo[]>) => response.data,
      providesTags: ['logo'],
    }),

    addLogos: builder.mutation<any, { files: File[] }>({
      query: ({ files }) => {
        const formData = new FormData();
        console.log(files);

        files.forEach((file) => formData.append('files', file));
        return {
          url: '/create',
          method: 'POST',
          body: formData,
        };
      },
      transformResponse: (response: ApiResponseData<Logo[]>) => {
        console.log(response);
        return response.data;
      },
      invalidatesTags: ['logo'],
    }),
  })
})

export const { useGetLogosQuery, useAddLogosMutation } = logoApiSlice;

