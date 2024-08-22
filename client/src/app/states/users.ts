import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';




// Fetch users
// const fetchUsers = async () => {
//   const response = await axios.get('/api/users');
//   return response.data;
// };

// // Add user
// const addUser = async (newUser) => {
//   const response = await axios.post('/api/users', newUser);
//   return response.data;
// };

// // Update user
// const updateUser = async (updatedUser) => {
//   const response = await axios.put(`/api/users/${updatedUser.id}`, updatedUser);
//   return response.data;
// };

// // Delete user
// const deleteUser = async (userId) => {
//   await axios.delete(`/api/users/${userId}`);
// };

// // Admin User Interface
// function AdminUserInterface() {
//   const queryClient = useQueryClient();

//   // Users state
//   const {
//     data: users,
//     isLoading,
//     isError,
//     error,
//   } = useQuery(['users'], fetchUsers);

//   // Form states
//   const [formValues, setFormValues] = useState({ name: '', email: '' });
//   const [formErrors, setFormErrors] = useState({});

//   // Mutations
//   const addMutation = useMutation(addUser, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(['users']); // Refetch users
//     },
//   });

//   const updateMutation = useMutation(updateUser, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(['users']);
//     },
//   });

//   const deleteMutation = useMutation(deleteUser, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(['users']);
//     },
//   });

//   // Event handlers
//   const handleAddUser = () => {
//     if (!formValues.name || !formValues.email) {
//       setFormErrors({ name: 'Name is required', email: 'Email is required' });
//       return;
//     }
//     addMutation.mutate(formValues);
//   };

//   const handleUpdateUser = (user) => {
//     updateMutation.mutate(user);
//   };

//   const handleDeleteUser = (userId) => {
//     deleteMutation.mutate(userId);
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       <h1>Admin User Management</h1>

//       {/* Add User Form */}
//       <form>
//         <input
//           type="text"
//           value={formValues.name}
//           onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
//           placeholder="Name"
//         />
//         <input
//           type="email"
//           value={formValues.email}
//           onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
//           placeholder="Email"
//         />
//         <button type="button" onClick={handleAddUser}>
//           Add User
//         </button>
//         {formErrors.name && <div>{formErrors.name}</div>}
//         {formErrors.email && <div>{formErrors.email}</div>}
//       </form>

//       {/* User List */}
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             {user.name} - {user.email}
//             <button onClick={() => handleUpdateUser(user)}>Edit</button>
//             <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
