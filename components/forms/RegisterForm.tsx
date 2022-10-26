/* eslint-disable object-curly-newline */
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import * as Yup from 'yup';
import { IUser } from '../../models/UserModel';
import styles from './styles/Forms.module.css';

// Form props
type RegisterFormProps = {
  setSuccess: Dispatch<SetStateAction<boolean>>;
};

// Yup form validation schema
const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Username must be at least 5 characters')
    .max(10, 'Username cannot be more than 10 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'Cannot contain special characters or spaces')
    .required('Required'),
  email: Yup.string().email('Please enter a valid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password cannot be more than 20 characters')
    .required('Required')
    .matches(/^[a-zA-Z0-9]+$/, 'Cannot contain special characters or spaces'),
});

const submitRegister = async (values: IUser) => {
  const result = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
  return result.status === 200;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ setSuccess }) => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={async (values, actions) => {
          const success = await submitRegister(values);
          setSuccess(success);
          actions.resetForm();
          actions.setSubmitting(false);
        }}
      >
        {() => (
          <Form className={styles.form}>
            <label htmlFor="username">Username</label>
            <Field
              type="text"
              id="username"
              name="username"
              placeholder="Username"
            />
            <ErrorMessage name="username" />
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="user@example.com"
            />
            <ErrorMessage name="email" />
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage name="password" />
            <button type="submit">Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
