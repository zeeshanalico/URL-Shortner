// // src/components/EditUser.js

// import React, { useState } from 'react';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { updateUser } from '../services/apiService';

// const EditUser = ({ user, onClose }) => {
//   const [name, setName] = useState(user.name);
//   const queryClient = useQueryClient();

//   const mutation = useMutation(
//     (updatedUser) => updateUser(user.id, updatedUser),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(['users']);
//         onClose();
//       },
//     }
//   );

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     mutation.mutate({ name });
//   };

//   return (
//     <div>
//       <h2>Edit User</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <button type="submit">Save</button>
//         <button type="button" onClick={onClose}>
//           Cancel
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditUser;
