/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
/* eslint-disable indent */
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import { IUser } from '../../models/UserModel';
import UserSchema from './validation/user.validation';
import styles from './styles/Forms.module.css';
import { submitEditUser, submitRegisterUser } from './helpers/form.helpers';

type UserFormProps = {
  user?: IUser;
  type: 'edit' | 'register';
};

const UserForm: React.FC<UserFormProps> = ({ user, type }) => {
  const initialValues = {
    username: user?.username,
    email: user?.email,
    password: user?.password,
    roles: user?.roles,
  };

  const handleSubmit = async (values: IUser | object) => {
    if (type === 'edit') {
      await submitEditUser(user?._id, values);
    }
    if (type === 'register') {
      await submitRegisterUser(values as IUser);
    }
  };
  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={UserSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
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
          <div className={styles.checkboxContainer}>
            <label>
              User
              <Field type="checkbox" value="user" name="roles" />
            </label>
            <label>
              Admin
              <Field type="checkbox" value="admin" name="roles" />
            </label>
          </div>
          <button type="submit">Save</button>
        </Form>
      </Formik>
    </div>
  );
};

export default UserForm;
