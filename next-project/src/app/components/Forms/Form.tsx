'use client'
import Image from "next/image";
import qr from './../../../../public/qr.svg';
import Link from "next/link";
import { useState, } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { logoName } from "@/app/constant";
type formType = 'signin' | 'signup'

interface User {
    // username: string;
    email: string;
    password: string;
    cnfPassword: string;
}

interface Props {
    type: formType;
    submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
    auth:any
}

export default function Form({ type, submitHandler,auth }: Props) {

    const inputClass = 'w-full ps-10 border-slate-400 placeholder:text-slate-400 nunito-regular p-2 border focus:border-green-300 rounded text-slate-400 outline-none';
    const labelClass = 'block text-lg font-medium text-slate-400 nunito-regular';

    const [user, setUser] = useState<User>({  email: '', password: '', cnfPassword: '' })

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevState => { return { ...prevState, [name]: value } })
    }

    return (
        <div className="min-h-screen p-8 flex justify-center bg-sky-200">
            <div className=" shadow-lg w-full rounded-lg flex flex-col md:flex-row bg-white text-slate-400 overflow-hidden max-w-4xl">
                <div className="md:w-1/2 p-8 flex flex-col justify-centermin-h-screen">
                <h1 className="text-5xl font playwrite-regular mx-auto my-8  text-sky-900 underline " >{logoName}</h1>
                                  <h2 className="text-3xl font-bold mb-4 text-sky-900  nunito-bold">{type === 'signup' ? "Register yourself!" : "Sign-In"}</h2>
                    <form className="space-y-4" onSubmit={submitHandler}>
                        {/* {type === 'signup' && <div>
                            <label htmlFor="username" className={labelClass}>Username</label>
                            <input type="text" onChange={changeHandler} value={user.username} name="username" id="username" className={inputClass} placeholder="Enter your name" />
                        </div>} */}
                        <div className="relative">
                            <label htmlFor="email" className={`${labelClass}`}>Email</label>
                            <input type="email" onChange={changeHandler} value={user.email} name="email" id="email" className={`${inputClass}`} placeholder="Enter your email" />
                            <span className="absolute left-3 bottom-3">
                                              <FaUser className="text-slate-400 text-xl text-bold" />
                                         </span>
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className={labelClass}>Password</label>
                            <input type="password" onChange={changeHandler} value={user.password} name="password" id="password" className={inputClass} placeholder="Enter your password" />
                            <span className="absolute left-3 bottom-3">
                                              <FaLock className="text-slate-400 text-xl text-bold" />
                                         </span>
                        </div>
                        {type === 'signup' && <div className="relative">
                            <label htmlFor="cnf-password" className={labelClass}>Confirm Password</label>
                            <input type="password" onChange={changeHandler} value={user.cnfPassword} name="cnfPassword" id="cnf-password" className={inputClass} placeholder="Enter confirm password" />
                            <span className="absolute left-3 bottom-3">
                                              <FaLock className="text-slate-400 text-xl text-bold" />
                                         </span>
                        </div>}
                        {type === 'signup' ?
                            <div className=" text-black">
                                Already have an account?
                                <Link href='/signin' className=" text-green-500 hover:text-slate hover:underline">signin</Link>
                            </div> : <div className=" text-black">
                                Don't have account yet?
                                <Link href='/signup' className=" text-green-500 hover:text- hover:underline">signup</Link>
                            </div>
                        }
                        <button type="submit" disabled={auth.isLoading} className="w-full text-white bg-green-400 py-2 rounded hover:bg-green-500 active:bg-green-600">{type === 'signup'  ? (auth.isLoading? 'Loading...' : 'Sign Up') : (auth.isLoading? 'Loading...' : 'Sign-In')}</button>
                    </form>
                </div>

                <div className="md:w-1/2 hidden md:flex bg-green-300 items-center justify-center">
                    <Image src={qr} width={300} height={300} alt="Illustration" className="object-cover h-full w-full saturate-200 " />
                </div>
            </div>
        </div>

    );
}

