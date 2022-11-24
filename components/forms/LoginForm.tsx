/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
/* eslint-disable indent */
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction } from 'react';
import styles from './styles/Forms.module.css';
import LoginSchema from './validation/login.validation';

type LoginFormProps = {
  setMessage: Dispatch<SetStateAction<string>>;
};

type LoginFormValues = {
  username: string;
  password: string;
};

const LoginForm: React.FC<LoginFormProps> = ({ setMessage }) => {
  const router = useRouter();
  const initialValues = { username: '', password: '' };

  const handleSubmitLogin = async (values: LoginFormValues) => {
    const res = await signIn('credentials', {
      username: values.username,
      password: values.password,
      redirect: false,
    });
    if (res?.status === 401) {
      return setMessage('Invalid credentials');
    }
    if (res?.ok) {
      router.push('/dashboard');
    }
    return res;
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          handleSubmitLogin(values);
          actions.setSubmitting(false);
        }}
      >
        <Form className={styles.form} onFocus={() => setMessage('')}>
          <label htmlFor="username">Username</label>
          <Field
            type="text"
            id="username"
            name="username"
            placeholder="Username"
          />
          <ErrorMessage name="username" />
          <label htmlFor="password">Password</label>
          <Field
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
          <ErrorMessage name="password" />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
