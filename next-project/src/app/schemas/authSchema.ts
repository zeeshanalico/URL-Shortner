import { z } from 'zod'
export const signupSchema = z.object({
    // username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    cnfPassword: z.string().min(6, { message: "Confirm Password must be at least 6 characters long" }),
}).refine((data) => data.password === data.cnfPassword, {
    message: "Passwords don't match",
    path: ["cnfPassword"],
});

export const signinSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

