/* eslint-disable function-paren-newline */
/* eslint-disable no-nested-ternary */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable indent */
/* eslint-disable object-curly-newline */
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { IUser } from '../../models/UserModel';
import styles from './styles/Forms.module.css';
import RegisterSchema from './validation/register.validation';

// Form props
type RegisterFormProps = {
  setSuccess: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
};

const submitRegister = async (values: IUser) => {
  try {
    const result = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    }).then((res) =>
      res.status === 200
        ? true
        : res.status === 409
        ? res.json()
        : 'Could not create account'
    );
    return result;
  } catch (e: any) {
    return console.error(e);
  }
};

const RegisterForm: React.FC<RegisterFormProps> = ({
  setSuccess,
  setError,
}) => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  // Handles the results from the API call to register user
  const handleSubmitRegister = async (values: IUser) => {
    const result = await submitRegister(values);
    if (typeof result === 'string') {
      setSuccess(false);
      setError(result);
    }
    if (typeof result === 'boolean') {
      setError('');
      setSuccess(true);
    }
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={async (values, actions) => {
          handleSubmitRegister(values);
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
