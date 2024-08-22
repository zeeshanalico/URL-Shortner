'use client'
import React, { useEffect, useState } from 'react';
import { getUsers } from '@/app/api/services/user';
import errorHandler from '@/app/Error/errorHandler';
import { UserWithAdditionalAttributes } from '@/app/types/user';

const UserList = () => {
  const [userList, setUserList] = useState<UserWithAdditionalAttributes[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsers();
        setUserList(users);
      } catch (error) {
        errorHandler(error);
      }
    }
    fetchData();
  }, []);

  return (
      <div className="max-w-screen-2xl">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Created At</th>
                <th className="py-3 px-6 text-left">Updated At</th>
                <th className="py-3 px-6 text-left">Deleted At</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {userList?.map((user) => (
                <tr key={user.user_id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{user.user_id}</td>
                  <td className="py-3 px-6 text-left">{user.username}</td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-left">{user.role}</td>
                  <td className="py-3 px-6 text-left">{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="py-3 px-6 text-left">{new Date(user.updated_at).toLocaleDateString()}</td>
                  <td className="py-3 px-6 text-left">{user.deleted_at ? new Date(user.deleted_at).toLocaleDateString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default UserList;
