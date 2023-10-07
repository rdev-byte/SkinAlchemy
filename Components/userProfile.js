import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './path/to/userSlice';

function UserProfile() {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const updateUserData = () => {
    dispatch(setUser({ 
      id: 1,
      username: 'newUsername', // Replace with the updated username
      email: 'newEmail@example.com', // Replace with the updated email
    }));
  };

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <button onClick={updateUserData}>Update User Data</button>
    </div>
  );
}

export default UserProfile;
