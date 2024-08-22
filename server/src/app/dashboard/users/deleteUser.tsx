// // src/components/DeleteUser.js

// import React from 'react';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { deleteUser } from '../services/apiService';

// const DeleteUser = ({ userId, onClose }) => {
//   const queryClient = useQueryClient();

//   const mutation = useMutation(() => deleteUser(userId), {
//     onSuccess: () => {
//       queryClient.invalidateQueries(['users']);
//       onClose();
//     },
//   });

//   return (
//     <div>
//       <h2>Confirm Deletion</h2>
//       <p>Are you sure you want to delete this user?</p>
//       <button onClick={() => mutation.mutate()}>Yes, Delete</button>
//       <button onClick={onClose}>Cancel</button>
//     </div>
//   );
// };

// export default DeleteUser;
