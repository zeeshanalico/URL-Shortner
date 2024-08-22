'use client'
import axios from 'axios';
import Cookies from 'js-cookie';
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  },
});
