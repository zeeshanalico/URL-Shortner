// validation.ts
import { SigninI, SignupI } from '../types/authTypes';
import { axiosInstance } from './axios';
export const signup = async (userData: SignupI) => {
  const response = await axiosInstance.post('/auth/signup', userData);
  return response.data;
};

export const signin = async (userData: SigninI) => {
  const response = await axiosInstance.post('/auth/signin', userData);
  return response.data;
};
