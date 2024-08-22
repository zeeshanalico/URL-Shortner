import React from 'react'
import Signin from '../components/Forms/Signin'
import { redirect } from 'next/navigation'
import Cookies from 'js-cookie'
const page = () => {

  if (Cookies.get('access_token'))
    redirect('/dashboard')

  return (
    <Signin />
  )
}

export default page