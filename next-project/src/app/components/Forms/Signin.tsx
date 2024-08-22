'use client'
import React, { useState } from 'react'
import SigninForm from './Form'
import { signin } from '../../api/auth'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { validateSignin } from '../../validations/authValidations'
import { loginAsync } from '@/app/states/loginAsync'
import errorHandler from '../../Error/errorHandler'
import { AppDispatch, RootState } from '@/app/store/store'
const Signin = () => {
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth)
    const router = useRouter();

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData.entries());
        try {
            const validData = validateSignin(formValues as { email: string; password: string; });
            const resultAction = await dispatch(loginAsync(validData));//it will return action
            if (loginAsync.fulfilled.match(resultAction)) {//matching the action of fullfilled with action we did
                router.replace('/dashboard');
                toast.success('Login successful');
            }
        } catch (error) {
            errorHandler(error)
        }
    }

    return (
        <SigninForm type='signin' submitHandler={submitHandler} auth={auth} />
    )
}

export default Signin