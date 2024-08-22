'use client'
import { redirect } from 'next/navigation'
import Signup from '../components/Forms/Signup'
import Cookies from 'js-cookie'
const page = () => {
    if(Cookies.get('access_token'))
        redirect('/dashboard')
return <Signup/>}
export default page