// src/types/user.ts

export interface User {
  user_id: number;
  username: string;
  email: string;
  role: string;
}

export interface UserWithAdditionalAttributes extends User{
  created_at:string;
  updated_at:string;
  deleted_at:string;
}

export interface UserList extends Array<UserWithAdditionalAttributes> {}

export type CreateUserDto = Omit<User, 'id'>;//id is optional/rest are required

export type UpdateUserDto = Partial<User>;//all properties of user are optional

export interface ApiResponseData<T> {
  status: boolean;
  statusCode: number;
  path: string;
  message: string;
  timestamp: string;
  data: T
}
