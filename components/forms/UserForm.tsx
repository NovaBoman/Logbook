/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
/* eslint-disable indent */
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { IUser } from '../../models/UserModel';
import UserSchema from './validation/user.validation';
import styles from './styles/Forms.module.css';
import { submitEditUser, submitRegisterUser } from './helpers/form.helpers';

type UserFormProps = {
  user?: IUser;
  type: 'edit' | 'register';
  setUsersUpdated: Dispatch<SetStateAction<boolean>>;
};

const UserForm: React.FC<UserFormProps> = ({ user, type, setUsersUpdated }) => {
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
    setUsersUpdated(true);
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
        <Form className={`${styles.form} ${styles.dashboardForm}`}>
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
            <label className={styles.checkboxWrapperLabel}>
              <Field
                className={styles.checkbox}
                type="checkbox"
                value="user"
                name="roles"
              />
              <span> User</span>
            </label>
            <label className={styles.checkboxWrapperLabel}>
              <Field
                className={styles.checkbox}
                type="checkbox"
                value="admin"
                name="roles"
              />
              <span>Admin</span>
            </label>
          </div>
          <button className={styles.formButton} type="submit">
            Save
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default UserForm;
