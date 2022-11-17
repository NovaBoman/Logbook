import React, { useEffect, useState } from 'react';
import { IUser } from '../../models/UserModel';
import { BASE_URL } from '../../utils/constants';
import styles from './Users.module.css';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<Array<IUser>>([]);
  const [message, setMessage] = useState<string | null>('Loading users...');

  useEffect(() => {
    // Define function to call user endpoint
    const getUsers = async () => {
      try {
        await fetch(`${BASE_URL}/api/users`)
          .then((res) => res.json())
          .then((userData) => {
            // If the collection is empty:
            if (userData.length === 0) {
              setMessage('No users found');
            }
            // If collection is not empty:
            return setUsers(userData);
          });
      } catch (e: any) {
        setMessage('Could not load users from database');
      }
    };

    getUsers();
    setMessage(null);
  }, []);

  // Display message on loading or error
  if (message) {
    return (
      <div className={styles.userlist}>
        <div className={styles.message}>
          <p>{message}</p>
        </div>
      </div>
    );
  }

  // Otherwise return list of users
  return (
    <div className={styles.userlist}>
      {users &&
        users.map((user) => (
          <div key={user.username} className={styles.userListItem}>
            <p>{user.username}</p>
          </div>
        ))}
    </div>
  );
};

export default UserList;
