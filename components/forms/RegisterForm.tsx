/* eslint-disable object-curly-newline */
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { IUser } from '../../models/UserModel';
import { submitRegisterUser } from './helpers/form.helpers';
import styles from './styles/Forms.module.css';
import RegisterSchema from './validation/register.validation';

// Form props
type RegisterFormProps = {
  setMessage: Dispatch<SetStateAction<string>>;
  setIsRegistered: Dispatch<SetStateAction<boolean>>;
};

const RegisterForm: React.FC<RegisterFormProps> = ({
  setIsRegistered,
  setMessage,
}) => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    roles: [],
  };

  // Handles the results from the API call to register user
  const handleSubmitRegister = async (values: IUser) => {
    const result = await submitRegisterUser(values);
    if (typeof result === 'string') {
      setMessage(result);
    }
    if (typeof result === 'boolean') {
      setMessage('Your account has been created');
      setIsRegistered(true);
    }
  };

  return (
    <div>
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
            <button className={styles.formButton} type="submit">
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
