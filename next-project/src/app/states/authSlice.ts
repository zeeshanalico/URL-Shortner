// store/slices/authSlice.ts
'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginAsync } from './loginAsync';
import { AuthStateI, RoleObjI } from '../../../types/authTypes';
import Cookies from 'js-cookie';

const initialState: AuthStateI = {
    isAuthenticated: Cookies.get('access_token') && Cookies.get('role_name') ? true : false,
    role_name: Cookies.get('role_name') || null,
    error: null,
    access_token: Cookies.get('access_token') || null,
    isLoading: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            Cookies.remove('access_token');
            Cookies.remove('role_name');
            state.isAuthenticated = false;
            state.role_name = null;
            state.access_token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginAsync.fulfilled, (state, action: PayloadAction<{ access_token: any; user_role: RoleObjI }>) => {
                const { access_token, user_role: { role_name } } = action.payload;
                Cookies.set('access_token', access_token);
                Cookies.set('role_name', role_name);
                state.role_name = role_name;
                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Login failed.';
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
