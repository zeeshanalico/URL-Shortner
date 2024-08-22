'use client'
import { User, CreateUserDto, UpdateUserDto, ApiResponseData, UserWithAdditionalAttributes } from '../../types/user'
import { AxiosResponse } from 'axios';
import { axiosInstance } from '../axios';
import successHandler from '@/app/Error/successHandler';

const apiEndpoint = '/users';

export const createUser = async (userData: CreateUserDto): Promise<User> => {
  const response = await axiosInstance.post<User>(apiEndpoint, userData);
  return response.data;
};

// Get all users
export const getUsers = async (): Promise<UserWithAdditionalAttributes[]> => {
  const response = await axiosInstance.get<ApiResponseData<UserWithAdditionalAttributes[]>>(apiEndpoint);
  return response.data.data;
};

// Get user by ID
export const getUserById = async (id: string): Promise<User> => {
  const response = await axiosInstance.get<User>(`${apiEndpoint}/${id}`);
  return response.data;
};

// Update a user
export const updateUser = async (id: string, userData: UpdateUserDto): Promise<User> => {
  const response = await axiosInstance.put<User>(`${apiEndpoint}/${id}`, userData);
  return response.data;
};

// Delete a user
export const deleteUser = async (id: string): Promise<User> => {
  const response = await axiosInstance.delete<User>(`${apiEndpoint}/${id}`);
  return response.data;
};

// Check username availability
export const checkUsernameAvailability = async (username: string): Promise<{ isAvailable: boolean }> => {
  const response = await axiosInstance.get(apiEndpoint, { params: { username } });
  return response.data;
};

// /src
//   /api
//     /axiosInstance.ts
//     /userService.ts
//   /components
//     /UserList.tsx
//     /UserForm.tsx
//     /UserDetail.tsx
//   /hooks
//     /useUsers.ts
//     /useUserMutation.ts
//   /types
//     /user.ts
//   /utils
//     /errorHandler.ts
//   /context
//     /QueryClientProvider.tsx
//   /pages
//     /admin
//       /index.tsx
