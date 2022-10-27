/* eslint-disable function-paren-newline */
/* eslint-disable no-nested-ternary */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable indent */
/* eslint-disable object-curly-newline */
import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction } from 'react';
import styles from './styles/Forms.module.css';

type LoginFormProps = {
  setError: Dispatch<SetStateAction<string>>;
};

const submitLogin = async (values: object) => {
  try {
    const result = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    }).then((res) =>
      res.status === 200
        ? true
        : res.status === 404 || res.status === 401 || res.status === 400
        ? res.json()
        : 'Login failed'
    );
    return result;
  } catch (e: any) {
    return console.error(e);
  }
};

const LoginForm: React.FC<LoginFormProps> = ({ setError }) => {
  const router = useRouter();
  const initialValues = { username: '', password: '' };

  const handleSubmitLogin = async (values: object) => {
    const result = await submitLogin(values);
    if (typeof result === 'string') {
      setError(result);
    }
    if (typeof result === 'boolean') {
      setError('');
      router.replace('/dashboard');
    }
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          handleSubmitLogin(values);
          actions.setSubmitting(false);
        }}
      >
        <Form className={styles.form}>
          <label htmlFor="username">Username</label>
          <Field
            type="text"
            id="username"
            name="username"
            placeholder="Username"
          />
          <label htmlFor="password">Password</label>
          <Field
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
