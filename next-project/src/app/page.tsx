'use client'
import React from 'react'
import Signup from './components/Forms/Signup'
import Cookies from 'js-cookie'
import { redirect } from 'next/navigation'

const Home = () => {
  if (Cookies.get('access_token'))
    redirect('/dashboard')

  return (redirect('/signup'))

}

export default Home

