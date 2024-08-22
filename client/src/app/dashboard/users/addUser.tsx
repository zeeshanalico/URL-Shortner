// // src/components/AddUser.js

// import React, { useState } from 'react';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { createUser } from '../services/apiService';

// const AddUser = () => {
//   const [name, setName] = useState('');
//   const queryClient = useQueryClient();

//   const mutation = useMutation(createUser, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(['users']);
//       setName('');
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (name) {
//       mutation.mutate({ name });
//     }
//   };

//   return (
//     <div>
//       <h2>Add User</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Enter name"
//           required
//         />
//         <button type="submit">Add</button>
//       </form>
//     </div>
//   );
// };

// export default AddUser;
