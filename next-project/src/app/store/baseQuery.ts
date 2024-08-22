import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import Cookies from 'js-cookie';

export const baseQuery = ({ url }: { url: string }) => {
  return fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'}${url}`,
    prepareHeaders: (headers, { getState }) => {
      const token = Cookies.get('access_token') || '';
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });
} 

export const baseQueryForFile = ({ url }: { url: string }) => {
  return fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'}${url}`,
    prepareHeaders: (headers, { getState }) => {
      const token = Cookies.get('access_token') || '';
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        // headers.set('Content-Type', 'multipart/form-data');
      }
      return headers;
    },
  });

} 