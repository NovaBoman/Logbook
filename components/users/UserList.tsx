/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IUser } from '../../models/UserModel';
import { BASE_URL } from '../../utils/constants';
import UserForm from '../forms/UserForm';
import styles from './Users.module.css';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<Array<IUser>>([]);
  const [usersUpdated, setUsersUpdated] = useState(false);
  const [message, setMessage] = useState<string | null>('Loading users...');
  const [showEditForm, setShowEditForm] = useState(-1);

  // Get users
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

  // Delete user and refetch users
  const handleDelete = async (user: IUser) => {
    if (
      confirm(`Do you really want to delete user: ${user.username}?`) === true
    ) {
      try {
        await fetch(`/api/users/${user._id}`, {
          method: 'DELETE',
        });
      } catch (e) {
        console.error(e);
      }
    }
    getUsers();
  };

  const handleEditForm = (index: number) => {
    if (showEditForm !== -1) {
      setShowEditForm(-1);
      return;
    }
    setShowEditForm(index);
  };

  // Load users when component mounts
  useEffect(() => {
    getUsers();
    setMessage(null);
  }, []);

  useEffect(() => {
    if (!usersUpdated) {
      return;
    }
    getUsers();
    setMessage(null);
    setShowEditForm(-1);
    setUsersUpdated(false);
  }, [usersUpdated]);

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
    <div className={styles.userList}>
      <h2>List of users</h2>
      {users &&
        users.map((user, index) => (
          <>
            <div key={index} className={styles.grid}>
              <p className={styles.username}>{user.username}</p>
              <p className={styles.email}>{user.email}</p>

              <div className={styles.buttons}>
                <button
                  onClick={() => handleEditForm(index)}
                  className={styles.edit}
                >
                  <Image
                    alt="Edit user"
                    width="25"
                    height="25"
                    src="/icons/edit.svg"
                  />
                </button>
                <button className={styles.delete}>
                  <Image
                    alt="Delete user"
                    onClick={() => handleDelete(user)}
                    width="25"
                    height="25"
                    src="/icons/delete.svg"
                  />
                </button>
              </div>
              <div className={styles.form}>
                {showEditForm === index && (
                  <UserForm
                    type={'edit'}
                    user={user}
                    setUsersUpdated={setUsersUpdated}
                  ></UserForm>
                )}
              </div>
            </div>
          </>
        ))}
      <div className={styles.createUserFormContainer}>
        <h2>Create new user</h2>
        <UserForm
          type={'register'}
          setUsersUpdated={setUsersUpdated}
        ></UserForm>
      </div>
    </div>
  );
};

export default UserList;
