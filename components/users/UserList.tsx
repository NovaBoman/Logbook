import React, { useEffect, useState } from 'react';
import { IUser } from '../../models/UserModel';
import { BASE_URL } from '../../utils/constants';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<Array<IUser>>([]); // Array of User documents from database
  const [isLoading, setIsLoading] = useState(true); // Use to display loading message or users
  const [error, setError] = useState('');

  useEffect(() => {
    // Define function to call user endpoint
    const getUsers = async () => {
      try {
        await fetch(`${BASE_URL}/api/users`)
          .then((response) => response.json())
          .then((json) => setUsers(json));
      } catch (e) {
        setError('No users found');
      }
    };
    // Call function
    getUsers();
  }, []);

  //   Set isLoading to false when users fetch is complete
  useEffect(() => setIsLoading(false), [users]);

  return (
    // If isLoading show loading message
    // If not loading show error message or user list
    <>
      {isLoading === true ? (
        <div>Loading...</div>
      ) : (
        <div>
          {error && users.length === 0 && <p>{error}</p>}
          {users.map((user) => (
            <div key={user.username}>
              <p>{user.username}</p>
            </div>
          ))}
          <div></div>
        </div>
      )}
    </>
  );
};

export default UserList;
