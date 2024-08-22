import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/axios";
import { SigninI, RoleObjI } from '../types/authTypes';
import errorHandler from "../Error/errorHandler";
import { AxiosError } from "axios";
export const loginAsync = createAsyncThunk<
  { access_token: string; user_role: RoleObjI }, // Success payload type
  SigninI, // Argument type
  { rejectValue: string } // Error payload type
>(
  'auth/loginAsync',
  async ({ email, password }: SigninI, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      const {  statusCode, data: { access_token, user_role } } = response.data;
      
      if (statusCode === 200) {
        return { user_role, access_token };
      } else {
        return rejectWithValue('not authorized');
      }
    } catch (error) {
      if (error instanceof AxiosError)
        errorHandler(error);

      return rejectWithValue('An unknown error occurred');
    }
  }
);
