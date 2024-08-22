import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { axiosInstance } from '@/app/api/axios';
import errorHandler from '@/app/Error/errorHandler';

async function middleware(request: NextRequest) {
    try {
        const access_token = request.cookies.get('access_token')?.value;
        const storedRoleName = request.cookies.get('role_name')?.value;

        if (access_token) {
            console.log(request.nextUrl.pathname);

            if (request.nextUrl.pathname === '/signin' || request.nextUrl.pathname === '') {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
        } else {
            if (request.nextUrl.pathname.startsWith('/signin')) {
                return NextResponse.next();
            }

            return NextResponse.redirect(new URL('/signin', request.url));
        }

        const response = await axiosInstance.post('/auth/authenticate', {
            access_token: access_token,
        });

        const { data: { user_role: { role_name } } } = response.data;

        if (storedRoleName !== role_name) {
            return NextResponse.redirect(new URL('/signin', request.url));
        }
        return NextResponse.next();

    } catch (error) {
        errorHandler(error);
        return NextResponse.redirect(new URL('/signin', request.url));
    }
}

export const config = {
    matcher: ['/dashboard', '/signin', '/dashboard/url', '/dashboard/reservedurl', '/dashboard/users', '/dashboard/logo',],
};

export default middleware;
