import Loader from '@/app/components/ui/loader';
import React, { Suspense, lazy } from 'react'
const UserList = lazy(() => import('./userList'));

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div className=''>
      <UserList />
      </div>
    </Suspense>
  )
}

export default page