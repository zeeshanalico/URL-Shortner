'use client'
import React from 'react'
import SignupForm from './Form'
import { toast } from 'react-toastify'
import { signup } from '../../api/auth'
import { validateSignup } from '../../validations/authValidations'
import { RootState } from '@/app/store/store'
import { useSelector } from 'react-redux'

const Signup = () => {
    const auth = useSelector((state: RootState) => state.auth)

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData.entries());

        try {
            const validData = validateSignup(formValues as { email: string; password: string; cnfPassword: string; });
            const response = await signup(validData);
            console.log(response);
            toast.success("Signup successful!");
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred");
            }
        }
    }
    return (
        <SignupForm type='signup' submitHandler={submitHandler} auth={auth} />
    );
}

export default Signup;
