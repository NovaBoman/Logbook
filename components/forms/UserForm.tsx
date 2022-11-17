/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
/* eslint-disable indent */
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import { ObjectId } from 'mongoose';
import { IUser } from '../../models/UserModel';
import { BASE_URL } from '../../utils/constants';
import UserSchema from './validation/user.validation';
import styles from './styles/Forms.module.css';

type UserFormProps = {
  user: IUser;
};

const submitEditUser = async (userId: ObjectId | undefined, values: object) => {
  try {
    return await fetch(`${BASE_URL}/api/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    }).then((res) => {
      return res.status === 201
        ? true
        : res.status === 404
        ? res.json()
        : "Couldn't update user";
    });
    // return result;
  } catch (e: any) {
    return console.error(e);
  }
};

const UserForm: React.FC<UserFormProps> = ({ user }) => {
  const initialValues = {
    username: user.username,
    email: user.email,
    password: user.password,
    roles: user.roles,
  };

  const handleSubmitEditUser = async (values: object) => {
    await submitEditUser(user._id, values);
  };
  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={UserSchema}
        onSubmit={(values, actions) => {
          handleSubmitEditUser(values);
          actions.setSubmitting(false);
        }}
      >
        <Form className={`${styles.form} ${styles.userform}`}>
          <label htmlFor="username">Username</label>
          <Field type="text" name="username" />
          <ErrorMessage name="username" />
          <label htmlFor="email">Email</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" />
          <label htmlFor="password">Password</label>
          <Field type="password" name="password" />
          <ErrorMessage name="password" />
          <p>{initialValues.roles}</p>
          <label>
            User
            <Field type="checkbox" value="user" name="roles" />
          </label>
          <label>
            Admin
            <Field type="checkbox" value="admin" name="roles" />
          </label>
          <button type="submit">Save</button>
        </Form>
      </Formik>
    </div>
  );
};

export default UserForm;
